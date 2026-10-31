/**
 * Linear interpolation: the value `t` of the way from `start` to `end`.
 * `t = 0` returns exactly `start` and `t = 1` exactly `end` (the shorter
 * `start + (end - start) * t` can miss `end` by a rounding error). `t` outside 0-1 extrapolates.
 *
 * @param start Value returned at `t = 0`.
 * @param end Value returned at `t = 1`.
 * @param t Interpolation fraction; 0 to 1 interpolates, outside that range extrapolates.
 * @returns The interpolated value.
 *
 * @example
 * lerp(10, 20, 0.25); // 12.5
 */
export function lerp(start: number, end: number, t: number): number {
	return (1 - t) * start + t * end;
}
