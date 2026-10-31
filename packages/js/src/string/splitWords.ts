// In order: an uppercase run before a capitalized word ("XML" in "XMLHttp"), a capitalized or
// lowercase word, an uppercase run, a number, or a run of letters without case (CJK, Thai…).
const WORD = /\p{Lu}+(?=\p{Lu}\p{Ll})|[\p{Lu}\p{Lt}]?\p{Ll}+|\p{Lu}+|\p{N}+|[\p{Lo}\p{M}]+/gu; // NOSONAR

/**
 * Splits `text` into words, at separators (spaces, `-`, `_`, punctuation) and case changes.
 * Used by the case-conversion functions.
 *
 * @param text Text to split.
 * @returns The words found in `text`, in order.
 *
 * @example
 * splitWords("XMLHttpRequest userID2 fecha_límite");
 * // ["XML", "Http", "Request", "user", "ID", "2", "fecha", "límite"]
 */
export function splitWords(text: string): string[] {
	return text.normalize("NFC").match(WORD) ?? [];
}
