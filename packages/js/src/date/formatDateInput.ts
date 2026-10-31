import type { DateInputStyle, DateOrder, FormatDateInputOptions } from "./types";

const STYLE_OPTIONS: Record<DateInputStyle, Intl.DateTimeFormatOptions> = {
	numeric: { year: "numeric", month: "2-digit", day: "2-digit" },
	short: { year: "numeric", month: "short", day: "numeric" },
	long: { year: "numeric", month: "long", day: "numeric" },
};

/** Constructing an Intl.DateTimeFormat is expensive, so one is kept per locale + style. */
const formatterCache = new Map<string, Intl.DateTimeFormat>();

const FIELD_TYPES: Record<string, "D" | "M" | "Y"> = { day: "D", month: "M", year: "Y" }; // NOSONAR

const LETTERS_OR_DIGITS = /[\p{L}\p{M}\d]/u;

function getFormatter(locale: string | undefined, style: DateInputStyle): Intl.DateTimeFormat {
	const key = `${locale ?? ""}|${style}`;
	let formatter = formatterCache.get(key);

	if (formatter === undefined) {
		formatter = new Intl.DateTimeFormat(locale, {
			...STYLE_OPTIONS[style],
			// Always Gregorian with Latin digits, so the output matches what `parseDateInput` reads
			// (e.g. "th-TH" would otherwise use Buddhist years, "ar-EG" Arabic-Indic digits).
			calendar: "gregory",
			numberingSystem: "latn",
		});
		formatterCache.set(key, formatter);
	}

	return formatter;
}

function formatWithOrder(
	parts: Intl.DateTimeFormatPart[],
	order: DateOrder,
	year: string,
	separator: string | undefined,
): string {
	const values: Record<"D" | "M" | "Y", string> = { D: "", M: "", Y: year };
	for (const part of parts) {
		const field = FIELD_TYPES[part.type];
		if (field !== undefined && field !== "Y") values[field] = part.value;
	}
	// Default to the locale's own separator, e.g. "/" in es-MX, "." in de-DE.
	const joiner = separator ?? (parts.find((part) => part.type === "literal")?.value.trim() || "/");
	return [...order].map((field) => values[field as "D" | "M" | "Y"]).join(joiner);
}

/**
 * Formats `date`'s LOCAL calendar day for a date text input, in the locale's conventions.
 * The exact inverse of `parseDateInput` with the same `locale` (and `order`):
 * `parseDateInput(formatDateInput(date, options), options)` returns the same day.
 *
 * - The year is always written with at least 4 digits ("0050"), so it is never mistaken for a
 *   two-digit year when parsed back.
 * - Always uses Gregorian years and Latin digits.
 * - Returns `""` for `null`, `undefined` or an Invalid Date, so an input can render an empty value.
 *
 * @param date Date to format, or `null` / `undefined` / an Invalid Date to render `""`.
 * @param options Locale, style, field order and separator. See `FormatDateInputOptions`.
 * @returns The formatted date string, or `""` for an empty or invalid `date`.
 * @throws {RangeError} For a valid date outside years 0-9999, which cannot be written back
 *                      in a form `parseDateInput` reads.
 * @throws {RangeError} If `options.separator` is empty or contains letters or digits.
 *
 * @example
 * formatDateInput(new Date(2026, 9, 28), { locale: "es-MX" });                  // "28/10/2026"
 * formatDateInput(new Date(2026, 9, 28), { locale: "en-US" });                  // "10/28/2026"
 * formatDateInput(new Date(2026, 9, 28), { locale: "es-MX", style: "long" });   // "28 de octubre de 2026"
 * formatDateInput(new Date(2026, 9, 28), { locale: "es-MX", separator: "-" });  // "28-10-2026"
 */
export function formatDateInput(
	date: Date | null | undefined,
	options: FormatDateInputOptions = {},
): string {
	if (date === null || date === undefined || Number.isNaN(date.getTime())) {
		return "";
	}

	const yearNumber = date.getFullYear();
	if (yearNumber < 0 || yearNumber > 9999) {
		throw new RangeError(
			`formatDateInput(): year ${yearNumber} is outside the supported range 0–9999.`,
		);
	}

	const { locale, style = "numeric", order, separator } = options;

	if (separator !== undefined && (separator.length === 0 || LETTERS_OR_DIGITS.test(separator))) {
		throw new RangeError(
			`formatDateInput(): "separator" must be non-empty and contain no letters or digits; received ${JSON.stringify(separator)}.`,
		);
	}
	const parts = getFormatter(locale, style).formatToParts(date);
	// Intl writes year 50 as "50"; pad it so it isn't read back as a two-digit year (2050).
	const year = String(yearNumber).padStart(4, "0");

	if (style === "numeric" && (order !== undefined || separator !== undefined)) {
		const localeOrder = parts.map((part) => FIELD_TYPES[part.type] ?? "").join("") as DateOrder;
		return formatWithOrder(parts, order ?? localeOrder, year, separator);
	}

	let result = "";
	for (const part of parts) {
		result += part.type === "year" ? year : part.value;
	}
	return result;
}
