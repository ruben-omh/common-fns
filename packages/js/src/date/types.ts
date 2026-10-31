/** A value `toDate` can convert: a `Date`, a timestamp in milliseconds, or a date string. */
export type DateInput = Date | number | string;

/** Day of the week as an index: 0 (Sunday) through 6 (Saturday). */
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** Order of day (D), month (M) and year (Y) in an all-numeric date. */
export type DateOrder = "DMY" | "MDY" | "YMD";

export interface ParseDateInputOptions {
	/**
	 * Locale used to infer the field order (e.g. "es-MX" → DMY, "en-US" → MDY) and to
	 * recognize month names ("octubre", "Oct"). Defaults to the runtime's locale.
	 */
	readonly locale?: string;
	/** Overrides the field order inferred from `locale`. */
	readonly order?: DateOrder;
	/** Accept two-digit years ("28/10/26"). Default: `true`. */
	readonly allowTwoDigitYear?: boolean;
	/**
	 * Two-digit years resolve to the year within 50 years of this one (49 ahead, 50 back).
	 * Default: the current year. Pass a fixed value for deterministic results in tests.
	 */
	readonly referenceYear?: number;
}

/**
 * Options for parsing strings that are not ISO 8601. Passing `locale` or `order` turns on
 * lenient, locale-aware parsing (see `parseDateInput`). Ignored for Date and number inputs.
 */
export type ToDateOptions = ParseDateInputOptions;

/** Presentation style for `formatDateInput`: all-numeric, abbreviated month, or full month name. */
export type DateInputStyle = "numeric" | "short" | "long";

export interface FormatDateInputOptions {
	/** Locale for field order, separators and month names. Defaults to the runtime's locale. */
	readonly locale?: string;
	/**
	 * - `"numeric"` (default): "28/10/2026" (es-MX), "10/28/2026" (en-US), "28.10.2026" (de-DE)
	 * - `"short"`: "28 oct 2026"
	 * - `"long"`:  "28 de octubre de 2026"
	 */
	readonly style?: DateInputStyle;
	/**
	 * Overrides the locale's field order. Only for `"numeric"`; the locale's separator is kept.
	 * Pass the same `order` to `parseDateInput` to read the result back.
	 */
	readonly order?: DateOrder;
	/**
	 * Overrides the locale's separator, e.g. `"-"` → "28-10-2026". Only for `"numeric"`.
	 * Must not contain letters or digits, or the result could not be parsed back.
	 */
	readonly separator?: string;
}

/**
 * Inclusive lower and upper date bounds. Omitting a side means no limit there, so `{}` allows
 * any date and `{ min }` allows everything from `min` onward.
 */
export interface DateBounds {
	/** Earliest allowed date, inclusive. Omit for no lower limit. */
	readonly min?: Date;
	/** Latest allowed date, inclusive. Omit for no upper limit. */
	readonly max?: Date;
}
