import { capitalizeWord } from "./internal";
import { splitWords } from "./splitWords";

/**
 * Converts `text` to PascalCase: each word capitalized and joined with no separators. Splits on
 * separators and case changes via `splitWords`.
 *
 * @param text Text to convert.
 * @returns `text` in PascalCase.
 *
 * @example
 * toPascalCase("fecha límite"); // "FechaLímite"
 */
export function toPascalCase(text: string): string {
	return splitWords(text).map(capitalizeWord).join("");
}
