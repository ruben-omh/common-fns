/**
 * Type guard: `true` if `value` is a primitive `string`. Does NOT match boxed `String` objects;
 * use `isStringObject` for those.
 *
 * @param value Value to test.
 * @returns `true` if `value` is a primitive string.
 *
 * @example
 * isString("hi");            // true
 * isString(new String("x")); // false
 */
export function isString(value: unknown): value is string {
	return typeof value === "string";
}
