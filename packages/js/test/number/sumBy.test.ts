import { sumBy } from "../../src/number/sumBy";

describe("sumBy", () => {
	it("sums the selected value over each item", () => {
		const events = [{ minutes: 30 }, { minutes: 45 }, { minutes: 15 }];
		expect(sumBy(events, (event) => event.minutes)).toBe(90);
	});

	it("returns 0 for an empty iterable", () => {
		expect(sumBy([], () => 1)).toBe(0);
	});

	it("removes floating-point error with compensated summation", () => {
		expect(sumBy([0.1, 0.2, 0.3], (n) => n)).toBe(0.6);
	});

	it("accepts any iterable, not only arrays", () => {
		expect(sumBy(new Set([1, 2, 3]), (n) => n)).toBe(6);
	});

	it("compensates whether the running total or the value is larger", () => {
		expect(sumBy([1e16, 1, -1e16], (n) => n)).toBe(1);
		expect(sumBy([1, 1e16, -1e16], (n) => n)).toBe(1);
	});

	it("returns the infinity when the running total overflows", () => {
		expect(sumBy([Infinity, 1], (n) => n)).toBe(Infinity);
	});
});
