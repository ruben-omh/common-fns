import { isNumber } from "../../number/isNumber";
import type { DayOfWeek } from "../types";

function isDayOfWeek(value: unknown): value is DayOfWeek {
	return isNumber(value) && Number.isInteger(value) && value >= 0 && value <= 6;
}

export function assertDayOfWeek(
	value: number,
	caller: string,
	name: string,
): asserts value is DayOfWeek {
	if (!isDayOfWeek(value)) {
		throw new RangeError(
			`${caller}(): "${name}" must be an integer from 0 (Sunday) to 6 (Saturday); received ${String(value)}.`,
		);
	}
}
