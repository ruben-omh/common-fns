/**
 * Mathematical modulo: the result always has the sign of `divisor`, unlike `%`, which keeps the
 * sign of `dividend`. Use it to wrap values around a cycle:
 * `mod(-1, 7)` is 6 (`-1 % 7` gives -1), e.g. "the weekday before Sunday (0) is Saturday (6)".
 *
 * @param dividend Value to wrap.
 * @param divisor Cycle length. Must be finite and non-zero.
 * @returns `dividend` modulo `divisor`, carrying the sign of `divisor`.
 * @throws {RangeError} If `divisor` is 0 or not finite.
 *
 * @example
 * mod(-1, 7); // 6
 * mod(8, 7);  // 1
 */
export function mod(dividend: number, divisor: number): number {
	if (divisor === 0 || !Number.isFinite(divisor)) {
		throw new RangeError(
			`mod(): "divisor" must be a finite, non-zero number; received ${String(divisor)}.`,
		);
	}

	const remainder = dividend % divisor;
	// `+ 0` turns -0 into 0.
	return (remainder !== 0 && remainder < 0 !== divisor < 0 ? remainder + divisor : remainder) + 0;
}
