/**
 * Type guard: `true` if `value` is `null` or `undefined` (nullish), narrowing it accordingly.
 * The complement of `isDefined`.
 *
 * @param value Value to test.
 * @returns `true` if `value` is `null` or `undefined`.
 *
 * @example
 * isNullOrUndefined(null);      // true
 * isNullOrUndefined(undefined); // true
 * isNullOrUndefined(0);         // false
 */
export function isNullOrUndefined(value: unknown): value is null | undefined {
	return value === null || value === undefined;
}
