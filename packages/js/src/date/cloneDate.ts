/**
 * Returns a NEW Date with the same time value as `date`. An Invalid Date is copied as an Invalid
 * Date, and Dates from other realms (e.g. another iframe) are handled correctly.
 *
 * @param date Date to copy. Not modified.
 * @returns A new Date with the same time value as `date`.
 *
 * @example
 * const copy = cloneDate(original); // copy.getTime() === original.getTime()
 */
export function cloneDate(date: Date): Date {
	return new Date(date.getTime());
}
