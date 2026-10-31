import { round } from "../../src/number/round";

describe("round", () => {
	it("rounds half away from zero at the given decimals", () => {
		expect(round(1.005, 2)).toBe(1.01);
	});

	it("rounds half away from zero for negative values", () => {
		expect(round(-2.5)).toBe(-3);
	});

	it("rounds positive halves up", () => {
		expect(round(2.5)).toBe(3);
		expect(round(0.5)).toBe(1);
	});

	it("rounds to tens and hundreds with negative decimals", () => {
		expect(round(1234, -2)).toBe(1200);
	});

	it("takes the fast path for values far from a half boundary", () => {
		expect(round(1.23456, 2)).toBe(1.23);
		expect(round(1.4)).toBe(1);
	});

	it("defaults to 0 decimals", () => {
		expect(round(2.4)).toBe(2);
	});

	it("returns NaN unchanged", () => {
		expect(round(NaN, 2)).toBeNaN();
	});

	it("returns an infinity unchanged", () => {
		expect(round(Infinity, 2)).toBe(Infinity);
	});

	it("throws when decimals is not an integer", () => {
		expect(() => round(1.5, 1.5)).toThrow(RangeError);
	});

	it("throws when decimals is below -15", () => {
		expect(() => round(1.5, -16)).toThrow(RangeError);
	});

	it("throws when decimals is above 15", () => {
		expect(() => round(1.5, 16)).toThrow(RangeError);
	});
});
