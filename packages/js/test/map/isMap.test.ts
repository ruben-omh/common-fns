import { isMap } from "../../src/map/isMap";

describe("isMap", () => {
	it("returns true for a Map", () => {
		expect(isMap(new Map())).toBe(true);
	});

	it("returns false for null", () => {
		expect(isMap(null)).toBe(false);
	});

	it("returns false for a non-object", () => {
		expect(isMap(42)).toBe(false);
	});

	it("returns false for a plain object shaped like a Map", () => {
		expect(isMap({ get() {}, set() {} })).toBe(false);
	});

	it("returns false for a WeakMap", () => {
		expect(isMap(new WeakMap())).toBe(false);
	});

	it("returns false for an object that only mimics a Map's tag", () => {
		const fake = { [Symbol.toStringTag]: "Map" };
		expect(isMap(fake)).toBe(false);
	});
});
