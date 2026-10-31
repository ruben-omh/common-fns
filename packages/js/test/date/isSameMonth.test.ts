import { isSameMonth } from "../../src/date/isSameMonth";

describe("isSameMonth", () => {
	it("returns true for two dates in the same month and year", () => {
		expect(isSameMonth(new Date(2026, 9, 1), new Date(2026, 9, 31))).toBe(true);
	});

	it("returns false for the same month in different years", () => {
		expect(isSameMonth(new Date(2025, 9, 1), new Date(2026, 9, 1))).toBe(false);
	});

	it("returns false for different months in the same year", () => {
		expect(isSameMonth(new Date(2026, 8, 30), new Date(2026, 9, 1))).toBe(false);
	});
});
