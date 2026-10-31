import { isSetEqual } from "../../src/set/isSetEqual";

describe("isSetEqual", () => {
	it("returns true for the same reference", () => {
		const set = new Set([1, 2]);
		expect(isSetEqual(set, set)).toBe(true);
	});

	it("returns true for equal sets regardless of order", () => {
		expect(isSetEqual(new Set([1, 2]), new Set([2, 1]))).toBe(true);
	});

	it("returns false when the sizes differ", () => {
		expect(isSetEqual(new Set([1, 2]), new Set([1]))).toBe(false);
	});

	it("returns false when an element is missing from the other", () => {
		expect(isSetEqual(new Set([1, 2]), new Set([1, 3]))).toBe(false);
	});

	it("compares with SameValueZero, so NaN equals NaN", () => {
		expect(isSetEqual(new Set([NaN]), new Set([NaN]))).toBe(true);
	});

	it("treats two empty sets as equal", () => {
		expect(isSetEqual(new Set(), new Set())).toBe(true);
	});
});
