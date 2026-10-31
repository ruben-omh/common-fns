/**
 * Adds numbers with compensated (Neumaier) summation, which removes most floating-point error:
 * `sum([0.1, 0.2, 0.3])` is 0.6 (a plain loop gives 0.6000000000000001). Errors no longer grow
 * with the number of values, which matters for totals over thousands of items.
 *
 * Accepts any iterable. An empty input sums to 0. `NaN` or an infinity in the input gives the
 * same result as a plain loop.
 *
 * @param values Iterable of numbers to add.
 * @returns The compensated sum, or 0 for an empty input.
 *
 * @example
 * sum([0.1, 0.2, 0.3]); // 0.6
 */
export function sum(values: Iterable<number>): number {
	let total = 0;
	let compensation = 0; // the low-order bits lost by each addition

	for (const value of values) {
		const next = total + value;
		compensation +=
			Math.abs(total) >= Math.abs(value) ? total - next + value : value - next + total;
		total = next;
	}

	// With an infinite total the compensation is NaN (Infinity - Infinity); the plain total is right.
	return Number.isFinite(total) ? total + compensation : total;
}
