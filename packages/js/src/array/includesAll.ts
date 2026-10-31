import { SMALL_INPUT_LIMIT } from "./internal";

/**
 * `true` if `array` contains every value in `values` (compared with SameValueZero).
 * An empty `values` is vacuously `true`. Switches between a linear scan and a `Set` based on
 * input size, so large inputs stay fast without the caller choosing a strategy.
 *
 * @template T Element type.
 * @param array Array to search.
 * @param values Values that must all be present.
 * @returns `true` if every value in `values` is found in `array`.
 *
 * @example
 * includesAll([1, 2, 3], [1, 3]); // true
 * includesAll([1, 2, 3], [1, 4]); // false
 */
export function includesAll<T>(array: readonly T[], values: readonly T[]): boolean {
	if (values.length === 0) {
		return true;
	}

	if (array.length === 0) {
		return false;
	}

	if (array.length * values.length <= SMALL_INPUT_LIMIT) {
		return values.every((value) => array.includes(value));
	}

	const lookup = new Set(array);
	return values.every((value) => lookup.has(value));
}
