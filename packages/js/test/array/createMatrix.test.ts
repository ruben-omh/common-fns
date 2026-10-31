import { createMatrix } from "../../src/array/createMatrix";

describe("createMatrix", () => {
	it("builds a rows x cols matrix from the builder", () => {
		expect(createMatrix(2, 3, (row, col) => `${row},${col}`)).toEqual([
			["0,0", "0,1", "0,2"],
			["1,0", "1,1", "1,2"],
		]);
	});

	it("fills cells with the builder's return value", () => {
		expect(createMatrix(2, 2, (row, col) => row * 2 + col)).toEqual([
			[0, 1],
			[2, 3],
		]);
	});

	it("returns an empty matrix for 0 rows", () => {
		expect(createMatrix(0, 3, () => 0)).toEqual([]);
	});

	it("returns rows of empty arrays for 0 columns", () => {
		expect(createMatrix(2, 0, () => 0)).toEqual([[], []]);
	});

	it("throws when rows is not a non-negative integer", () => {
		expect(() => createMatrix(-1, 3, () => 0)).toThrow(RangeError);
		expect(() => createMatrix(1.5, 3, () => 0)).toThrow(RangeError);
	});

	it("throws when cols is not a non-negative integer", () => {
		expect(() => createMatrix(3, -1, () => 0)).toThrow(RangeError);
		expect(() => createMatrix(3, 1.5, () => 0)).toThrow(RangeError);
	});
});
