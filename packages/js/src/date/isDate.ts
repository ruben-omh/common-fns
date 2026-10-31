import { getDateTime } from "./internal";

/**
 * Type guard: `true` if `value` is a `Date`, including Dates from other realms (e.g. another
 * iframe) and Invalid Dates. Use `isValidDate` to also exclude Invalid Dates.
 *
 * @param value Value to test.
 * @returns `true` if `value` is a `Date` object.
 *
 * @example
 * isDate(new Date());     // true
 * isDate(new Date("x"));  // true (an Invalid Date is still a Date)
 * isDate(Date.now());     // false (a number)
 */
export function isDate(value: unknown): value is Date {
	return getDateTime(value) !== undefined;
}
