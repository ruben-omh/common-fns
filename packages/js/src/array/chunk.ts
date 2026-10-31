/**
 * Splits `array` into consecutive chunks of at most `size` elements, in order.
 * The final chunk is shorter when `array.length` is not a multiple of `size`.
 * Does not mutate `array`; an empty input yields an empty array.
 *
 * @template T Element type.
 * @param array Source array. Not modified.
 * @param size Maximum length of each chunk. Must be a positive integer.
 * @returns An array of chunks, each a new array.
 * @throws {RangeError} If `size` is not a positive integer.
 *
 * @example
 * chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
 */
export function chunk<T>(array: readonly T[], size: number): T[][] {
	if (!Number.isInteger(size) || size < 1) {
		throw new RangeError(`chunk(): size must be a positive integer; received ${String(size)}.`);
	}

	const groups: T[][] = [];

	for (let index = 0; index < array.length; index += size) {
		groups.push(array.slice(index, index + size));
	}

	return groups;
}
