import { addMonths } from "../../src/date/addMonths";

describe("addMonths", () => {
	it("adds whole months", () => {
		const result = addMonths(new Date(2026, 0, 15), 2);
		expect(result.getMonth()).toBe(2);
		expect(result.getDate()).toBe(15);
	});

	it("clamps the day to the target month's last day", () => {
		const result = addMonths(new Date(2026, 0, 31), 1);
		expect(result.getMonth()).toBe(1);
		expect(result.getDate()).toBe(28);
	});

	it("subtracts months, crossing a year boundary", () => {
		const result = addMonths(new Date(2026, 0, 15), -2);
		expect(result.getFullYear()).toBe(2025);
		expect(result.getMonth()).toBe(10);
	});

	it("preserves the time of day", () => {
		const result = addMonths(new Date(2026, 0, 15, 9, 45), 1);
		expect(result.getHours()).toBe(9);
		expect(result.getMinutes()).toBe(45);
	});

	it("does not mutate the input", () => {
		const input = new Date(2026, 0, 15);
		addMonths(input, 1);
		expect(input.getMonth()).toBe(0);
	});

	it("returns an Invalid Date for an Invalid Date", () => {
		expect(Number.isNaN(addMonths(new Date(NaN), 1).getTime())).toBe(true);
	});

	it("throws when the amount is not an integer", () => {
		expect(() => addMonths(new Date(2026, 0, 15), 1.5)).toThrow(RangeError);
	});
});
