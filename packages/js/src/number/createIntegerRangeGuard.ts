import type { IntegerRange } from "./types";

/**
 * Returns a type guard that accepts integers from `min` to `max` inclusive, and nothing else:
 * no fractions, no `NaN`/`Infinity`, no numeric strings, no `Number` objects.
 * The bounds are validated once, here; each check is then three comparisons.
 *
 * When `min` and `max` are literal integers from 0 to 999, the guard narrows to the exact union.
 *
 * @template Min Lower-bound type (inferred as a literal from a `const`-typed argument).
 * @template Max Upper-bound type.
 * @param min Smallest accepted integer, inclusive.
 * @param max Largest accepted integer, inclusive.
 * @returns A type guard narrowing an `unknown` value to `IntegerRange<Min, Max>`.
 * @throws {RangeError} If `min` or `max` is not a safe integer, or `min` is greater than `max`.
 *
 * @example
 * export const isWeekdayIndex = createIntegerRangeGuard(0, 6);
 * export type WeekdayIndex = IntegerRange<0, 6>; // 0 | 1 | 2 | 3 | 4 | 5 | 6
 *
 * if (isWeekdayIndex(value)) {
 *   value; // 0 | 1 | 2 | 3 | 4 | 5 | 6
 * }
 */
export function createIntegerRangeGuard<const Min extends number, const Max extends number>(
	min: Min,
	max: Max,
): (value: unknown) => value is IntegerRange<Min, Max> {
	if (!Number.isSafeInteger(min) || !Number.isSafeInteger(max)) {
		throw new RangeError(
			`createIntegerRangeGuard(): "min" and "max" must be safe integers; received ${String(min)} and ${String(max)}.`,
		);
	}
	if (min > max) {
		throw new RangeError(
			`createIntegerRangeGuard(): "min" (${min}) must not be greater than "max" (${max}).`,
		);
	}

	return (value: unknown): value is IntegerRange<Min, Max> =>
		typeof value === "number" && Number.isInteger(value) && value >= min && value <= max;
}
