import { toSnakeCase } from "../../src/string/toSnakeCase";

describe("toSnakeCase", () => {
	it("joins lowercase words with underscores", () => {
		expect(toSnakeCase("XMLHttpRequest")).toBe("xml_http_request");
	});

	it("handles separators and mixed input", () => {
		expect(toSnakeCase("fecha-límite 2026")).toBe("fecha_límite_2026");
	});

	it("returns an empty string when there are no words", () => {
		expect(toSnakeCase("  ")).toBe("");
	});
});
