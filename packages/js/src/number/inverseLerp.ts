/**
 * The inverse of `lerp`: how far `value` is from `start` to `end`, as a fraction
 * (0 at `start`, 1 at `end`). If `start === end` there is no distance to measure, so it returns 0.
 *
 * @param start Value mapped to 0.
 * @param end Value mapped to 1.
 * @param value Value to locate between `start` and `end`.
 * @returns The fraction of the way from `start` to `end`; outside 0-1 when `value` is outside the range.
 *
 * @example
 * inverseLerp(10, 20, 12.5); // 0.25
 */
export function inverseLerp(start: number, end: number, value: number): number {
	return start === end ? 0 : (value - start) / (end - start);
}
