import { inRange } from "../../src/number/inRange";

describe("inRange", () => {
	it("returns true within the inclusive range", () => {
		expect(inRange(5, 0, 10)).toBe(true);
		expect(inRange(0, 0, 10)).toBe(true);
		expect(inRange(10, 0, 10)).toBe(true);
	});

	it("returns false outside the range", () => {
		expect(inRange(-1, 0, 10)).toBe(false);
		expect(inRange(11, 0, 10)).toBe(false);
	});

	it("returns false for NaN as the value", () => {
		expect(inRange(NaN, 0, 10)).toBe(false);
	});

	it("throws when min is NaN", () => {
		expect(() => inRange(5, NaN, 10)).toThrow(RangeError);
	});

	it("throws when max is NaN", () => {
		expect(() => inRange(5, 0, NaN)).toThrow(RangeError);
	});

	it("throws when min is greater than max", () => {
		expect(() => inRange(5, 10, 0)).toThrow(RangeError);
	});
});
