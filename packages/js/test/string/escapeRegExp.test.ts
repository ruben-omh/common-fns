import { escapeRegExp } from "../../src/string/escapeRegExp";

describe("escapeRegExp", () => {
	it("escapes regex metacharacters so they match literally", () => {
		expect(new RegExp(`^${escapeRegExp("1.5+")}$`).test("1.5+")).toBe(true);
	});

	it("does not match when the literal differs", () => {
		expect(new RegExp(`^${escapeRegExp("1.5+")}$`).test("125")).toBe(false);
	});

	it("escapes a hyphen so it is safe inside a character class", () => {
		expect(escapeRegExp("a-z")).toBe("a\\-z");
	});

	it("leaves ordinary characters unchanged", () => {
		expect(escapeRegExp("abc123")).toBe("abc123");
	});
});
