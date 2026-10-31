/**
 * Compares an array element against the search target, for `binarySearch` and `findInsertionIndex`.
 * Must return a negative number if `item` sorts before `target`, 0 if equal, positive if after.
 *
 * @template T Element type of the array being searched.
 * @template U Type of the search target.
 */
export type SearchComparator<T, U> = (item: T, target: U) => number;
