const REGEXP_SYNTAX = /[\\^$.*+?()[\]{}|/-]/g;

/**
 * Escapes every character with special meaning in a regular expression, so `text` can be
 * embedded in a pattern and matched literally (also inside a character class).
 *
 * @param text Text to escape.
 * @returns `text` with every regex metacharacter backslash-escaped.
 *
 * @example
 * new RegExp(`^${escapeRegExp("1.5+")}$`).test("1.5+"); // true
 */
export function escapeRegExp(text: string): string {
	return text.replaceAll(REGEXP_SYNTAX, "\\$&"); // NOSONAR
}
