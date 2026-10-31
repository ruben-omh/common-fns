import { getDateTime } from "./internal";

/**
 * Type guard: `true` if `value` is a `Date` whose time value is not `NaN` (a real, usable date).
 * Works across realms. Unlike `isDate`, an Invalid Date returns `false`.
 *
 * @param value Value to test.
 * @returns `true` if `value` is a valid `Date`.
 *
 * @example
 * isValidDate(new Date(2026, 9, 28)); // true
 * isValidDate(new Date("nope"));      // false
 */
export function isValidDate(value: unknown): value is Date {
	const time = getDateTime(value);
	return time !== undefined && !Number.isNaN(time);
}
