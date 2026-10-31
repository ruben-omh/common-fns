import { isNullOrUndefined } from "../../src/value/isNullOrUndefined";

describe("isNullOrUndefined", () => {
	it("returns true for null", () => {
		expect(isNullOrUndefined(null)).toBe(true);
	});

	it("returns true for undefined", () => {
		expect(isNullOrUndefined(undefined)).toBe(true);
	});

	it("returns false for 0", () => {
		expect(isNullOrUndefined(0)).toBe(false);
	});

	it("returns false for an empty string", () => {
		expect(isNullOrUndefined("")).toBe(false);
	});

	it("returns false for an object", () => {
		expect(isNullOrUndefined({})).toBe(false);
	});
});
