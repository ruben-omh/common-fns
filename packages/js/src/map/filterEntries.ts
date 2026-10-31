/**
 * Returns a NEW Map with only the entries for which `predicate(value, key)` is true,
 * in their original order. Does not mutate `map`. A type-guard predicate narrows the values.
 *
 * @template K Key type.
 * @template V Value type.
 * @template S Narrowed value type when `predicate` is a type guard.
 * @param map Source map. Not modified.
 * @param predicate Called with each value and key; entries for which it returns `true` are kept.
 * @returns A new `Map` with the matching entries.
 *
 * @example
 * const busyDays = filterEntries(eventsByDay, (events) => events.length > 3);
 */
export function filterEntries<K, V, S extends V>(
	map: ReadonlyMap<K, V>,
	predicate: (value: V, key: K) => value is S,
): Map<K, S>;
export function filterEntries<K, V>(
	map: ReadonlyMap<K, V>,
	predicate: (value: V, key: K) => boolean,
): Map<K, V>;
export function filterEntries<K, V>(
	map: ReadonlyMap<K, V>,
	predicate: (value: V, key: K) => boolean,
): Map<K, V> {
	const result = new Map<K, V>();

	for (const [key, value] of map) {
		if (predicate(value, key)) {
			result.set(key, value);
		}
	}

	return result;
}
