import { getDayNumber } from "../../src/date/getDayNumber";

describe("getDayNumber", () => {
	it("encodes the local calendar day as YYYYMMDD", () => {
		expect(getDayNumber(new Date(2026, 9, 28))).toBe(20261028);
	});

	it("ignores the time of day", () => {
		expect(getDayNumber(new Date(2026, 9, 28, 23, 59))).toBe(20261028);
	});

	it("sorts in calendar order", () => {
		expect(getDayNumber(new Date(2026, 0, 1))).toBeLessThan(getDayNumber(new Date(2026, 11, 31)));
	});

	it("returns NaN for an Invalid Date", () => {
		expect(getDayNumber(new Date(NaN))).toBeNaN();
	});
});
