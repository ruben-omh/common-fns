import { isWithinBounds } from "../../src/date/isWithinBounds";

describe("isWithinBounds", () => {
	it("compares exact moments, inclusive of min", () => {
		expect(isWithinBounds(new Date(2026, 11, 31, 10), { min: new Date(2026, 11, 31) })).toBe(true);
	});

	it("returns false for a moment after an inclusive max", () => {
		expect(isWithinBounds(new Date(2026, 11, 31, 10), { max: new Date(2026, 11, 31) })).toBe(false);
	});

	it("returns true for a moment at or before max", () => {
		expect(
			isWithinBounds(new Date(2026, 11, 31, 0, 0), { max: new Date(2026, 11, 31, 0, 0) }),
		).toBe(true);
	});

	it("returns false before an inclusive min", () => {
		expect(isWithinBounds(new Date(2026, 0, 1), { min: new Date(2026, 6, 1) })).toBe(false);
	});

	it("returns false for an Invalid Date", () => {
		expect(isWithinBounds(new Date(NaN), { min: new Date(2026, 0, 1) })).toBe(false);
	});

	it("allows any moment for empty bounds", () => {
		expect(isWithinBounds(new Date(2026, 5, 15), {})).toBe(true);
	});
});
