import { toPascalCase } from "../../src/string/toPascalCase";

describe("toPascalCase", () => {
	it("capitalizes each word and joins with no separators", () => {
		expect(toPascalCase("fecha límite")).toBe("FechaLímite");
	});

	it("splits acronyms on case changes", () => {
		expect(toPascalCase("XMLHttpRequest")).toBe("XmlHttpRequest");
	});

	it("returns an empty string when there are no words", () => {
		expect(toPascalCase("  ")).toBe("");
	});
});
