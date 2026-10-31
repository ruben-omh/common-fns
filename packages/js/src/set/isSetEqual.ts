/**
 * `true` if both sets contain exactly the same elements, in any order.
 * Elements are compared with SameValueZero (`NaN` equals `NaN`; objects by reference).
 * Stops at the first difference.
 *
 * @template T Element type.
 * @param a First set.
 * @param b Second set.
 * @returns `true` if both sets contain exactly the same elements.
 *
 * @example
 * isSetEqual(new Set([1, 2]), new Set([2, 1])); // true
 * isSetEqual(new Set([1, 2]), new Set([1]));    // false
 */
export function isSetEqual<T>(a: ReadonlySet<T>, b: ReadonlySet<T>): boolean {
	if (a === b) {
		return true;
	}

	if (a.size !== b.size) {
		return false;
	}

	for (const value of a) {
		if (!b.has(value)) {
			return false;
		}
	}

	return true;
}
