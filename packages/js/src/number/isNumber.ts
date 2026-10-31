/**
 * Type guard: `true` if `value` is a primitive `number`, including `NaN` and the infinities.
 * Does NOT match boxed `Number` objects; use `isNumberObject` for those.
 *
 * @param value Value to test.
 * @returns `true` if `value` is a primitive number.
 *
 * @example
 * isNumber(42);   // true
 * isNumber(NaN);  // true
 * isNumber("42"); // false
 */
export function isNumber(value: unknown): value is number {
	return typeof value === "number";
}
