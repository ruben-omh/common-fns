import { objectToString } from "../internal";
import { PROBE_KEY, weakMapHas } from "./internal";

/**
 * Type guard: `true` if `value` is a `WeakMap`, including WeakMaps from other realms (e.g.
 * another iframe). Uses a branded internal-slot check, so a look-alike object does not pass.
 *
 * @param value Value to test.
 * @returns `true` if `value` is a `WeakMap`.
 *
 * @example
 * isWeakMap(new WeakMap()); // true
 * isWeakMap(new Map());     // false
 */
export function isWeakMap(value: unknown): value is WeakMap<object, unknown> {
	if (value === null || typeof value !== "object") {
		return false;
	}
	if (!(value instanceof WeakMap) && objectToString.call(value) !== "[object WeakMap]") {
		return false;
	}

	try {
		weakMapHas.call(value, PROBE_KEY);
		return true;
	} catch {
		return false;
	}
}
