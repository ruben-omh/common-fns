import { ownEnumerableKeys, setOwn } from "./internal";
import { isPlainObject } from "./isPlainObject";
import type { DeepPartial } from "./types";

function mergeInto(
	target: Record<PropertyKey, unknown>,
	source: object,
	path: WeakSet<object>,
): void {
	if (path.has(source)) {
		throw new TypeError("mergeDeep(): an override contains a circular reference.");
	}
	path.add(source);

	for (const key of ownEnumerableKeys(source)) {
		const value = (source as Record<PropertyKey, unknown>)[key];
		if (value === undefined) {
			continue; // `undefined` never erases a value, same as `omitUndefined`
		}

		const current = Object.hasOwn(target, key) ? target[key] : undefined;
		if (isPlainObject(value) && isPlainObject(current)) {
			const merged: Record<PropertyKey, unknown> = { ...current };
			mergeInto(merged, value, path);
			setOwn(target, key, merged);
		} else if (isPlainObject(value)) {
			const copy: Record<PropertyKey, unknown> = {};
			mergeInto(copy, value, path);
			setOwn(target, key, copy);
		} else {
			setOwn(target, key, value);
		}
	}

	path.delete(source);
}

/**
 * Returns a NEW object: `base` with each override applied in order, merging PLAIN objects
 * recursively. Nothing passed in is mutated.
 *
 * - Plain objects are merged key by key; every other value (arrays, Dates, Maps, class
 *   instances) REPLACES the previous one and is not copied.
 * - `undefined` in an override is skipped, so it never erases a default. `null` replaces.
 * - Safe against prototype pollution: a `"__proto__"` key becomes an ordinary own property.
 *
 * @template T Type of the base object.
 * @param base Base object. Not mutated; its plain-object subtrees are deep-copied.
 * @param overrides Partial objects applied in order over `base`. `undefined` entries are skipped.
 * @returns A new object with every override merged into `base`.
 * @throws {TypeError} If an override contains a circular reference.
 *
 * @example
 * mergeDeep(DEFAULT_OPTIONS, userOptions, { picker: { weekStartsOn: 1 } });
 */
export function mergeDeep<T extends object>(
	base: T,
	...overrides: readonly (DeepPartial<T> | undefined)[]
): T {
	const result: Record<PropertyKey, unknown> = {};
	const path = new WeakSet<object>();

	mergeInto(result, base, path);
	for (const override of overrides) {
		if (override !== undefined && override !== null) {
			mergeInto(result, override, path);
		}
	}

	return result as T;
}
