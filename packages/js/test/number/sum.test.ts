import { sum } from "../../src/number/sum";

describe("sum", () => {
	it("removes floating-point error with compensated summation", () => {
		expect(sum([0.1, 0.2, 0.3])).toBe(0.6);
	});

	it("returns 0 for an empty iterable", () => {
		expect(sum([])).toBe(0);
	});

	it("adds plain integers", () => {
		expect(sum([1, 2, 3, 4])).toBe(10);
	});

	it("accepts any iterable, not only arrays", () => {
		expect(sum(new Set([1, 2, 3]))).toBe(6);
	});

	it("compensates whether the running total or the value is larger", () => {
		// A large total followed by a small value, then the reverse order.
		expect(sum([1e16, 1, -1e16])).toBe(1);
		expect(sum([1, 1e16, -1e16])).toBe(1);
	});

	it("returns the infinity when the running total overflows", () => {
		expect(sum([Infinity, 1])).toBe(Infinity);
	});
});
