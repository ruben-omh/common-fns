import { clampToBounds } from "../../src/date/clampToBounds";

const bounds = { min: new Date(2026, 0, 1), max: new Date(2026, 11, 31) };

describe("clampToBounds", () => {
	it("moves a day after max to max's day, keeping the time", () => {
		const result = clampToBounds(new Date(2027, 2, 15, 10, 30), bounds);
		expect(result.getFullYear()).toBe(2026);
		expect(result.getMonth()).toBe(11);
		expect(result.getDate()).toBe(31);
		expect(result.getHours()).toBe(10);
		expect(result.getMinutes()).toBe(30);
	});

	it("moves a day before min to min's day, keeping the time", () => {
		const result = clampToBounds(new Date(2025, 5, 1, 8, 15), bounds);
		expect(result.getFullYear()).toBe(2026);
		expect(result.getMonth()).toBe(0);
		expect(result.getDate()).toBe(1);
		expect(result.getHours()).toBe(8);
	});

	it("returns an unchanged copy when within bounds", () => {
		const input = new Date(2026, 5, 15, 12, 0);
		const result = clampToBounds(input, bounds);
		expect(result).not.toBe(input);
		expect(result.getTime()).toBe(input.getTime());
	});

	it("treats a missing min as no lower limit", () => {
		const result = clampToBounds(new Date(1990, 0, 1, 7, 0), { max: new Date(2026, 11, 31) });
		expect(result.getFullYear()).toBe(1990);
	});

	it("treats a missing max as no upper limit", () => {
		const result = clampToBounds(new Date(2100, 0, 1, 7, 0), { min: new Date(2026, 0, 1) });
		expect(result.getFullYear()).toBe(2100);
	});

	it("returns an Invalid Date for an Invalid Date", () => {
		expect(Number.isNaN(clampToBounds(new Date(NaN), bounds).getTime())).toBe(true);
	});
});
