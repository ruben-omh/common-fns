import { isSameYear } from "./isSameYear";

/**
 * `true` if `a` and `b` fall in the same month of the same year in LOCAL time.
 *
 * @param a First date.
 * @param b Second date.
 * @returns `true` if both are in the same calendar month.
 *
 * @example
 * isSameMonth(new Date(2026, 9, 1), new Date(2026, 9, 31)); // true
 */
export function isSameMonth(a: Date, b: Date): boolean {
	return isSameYear(a, b) && a.getMonth() === b.getMonth();
}
