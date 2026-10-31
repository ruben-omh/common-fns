import { graphemeSegmenter, hasOnlySingleUnitGraphemes } from "./internal";

/**
 * Number of user-perceived characters (grapheme clusters) in `text`. Unlike `text.length`,
 * counts "👩‍👩‍👧" as 1 (not 8), "é" written as e + ◌́ as 1, and "\r\n" as 1.
 * Use it for character limits shown to users.
 *
 * Text in Latin (with precomposed accents), Greek or Cyrillic takes a fast path without segmentation.
 *
 * @param text Text to measure.
 * @returns The number of grapheme clusters in `text`.
 *
 * @example
 * getGraphemeLength("café"); // 4
 */
export function getGraphemeLength(text: string): number {
	if (hasOnlySingleUnitGraphemes(text)) {
		return text.length;
	}

	let count = 0;
	for (const _ of graphemeSegmenter.segment(text)) {
		count++;
	}
	return count;
}
