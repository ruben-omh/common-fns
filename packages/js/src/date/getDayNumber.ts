/**
 * Encodes the date's LOCAL calendar day as `YYYYMMDD` (e.g. 20261028).
 * Day numbers sort in calendar order, so they can be compared with `<` / `>`, and they ignore
 * the time of day. An Invalid Date yields `NaN`.
 *
 * @param date Date whose local calendar day is encoded.
 * @returns The day as a `YYYYMMDD` integer, or `NaN` for an Invalid Date.
 *
 * @example
 * getDayNumber(new Date(2026, 9, 28)); // 20261028
 */
export function getDayNumber(date: Date): number {
	return date.getFullYear() * 10_000 + (date.getMonth() + 1) * 100 + date.getDate();
}
