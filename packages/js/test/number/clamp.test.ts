import { clamp } from "../../src/number/clamp";

describe("clamp", () => {
	it("returns the value when it is within range", () => {
		expect(clamp(5, 0, 10)).toBe(5);
	});

	it("returns min when the value is below range", () => {
		expect(clamp(-3, 0, 10)).toBe(0);
	});

	it("returns max when the value is above range", () => {
		expect(clamp(42, 0, 10)).toBe(10);
	});

	it("returns the bound when the value equals it", () => {
		expect(clamp(0, 0, 10)).toBe(0);
		expect(clamp(10, 0, 10)).toBe(10);
	});

	it("propagates NaN rather than snapping to a bound", () => {
		expect(clamp(NaN, 0, 10)).toBeNaN();
	});

	it("throws a RangeError when min is greater than max", () => {
		expect(() => clamp(5, 10, 0)).toThrow(RangeError);
	});
});
