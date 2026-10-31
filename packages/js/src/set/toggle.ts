/**
 * Adds `value` to `set` if missing, or removes it if present, IN PLACE.
 * Returns whether `value` is in the set afterwards, like `DOMTokenList#toggle`.
 *
 * Pass `force` to only add (`true`) or only remove (`false`).
 *
 * @template T Element type.
 * @param set Set to update. Mutated in place.
 * @param value Element to add or remove.
 * @param force When given, only adds (`true`) or only removes (`false`) instead of toggling.
 * @returns `true` if `value` is in the set afterwards.
 *
 * @example
 * // Multi-select date picker:
 * const isSelected = toggle(selectedDays, getDayKey(clickedDate));
 */
export function toggle<T>(set: Set<T>, value: T, force?: boolean): boolean {
	const shouldAdd = force ?? !set.has(value);

	if (shouldAdd) {
		set.add(value);
	} else {
		set.delete(value);
	}

	return shouldAdd;
}
