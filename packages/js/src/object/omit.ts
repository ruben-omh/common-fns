import { ownEnumerableKeys, setOwn } from "./internal";

/** Above this many keys, a Set lookup beats `Array#includes`. */
const SET_LOOKUP_THRESHOLD = 8;

/**
 * Returns a NEW object with every own enumerable property of `object` (string and symbol keys,
 * like `{ ...object }`) except the listed keys.
 *
 * @template T Input object type.
 * @template K Keys to remove.
 * @param object Source object. Not modified.
 * @param keys Keys to leave out of the result.
 * @returns A new object without the listed keys.
 *
 * @example
 * omit(event, ["internalId"]);
 */
export function omit<T extends object, K extends keyof T>(
	object: T,
	keys: readonly K[],
): Omit<T, K> {
	const omitted: { has(key: PropertyKey): boolean } =
		keys.length > SET_LOOKUP_THRESHOLD
			? new Set<PropertyKey>(keys)
			: { has: (key) => keys.includes(key as K) };
	const result = {} as Omit<T, K>;

	for (const key of ownEnumerableKeys(object)) {
		if (!omitted.has(key)) {
			setOwn(result, key, (object as Record<PropertyKey, unknown>)[key]);
		}
	}

	return result;
}
