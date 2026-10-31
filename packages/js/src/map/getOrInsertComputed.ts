/**
 * Returns `map.get(key)`, or, if `key` is missing, calls `compute(key)`, stores the result
 * and returns it. Never overwrites an existing value, even `undefined`.
 *
 * Mirrors the TC39 proposal `Map.prototype.getOrInsertComputed`, so calls can move to the
 * native method once it ships everywhere. Works with `WeakMap` too.
 *
 * @template K Key type.
 * @template V Value type.
 * @param map Map (or WeakMap) to read and, on a miss, write.
 * @param key Key to look up.
 * @param compute Called with `key` only when it is missing; its result is stored and returned.
 * @returns The existing value for `key`, or the newly computed and stored one.
 *
 * @example
 * // Group events by day without the "get, check, set" dance:
 * for (const event of events) {
 *   getOrInsertComputed(eventsByDay, getDayNumber(event.start), () => []).push(event);
 * }
 */
export function getOrInsertComputed<K, V>(
	map: Map<K, V> | (K extends WeakKey ? WeakMap<K, V> : never),
	key: K,
	compute: (key: K) => V,
): V {
	// `has` (not `get(key) !== undefined`) so a stored `undefined` counts as present.
	if (map.has(key)) {
		return map.get(key) as V;
	}

	const value = compute(key);
	map.set(key, value);
	return value;
}
