import type { DateBounds } from "./types";

/**
 * `true` if any part of the calendar month `[year-monthIndex-01 00:00, next-month-01 00:00)`
 * overlaps `bounds`, comparing in LOCAL TIME. Use this to decide whether a whole month is
 * reachable under a min/max limit, rather than testing a single instant with `isWithinBounds`.
 *
 * A missing `min` / `max` means no limit on that side, so empty bounds include every month. `min`
 * is satisfied when the month ends after it; `max` is inclusive of the month's first instant.
 * `monthIndex` is normalized like the `Date` constructor, so values outside `0..11` roll into
 * adjacent years. A non-finite `year` or `monthIndex` yields an Invalid Date and is never in range.
 *
 * @param year Full year of the month to test (e.g. 2026).
 * @param monthIndex Zero-based month (0 = January, 11 = December).
 * @param bounds Inclusive `min` / `max` instant bounds; either side may be omitted.
 * @returns `true` if the month overlaps `bounds`.
 *
 * @example
 * isMonthInRange(2026, 5, {}); // true (June 2026)
 * isMonthInRange(2026, 5, { min: new Date(2026, 6, 1) }); // false
 * isMonthInRange(2026, 5, { max: new Date(2026, 4, 31) }); // false
 * isMonthInRange(2026, NaN, {}); // false
 */
export function isMonthInRange(year: number, monthIndex: number, bounds: DateBounds): boolean {
	const monthStart = new Date(year, monthIndex, 1).getTime();
	const nextMonthStart = new Date(year, monthIndex + 1, 1).getTime();

	if (Number.isNaN(monthStart) || Number.isNaN(nextMonthStart)) {
		return false; // Invalid Date: needed explicitly, since a missing bound skips the comparison.
	}

	const { min, max } = bounds;
	return (
		(min === undefined || nextMonthStart > min.getTime()) &&
		(max === undefined || monthStart <= max.getTime())
	);
}
