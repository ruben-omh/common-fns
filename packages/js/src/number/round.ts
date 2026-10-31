/**
 * Rounds `value` to `decimals` decimal places, half AWAY from zero, as people round by hand:
 * `round(1.005, 2)` is 1.01 (`toFixed` and `Math.round(x * 100) / 100` give 1.00), and
 * `round(-2.5)` is -3 (`Math.round` gives -2).
 *
 * Negative `decimals` round to tens, hundreds, and so on: `round(1234, -2)` is 1200.
 * `NaN` and the infinities are returned unchanged.
 *
 * @param value Number to round.
 * @param decimals Number of decimal places; negative values round to tens, hundreds, and so on.
 * @default decimals 0
 * @returns `value` rounded to `decimals` places.
 * @throws {RangeError} If `decimals` is not an integer from -15 to 15.
 *
 * @example
 * round(1.005, 2); // 1.01
 * round(-2.5);     // -3
 * round(1234, -2); // 1200
 */
export function round(value: number, decimals = 0): number {
	if (!Number.isInteger(decimals) || decimals < -15 || decimals > 15) {
		throw new RangeError(
			`round(): "decimals" must be an integer from -15 to 15; received ${String(decimals)}.`,
		);
	}
	if (!Number.isFinite(value)) {
		return value;
	}

	const factor = 10 ** Math.abs(decimals);
	const magnitude = Math.abs(value);
	// 1.005 is stored as 1.00499999999999989…, so 1.005 * 100 = 100.49999999999999.
	// Re-reading it at 15 significant digits (the precision a double reliably holds) restores 100.5.
	const scaled = decimals >= 0 ? magnitude * factor : magnitude / factor;

	// Fast path: re-reading at 15 digits can only change the result when `scaled` lies within
	// rounding error of a .5 boundary. Anywhere else, plain Math.round gives the same answer.
	const distanceToHalf = Math.abs(scaled - Math.floor(scaled) - 0.5);
	const rounded =
		distanceToHalf > 1e-13 * Math.max(1, scaled)
			? Math.round(scaled)
			: Math.round(Number(scaled.toPrecision(15)));
	const result = decimals >= 0 ? rounded / factor : rounded * factor;

	return value < 0 ? -result : result;
}
