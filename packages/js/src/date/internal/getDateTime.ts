import { objectToString } from "../../internal";
import { dateGetTime } from "./constants";

export function getDateTime(value: unknown): number | undefined {
	if (typeof value !== "object" || value === null) return undefined;

	if (!(value instanceof Date) && objectToString.call(value) !== "[object Date]") {
		return undefined;
	}

	try {
		return dateGetTime.call(value);
	} catch {
		return undefined;
	}
}
