import { cloneDate } from "../../src/date/cloneDate";

describe("cloneDate", () => {
	it("returns a new Date with the same time value", () => {
		const original = new Date(2026, 9, 28, 10, 30);
		const copy = cloneDate(original);
		expect(copy).not.toBe(original);
		expect(copy.getTime()).toBe(original.getTime());
	});

	it("copies an Invalid Date as an Invalid Date", () => {
		expect(Number.isNaN(cloneDate(new Date(NaN)).getTime())).toBe(true);
	});
});
