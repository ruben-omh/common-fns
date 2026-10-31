import { isNumber } from "../../src/number/isNumber";

describe("isNumber", () => {
	it("returns true for a primitive number", () => {
		expect(isNumber(42)).toBe(true);
	});

	it("returns true for NaN and the infinities", () => {
		expect(isNumber(NaN)).toBe(true);
		expect(isNumber(Infinity)).toBe(true);
	});

	it("returns false for a numeric string", () => {
		expect(isNumber("42")).toBe(false);
	});

	it("returns false for a boxed Number object", () => {
		expect(isNumber(new Number(5))).toBe(false);
	});

	it("returns false for null and undefined", () => {
		expect(isNumber(null)).toBe(false);
		expect(isNumber(undefined)).toBe(false);
	});
});
