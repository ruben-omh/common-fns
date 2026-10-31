/**
 * Type guard: `true` if `value` is neither `null` nor `undefined`, narrowing it to
 * `NonNullable<T>`. Handy as an array filter to drop nullish entries while keeping the element type.
 *
 * @template T Type of the value being tested.
 * @param value Value to test.
 * @returns `true` if `value` is not `null` or `undefined`.
 *
 * @example
 * const dates = [a, null, b].filter(isDefined); // Date[]
 */
export function isDefined<T>(value: T): value is NonNullable<T> {
	return value !== null && value !== undefined;
}
