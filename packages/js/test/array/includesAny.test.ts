import { includesAny } from "../../src/array/includesAny";

describe("includesAny", () => {
	it("returns true when at least one value is present", () => {
		expect(includesAny([1, 2, 3], [9, 2])).toBe(true);
	});

	it("returns false when no value is present", () => {
		expect(includesAny([1, 2, 3], [9, 8])).toBe(false);
	});

	it("returns false for an empty values list", () => {
		expect(includesAny([1, 2, 3], [])).toBe(false);
	});

	it("returns false for an empty array", () => {
		expect(includesAny([], [1])).toBe(false);
	});

	describe("large inputs (Set-backed path)", () => {
		const large = Array.from({ length: 300 }, (_, index) => index);

		it("returns true when one value is present", () => {
			expect(includesAny(large, [999, 42])).toBe(true);
		});

		it("returns false when no value is present", () => {
			expect(includesAny(large, [999, 1000])).toBe(false);
		});
	});
});
