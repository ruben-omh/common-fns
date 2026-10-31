import { capitalize } from "../../src/string/capitalize";

describe("capitalize", () => {
	it("uppercases the first character and leaves the rest", () => {
		expect(capitalize("ñandú")).toBe("Ñandú");
	});

	it("returns an empty string unchanged", () => {
		expect(capitalize("")).toBe("");
	});

	it("is locale-aware when a locale is given", () => {
		expect(capitalize("istanbul", "tr")).toBe("İstanbul");
	});

	it("does not split a surrogate pair at the start", () => {
		expect(capitalize("😀abc")).toBe("😀abc");
	});

	it("keeps a following combining mark attached", () => {
		expect(capitalize("éllo")).toBe("Éllo");
	});
});
