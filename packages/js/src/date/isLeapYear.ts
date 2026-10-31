/**
 * `true` if `year` is a leap year under the proleptic Gregorian calendar: divisible by 4, except
 * century years, which must be divisible by 400. A non-integer year is never a leap year.
 *
 * @param year Full year to test (e.g. 2024).
 * @returns `true` if `year` is a leap year.
 *
 * @example
 * isLeapYear(2024); // true
 * isLeapYear(1900); // false
 * isLeapYear(2000); // true
 */
export function isLeapYear(year: number): boolean {
	return Number.isInteger(year) && year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
