// Only marks on LATIN letters: in scripts like Thai or Devanagari, marks are vowels that
// change the word (ม.ค. January vs มี.ค. March), so removing them would merge different words.
const LATIN_DIACRITICS = /(\p{Script=Latin})\p{M}+/gu;

/**
 * Removes accents from Latin letters: "Café Ñandú" → "Cafe Nandu". Other scripts are kept as
 * they are. Use it to compare or search text regardless of accents.
 * Letters that are not "letter + accent" (ø, ł, ß, æ) are not changed.
 *
 * @param text Text to transform.
 * @returns `text` with Latin diacritics removed.
 *
 * @example
 * removeDiacritics("Café Ñandú"); // "Cafe Nandu"
 */
export function removeDiacritics(text: string): string {
	return text.normalize("NFD").replaceAll(LATIN_DIACRITICS, "$1").normalize("NFC");
}
