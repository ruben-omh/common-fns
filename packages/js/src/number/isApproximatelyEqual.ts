import type { ApproximateEqualityOptions } from "./types";

/**
 * `true` if `a` and `b` are equal up to floating-point error, e.g. `0.1 + 0.2` and `0.3`.
 * Same rule as Python's `math.isclose`: `|a - b| <= max(relativeTolerance * max(|a|, |b|),
 * absoluteTolerance)`. `NaN` is never equal to anything; infinities are equal only to themselves.
 *
 * @param a First value.
 * @param b Second value.
 * @param options Tolerances to apply. See `ApproximateEqualityOptions` for the defaults.
 * @returns `true` if `a` and `b` are within tolerance of each other.
 * @throws {RangeError} If a tolerance is negative or `NaN`.
 *
 * @example
 * isApproximatelyEqual(0.1 + 0.2, 0.3); // true
 * isApproximatelyEqual(1, 1.000001, { relativeTolerance: 1e-3 }); // true
 */
export function isApproximatelyEqual(
	a: number,
	b: number,
	options: ApproximateEqualityOptions = {},
): boolean {
	const { relativeTolerance = 1e-9, absoluteTolerance = 0 } = options;
	if (Number.isNaN(relativeTolerance) || Number.isNaN(absoluteTolerance)) {
		throw new RangeError("isApproximatelyEqual(): tolerances must not be NaN.");
	}

	if (relativeTolerance < 0 || absoluteTolerance < 0) {
		throw new RangeError(
			`isApproximatelyEqual(): tolerances must not be negative; received relativeTolerance ${String(relativeTolerance)} and absoluteTolerance ${String(absoluteTolerance)}.`,
		);
	}

	if (a === b) {
		return true; // also covers equal infinities
	}

	if (!Number.isFinite(a) || !Number.isFinite(b)) {
		return false;
	}

	const difference = Math.abs(a - b);
	return (
		difference <=
		Math.max(relativeTolerance * Math.max(Math.abs(a), Math.abs(b)), absoluteTolerance)
	);
}
