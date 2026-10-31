import { getDayNumber } from "./getDayNumber";
import type { DateBounds } from "./types";

/** The bound `date`'s day falls outside of, or `undefined` if it's within bounds. */
function getExceededBound(day: number, bounds: DateBounds): Date | undefined {
	const { min, max } = bounds;

	if (min !== undefined && day < getDayNumber(min)) {
		return min;
	}

	if (max !== undefined && day > getDayNumber(max)) {
		return max;
	}

	return undefined;
}

/**
 * Returns a NEW Date moved into `bounds` by CALENDAR DAY (local time), keeping its time of day:
 * - day before `min` → `min`'s day
 * - day after `max`  → `max`'s day
 * - otherwise        → an unchanged copy
 *
 * A missing `min` / `max` means no limit on that side. An Invalid Date returns an Invalid Date.
 * Assumes valid bounds (see `assertValidBounds`).
 *
 * @param date Date to clamp. Not modified.
 * @param bounds Inclusive `min` / `max` day bounds; either side may be omitted.
 * @returns A new Date within `bounds`, keeping `date`'s time of day.
 *
 * @example
 * // bounds: 2026-01-01 to 2026-12-31
 * clampToBounds(new Date(2027, 2, 15, 10, 30), bounds); // 2026-12-31 10:30
 */
export function clampToBounds(date: Date, bounds: DateBounds): Date {
	const result = new Date(date.getTime());
	const exceededBound = getExceededBound(getDayNumber(date), bounds);

	if (exceededBound !== undefined) {
		result.setFullYear(
			exceededBound.getFullYear(),
			exceededBound.getMonth(),
			exceededBound.getDate(),
		);
	}

	return result;
}
