import { assertInteger } from "./internal";

/**
 * Returns a NEW Date `amount` calendar days after `date` (before it, when negative), in LOCAL
 * time. Does not mutate `date`. The time of day is preserved, and an Invalid Date returns an
 * Invalid Date.
 *
 * @param date Starting date. Not modified.
 * @param amount Whole number of days to add; may be negative.
 * @returns A new Date shifted by `amount` days.
 * @throws {RangeError} If `amount` is not an integer.
 *
 * @example
 * addDays(new Date(2026, 9, 28), 5); // 2026-11-02, same time of day
 */
export function addDays(date: Date, amount: number): Date {
	assertInteger(amount, "addDays", "amount");

	const result = new Date(date.getTime());
	// setFullYear (unlike the Date constructor) does not remap years 0–99 to 1900–1999.
	result.setFullYear(date.getFullYear(), date.getMonth(), date.getDate() + amount);
	return result;
}
