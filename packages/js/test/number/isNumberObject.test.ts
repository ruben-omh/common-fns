import { isNumberObject } from "../../src/number/isNumberObject";

describe("isNumberObject", () => {
	it("returns true for a boxed Number object", () => {
		expect(isNumberObject(new Number(5))).toBe(true);
	});

	it("returns false for a primitive number", () => {
		expect(isNumberObject(5)).toBe(false);
	});

	it("returns false for null", () => {
		expect(isNumberObject(null)).toBe(false);
	});

	it("returns false for a plain object", () => {
		expect(isNumberObject({})).toBe(false);
	});

	it("returns false for a boxed String object", () => {
		expect(isNumberObject(new String("5"))).toBe(false);
	});

	it("returns false for an object that only mimics a Number's tag", () => {
		const fake = { [Symbol.toStringTag]: "Number" };
		expect(isNumberObject(fake)).toBe(false);
	});
});
