import { capitalizeWord } from "./internal";
import { splitWords } from "./splitWords";

/**
 * Converts `text` to camelCase: the first word lowercased, each later word capitalized, joined
 * with no separators. Splits on separators and case changes via `splitWords`.
 *
 * @param text Text to convert.
 * @returns `text` in camelCase.
 *
 * @example
 * toCamelCase("fecha límite");   // "fechaLímite"
 * toCamelCase("XMLHttpRequest"); // "xmlHttpRequest"
 */
export function toCamelCase(text: string): string {
	const words = splitWords(text);
	let result = "";
	for (let index = 0; index < words.length; index++) {
		const word = words[index];
		result += index === 0 ? word.toLowerCase() : capitalizeWord(word);
	}
	return result;
}
