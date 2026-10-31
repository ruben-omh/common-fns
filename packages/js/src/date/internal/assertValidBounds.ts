import type { DateBounds } from "../types";

/**
 * Throws if `bounds` can never match anything: a bound that is an Invalid Date, or
 * `min` after `max`. Call it once where bounds are created (e.g. the `DateCursor`
 * constructor), not on every check.
 *
 * @param caller Name used in the error message, e.g. "DateCursor".
 * @throws {RangeError} If a bound is an Invalid Date, or `min` is after `max`.
 */
export function assertValidBounds(bounds: DateBounds, caller: string): void {
	const { min, max } = bounds;

	if (min !== undefined && Number.isNaN(min.getTime())) {
		throw new RangeError(`${caller}(): "bounds.min" is an Invalid Date.`);
	}
	if (max !== undefined && Number.isNaN(max.getTime())) {
		throw new RangeError(`${caller}(): "bounds.max" is an Invalid Date.`);
	}
	if (min !== undefined && max !== undefined && min.getTime() > max.getTime()) {
		throw new RangeError(
			`${caller}(): "bounds.min" (${min.toISOString()}) is after "bounds.max" (${max.toISOString()}).`,
		);
	}
}
