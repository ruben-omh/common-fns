import { isBlank } from "../../src/string/isBlank";

describe("isBlank", () => {
	it("returns true for spaces only", () => {
		expect(isBlank("   ")).toBe(true);
	});

	it("returns true for an empty string", () => {
		expect(isBlank("")).toBe(true);
	});

	it("returns true for mixed whitespace including a no-break space", () => {
		expect(isBlank("\t\n  ")).toBe(true);
	});

	it("returns false for text with a non-whitespace character", () => {
		expect(isBlank("x")).toBe(false);
		expect(isBlank("  x  ")).toBe(false);
	});

	it("treats a zero-width space as non-whitespace", () => {
		expect(isBlank("​")).toBe(false);
	});
});
