import { deleteAll } from "../../src/set/deleteAll";

describe("deleteAll", () => {
	it("removes every present value and returns how many were removed", () => {
		const tags = new Set(["a", "b", "c"]);
		expect(deleteAll(tags, ["b", "x"])).toBe(1);
		expect([...tags]).toEqual(["a", "c"]);
	});

	it("does not count values that were absent", () => {
		const set = new Set([1]);
		expect(deleteAll(set, [2, 3])).toBe(0);
	});

	it("mutates the set in place", () => {
		const set = new Set([1, 2, 3]);
		deleteAll(set, [1, 2, 3]);
		expect(set.size).toBe(0);
	});

	it("accepts any iterable, not only arrays", () => {
		const set = new Set([1, 2, 3]);
		expect(deleteAll(set, new Set([1, 3]))).toBe(2);
	});

	it("returns 0 for an empty iterable", () => {
		const set = new Set([1]);
		expect(deleteAll(set, [])).toBe(0);
	});
});
