import { isMap } from "../map/isMap";
import { isNullOrUndefined } from "./isNullOrUndefined";
import { isPlainObject } from "../object/isPlainObject";
import { isSet } from "../set/isSet";
import { isString } from "../string/isString";

function hasOwnEnumerableKey(object: object): boolean {
	for (const key in object) {
		if (Object.hasOwn(object, key)) {
			return true;
		}
	}
	return false;
}

/**
 * `true` if `value` is "empty": `null` or `undefined`, an empty string, an empty array, an empty
 * Map or Set, or a plain object with no own enumerable keys. Other values (numbers, booleans,
 * functions, class instances, Dates) are never empty, since they are not containers.
 *
 * @param value Value to test.
 * @returns `true` if `value` is considered empty.
 *
 * @example
 * isEmpty("");        // true
 * isEmpty([]);        // true
 * isEmpty({});        // true
 * isEmpty(new Map()); // true
 * isEmpty(0);         // false
 */
export function isEmpty(value: unknown): boolean {
	if (isNullOrUndefined(value)) {
		return true;
	}

	if (isString(value)) {
		return value.length === 0;
	}

	// Primitives (number, boolean, bigint, symbol) and functions are values,
	// not containers, so there is nothing to measure.
	if (typeof value !== "object") {
		return false;
	}

	if (Array.isArray(value)) {
		return value.length === 0;
	}

	if (isMap(value) || isSet(value)) {
		return value.size === 0;
	}

	if (isPlainObject(value)) {
		return !hasOwnEnumerableKey(value);
	}

	return false;
}
