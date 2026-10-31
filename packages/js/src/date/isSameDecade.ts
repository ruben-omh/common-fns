function getDecadeStart(date: Date): number {
	return Math.floor(date.getFullYear() / 10) * 10;
}

/**
 * `true` if `a` and `b` fall in the same decade in LOCAL time, where a decade runs from a year
 * ending in 0 through the next year ending in 9 (e.g. 2020 through 2029).
 *
 * @param a First date.
 * @param b Second date.
 * @returns `true` if both fall in the same decade.
 *
 * @example
 * isSameDecade(new Date(2020, 0), new Date(2029, 11)); // true
 * isSameDecade(new Date(2019, 11), new Date(2020, 0)); // false
 */
export function isSameDecade(a: Date, b: Date): boolean {
	return getDecadeStart(a) === getDecadeStart(b);
}
