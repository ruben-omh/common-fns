import { toCamelCase } from "../../src/string/toCamelCase";

describe("toCamelCase", () => {
	it("lowercases the first word and capitalizes the rest", () => {
		expect(toCamelCase("fecha límite")).toBe("fechaLímite");
	});

	it("splits acronyms on case changes", () => {
		expect(toCamelCase("XMLHttpRequest")).toBe("xmlHttpRequest");
	});

	it("returns an empty string when there are no words", () => {
		expect(toCamelCase("  ")).toBe("");
	});
});
