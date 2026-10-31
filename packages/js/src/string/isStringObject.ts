import { objectToString } from "../internal";
import { stringValueOf } from "./internal";

/**
 * Type guard: `true` if `value` is a boxed `String` object (`new String("x")`), NOT a primitive
 * string. Works across realms via a branded internal-slot check. Boxed primitives are rare;
 * reach for `isString` unless you specifically need to detect wrapper objects.
 *
 * @param value Value to test.
 * @returns `true` if `value` is a `String` wrapper object.
 *
 * @example
 * isStringObject(new String("x")); // true
 * isStringObject("x");             // false
 */
// * Boxed String is the intended target type, not a typo for `string`.
// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types -- boxed String is the deliberate guard target
export function isStringObject(value: unknown): value is String {
	// NOSONAR
	if (typeof value !== "object" || value === null) {
		return false;
	}

	// * `instanceof` is only a same-realm fast path; `objectToString` covers other realms,
	// * and `stringValueOf` below is the real brand check.
	if (!(value instanceof String) && objectToString.call(value) !== "[object String]") {
		// NOSONAR
		return false;
	}

	try {
		stringValueOf.call(value);
		return true;
	} catch {
		return false;
	}
}
