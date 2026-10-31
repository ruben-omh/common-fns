import { createIntegerRangeGuard } from "../../src/number/createIntegerRangeGuard";

describe("createIntegerRangeGuard", () => {
	describe("bounds validation", () => {
		it("throws when min is not a safe integer", () => {
			expect(() => createIntegerRangeGuard(1.5, 6)).toThrow(RangeError);
		});

		it("throws when max is not a safe integer", () => {
			expect(() => createIntegerRangeGuard(0, Number.MAX_SAFE_INTEGER + 1)).toThrow(RangeError);
		});

		it("throws when min is greater than max", () => {
			expect(() => createIntegerRangeGuard(6, 0)).toThrow(RangeError);
		});
	});

	describe("the returned guard", () => {
		const isWeekdayIndex = createIntegerRangeGuard(0, 6);

		it("accepts integers within the inclusive range", () => {
			expect(isWeekdayIndex(0)).toBe(true);
			expect(isWeekdayIndex(6)).toBe(true);
			expect(isWeekdayIndex(3)).toBe(true);
		});

		it("rejects integers outside the range", () => {
			expect(isWeekdayIndex(-1)).toBe(false);
			expect(isWeekdayIndex(7)).toBe(false);
		});

		it("rejects non-integer numbers", () => {
			expect(isWeekdayIndex(2.5)).toBe(false);
		});

		it("rejects non-numbers", () => {
			expect(isWeekdayIndex("3")).toBe(false);
			expect(isWeekdayIndex(null)).toBe(false);
		});

		it("rejects NaN", () => {
			expect(isWeekdayIndex(NaN)).toBe(false);
		});
	});
});
