import { isDate } from "../../src/date/isDate";

describe("isDate", () => {
	it("returns true for a Date", () => {
		expect(isDate(new Date())).toBe(true);
	});

	it("returns true for an Invalid Date (still a Date)", () => {
		expect(isDate(new Date("nope"))).toBe(true);
	});

	it("returns false for a timestamp number", () => {
		expect(isDate(Date.now())).toBe(false);
	});

	it("returns false for null", () => {
		expect(isDate(null)).toBe(false);
	});

	it("returns false for a plain object", () => {
		expect(isDate({})).toBe(false);
	});

	it("returns false for an object that only mimics a Date's tag", () => {
		const fake = { [Symbol.toStringTag]: "Date" };
		expect(isDate(fake)).toBe(false);
	});
});
