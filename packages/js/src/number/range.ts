import { isNumber } from "./isNumber";

/**
 * Builds an array of numbers from `start` up to (but not including) `end`.
 *
 * The end is exclusive, which makes the common cases read naturally:
 * `range(0, 24)` is every hour of a day, `range(0, 60, 15)` every quarter hour.
 * A negative `step` counts down instead.
 *
 * Each entry is computed as `start + i * step` rather than by repeated addition,
 * so a fractional step does not accumulate floating-point drift across the array.
 *
 * @param start First value in the sequence.
 * @param end Exclusive upper bound (lower bound when `step` is negative).
 * @param step Distance between consecutive values. Defaults to `1`.
 * @returns The sequence, or an empty array when `step` points away from `end`.
 * @throws {RangeError} When `step` is `0`, or any argument is not a finite number.
 *
 * @example
 * ```ts
 * range(0, 5);        // [0, 1, 2, 3, 4]
 * range(0, 60, 15);   // [0, 15, 30, 45]
 * range(2030, 2020, -2); // [2030, 2028, 2026, 2024, 2022]
 * range(5, 5);        // []
 * ```
 */
export function range(start: number, end: number, step = 1): number[] {
	if (!isNumber(start) || !isNumber(end) || !isNumber(step)) {
		throw new RangeError(`range(): start, end, and step must be finite numbers.`);
	}

	if (step === 0) {
		throw new RangeError(`range(): step cannot be 0, the sequence would never reach ${end}.`);
	}

	// A step pointing away from `end` yields a negative length, which floors to an
	// empty array rather than looping forever.
	const length = Math.max(0, Math.ceil((end - start) / step));

	return Array.from({ length }, (_, index) => start + index * step);
}
