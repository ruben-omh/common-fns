import { getDayNumber } from "./getDayNumber";
import type { DateBounds } from "./types";

/**
 * Builds a function that checks whether a date's CALENDAR DAY (local time) is within `bounds`,
 * inclusive and ignoring the time of day. The bounds are converted once, so each check costs
 * one `getDayNumber` call and two comparisons. Use it when checking many dates against the
 * same bounds, e.g. every cell of a month grid.
 *
 * The bounds are read when the checker is created: later changes to them are not seen.
 *
 * @param bounds Inclusive `min` / `max` day bounds; either side may be omitted for no limit.
 * @returns A function that returns `true` when a date's local day is within `bounds`.
 *
 * @example
 * const isSelectable = createDayBoundsChecker(bounds);
 * const cells = grid.map((date) => ({ date, disabled: !isSelectable(date) }));
 */
export function createDayBoundsChecker(bounds: DateBounds): (date: Date) => boolean {
	const minDay = bounds.min === undefined ? -Infinity : getDayNumber(bounds.min);
	const maxDay = bounds.max === undefined ? Infinity : getDayNumber(bounds.max);

	return (date: Date): boolean => {
		const day = getDayNumber(date);
		return day >= minDay && day <= maxDay;
	};
}
