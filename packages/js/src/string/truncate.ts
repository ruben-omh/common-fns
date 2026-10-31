import { getGraphemeLength } from "./getGraphemeLength";
import { graphemeSegmenter, hasOnlySingleUnitGraphemes } from "./internal";
import type { TruncateOptions } from "./types";

const DEFAULT_ELLIPSIS = "…";

/**
 * Shortens `text` to at most `maxLength` user-perceived characters (graphemes), INCLUDING the
 * ellipsis. Never splits an emoji, a letter with its accent, or a "\r\n" pair. Trailing
 * whitespace before the ellipsis is trimmed.
 *
 * If `maxLength` is too small to fit any text plus the ellipsis, the text is cut without one.
 *
 * @param text Text to shorten.
 * @param maxLength Maximum graphemes in the result, including the ellipsis. Must be a non-negative integer.
 * @param options Set `ellipsis` to change the marker. See `TruncateOptions` for the default.
 * @returns `text` unchanged when it already fits, otherwise a truncated string ending in the ellipsis.
 * @throws {RangeError} If `maxLength` is not a non-negative integer.
 *
 * @example
 * truncate("Reunión de planeación", 12, { ellipsis: "..." }); // "Reunión d..."
 */
export function truncate(text: string, maxLength: number, options: TruncateOptions = {}): string {
	if (!Number.isInteger(maxLength) || maxLength < 0) {
		throw new RangeError(
			`truncate(): "maxLength" must be a non-negative integer; received ${String(maxLength)}.`,
		);
	}

	// Fast path: code units are an upper bound for graphemes, so short text always fits.
	if (text.length <= maxLength) {
		return text;
	}

	const { ellipsis = DEFAULT_ELLIPSIS } = options;
	// "…" is outside the fast-path characters, so its known length saves a segmentation per call.
	const ellipsisLength = ellipsis === DEFAULT_ELLIPSIS ? 1 : getGraphemeLength(ellipsis);
	const keep = maxLength > ellipsisLength ? maxLength - ellipsisLength : maxLength;

	// Fast path: one code unit per grapheme, so slicing by index is already safe.
	if (hasOnlySingleUnitGraphemes(text)) {
		const kept = text.slice(0, keep);
		return maxLength > ellipsisLength ? kept.trimEnd() + ellipsis : kept;
	}

	// Count graphemes until one past `maxLength`, remembering where the first `keep` end.
	let count = 0;
	let cutIndex = 0;
	for (const { index } of graphemeSegmenter.segment(text)) {
		if (count === keep) {
			cutIndex = index;
		}
		count++;
		if (count > maxLength) {
			break;
		}
	}

	// Long in code units, but it fits in graphemes (e.g. emoji): nothing to cut.
	if (count <= maxLength) {
		return text;
	}

	const kept = text.slice(0, cutIndex);
	return maxLength > ellipsisLength ? kept.trimEnd() + ellipsis : kept;
}
