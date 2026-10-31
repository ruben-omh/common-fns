import { isLeapYear } from "../../src/date/isLeapYear";

describe("isLeapYear", () => {
	it("returns true for a year divisible by 4 that is not a century", () => {
		expect(isLeapYear(2024)).toBe(true);
	});

	it("returns false for a century not divisible by 400", () => {
		expect(isLeapYear(1900)).toBe(false);
	});

	it("returns true for a century divisible by 400", () => {
		expect(isLeapYear(2000)).toBe(true);
	});

	it("returns false for a year not divisible by 4", () => {
		expect(isLeapYear(2026)).toBe(false);
	});

	it("returns false for a non-integer year", () => {
		expect(isLeapYear(2024.5)).toBe(false);
	});
});
