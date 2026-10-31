import { isWeakMap } from "../../src/map/isWeakMap";

describe("isWeakMap", () => {
	it("returns true for a WeakMap", () => {
		expect(isWeakMap(new WeakMap())).toBe(true);
	});

	it("returns false for a Map", () => {
		expect(isWeakMap(new Map())).toBe(false);
	});

	it("returns false for null", () => {
		expect(isWeakMap(null)).toBe(false);
	});

	it("returns false for a non-object", () => {
		expect(isWeakMap(42)).toBe(false);
	});

	it("returns false for an object that only mimics a WeakMap's tag", () => {
		const fake = { [Symbol.toStringTag]: "WeakMap" };
		expect(isWeakMap(fake)).toBe(false);
	});
});
