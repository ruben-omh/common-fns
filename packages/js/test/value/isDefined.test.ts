import { isDefined } from "../../src/value/isDefined";

describe("isDefined", () => {
	it("returns false for null", () => {
		expect(isDefined(null)).toBe(false);
	});

	it("returns false for undefined", () => {
		expect(isDefined(undefined)).toBe(false);
	});

	it("returns true for a number, including 0", () => {
		expect(isDefined(0)).toBe(true);
	});

	it("returns true for an empty string", () => {
		expect(isDefined("")).toBe(true);
	});

	it("returns true for an object", () => {
		expect(isDefined({})).toBe(true);
	});

	it("drops nullish entries when used as an array filter", () => {
		const values: (number | null | undefined)[] = [1, null, 2, undefined, 3];
		expect(values.filter(isDefined)).toEqual([1, 2, 3]);
	});
});
