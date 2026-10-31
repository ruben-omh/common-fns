import { insertSorted } from "../../src/array/insertSorted";

const numeric = (a: number, b: number): number => a - b;

describe("insertSorted", () => {
	it("inserts into the middle and returns the index", () => {
		const xs = [1, 3, 5];
		expect(insertSorted(xs, 4, numeric)).toBe(2);
		expect(xs).toEqual([1, 3, 4, 5]);
	});

	it("inserts at the start", () => {
		const xs = [2, 3];
		expect(insertSorted(xs, 1, numeric)).toBe(0);
		expect(xs).toEqual([1, 2, 3]);
	});

	it("inserts at the end", () => {
		const xs = [1, 2];
		expect(insertSorted(xs, 9, numeric)).toBe(2);
		expect(xs).toEqual([1, 2, 9]);
	});

	it("inserts into an empty array", () => {
		const xs: number[] = [];
		expect(insertSorted(xs, 1, numeric)).toBe(0);
		expect(xs).toEqual([1]);
	});

	it("places equal elements after existing ones (stable)", () => {
		const xs = [1, 2, 2, 3];
		expect(insertSorted(xs, 2, numeric)).toBe(3);
		expect(xs).toEqual([1, 2, 2, 2, 3]);
	});
});
