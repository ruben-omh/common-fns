/**
 * `true` if `a` and `b` fall in the same calendar year in LOCAL time.
 *
 * @param a First date.
 * @param b Second date.
 * @returns `true` if both are in the same year.
 *
 * @example
 * isSameYear(new Date(2026, 0, 1), new Date(2026, 11, 31)); // true
 */
export function isSameYear(a: Date, b: Date): boolean {
	return a.getFullYear() === b.getFullYear();
}
