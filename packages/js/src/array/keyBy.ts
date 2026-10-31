/**
 * Indexes `array` into a `Map` keyed by `getKey(item, index)`. When two items produce the
 * same key, the LAST one wins. Keys keep their insertion order.
 *
 * @template T Element type.
 * @template K Key type.
 * @param array Items to index.
 * @param getKey Returns the key for an item.
 * @returns A `Map` from key to the item that produced it.
 *
 * @example
 * const byId = keyBy(users, (user) => user.id);
 * byId.get(42); // the user with id 42
 */
export function keyBy<T, K>(array: readonly T[], getKey: (item: T, index: number) => K): Map<K, T> {
	const map = new Map<K, T>();

	for (let index = 0; index < array.length; index++) {
		const item = array[index];
		map.set(getKey(item, index), item);
	}

	return map;
}
