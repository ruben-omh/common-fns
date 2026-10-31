import { isSameYear } from "../../src/date/isSameYear";

describe("isSameYear", () => {
	it("returns true for two dates in the same year", () => {
		expect(isSameYear(new Date(2026, 0, 1), new Date(2026, 11, 31))).toBe(true);
	});

	it("returns false for two dates in different years", () => {
		expect(isSameYear(new Date(2025, 11, 31), new Date(2026, 0, 1))).toBe(false);
	});
});
