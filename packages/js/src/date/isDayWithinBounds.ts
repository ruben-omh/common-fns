import { getDayNumber } from "./getDayNumber";
import type { DateBounds } from "./types";

/**
 * `true` if `date`'s CALENDAR DAY (local time) is within `bounds`, inclusive.
 * The time of day is ignored: with `max` = Dec 31 00:00, Dec 31 23:59 is still within bounds.
 *
 * A missing `min` / `max` means no limit on that side. An Invalid Date is never within bounds.
 * To check many dates against the same bounds, use `createDayBoundsChecker`.
 *
 * @param date Date to test.
 * @param bounds Inclusive `min` / `max` day bounds; either side may be omitted.
 * @returns `true` if `date`'s local day is within `bounds`.
 *
 * @example
 * // bounds: { min: 2026-01-01, max: 2026-12-31 }
 * isDayWithinBounds(new Date(2026, 11, 31, 23, 59), bounds); // true
 */
export function isDayWithinBounds(date: Date, bounds: DateBounds): boolean {
	const day = getDayNumber(date);
	if (Number.isNaN(day)) {
		return false; // Invalid Date: needed explicitly, since a missing bound skips the comparison.
	}

	const { min, max } = bounds;
	return (
		(min === undefined || day >= getDayNumber(min)) &&
		(max === undefined || day <= getDayNumber(max))
	);
}
