/**
 * Splits `array` into two arrays in a single pass: elements that satisfy `predicate` and
 * elements that do not. Order is preserved in both. Does not mutate `array`.
 *
 * When `predicate` is a type guard, the two results are narrowed to the matching and the
 * remaining types.
 *
 * @template T Element type.
 * @template S Narrowed element type when `predicate` is a type guard.
 * @param array Items to split.
 * @param predicate Called with each item and its index; decides which array the item goes to.
 * @returns A tuple `[matching, rest]`.
 *
 * @example
 * const [allDay, timed] = partition(events, (event) => event.allDay);
 */

export function partition<T, S extends T>(
	array: readonly T[],
	predicate: (item: T, index: number) => item is S,
): [matching: S[], rest: Exclude<T, S>[]];

export function partition<T>(
	array: readonly T[],
	predicate: (item: T, index: number) => boolean,
): [matching: T[], rest: T[]];

export function partition<T>(
	array: readonly T[],
	predicate: (item: T, index: number) => boolean,
): [matching: T[], rest: T[]] {
	const matching: T[] = [];
	const rest: T[] = [];

	for (let index = 0; index < array.length; index++) {
		const item = array[index];

		if (predicate(item, index)) {
			matching.push(item);
		} else {
			rest.push(item);
		}
	}

	return [matching, rest];
}
