import { addDays } from "../../src/date/addDays";

describe("addDays", () => {
	it("adds calendar days across a month boundary", () => {
		const result = addDays(new Date(2026, 9, 28), 5);
		expect(result.getFullYear()).toBe(2026);
		expect(result.getMonth()).toBe(10);
		expect(result.getDate()).toBe(2);
	});

	it("subtracts days when the amount is negative", () => {
		const result = addDays(new Date(2026, 10, 2), -5);
		expect(result.getMonth()).toBe(9);
		expect(result.getDate()).toBe(28);
	});

	it("preserves the time of day", () => {
		const result = addDays(new Date(2026, 9, 28, 13, 30, 15), 1);
		expect(result.getHours()).toBe(13);
		expect(result.getMinutes()).toBe(30);
		expect(result.getSeconds()).toBe(15);
	});

	it("does not mutate the input", () => {
		const input = new Date(2026, 9, 28);
		addDays(input, 5);
		expect(input.getDate()).toBe(28);
	});

	it("returns an Invalid Date for an Invalid Date", () => {
		expect(Number.isNaN(addDays(new Date(NaN), 1).getTime())).toBe(true);
	});

	it("throws when the amount is not an integer", () => {
		expect(() => addDays(new Date(2026, 9, 28), 1.5)).toThrow(RangeError);
	});
});
