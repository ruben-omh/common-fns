/**
 * `true` if `min <= value <= max` (both ends inclusive). `NaN` is never in range.
 * The check that pairs with `clamp`.
 *
 * @param value Value to test.
 * @param min Lower bound, inclusive.
 * @param max Upper bound, inclusive.
 * @returns `true` if `value` lies within `[min, max]`.
 * @throws {RangeError} If `min` is greater than `max`, or either is `NaN`.
 *
 * @example
 * inRange(5, 0, 10);  // true
 * inRange(10, 0, 10); // true
 * inRange(11, 0, 10); // false
 */
export function inRange(value: number, min: number, max: number): boolean {
	if (Number.isNaN(min) || Number.isNaN(max)) {
		throw new RangeError(
			`inRange(): "min" and "max" must not be NaN; received ${String(min)} and ${String(max)}.`,
		);
	}

	if (min > max) {
		throw new RangeError(
			`inRange(): "min" (${String(min)}) must be less than or equal to "max" (${String(max)}).`,
		);
	}

	return value >= min && value <= max;
}
