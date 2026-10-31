import { assertInteger } from "./internal";
import { addMonths } from "./addMonths";

/**
 * Returns a NEW Date `amount` years after `date` (before it, when negative), in LOCAL time.
 * Does not mutate `date`. Feb 29 becomes Feb 28 when the target year is not a leap year. The
 * time of day is preserved, and an Invalid Date returns an Invalid Date.
 *
 * @param date Starting date. Not modified.
 * @param amount Whole number of years to add; may be negative.
 * @returns A new Date shifted by `amount` years.
 * @throws {RangeError} If `amount` is not an integer.
 *
 * @example
 * addYears(new Date(2024, 1, 29), 1); // 2025-02-28
 */
export function addYears(date: Date, amount: number): Date {
	assertInteger(amount, "addYears", "amount");
	return addMonths(date, amount * 12);
}
