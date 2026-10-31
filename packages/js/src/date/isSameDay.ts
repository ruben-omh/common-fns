import { isSameMonth } from "./isSameMonth";

/**
 * `true` if `a` and `b` fall on the same calendar day in LOCAL time (same year, month and date),
 * ignoring the time of day.
 *
 * @param a First date.
 * @param b Second date.
 * @returns `true` if both are the same local calendar day.
 *
 * @example
 * isSameDay(new Date(2026, 9, 28, 9), new Date(2026, 9, 28, 23)); // true
 */
export function isSameDay(a: Date, b: Date): boolean {
	return isSameMonth(a, b) && a.getDate() === b.getDate();
}
