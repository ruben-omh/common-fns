/**
 * Returns a NEW Map with the same keys, in the same order, and each value replaced by
 * `transform(value, key)`. Does not mutate `map`.
 *
 * @template K Key type.
 * @template V Input value type.
 * @template R Output value type.
 * @param map Source map. Not modified.
 * @param transform Called with each value and key; its result becomes the new value.
 * @returns A new `Map` with the same keys and transformed values.
 *
 * @example
 * const countsByDay = mapValues(eventsByDay, (events) => events.length);
 */
export function mapValues<K, V, R>(
	map: ReadonlyMap<K, V>,
	transform: (value: V, key: K) => R,
): Map<K, R> {
	const result = new Map<K, R>();

	for (const [key, value] of map) {
		result.set(key, transform(value, key));
	}

	return result;
}
