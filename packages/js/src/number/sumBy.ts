/**
 * Adds `getValue(item)` over each item with compensated (Neumaier) summation, without building
 * an intermediate array. The keyed form of `sum`.
 *
 * @template T Element type.
 * @param items Iterable of items to sum over.
 * @param getValue Returns the number to add for an item.
 * @returns The compensated sum, or 0 for an empty input.
 *
 * @example
 * sumBy(events, (event) => event.durationMinutes);
 */
export function sumBy<T>(items: Iterable<T>, getValue: (item: T) => number): number {
	let total = 0;
	let compensation = 0;

	for (const item of items) {
		const value = getValue(item);
		const next = total + value;
		compensation +=
			Math.abs(total) >= Math.abs(value) ? total - next + value : value - next + total;
		total = next;
	}

	return Number.isFinite(total) ? total + compensation : total;
}
