import { isString } from "../string/isString";
import { toDate } from "./toDate";
import type { DateInput } from "./types";

/**
 * Upper bound on cached formatters. There are only ~600 IANA zones, but `Intl` also accepts
 * aliases and any letter case ("america/new_york"), so input from users could otherwise grow
 * the cache without limit.
 */
const MAX_CACHED_TIME_ZONES = 50;

/** One `Intl.DateTimeFormat` per time zone: constructing one costs far more than using it. */
const formatterCache = new Map<string, Intl.DateTimeFormat>();

const FORMAT_OPTIONS: Readonly<Intl.DateTimeFormatOptions> = {
	// Fixed calendar, digits and hour cycle, so every part parses as a plain number.
	calendar: "gregory",
	numberingSystem: "latn",
	hourCycle: "h23", // 0–23. `hour12: false` can emit "24" for midnight in some engines.
	era: "short", // needed to tell 5 AD from 5 BC
	year: "numeric",
	month: "numeric",
	day: "numeric",
	hour: "numeric",
	minute: "numeric",
	second: "numeric",
};

function getFormatter(timeZone: string): Intl.DateTimeFormat {
	let formatter = formatterCache.get(timeZone);

	if (formatter === undefined) {
		// Throws RangeError for an unknown zone, before anything is cached.
		formatter = new Intl.DateTimeFormat("en-US", { ...FORMAT_OPTIONS, timeZone });

		if (formatterCache.size >= MAX_CACHED_TIME_ZONES) {
			// Evict the oldest entry. Plain FIFO: real workloads use a handful of zones,
			// so tracking recency on every hit would cost more than it saves.
			const oldest = formatterCache.keys().next().value;
			if (oldest !== undefined) formatterCache.delete(oldest);
		}
		formatterCache.set(timeZone, formatter);
	}

	return formatter;
}

/**
 * Returns a NEW Date whose LOCAL fields (`getFullYear()`, `getHours()`, and so on) show the
 * wall-clock time in `timeZone` at the instant `date` represents. Use it to feed zone-unaware
 * helpers with the date as seen in another time zone.
 *
 * The result is a display projection, NOT the same instant: `getTime()`, `toISOString()` and
 * comparisons with real instants are shifted by the zone difference. Don't store or send it.
 *
 * Milliseconds are preserved, and years 0-99 and before 1 AD are handled correctly.
 *
 * Limitation: if the wall-clock time does not exist in the HOST's own time zone (it falls in
 * the host's DST spring-forward gap), `Date` moves it forward by the gap, e.g. 00:30 → 01:30.
 * The calendar day is still correct unless the gap crosses midnight.
 *
 * @param date Any value `toDate` accepts.
 * @param timeZone IANA identifier, e.g. "America/Mexico_City", or "UTC".
 * @returns A new Date whose local fields show the wall-clock time in `timeZone`.
 * @throws {TypeError} If `timeZone` is not a string (`undefined` would silently use the host's zone).
 * @throws {RangeError} If `timeZone` is not a recognized time zone.
 * @throws {TypeError | RangeError} If `date` is not a valid date (see `toDate`).
 *
 * @example
 * // Host in Mexico City (UTC-6); 12:00 UTC is 08:00 in New York.
 * const zoned = toZonedTime("2026-10-28T12:00:00Z", "America/New_York");
 * zoned.getHours(); // 8
 */
export function toZonedTime(date: DateInput, timeZone: string): Date {
	if (!isString(timeZone)) {
		throw new TypeError(`toZonedTime(): "timeZone" must be a string; received ${typeof timeZone}.`);
	}

	const instant = toDate(date);
	const parts = getFormatter(timeZone).formatToParts(instant);

	let year = Number.NaN;
	let month = Number.NaN;
	let day = Number.NaN;
	let hour = Number.NaN;
	let minute = Number.NaN;
	let second = Number.NaN;
	let isBeforeCommonEra = false;

	for (const part of parts) {
		switch (part.type) {
			case "year":
				year = Number(part.value);
				break;
			case "month":
				month = Number(part.value);
				break;
			case "day":
				day = Number(part.value);
				break;
			case "hour":
				hour = Number(part.value);
				break;
			case "minute":
				minute = Number(part.value);
				break;
			case "second":
				second = Number(part.value);
				break;
			case "era":
				isBeforeCommonEra = part.value === "BC";
				break;
		}
	}

	if ([year, month, day, hour, minute, second].some(Number.isNaN)) {
		throw new RangeError(
			`toZonedTime(): Intl.DateTimeFormat returned incomplete parts for "${timeZone}".`,
		);
	}

	// Intl counts years by era (1 BC, 2 BC…); Date uses astronomical years (0, -1…).
	const astronomicalYear = isBeforeCommonEra ? 1 - year : year;

	// Offsets are whole seconds, so the milliseconds are the same in every zone.
	const milliseconds = instant.getUTCMilliseconds();

	if (astronomicalYear >= 100) {
		// Fast path: one constructor call does a single local-time conversion.
		return new Date(astronomicalYear, month - 1, day, hour, minute, second, milliseconds);
	}

	// The constructor remaps years 0–99 to 1900–1999; setFullYear does not.
	const result = new Date(0);
	result.setFullYear(astronomicalYear, month - 1, day);
	result.setHours(hour, minute, second, milliseconds);
	return result;
}
