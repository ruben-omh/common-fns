import { splitWords } from "./splitWords";

/**
 * Converts `text` to kebab-case: lowercase words joined with "-". Splits on separators and case
 * changes via `splitWords`.
 *
 * @param text Text to convert.
 * @returns `text` in kebab-case.
 *
 * @example
 * toKebabCase("XMLHttpRequest"); // "xml-http-request"
 */
export function toKebabCase(text: string): string {
	return splitWords(text)
		.map((word) => word.toLowerCase())
		.join("-");
}
