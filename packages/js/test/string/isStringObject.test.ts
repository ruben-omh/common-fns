import { isStringObject } from "../../src/string/isStringObject";

describe("isStringObject", () => {
	it("returns true for a boxed String object", () => {
		expect(isStringObject(new String("x"))).toBe(true);
	});

	it("returns false for a primitive string", () => {
		expect(isStringObject("x")).toBe(false);
	});

	it("returns false for null", () => {
		expect(isStringObject(null)).toBe(false);
	});

	it("returns false for a plain object", () => {
		expect(isStringObject({})).toBe(false);
	});

	it("returns false for a boxed Number object", () => {
		expect(isStringObject(new Number(5))).toBe(false);
	});

	it("returns false for an object that only mimics a String's tag", () => {
		const fake = { [Symbol.toStringTag]: "String" };
		expect(isStringObject(fake)).toBe(false);
	});
});
