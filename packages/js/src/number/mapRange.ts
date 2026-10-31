import { inverseLerp } from "./inverseLerp";
import { lerp } from "./lerp";
import type { MapRangeOptions } from "./types";

/**
 * Converts `value` from one range to another, e.g. a data value to a pixel position on a chart,
 * or a scroll position to a progress percentage. Ranges may be reversed (`outStart > outEnd`).
 * If the input range is empty (`inStart === inEnd`, e.g. all chart values are equal), returns `outStart`.
 *
 * @param value Value in the input range.
 * @param inStart Start of the input range.
 * @param inEnd End of the input range.
 * @param outStart Start of the output range.
 * @param outEnd End of the output range.
 * @param options Set `clamp: true` to limit the result to the output range. See `MapRangeOptions`.
 * @returns `value` remapped into the output range.
 *
 * @example
 * mapRange(75, 0, 100, 0, 400);                   // 300
 * mapRange(150, 0, 100, 0, 400, { clamp: true }); // 400
 */
export function mapRange(
	value: number,
	inStart: number,
	inEnd: number,
	outStart: number,
	outEnd: number,
	options: MapRangeOptions = {},
): number {
	let t = inverseLerp(inStart, inEnd, value);

	if (options.clamp === true) {
		t = t < 0 ? 0 : t > 1 ? 1 : t; // NOSONAR
	}

	return lerp(outStart, outEnd, t);
}
