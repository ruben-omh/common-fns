import { addYears } from "../../src/date/addYears";

describe("addYears", () => {
	it("adds whole years", () => {
		const result = addYears(new Date(2026, 5, 15), 2);
		expect(result.getFullYear()).toBe(2028);
		expect(result.getMonth()).toBe(5);
		expect(result.getDate()).toBe(15);
	});

	it("moves Feb 29 to Feb 28 in a non-leap target year", () => {
		const result = addYears(new Date(2024, 1, 29), 1);
		expect(result.getFullYear()).toBe(2025);
		expect(result.getMonth()).toBe(1);
		expect(result.getDate()).toBe(28);
	});

	it("subtracts years when the amount is negative", () => {
		expect(addYears(new Date(2026, 0, 1), -1).getFullYear()).toBe(2025);
	});

	it("returns an Invalid Date for an Invalid Date", () => {
		expect(Number.isNaN(addYears(new Date(NaN), 1).getTime())).toBe(true);
	});

	it("throws when the amount is not an integer", () => {
		expect(() => addYears(new Date(2026, 0, 1), 1.5)).toThrow(RangeError);
	});
});
