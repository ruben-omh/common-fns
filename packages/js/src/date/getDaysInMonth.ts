import { DAYS_IN_MONTH, assertInteger } from "./internal";
import { isLeapYear } from "./isLeapYear";

/**
 * Number of days in a given month, accounting for leap years (February has 29 in a leap year).
 *
 * @param year Full year (e.g. 2026). Must be an integer; leap years follow the proleptic Gregorian calendar.
 * @param month Month index from 0 (January) to 11 (December).
 * @returns The number of days in that month, from 28 to 31.
 * @throws {RangeError} If `year` is not an integer, or `month` is not an integer from 0 to 11.
 *
 * @example
 * getDaysInMonth(2024, 1); // 29 (February in a leap year)
 * getDaysInMonth(2026, 1); // 28
 */
export function getDaysInMonth(year: number, month: number): number {
	assertInteger(year, "getDaysInMonth", "year");

	if (!Number.isInteger(month) || month < 0 || month > 11) {
		throw new RangeError(
			`getDaysInMonth(): "month" must be an integer from 0 to 11; received ${String(month)}.`,
		);
	}

	return month === 1 && isLeapYear(year) ? 29 : DAYS_IN_MONTH[month];
}
