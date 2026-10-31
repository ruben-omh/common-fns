import { getGraphemeLength } from "../../src/string/getGraphemeLength";

describe("getGraphemeLength", () => {
	it("counts precomposed Latin text on the fast path", () => {
		expect(getGraphemeLength("café")).toBe(4);
	});

	it("counts an empty string as 0", () => {
		expect(getGraphemeLength("")).toBe(0);
	});

	it("counts a ZWJ emoji sequence as one grapheme", () => {
		expect(getGraphemeLength("👩‍👩‍👧")).toBe(1);
	});

	it("counts a decomposed letter plus combining mark as one grapheme", () => {
		expect(getGraphemeLength("é")).toBe(1);
	});

	it("counts a CRLF pair as one grapheme", () => {
		expect(getGraphemeLength("\r\n")).toBe(1);
	});
});
