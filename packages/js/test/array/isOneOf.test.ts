import { isOneOf } from "../../src/array/isOneOf";

describe("isOneOf", () => {
	it("returns true when the value is one of the options", () => {
		expect(isOneOf("md", ["sm", "md", "lg"] as const)).toBe(true);
	});

	it("returns false when the value is not one of the options", () => {
		expect(isOneOf("xl", ["sm", "md", "lg"] as const)).toBe(false);
	});

	it("returns false for a value of a different type", () => {
		expect(isOneOf(42, ["sm", "md", "lg"] as const)).toBe(false);
	});
});
