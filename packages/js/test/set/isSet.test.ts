import { isSet } from "../../src/set/isSet";

describe("isSet", () => {
	it("returns true for a Set", () => {
		expect(isSet(new Set())).toBe(true);
	});

	it("returns false for null", () => {
		expect(isSet(null)).toBe(false);
	});

	it("returns false for a non-object", () => {
		expect(isSet(42)).toBe(false);
	});

	it("returns false for an array", () => {
		expect(isSet([1, 2, 3])).toBe(false);
	});

	it("returns false for a plain object", () => {
		expect(isSet({})).toBe(false);
	});

	it("returns false for a WeakSet", () => {
		expect(isSet(new WeakSet())).toBe(false);
	});

	it("returns false for an object that only mimics a Set's tag", () => {
		// Carries [object Set] but has no Set internal slot, so the branded has() probe throws.
		const fake = { [Symbol.toStringTag]: "Set" };
		expect(isSet(fake)).toBe(false);
	});
});
