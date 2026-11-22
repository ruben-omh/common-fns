import type { DateBounds } from "./types";

/**
 * `true` if any part of the calendar year `[year-01-01 00:00, (year+1)-01-01 00:00)` overlaps
 * `bounds`, comparing in LOCAL TIME. Use this to decide whether a whole year is reachable under
 * a min/max limit, rather than testing a single instant with `isWithinBounds`.
 *
 * A missing `min` / `max` means no limit on that side, so empty bounds include every year. `min`
 * is satisfied when the year ends after it; `max` is inclusive of the year's first instant. A
 * non-finite `year` (`NaN`, `Infinity`) yields an Invalid Date and is never in range.
 *
 * @param year Full year to test (e.g. 2026).
 * @param bounds Inclusive `min` / `max` instant bounds; either side may be omitted.
 * @returns `true` if `year` overlaps `bounds`.
 *
 * @example
 * isYearInRange(2026, {}); // true
 * isYearInRange(2026, { min: new Date(2027, 0, 1) }); // false
 * isYearInRange(2026, { max: new Date(2025, 11, 31) }); // false
 * isYearInRange(NaN, {}); // false
 */
export function isYearInRange(year: number, bounds: DateBounds): boolean {
	const yearStart = new Date(year, 0, 1).getTime();
	const nextYearStart = new Date(year + 1, 0, 1).getTime();

	if (Number.isNaN(yearStart) || Number.isNaN(nextYearStart)) {
		return false; // Invalid Date: needed explicitly, since a missing bound skips the comparison.
	}

	const { min, max } = bounds;
	return (
		(min === undefined || nextYearStart > min.getTime()) &&
		(max === undefined || yearStart <= max.getTime())
	);
}
