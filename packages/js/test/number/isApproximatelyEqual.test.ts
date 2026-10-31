import { isApproximatelyEqual } from "../../src/number/isApproximatelyEqual";

describe("isApproximatelyEqual", () => {
	it("treats floating-point rounding as equal", () => {
		expect(isApproximatelyEqual(0.1 + 0.2, 0.3)).toBe(true);
	});

	it("returns true for exactly equal values", () => {
		expect(isApproximatelyEqual(1, 1)).toBe(true);
	});

	it("treats equal infinities as equal", () => {
		expect(isApproximatelyEqual(Infinity, Infinity)).toBe(true);
	});

	it("returns false when only the first value is infinite", () => {
		expect(isApproximatelyEqual(Infinity, 1)).toBe(false);
	});

	it("returns false when only the second value is infinite", () => {
		expect(isApproximatelyEqual(1, Infinity)).toBe(false);
	});

	it("never treats NaN as equal to anything", () => {
		expect(isApproximatelyEqual(NaN, NaN)).toBe(false);
	});

	it("honors a custom relative tolerance", () => {
		expect(isApproximatelyEqual(1, 1.000001, { relativeTolerance: 1e-3 })).toBe(true);
	});

	it("returns false when the difference exceeds the tolerance", () => {
		expect(isApproximatelyEqual(1, 1.5)).toBe(false);
	});

	it("honors an absolute tolerance when comparing against 0", () => {
		expect(isApproximatelyEqual(0.1 + 0.2 - 0.3, 0, { absoluteTolerance: 1e-12 })).toBe(true);
	});

	it("throws when the relative tolerance is NaN", () => {
		expect(() => isApproximatelyEqual(1, 1, { relativeTolerance: NaN })).toThrow(RangeError);
	});

	it("throws when the absolute tolerance is NaN", () => {
		expect(() => isApproximatelyEqual(1, 1, { absoluteTolerance: NaN })).toThrow(RangeError);
	});

	it("throws when the relative tolerance is negative", () => {
		expect(() => isApproximatelyEqual(1, 1, { relativeTolerance: -1 })).toThrow(RangeError);
	});

	it("throws when the absolute tolerance is negative", () => {
		expect(() => isApproximatelyEqual(1, 1, { absoluteTolerance: -1 })).toThrow(RangeError);
	});
});
