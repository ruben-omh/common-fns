import { removeDiacritics } from "./removeDiacritics";
import { splitWords } from "./splitWords";

/**
 * Turns `text` into a URL-friendly slug: lowercase words without Latin accents, joined by "-".
 * Letters from other scripts are kept (modern URLs support them).
 *
 * @param text Text to slugify.
 * @returns A lowercase, hyphen-separated slug.
 *
 * @example
 * slugify("¡Reunión de Planeación 2026!"); // "reunion-de-planeacion-2026"
 */
export function slugify(text: string): string {
	return splitWords(removeDiacritics(text))
		.map((word) => word.toLowerCase())
		.join("-");
}
