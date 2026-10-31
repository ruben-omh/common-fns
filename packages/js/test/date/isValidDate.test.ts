import { isValidDate } from "../../src/date/isValidDate";

describe("isValidDate", () => {
	it("returns true for a valid Date", () => {
		expect(isValidDate(new Date(2026, 9, 28))).toBe(true);
	});

	it("returns false for an Invalid Date", () => {
		expect(isValidDate(new Date("nope"))).toBe(false);
	});

	it("returns false for a non-Date", () => {
		expect(isValidDate(Date.now())).toBe(false);
		expect(isValidDate(null)).toBe(false);
		expect(isValidDate({})).toBe(false);
	});
});
