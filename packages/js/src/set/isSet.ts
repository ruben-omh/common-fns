import { objectToString } from "../internal";
import { setHas } from "./internal";

/**
 * Type guard: `true` if `value` is a `Set`, including Sets from other realms (e.g. another
 * iframe). Uses a branded internal-slot check, so a plain object shaped like a Set does not pass.
 *
 * @param value Value to test.
 * @returns `true` if `value` is a `Set`.
 *
 * @example
 * isSet(new Set()); // true
 * isSet([1, 2, 3]); // false
 */
export function isSet(value: unknown): value is Set<unknown> {
	if (value === null || typeof value !== "object") {
		return false;
	}

	if (!(value instanceof Set) && objectToString.call(value) !== "[object Set]") {
		return false;
	}

	try {
		setHas.call(value, value);
		return true;
	} catch {
		return false;
	}
}
