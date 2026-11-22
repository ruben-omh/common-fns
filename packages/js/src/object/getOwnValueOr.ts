import { isKeyOf } from "./isKeyOf";

/**
 * Returns `obj[key]` when `key` is an OWN property key of `obj`, otherwise `fallback`.
 * Inherited (prototype-chain) keys are not matched, so a lookup with a key such as
 * `"toString"` or `"__proto__"` yields `fallback` rather than a built-in member - which
 * makes this safe for keys coming from untrusted input.
 *
 * A key that exists but holds `undefined` returns that `undefined`, not `fallback`.
 *
 * @template T Object to read from.
 * @template TFallback Type returned when `key` is not an own key of `obj`.
 * @param obj Object to read from.
 * @param key Candidate key, of unknown type.
 * @param fallback Value returned when `key` is not an own key of `obj`.
 * @returns The value at `key`, or `fallback`.
 *
 * @example
 * getOwnValueOr({ a: 1 }, "a", 0);           // 1
 * getOwnValueOr({ a: 1 }, "b", 0);           // 0
 * getOwnValueOr({ a: undefined }, "a", 0);   // undefined (the key exists)
 * getOwnValueOr({}, "toString", null);       // null (inherited keys do not match)
 */
export function getOwnValueOr<T extends object, TFallback>(
	obj: T,
	key: unknown,
	fallback: TFallback,
): T[keyof T] | TFallback {
	return isKeyOf(obj, key) ? obj[key] : fallback;
}
