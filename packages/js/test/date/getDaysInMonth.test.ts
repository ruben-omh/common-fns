import { getDaysInMonth } from "../../src/date/getDaysInMonth";

describe("getDaysInMonth", () => {
	it("returns 29 for February in a leap year", () => {
		expect(getDaysInMonth(2024, 1)).toBe(29);
	});

	it("returns 28 for February in a non-leap year", () => {
		expect(getDaysInMonth(2026, 1)).toBe(28);
	});

	it("returns the fixed length of other months", () => {
		expect(getDaysInMonth(2026, 0)).toBe(31);
		expect(getDaysInMonth(2026, 3)).toBe(30);
		expect(getDaysInMonth(2026, 11)).toBe(31);
	});

	it("throws when the year is not an integer", () => {
		expect(() => getDaysInMonth(2026.5, 0)).toThrow(RangeError);
	});

	it("throws when the month is out of range", () => {
		expect(() => getDaysInMonth(2026, -1)).toThrow(RangeError);
		expect(() => getDaysInMonth(2026, 12)).toThrow(RangeError);
	});

	it("throws when the month is not an integer", () => {
		expect(() => getDaysInMonth(2026, 1.5)).toThrow(RangeError);
	});
});
