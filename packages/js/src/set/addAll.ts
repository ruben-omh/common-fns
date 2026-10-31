/**
 * Adds every element of `values` to `set` IN PLACE and returns how many were new.
 * Accepts any iterable. For a new Set instead, use the native `set.union(other)`.
 *
 * @template T Element type.
 * @param set Set to add to. Mutated in place.
 * @param values Iterable of elements to add.
 * @returns How many elements were not already present.
 *
 * @example
 * const tags = new Set(["a"]);
 * addAll(tags, ["a", "b", "c"]); // 2
 */
export function addAll<T>(set: Set<T>, values: Iterable<T>): number {
	const sizeBefore = set.size;

	for (const value of values) {
		set.add(value);
	}

	return set.size - sizeBefore;
}
