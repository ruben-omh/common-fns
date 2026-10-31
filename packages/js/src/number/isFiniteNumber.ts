/**
 * Type guard: `true` if `value` is a finite primitive `number` (not `NaN` and not an infinity),
 * as reported by `Number.isFinite`. Numeric strings are rejected.
 *
 * @param value Value to test.
 * @returns `true` if `value` is a finite number.
 *
 * @example
 * isFiniteNumber(42);       // true
 * isFiniteNumber(Infinity); // false
 * isFiniteNumber("42");     // false
 */
export function isFiniteNumber(value: unknown): value is number | bigint {
	return Number.isFinite(value);
}
