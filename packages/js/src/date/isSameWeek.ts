import { assertDayOfWeek, getLocalEpochDay } from "./internal";
import type { DayOfWeek } from "./types";

function getDaysSinceWeekStart(date: Date, weekStartsOn: DayOfWeek): number {
	return (date.getDay() - weekStartsOn + 7) % 7;
}

/**
 * `true` if `a` and `b` fall in the same week in LOCAL time, where weeks begin on `weekStartsOn`.
 * Compares calendar days only, so the time of day is ignored.
 *
 * @param a First date.
 * @param b Second date.
 * @param weekStartsOn First day of the week, from 0 (Sunday) to 6 (Saturday).
 * @default weekStartsOn 0
 * @returns `true` if both fall in the same week.
 * @throws {RangeError} If `weekStartsOn` is not an integer from 0 to 6.
 *
 * @example
 * // Week starting on Monday:
 * isSameWeek(new Date(2026, 9, 26), new Date(2026, 9, 28), 1); // true
 */
export function isSameWeek(a: Date, b: Date, weekStartsOn: DayOfWeek = 0): boolean {
	assertDayOfWeek(weekStartsOn, "isSameWeek", "weekStartsOn");

	const weekStartA = getLocalEpochDay(a) - getDaysSinceWeekStart(a, weekStartsOn);
	const weekStartB = getLocalEpochDay(b) - getDaysSinceWeekStart(b, weekStartsOn);

	return weekStartA === weekStartB;
}
