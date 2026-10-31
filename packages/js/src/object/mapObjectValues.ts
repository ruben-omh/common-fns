import { setOwn } from "./internal";

/**
 * Returns a NEW object with the same own enumerable string keys and each value replaced by
 * `transform(value, key)`. The object version of `mapValues` for Maps.
 *
 * @template T Input object type.
 * @template R Transformed value type.
 * @param object Source object. Not modified.
 * @param transform Called with each value and key; its result becomes the new value.
 * @returns A new object with the same keys and transformed values.
 *
 * @example
 * mapObjectValues({ a: 1, b: 2 }, (n) => n * 10); // { a: 10, b: 20 }
 */
export function mapObjectValues<T extends object, R>(
	object: T,
	transform: (value: T[keyof T & string], key: keyof T & string) => R,
): { [K in keyof T]: R } {
	const result = {} as { [K in keyof T]: R };

	for (const key of Object.keys(object) as (keyof T & string)[]) {
		setOwn(result, key, transform(object[key], key));
	}

	return result;
}
