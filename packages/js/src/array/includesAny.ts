import { SMALL_INPUT_LIMIT } from "./internal";

/**
 * `true` if `array` contains at least one value in `values` (compared with SameValueZero).
 * An empty `values` or `array` is `false`. Switches between a linear scan and a `Set` based on
 * input size.
 *
 * @template T Element type.
 * @param array Array to search.
 * @param values Values to look for.
 * @returns `true` if any value in `values` is found in `array`.
 *
 * @example
 * includesAny([1, 2, 3], [9, 2]); // true
 * includesAny([1, 2, 3], [9, 8]); // false
 */
export function includesAny<T>(array: readonly T[], values: readonly T[]): boolean {
	if (values.length === 0 || array.length === 0) {
		return false;
	}

	// Small inputs: a nested scan beats the cost of building a Set.
	if (array.length * values.length <= SMALL_INPUT_LIMIT) {
		return values.some((value) => array.includes(value));
	}

	const lookup = new Set(array);
	return values.some((value) => lookup.has(value));
}
