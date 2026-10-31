import { range } from "../../src/number/range";

describe("range", () => {
	it("counts up with the default step", () => {
		expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
	});

	it("counts up with a custom step", () => {
		expect(range(0, 60, 15)).toEqual([0, 15, 30, 45]);
	});

	it("counts down with a negative step", () => {
		expect(range(2030, 2020, -2)).toEqual([2030, 2028, 2026, 2024, 2022]);
	});

	it("returns an empty array when start equals end", () => {
		expect(range(5, 5)).toEqual([]);
	});

	it("returns an empty array when the step points away from end", () => {
		expect(range(0, 5, -1)).toEqual([]);
	});

	it("offsets each entry from start", () => {
		expect(range(2, 8, 2)).toEqual([2, 4, 6]);
	});

	it("throws when start is not a number", () => {
		expect(() => range("x" as unknown as number, 5)).toThrow(RangeError);
	});

	it("throws when end is not a number", () => {
		expect(() => range(0, "x" as unknown as number)).toThrow(RangeError);
	});

	it("throws when step is not a number", () => {
		expect(() => range(0, 5, "x" as unknown as number)).toThrow(RangeError);
	});

	it("throws when step is 0", () => {
		expect(() => range(0, 5, 0)).toThrow(RangeError);
	});
});
