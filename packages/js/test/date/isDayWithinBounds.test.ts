import { isDayWithinBounds } from "../../src/date/isDayWithinBounds";

const bounds = { min: new Date(2026, 0, 1), max: new Date(2026, 11, 31) };

describe("isDayWithinBounds", () => {
	it("returns true within bounds, ignoring the time of day", () => {
		expect(isDayWithinBounds(new Date(2026, 11, 31, 23, 59), bounds)).toBe(true);
		expect(isDayWithinBounds(new Date(2026, 0, 1, 0, 0), bounds)).toBe(true);
	});

	it("returns false below min and above max", () => {
		expect(isDayWithinBounds(new Date(2025, 11, 31), bounds)).toBe(false);
		expect(isDayWithinBounds(new Date(2027, 0, 1), bounds)).toBe(false);
	});

	it("returns false for an Invalid Date", () => {
		expect(isDayWithinBounds(new Date(NaN), bounds)).toBe(false);
	});

	it("treats a missing min as no lower limit", () => {
		expect(isDayWithinBounds(new Date(1900, 0, 1), { max: new Date(2026, 11, 31) })).toBe(true);
	});

	it("treats a missing max as no upper limit", () => {
		expect(isDayWithinBounds(new Date(2200, 0, 1), { min: new Date(2026, 0, 1) })).toBe(true);
	});
});
