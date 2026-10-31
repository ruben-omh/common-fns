import type { SearchComparator } from "./types";

/**
 * Finds the index where `target` belongs in `sorted` to keep it ordered: the first index whose
 * element does NOT sort before `target` (a lower bound). Returns `sorted.length` when `target`
 * sorts after every element. Runs in O(log n); `sorted` must already be ordered by `compare`.
 *
 * @template T Element type of `sorted`.
 * @template U Type of the search target.
 * @param sorted Array already sorted by `compare`.
 * @param target Value to locate.
 * @param compare Returns negative if the element sorts before `target`, 0 if equal, positive if after.
 * @returns An insertion index in the range `[0, sorted.length]`.
 *
 * @example
 * findInsertionIndex([10, 20, 30], 25, (a, b) => a - b); // 2
 */
export function findInsertionIndex<T, U>(
	sorted: readonly T[],
	target: U,
	compare: SearchComparator<T, U>,
): number {
	let low = 0;
	let high = sorted.length;

	while (low < high) {
		const middle = (low + high) >>> 1;
		if (compare(sorted[middle], target) < 0) {
			low = middle + 1;
		} else {
			high = middle;
		}
	}

	return low;
}

/**
 * Returns the index of `target` in `sorted`, or -1 if it is absent, using binary search in
 * O(log n). `sorted` must already be ordered by `compare`. When several elements compare equal
 * to `target`, which matching index is returned is unspecified.
 *
 * @template T Element type of `sorted`.
 * @template U Type of the search target.
 * @param sorted Array already sorted by `compare`.
 * @param target Value to find.
 * @param compare Returns negative if the element sorts before `target`, 0 if equal, positive if after.
 * @returns The index of a matching element, or -1 if none matches.
 *
 * @example
 * binarySearch([10, 20, 30], 20, (a, b) => a - b); // 1
 * binarySearch([10, 20, 30], 25, (a, b) => a - b); // -1
 */
export function binarySearch<T, U>(
	sorted: readonly T[],
	target: U,
	compare: SearchComparator<T, U>,
): number {
	const index = findInsertionIndex(sorted, target, compare);
	return index < sorted.length && compare(sorted[index], target) === 0 ? index : -1;
}
