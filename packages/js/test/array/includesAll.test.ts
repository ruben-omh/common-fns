import { includesAll } from "../../src/array/includesAll";

describe("includesAll", () => {
	it("returns true when every value is present", () => {
		expect(includesAll([1, 2, 3], [1, 3])).toBe(true);
	});

	it("returns false when a value is missing", () => {
		expect(includesAll([1, 2, 3], [1, 4])).toBe(false);
	});

	it("returns true for an empty values list (vacuously true)", () => {
		expect(includesAll([1, 2, 3], [])).toBe(true);
	});

	it("returns true for an empty values list even when the array is empty", () => {
		expect(includesAll([], [])).toBe(true);
	});

	it("returns false when the array is empty but values are requested", () => {
		expect(includesAll([], [1])).toBe(false);
	});

	describe("large inputs (Set-backed path)", () => {
		const large = Array.from({ length: 300 }, (_, index) => index);

		it("returns true when every value is present", () => {
			expect(includesAll(large, [10, 299])).toBe(true);
		});

		it("returns false when a value is missing", () => {
			expect(includesAll(large, [10, 999])).toBe(false);
		});
	});
});
