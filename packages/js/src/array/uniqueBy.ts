/**
 * Returns a new array without duplicates, comparing elements by the key `getKey` returns.
 * Keeps the FIRST occurrence of each key and preserves order. Does not mutate `array`.
 *
 * Keys are compared with SameValueZero (`NaN` equals `NaN`; objects by reference), so return
 * a primitive (id, number, string) rather than an object.
 *
 * @template T Element type.
 * @template K Key type.
 * @param array Items to deduplicate.
 * @param getKey Returns the comparison key for an item.
 * @returns A new array with one element per distinct key.
 *
 * @example
 * uniqueBy(events, (event) => event.id);
 */
export function uniqueBy<T, K>(array: readonly T[], getKey: (item: T, index: number) => K): T[] {
	const seen = new Set<K>();
	const result: T[] = [];

	for (let index = 0; index < array.length; index++) {
		const item = array[index];
		const key = getKey(item, index);

		if (!seen.has(key)) {
			seen.add(key);
			result.push(item);
		}
	}

	return result;
}
