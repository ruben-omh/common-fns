import { chunk } from "../../src/array/chunk";

describe("chunk", () => {
	it("splits into chunks of the given size", () => {
		expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
	});

	it("returns a single chunk when size covers the whole array", () => {
		expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
	});

	it("returns an empty array for an empty input", () => {
		expect(chunk([], 2)).toEqual([]);
	});

	it("does not mutate the source array", () => {
		const source = [1, 2, 3];
		chunk(source, 2);
		expect(source).toEqual([1, 2, 3]);
	});

	it("throws when size is not an integer", () => {
		expect(() => chunk([1, 2, 3], 2.5)).toThrow(RangeError);
	});

	it("throws when size is less than 1", () => {
		expect(() => chunk([1, 2, 3], 0)).toThrow(RangeError);
	});
});
