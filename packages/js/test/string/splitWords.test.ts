import { splitWords } from "../../src/string/splitWords";

describe("splitWords", () => {
	it("splits on separators and case changes, including acronym runs", () => {
		expect(splitWords("XMLHttpRequest userID2 fecha_límite")).toEqual([
			"XML",
			"Http",
			"Request",
			"user",
			"ID",
			"2",
			"fecha",
			"límite",
		]);
	});

	it("returns an empty array when there are no words", () => {
		expect(splitWords("   ")).toEqual([]);
		expect(splitWords("")).toEqual([]);
	});

	it("keeps runs of caseless letters together", () => {
		expect(splitWords("日本語")).toEqual(["日本語"]);
	});
});
