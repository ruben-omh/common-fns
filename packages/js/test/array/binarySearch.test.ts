import { binarySearch, findInsertionIndex } from "../../src/array/binarySearch";

const numeric = (a: number, b: number): number => a - b;

describe("findInsertionIndex", () => {
	it("finds the lower bound for a value between elements", () => {
		expect(findInsertionIndex([10, 20, 30], 25, numeric)).toBe(2);
	});

	it("returns 0 when the target sorts before every element", () => {
		expect(findInsertionIndex([10, 20, 30], 5, numeric)).toBe(0);
	});

	it("returns the length when the target sorts after every element", () => {
		expect(findInsertionIndex([10, 20, 30], 99, numeric)).toBe(3);
	});

	it("returns the index of an equal element (first not-before)", () => {
		expect(findInsertionIndex([10, 20, 30], 20, numeric)).toBe(1);
	});

	it("returns 0 for an empty array", () => {
		expect(findInsertionIndex([], 5, numeric)).toBe(0);
	});
});

describe("binarySearch", () => {
	it("finds an element present in the array", () => {
		expect(binarySearch([10, 20, 30], 20, numeric)).toBe(1);
	});

	it("returns -1 when the target is between elements", () => {
		expect(binarySearch([10, 20, 30], 25, numeric)).toBe(-1);
	});

	it("returns -1 when the target sorts after every element", () => {
		expect(binarySearch([10, 20, 30], 99, numeric)).toBe(-1);
	});

	it("finds the first and last elements", () => {
		expect(binarySearch([10, 20, 30], 10, numeric)).toBe(0);
		expect(binarySearch([10, 20, 30], 30, numeric)).toBe(2);
	});

	it("returns -1 for an empty array", () => {
		expect(binarySearch([], 10, numeric)).toBe(-1);
	});
});
