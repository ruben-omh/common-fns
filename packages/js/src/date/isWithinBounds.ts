import type { DateBounds } from "./types";

/**
 * `true` if `date` is within `bounds`, comparing EXACT MOMENTS (milliseconds), inclusive.
 * With `max` = Dec 31 00:00, Dec 31 10:00 is OUT of bounds. For date pickers and calendars,
 * where only the day matters, use `isDayWithinBounds`.
 *
 * A missing `min` / `max` means no limit on that side. An Invalid Date is never within bounds.
 *
 * @param date Date to test.
 * @param bounds Inclusive `min` / `max` instant bounds; either side may be omitted.
 * @returns `true` if `date` is within `bounds`, comparing exact moments.
 *
 * @example
 * // bounds: { min: 2026-12-31 00:00, max exclusive-feeling }
 * isWithinBounds(new Date(2026, 11, 31, 10), { min: new Date(2026, 11, 31) }); // true
 */
export function isWithinBounds(date: Date, bounds: DateBounds): boolean {
	const time = date.getTime();
	if (Number.isNaN(time)) {
		return false; // Invalid Date: needed explicitly, since a missing bound skips the comparison.
	}

	const { min, max } = bounds;
	return (
		(min === undefined || time >= min.getTime()) && (max === undefined || time <= max.getTime())
	);
}
