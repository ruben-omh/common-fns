/**
 * Text where every UTF-16 code unit is a whole grapheme, so `length` and `slice` are already
 * grapheme-correct and `Intl.Segmenter` (slow) can be skipped: printable ASCII, Latin-1 and
 * Latin Extended letters (á ñ ü ő ł…), Greek and Cyrillic, all in precomposed form.
 * Excluded on purpose: control characters ("\r\n" is one grapheme), combining marks
 * (U+0300–U+036F, U+0483–U+0489), surrogates (emoji), ZWJ and variation selectors.
 */
const SINGLE_UNIT_GRAPHEMES = /^[\x20-\x7E -˿Ͱ-ϿЀ-҂Ҋ-ԯ]*$/; // NOSONAR

export function hasOnlySingleUnitGraphemes(text: string): boolean {
	return SINGLE_UNIT_GRAPHEMES.test(text);
}
