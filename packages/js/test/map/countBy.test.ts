import { countBy } from "../../src/map/countBy";

describe("countBy", () => {
	it("counts elements per key", () => {
		const counts = countBy(["a", "b", "a", "a", "b"], (letter) => letter);
		expect(counts.get("a")).toBe(3);
		expect(counts.get("b")).toBe(2);
	});

	it("keeps keys in order of first appearance", () => {
		const counts = countBy([3, 1, 3, 2], (n) => n);
		expect([...counts.keys()]).toEqual([3, 1, 2]);
	});

	it("accepts any iterable, not only arrays", () => {
		const counts = countBy(new Set([1, 2, 3]), (n) => (n % 2 === 0 ? "even" : "odd"));
		expect(counts.get("odd")).toBe(2);
		expect(counts.get("even")).toBe(1);
	});

	it("returns an empty Map for an empty iterable", () => {
		expect(countBy([], (item) => item).size).toBe(0);
	});
});
