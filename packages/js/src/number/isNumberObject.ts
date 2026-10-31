import { objectToString } from "../internal";
import { numberValueOf } from "./internal";

/**
 * Type guard: `true` if `value` is a boxed `Number` object (`new Number(5)`), NOT a primitive
 * number. Works across realms via a branded internal-slot check. Boxed primitives are rare;
 * reach for `isNumber` unless you specifically need to detect wrapper objects.
 *
 * @param value Value to test.
 * @returns `true` if `value` is a `Number` wrapper object.
 *
 * @example
 * isNumberObject(new Number(5)); // true
 * isNumberObject(5);             // false
 */
// * Boxed Number is the intended target type, not a typo for `number`.
// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types -- boxed Number is the deliberate guard target
export function isNumberObject(value: unknown): value is Number {
	// NOSONAR
	if (typeof value !== "object" || value === null) {
		return false;
	}

	// * `instanceof` is only a same-realm fast path; `objectToString` covers other realms,
	// * and `numberValueOf` below is the real brand check.
	if (!(value instanceof Number) && objectToString.call(value) !== "[object Number]") {
		// NOSONAR
		return false;
	}

	try {
		numberValueOf.call(value);
		return true;
	} catch {
		return false;
	}
}
