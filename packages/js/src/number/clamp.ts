/**
 * Constrains a number to an inclusive `[min, max]` range.
 *
 * Where `isWithinBounds` reports whether a value fits, this corrects one that
 * does not - the operation a cursor needs when navigation would step past the
 * first or last selectable unit.
 *
 * `NaN` propagates: clamping it returns `NaN` rather than a bound, since there
 * is no meaningful position to snap it to.
 *
 * @param value Value to constrain.
 * @param min Lower bound, returned when `value` falls below it.
 * @param max Upper bound, returned when `value` rises above it.
 * @returns `value` when it already sits within the range, otherwise the nearer bound.
 * @throws {RangeError} When `min` is greater than `max`, which leaves no valid result.
 *
 * @example
 * ```ts
 * clamp(5, 0, 10);   // 5
 * clamp(-3, 0, 10);  // 0
 * clamp(42, 0, 10);  // 10
 * ```
 */
export function clamp(value: number, min: number, max: number): number {
	if (min > max) {
		throw new RangeError(`clamp(): min (${min}) cannot be greater than max (${max}).`);
	}

	return Math.min(Math.max(value, min), max);
}
