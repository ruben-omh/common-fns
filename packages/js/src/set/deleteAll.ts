/**
 * Removes every element of `values` from `set` IN PLACE and returns how many were removed.
 * Accepts any iterable. For a new Set instead, use the native `set.difference(other)`.
 *
 * @template T Element type.
 * @param set Set to remove from. Mutated in place.
 * @param values Iterable of elements to remove.
 * @returns How many elements were actually removed.
 *
 * @example
 * const tags = new Set(["a", "b", "c"]);
 * deleteAll(tags, ["b", "x"]); // 1
 */
export function deleteAll<T>(set: Set<T>, values: Iterable<T>): number {
	let removed = 0;

	for (const value of values) {
		if (set.delete(value)) {
			removed++;
		}
	}

	return removed;
}
