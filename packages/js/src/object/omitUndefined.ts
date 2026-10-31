import { ownEnumerableKeys, setOwn } from "./internal";
import type { OmitUndefined } from "./types";

/**
 * Returns a NEW object without the properties whose value is `undefined`.
 *
 * Use it before spreading options over defaults: `{ ...defaults, ...options }` lets
 * `{ locale: undefined }` ERASE the default locale; `{ ...defaults, ...omitUndefined(options) }` doesn't.
 * `null` is kept, since it usually means "explicitly none".
 *
 * @template T Input object type.
 * @param object Source object. Not modified.
 * @returns A new object without the `undefined`-valued properties, with those keys made optional.
 *
 * @example
 * omitUndefined({ locale: "es-MX", order: undefined }); // { locale: "es-MX" }
 */
export function omitUndefined<T extends object>(object: T): OmitUndefined<T> {
	const result = {} as OmitUndefined<T>;

	for (const key of ownEnumerableKeys(object)) {
		const value = (object as Record<PropertyKey, unknown>)[key];
		if (value !== undefined) {
			setOwn(result, key, value);
		}
	}

	return result;
}
