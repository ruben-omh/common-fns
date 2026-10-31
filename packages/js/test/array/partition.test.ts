import { partition } from "../../src/array/partition";

describe("partition", () => {
	it("splits into matching and remaining, preserving order", () => {
		const [even, odd] = partition([1, 2, 3, 4, 5], (n) => n % 2 === 0);
		expect(even).toEqual([2, 4]);
		expect(odd).toEqual([1, 3, 5]);
	});

	it("passes the index to the predicate", () => {
		const [firstHalf, rest] = partition(["a", "b", "c", "d"], (_, index) => index < 2);
		expect(firstHalf).toEqual(["a", "b"]);
		expect(rest).toEqual(["c", "d"]);
	});

	it("returns two empty arrays for an empty input", () => {
		expect(partition([], () => true)).toEqual([[], []]);
	});

	it("puts everything in the first array when all match", () => {
		expect(partition([1, 2], () => true)).toEqual([[1, 2], []]);
	});

	it("narrows the types when the predicate is a type guard", () => {
		const mixed: (string | number)[] = [1, "a", 2, "b"];
		const [strings, others] = partition(
			mixed,
			(value): value is string => typeof value === "string",
		);
		expect(strings).toEqual(["a", "b"]);
		expect(others).toEqual([1, 2]);
	});
});
