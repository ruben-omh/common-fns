/**
 * Inserts `item` into the already-sorted `sorted` array IN PLACE, keeping it ordered, and
 * returns the index where `item` landed. Equal elements are placed AFTER existing ones
 * (stable). Binary search finds the position in O(log n), though the splice itself is O(n).
 *
 * @template T Element type.
 * @param sorted Array already sorted by `compare`. Mutated in place.
 * @param item Value to insert.
 * @param compare Returns negative if `a` sorts before `b`, 0 if equal, positive if after.
 * @returns The index at which `item` was inserted.
 *
 * @example
 * const xs = [1, 3, 5];
 * insertSorted(xs, 4, (a, b) => a - b); // 2, and xs is now [1, 3, 4, 5]
 */
export function insertSorted<T>(sorted: T[], item: T, compare: (a: T, b: T) => number): number {
	let low = 0;
	let high = sorted.length;

	while (low < high) {
		const middle = (low + high) >>> 1;

		// `<= 0` moves past equal elements, so `item` lands after them (stable).
		if (compare(sorted[middle], item) <= 0) {
			low = middle + 1;
		} else {
			high = middle;
		}
	}

	sorted.splice(low, 0, item);
	return low;
}
