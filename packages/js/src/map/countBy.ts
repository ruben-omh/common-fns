/**
 * Counts the elements of `items` per key. Keys are compared with SameValueZero, so return a
 * primitive. The Map keeps keys in order of first appearance.
 *
 * Accepts any iterable (arrays, Sets, Map values, generators) without copying it to an array.
 *
 * @template T Element type.
 * @template K Key type.
 * @param items Iterable of elements to count.
 * @param getKey Returns the grouping key for an element.
 * @returns A `Map` from key to the number of elements with that key.
 *
 * @example
 * const eventsPerDay = countBy(events, (event) => getDayNumber(event.start));
 * eventsPerDay.get(20261028); // 4
 */
export function countBy<T, K>(items: Iterable<T>, getKey: (item: T) => K): Map<K, number> {
	const counts = new Map<K, number>();

	for (const item of items) {
		const key = getKey(item);
		counts.set(key, (counts.get(key) ?? 0) + 1);
	}

	return counts;
}
