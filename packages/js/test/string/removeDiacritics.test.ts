import { removeDiacritics } from "../../src/string/removeDiacritics";

describe("removeDiacritics", () => {
	it("removes accents from Latin letters", () => {
		expect(removeDiacritics("Café Ñandú")).toBe("Cafe Nandu");
	});

	it("leaves letters that are not letter-plus-accent unchanged", () => {
		expect(removeDiacritics("ø ł ß æ")).toBe("ø ł ß æ");
	});

	it("keeps non-Latin scripts unchanged", () => {
		expect(removeDiacritics("Ελληνικά")).toBe("Ελληνικά");
	});

	it("returns plain ASCII unchanged", () => {
		expect(removeDiacritics("hello")).toBe("hello");
	});
});
