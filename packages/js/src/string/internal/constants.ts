// eslint-disable-next-line @typescript-eslint/unbound-method -- intentional uncurried method, invoked via .call(value) as a robust brand check
export const stringValueOf = String.prototype.valueOf;

/** Shared grapheme segmenter. Grapheme boundaries don't depend on the locale. */
export const graphemeSegmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
