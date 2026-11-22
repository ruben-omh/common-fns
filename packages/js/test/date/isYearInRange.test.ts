import { isYearInRange } from "../../src/date/isYearInRange";

describe("isYearInRange", () => {
	it("returns true for any year when bounds are empty", () => {
		expect(isYearInRange(2026, {})).toBe(true);
	});

	it("returns true for a year fully inside both bounds", () => {
		expect(isYearInRange(2026, { min: new Date(2000, 0, 1), max: new Date(2050, 0, 1) })).toBe(
			true,
		);
	});

	it("returns true when min falls inside the year", () => {
		expect(isYearInRange(2026, { min: new Date(2026, 5, 1) })).toBe(true);
	});

	it("returns false when min starts at or after the next year", () => {
		expect(isYearInRange(2026, { min: new Date(2027, 0, 1) })).toBe(false);
	});

	it("returns true when max equals the first instant of the year (inclusive)", () => {
		expect(isYearInRange(2026, { max: new Date(2026, 0, 1) })).toBe(true);
	});

	it("returns false when max is before the year starts", () => {
		expect(isYearInRange(2026, { max: new Date(2025, 11, 31) })).toBe(false);
	});

	it("returns false when the year is below a defined min, regardless of max", () => {
		expect(isYearInRange(2026, { min: new Date(2030, 0, 1), max: new Date(2050, 0, 1) })).toBe(
			false,
		);
	});

	it("returns false when the year is above a defined max, regardless of min", () => {
		expect(isYearInRange(2026, { min: new Date(2000, 0, 1), max: new Date(2025, 0, 1) })).toBe(
			false,
		);
	});

	it("returns false for a non-finite year", () => {
		expect(isYearInRange(NaN, {})).toBe(false);
	});
});
