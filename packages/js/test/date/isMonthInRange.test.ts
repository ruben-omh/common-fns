import { isMonthInRange } from "../../src/date/isMonthInRange";

describe("isMonthInRange", () => {
	it("returns true for any month when bounds are empty", () => {
		expect(isMonthInRange(2026, 5, {})).toBe(true);
	});

	it("returns true for a month fully inside both bounds", () => {
		expect(
			isMonthInRange(2026, 5, { min: new Date(2026, 0, 1), max: new Date(2026, 11, 31) }),
		).toBe(true);
	});

	it("returns true when min falls inside the month", () => {
		expect(isMonthInRange(2026, 5, { min: new Date(2026, 5, 15) })).toBe(true);
	});

	it("returns false when min starts at or after the next month", () => {
		expect(isMonthInRange(2026, 5, { min: new Date(2026, 6, 1) })).toBe(false);
	});

	it("returns true when max equals the first instant of the month (inclusive)", () => {
		expect(isMonthInRange(2026, 5, { max: new Date(2026, 5, 1) })).toBe(true);
	});

	it("returns false when max is before the month starts", () => {
		expect(isMonthInRange(2026, 5, { max: new Date(2026, 4, 31) })).toBe(false);
	});

	it("returns false when the month is below a defined min, regardless of max", () => {
		expect(isMonthInRange(2026, 5, { min: new Date(2026, 7, 1), max: new Date(2026, 11, 1) })).toBe(
			false,
		);
	});

	it("returns false when the month is above a defined max, regardless of min", () => {
		expect(isMonthInRange(2026, 5, { min: new Date(2026, 0, 1), max: new Date(2026, 4, 1) })).toBe(
			false,
		);
	});

	it("returns false for a non-finite month index", () => {
		expect(isMonthInRange(2026, NaN, {})).toBe(false);
	});
});
