import { toKebabCase } from "../../src/string/toKebabCase";

describe("toKebabCase", () => {
	it("joins lowercase words with hyphens", () => {
		expect(toKebabCase("XMLHttpRequest")).toBe("xml-http-request");
	});

	it("handles separators and mixed input", () => {
		expect(toKebabCase("fecha_límite 2026")).toBe("fecha-límite-2026");
	});

	it("returns an empty string when there are no words", () => {
		expect(toKebabCase("  ")).toBe("");
	});
});
