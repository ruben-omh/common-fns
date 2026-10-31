import { setOwn } from "./internal";

/**
 * Returns a NEW object with only the listed keys of `object`. Only OWN properties are copied
 * (inherited ones are ignored), and a key that is missing stays missing (not `undefined`).
 *
 * @template T Input object type.
 * @template K Keys to keep.
 * @param object Source object. Not modified.
 * @param keys Keys to copy into the result.
 * @returns A new object with only the listed keys that `object` actually has.
 *
 * @example
 * pick(options, ["locale", "weekStartsOn"]);
 */
export function pick<T extends object, K extends keyof T>(
	object: T,
	keys: readonly K[],
): Pick<T, K> {
	const result = {} as Pick<T, K>;

	for (const key of keys) {
		if (Object.hasOwn(object, key)) {
			setOwn(result, key, object[key]);
		}
	}

	return result;
}
