import { isNumber } from "../number/isNumber";
import { isString } from "../string/isString";
import { isDate } from "./isDate";
import { isValidDate } from "./isValidDate";
import { parseDateInput } from "./parseDateInput";
import type { DateInput, ParseDateInputOptions, ToDateOptions } from "./types";

const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

// ISO 8601 date-time. Without an offset, ECMAScript parses it as local time.
const DATE_TIME_PATTERN =
	/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:\d{2})?$/;

/** Strict ISO parsing for "YYYY-MM-DD" (local midnight); delegates the calendar check. */
const ISO_DATE_OPTIONS: ParseDateInputOptions = { order: "YMD", allowTwoDigitYear: false };

function parseIsoString(value: string): Date | null {
	if (DATE_ONLY_PATTERN.test(value)) {
		return parseDateInput(value, ISO_DATE_OPTIONS);
	}

	if (DATE_TIME_PATTERN.test(value)) {
		// `new Date` rolls impossible days over (Feb 30 → Mar 2), so validate the date part first.
		if (parseDateInput(value.slice(0, 10), ISO_DATE_OPTIONS) === null) {
			return null;
		}
		const date = new Date(value);
		return Number.isNaN(date.getTime()) ? null : date;
	}

	return null;
}

function describeType(value: unknown): string {
	if (value === null) return "null";
	if (Array.isArray(value)) return "array";
	return typeof value;
}

/**
 * Converts a Date, timestamp or date string into a NEW valid Date.
 *
 * - `Date`: returns a copy (works with Dates from other realms).
 * - `number`: milliseconds since the epoch.
 * - `"YYYY-MM-DD"`: LOCAL midnight of that day. Note: `new Date("YYYY-MM-DD")` would give UTC midnight.
 * - ISO date-time (`"YYYY-MM-DDTHH:mm[:ss[.sss]][Z|+/-HH:mm]"`): local time unless an offset is given.
 * - Any other string: rejected, UNLESS `options.locale` or `options.order` is passed, in which case
 *   it is parsed leniently in that locale (e.g. "28/10/2026", "28 de octubre de 2026").
 *
 * Lenient parsing is opt-in on purpose: "10/11/2026" is Oct 11 in en-US but Nov 10 in es-MX,
 * so guessing from the runtime's locale would give different dates on a server and a browser.
 *
 * @param value A `Date`, a timestamp in milliseconds, or a date string (see above).
 * @param options Opt-in locale-aware parsing for non-ISO strings. See `ToDateOptions`.
 * @returns A new, valid `Date`.
 * @throws {RangeError} For an Invalid Date, an out-of-range timestamp, an impossible date
 *                      (e.g. "2026-02-30") or a string that cannot be parsed.
 * @throws {TypeError}  For any other type.
 *
 * @example
 * toDate("2026-10-28");                           // Oct 28, 2026, 00:00 local
 * toDate("28/10/2026", { locale: "es-MX" });      // Oct 28, 2026, 00:00 local
 * toDate("28/10/2026");                           // throws RangeError (not ISO, no locale given)
 */
export function toDate(value: DateInput, options?: ToDateOptions): Date {
	if (isDate(value)) {
		if (!isValidDate(value)) {
			throw new RangeError("toDate(): received an Invalid Date (its time value is NaN).");
		}
		return new Date(value.getTime());
	}

	if (isNumber(value)) {
		const date = new Date(value);
		if (Number.isNaN(date.getTime())) {
			throw new RangeError(
				`toDate(): ${String(value)} is not a valid timestamp (expected a finite number of milliseconds within ±8.64e15).`,
			);
		}
		return date;
	}

	if (isString(value)) {
		const lenient = options?.locale !== undefined || options?.order !== undefined;
		const date = parseIsoString(value) ?? (lenient ? parseDateInput(value, options) : null);

		if (date === null) {
			const expected = lenient
				? `an ISO 8601 date or a date in the "${options?.locale ?? options?.order}" format`
				: `"YYYY-MM-DD" or an ISO 8601 date-time (pass { locale } to accept localized formats)`;
			throw new RangeError(
				`toDate(): could not parse ${JSON.stringify(value)}; expected ${expected}.`,
			);
		}
		return date;
	}

	throw new TypeError(
		`toDate(): expected a Date, string or number; received ${describeType(value)}.`,
	);
}
