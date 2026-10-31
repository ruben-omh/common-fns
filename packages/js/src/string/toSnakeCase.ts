import { splitWords } from "./splitWords";

/**
 * Converts `text` to snake_case: lowercase words joined with "_". Splits on separators and case
 * changes via `splitWords`.
 *
 * @param text Text to convert.
 * @returns `text` in snake_case.
 *
 * @example
 * toSnakeCase("XMLHttpRequest"); // "xml_http_request"
 */
export function toSnakeCase(text: string): string {
	return splitWords(text)
		.map((word) => word.toLowerCase())
		.join("_");
}
