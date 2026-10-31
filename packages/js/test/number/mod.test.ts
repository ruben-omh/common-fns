import { mod } from "../../src/number/mod";

describe("mod", () => {
	it("wraps a negative dividend to the sign of the divisor", () => {
		expect(mod(-1, 7)).toBe(6);
	});

	it("matches the remainder when signs already agree", () => {
		expect(mod(8, 7)).toBe(1);
	});

	it("carries the sign of a negative divisor", () => {
		expect(mod(1, -7)).toBe(-6);
	});

	it("returns a positive zero rather than negative zero", () => {
		const result = mod(-7, 7);
		expect(result).toBe(0);
		expect(Object.is(result, -0)).toBe(false);
	});

	it("throws when the divisor is 0", () => {
		expect(() => mod(5, 0)).toThrow(RangeError);
	});

	it("throws when the divisor is not finite", () => {
		expect(() => mod(5, Infinity)).toThrow(RangeError);
	});
});
