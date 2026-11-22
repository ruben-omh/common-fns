import { isKeyOf } from "../../src/object/isKeyOf";

describe("isKeyOf", () => {
	it("returns true for an own string key", () => {
		expect(isKeyOf({ a: 1 }, "a")).toBe(true);
	});

	it("returns false for a missing string key", () => {
		expect(isKeyOf({ a: 1 }, "b")).toBe(false);
	});

	it("returns true for an own numeric key", () => {
		expect(isKeyOf([10, 20], 0)).toBe(true);
	});

	it("returns false for a missing numeric key", () => {
		expect(isKeyOf([10, 20], 5)).toBe(false);
	});

	it("returns true for an own symbol key", () => {
		const sym = Symbol("s");
		expect(isKeyOf({ [sym]: 1 }, sym)).toBe(true);
	});

	it("returns false for an inherited key", () => {
		expect(isKeyOf({ a: 1 }, "toString")).toBe(false);
	});

	it("returns false for an empty object", () => {
		expect(isKeyOf({}, "a")).toBe(false);
	});

	it("returns false for a non-PropertyKey value", () => {
		const obj = { a: 1 };
		expect(isKeyOf(obj, true)).toBe(false);
		expect(isKeyOf(obj, null)).toBe(false);
		expect(isKeyOf(obj, undefined)).toBe(false);
		expect(isKeyOf(obj, {})).toBe(false);
	});
});
