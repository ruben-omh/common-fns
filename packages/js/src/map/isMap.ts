import { objectToString } from "../internal";
import { mapHas } from "./internal";

/**
 * Type guard: `true` if `value` is a `Map`, including Maps from other realms (e.g. another
 * iframe). Uses a branded internal-slot check, so a plain object shaped like a Map does not pass.
 *
 * @param value Value to test.
 * @returns `true` if `value` is a `Map`.
 *
 * @example
 * isMap(new Map());          // true
 * isMap({ get() {}, set() {} }); // false
 */
export function isMap(value: unknown): value is Map<unknown, unknown> {
	if (value === null || typeof value !== "object") {
		return false;
	}
	if (!(value instanceof Map) && objectToString.call(value) !== "[object Map]") {
		return false;
	}

	try {
		mapHas.call(value, value);
		return true;
	} catch {
		return false;
	}
}
