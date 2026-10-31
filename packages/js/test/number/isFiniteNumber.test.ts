import { isFiniteNumber } from "../../src/number/isFiniteNumber";

describe("isFiniteNumber", () => {
	it("returns true for a finite number", () => {
		expect(isFiniteNumber(42)).toBe(true);
		expect(isFiniteNumber(0)).toBe(true);
		expect(isFiniteNumber(-3.5)).toBe(true);
	});

	it("returns false for the infinities", () => {
		expect(isFiniteNumber(Infinity)).toBe(false);
		expect(isFiniteNumber(-Infinity)).toBe(false);
	});

	it("returns false for NaN", () => {
		expect(isFiniteNumber(NaN)).toBe(false);
	});

	it("returns false for a numeric string", () => {
		expect(isFiniteNumber("42")).toBe(false);
	});

	it("returns false for null and undefined", () => {
		expect(isFiniteNumber(null)).toBe(false);
		expect(isFiniteNumber(undefined)).toBe(false);
	});
});
