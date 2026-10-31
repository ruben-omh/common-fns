import { isString } from "../../src/string/isString";

describe("isString", () => {
	it("returns true for a primitive string", () => {
		expect(isString("hi")).toBe(true);
		expect(isString("")).toBe(true);
	});

	it("returns false for a boxed String object", () => {
		expect(isString(new String("x"))).toBe(false);
	});

	it("returns false for a non-string", () => {
		expect(isString(42)).toBe(false);
		expect(isString(null)).toBe(false);
	});
});
