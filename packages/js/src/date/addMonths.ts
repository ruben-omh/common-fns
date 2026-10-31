import { assertInteger } from "./internal";
import { getDaysInMonth } from "./getDaysInMonth";

/**
 * Returns a NEW Date `amount` months after `date` (before it, when negative), in LOCAL time.
 * Does not mutate `date`. When the day of month does not exist in the target month it is clamped
 * to that month's last day (Jan 31 plus one month becomes Feb 28 or 29). The time of day is
 * preserved, and an Invalid Date returns an Invalid Date.
 *
 * @param date Starting date. Not modified.
 * @param amount Whole number of months to add; may be negative.
 * @returns A new Date shifted by `amount` months.
 * @throws {RangeError} If `amount` is not an integer.
 *
 * @example
 * addMonths(new Date(2026, 0, 31), 1); // 2026-02-28
 */
export function addMonths(date: Date, amount: number): Date {
	assertInteger(amount, "addMonths", "amount");

	const result = new Date(date.getTime());
	const year = date.getFullYear();

	if (Number.isNaN(year)) {
		return result; // Invalid Date in, Invalid Date out.
	}

	const totalMonths = year * 12 + date.getMonth() + amount;
	const targetYear = Math.floor(totalMonths / 12);
	const targetMonth = totalMonths - targetYear * 12; // always 0–11, also for negative years
	const targetDay = Math.min(date.getDate(), getDaysInMonth(targetYear, targetMonth));

	result.setFullYear(targetYear, targetMonth, targetDay);
	return result;
}
