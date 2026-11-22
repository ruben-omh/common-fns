/**
 * Type guard: `true` if `key` is an OWN property key of `obj`, narrowing `key` to `keyof T`.
 * Inherited (prototype-chain) keys are not matched. Accepts `string`, `number`, and `symbol`
 * keys; any other value returns `false`.
 *
 * @template T Object whose keys are tested.
 * @param obj Object to test against.
 * @param key Candidate key, of unknown type.
 * @returns `true` if `key` is an own key of `obj`.
 *
 * @example
 * isKeyOf({ a: 1 }, "a");   // true
 * isKeyOf({ a: 1 }, "b");   // false
 * isKeyOf([10, 20], 0);     // true
 */
export function isKeyOf<T extends object>(obj: T, key: unknown): key is keyof T {
	return (
		(typeof key === "string" || typeof key === "number" || typeof key === "symbol") &&
		Object.hasOwn(obj, key)
	);
}
