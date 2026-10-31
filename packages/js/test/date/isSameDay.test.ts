import { isSameDay } from "../../src/date/isSameDay";

describe("isSameDay", () => {
	it("returns true for the same calendar day regardless of time", () => {
		expect(isSameDay(new Date(2026, 9, 28, 9), new Date(2026, 9, 28, 23))).toBe(true);
	});

	it("returns false for different days in the same month", () => {
		expect(isSameDay(new Date(2026, 9, 28), new Date(2026, 9, 29))).toBe(false);
	});

	it("returns false for the same day number in different months", () => {
		expect(isSameDay(new Date(2026, 8, 28), new Date(2026, 9, 28))).toBe(false);
	});
});
