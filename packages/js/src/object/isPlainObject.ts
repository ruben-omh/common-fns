/**
 * Type guard: `true` if `value` is a plain object - one made from an object literal,
 * `Object.create(null)`, or `new Object()` - and not an array, `Date`, `Map`, class instance or
 * other exotic object. Narrows to `Record<string, unknown>`.
 *
 * @param value Value to test.
 * @returns `true` if `value` is a plain object.
 *
 * @example
 * isPlainObject({ a: 1 });            // true
 * isPlainObject(Object.create(null)); // true
 * isPlainObject([1, 2]);              // false
 * isPlainObject(new Date());          // false
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
	if (typeof value !== "object" || value === null) return false;
	const proto: unknown = Object.getPrototypeOf(value);
	return proto === null || Object.getPrototypeOf(proto) === null;
}
