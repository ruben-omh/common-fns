/**
 * Uppercases the first character of `text` and leaves the rest unchanged.
 * Handles characters outside the BMP (emoji, historic scripts) and is locale-aware when
 * `locale` is given: `capitalize("istanbul", "tr")` gives "İstanbul".
 *
 * @param text Text to capitalize.
 * @param locale Optional BCP 47 locale for locale-aware uppercasing of the first character.
 * @returns `text` with its first character uppercased.
 *
 * @example
 * capitalize("ñandú"); // "Ñandú"
 */
export function capitalize(text: string, locale?: string): string {
	const firstCodePoint = text.codePointAt(0);
	if (firstCodePoint === undefined) {
		return text;
	}

	// One code point, not one code unit, so surrogate pairs are never split. A following
	// combining mark (e + ◌́) stays attached because it is part of `rest`.
	const first = String.fromCodePoint(firstCodePoint);
	const rest = text.slice(first.length);
	return first.toLocaleUpperCase(locale) + rest;
}
