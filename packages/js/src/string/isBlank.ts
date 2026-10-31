const WHITESPACE_ONLY = /^\s*$/;

/**
 * `true` if `text` is empty or contains only whitespace (spaces, tabs, line breaks, and Unicode
 * spaces such as the no-break space). Zero-width characters like U+200B are NOT whitespace.
 * Allocates nothing, unlike `text.trim() === ""`.
 *
 * @param text Text to test.
 * @returns `true` if `text` is empty or only whitespace.
 *
 * @example
 * isBlank("   ");   // true  (spaces only)
 * isBlank("x");     // false
 */
export function isBlank(text: string): boolean {
	return WHITESPACE_ONLY.test(text);
}
