import { isPlainObject } from "../../src/object/isPlainObject";

describe("isPlainObject", () => {
	it("returns true for an object literal", () => {
		expect(isPlainObject({ a: 1 })).toBe(true);
	});

	it("returns true for a null-prototype object", () => {
		expect(isPlainObject(Object.create(null))).toBe(true);
	});

	it("returns true for a new Object()", () => {
		expect(isPlainObject(new Object())).toBe(true);
	});

	it("returns false for an array", () => {
		expect(isPlainObject([1, 2])).toBe(false);
	});

	it("returns false for a Date", () => {
		expect(isPlainObject(new Date())).toBe(false);
	});

	it("returns false for a class instance", () => {
		class Box {}
		expect(isPlainObject(new Box())).toBe(false);
	});

	it("returns false for null", () => {
		expect(isPlainObject(null)).toBe(false);
	});

	it("returns false for a non-object", () => {
		expect(isPlainObject(42)).toBe(false);
	});
});
