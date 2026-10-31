import { truncate } from "../../src/string/truncate";

const ELLIPSIS = "…";

describe("truncate", () => {
	describe("validation", () => {
		it("throws when maxLength is not an integer", () => {
			expect(() => truncate("abc", 1.5)).toThrow(RangeError);
		});

		it("throws when maxLength is negative", () => {
			expect(() => truncate("abc", -1)).toThrow(RangeError);
		});
	});

	describe("already fits", () => {
		it("returns the text unchanged when it is within maxLength", () => {
			expect(truncate("ab", 5)).toBe("ab");
		});
	});

	describe("single-code-unit fast path", () => {
		it("cuts and appends the default ellipsis", () => {
			expect(truncate("Hello World", 8)).toBe(`Hello W${ELLIPSIS}`);
		});

		it("trims trailing whitespace before the ellipsis", () => {
			expect(truncate("Hello     World", 8)).toBe(`Hello${ELLIPSIS}`);
		});

		it("uses a custom ellipsis", () => {
			expect(truncate("Reunión de planeación", 12, { ellipsis: "..." })).toBe("Reunión d...");
		});

		it("cuts without an ellipsis when maxLength cannot fit one", () => {
			expect(truncate("abcdef", 1, { ellipsis: "..." })).toBe("a");
		});

		it("returns an empty string when maxLength is 0", () => {
			expect(truncate("abc", 0)).toBe("");
		});
	});

	describe("grapheme-aware slow path", () => {
		it("never splits an emoji and appends the ellipsis", () => {
			expect(truncate("😀😀😀😀😀", 3)).toBe(`😀😀${ELLIPSIS}`);
		});

		it("returns the text when it fits in graphemes though long in code units", () => {
			expect(truncate("😀😀😀", 5)).toBe("😀😀😀");
		});

		it("cuts without an ellipsis when maxLength cannot fit one", () => {
			expect(truncate("😀😀😀😀", 2, { ellipsis: "xyz" })).toBe("😀😀");
		});
	});
});
