import { slugify } from "../../src/string/slugify";

describe("slugify", () => {
	it("builds a lowercase hyphen-separated slug without Latin accents", () => {
		expect(slugify("¡Reunión de Planeación 2026!")).toBe("reunion-de-planeacion-2026");
	});

	it("splits on case changes", () => {
		expect(slugify("XMLHttpRequest")).toBe("xml-http-request");
	});

	it("returns an empty string when there are no word characters", () => {
		expect(slugify("  !!  ")).toBe("");
	});
});
