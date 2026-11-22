import { getOwnValueOr } from "../../src/object/getOwnValueOr";

describe("getOwnValueOr", () => {
	it("returns the value for an own string key", () => {
		expect(getOwnValueOr({ a: 1 }, "a", 0)).toBe(1);
	});

	it("returns the fallback for a missing string key", () => {
		expect(getOwnValueOr({ a: 1 }, "b", 0)).toBe(0);
	});

	it("returns the value for an own numeric key", () => {
		expect(getOwnValueOr([10, 20], 0, -1)).toBe(10);
	});

	it("returns the value for an own symbol key", () => {
		const sym = Symbol("s");
		expect(getOwnValueOr({ [sym]: 1 }, sym, 0)).toBe(1);
	});

	it("returns the fallback for an inherited key", () => {
		expect(getOwnValueOr({}, "toString", null)).toBeNull();
	});

	it("returns the fallback for a non-PropertyKey value", () => {
		const key: unknown = true;
		expect(getOwnValueOr({ a: 1 }, key, 0)).toBe(0);
	});

	it("returns the stored undefined for a present key, not the fallback", () => {
		expect(getOwnValueOr({ a: undefined }, "a", 0)).toBeUndefined();
	});

	it("returns a stored null for a present key, not the fallback", () => {
		expect(getOwnValueOr({ a: null }, "a", 0)).toBeNull();
	});

	it("returns a stored falsy value for a present key", () => {
		expect(getOwnValueOr({ a: 0 }, "a", 99)).toBe(0);
		expect(getOwnValueOr({ a: "" }, "a", "x")).toBe("");
	});

	it("returns the fallback for an empty object", () => {
		expect(getOwnValueOr({}, "a", 0)).toBe(0);
	});
});
