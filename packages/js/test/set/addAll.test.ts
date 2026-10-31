import { addAll } from "../../src/set/addAll";

describe("addAll", () => {
	it("adds every value and returns how many were new", () => {
		const tags = new Set(["a"]);
		expect(addAll(tags, ["a", "b", "c"])).toBe(2);
		expect([...tags]).toEqual(["a", "b", "c"]);
	});

	it("mutates the set in place", () => {
		const set = new Set<number>();
		addAll(set, [1, 2]);
		expect(set.has(1)).toBe(true);
		expect(set.has(2)).toBe(true);
	});

	it("returns 0 when every value is already present", () => {
		const set = new Set([1, 2]);
		expect(addAll(set, [1, 2])).toBe(0);
	});

	it("accepts any iterable, not only arrays", () => {
		const set = new Set<number>();
		expect(addAll(set, new Set([1, 2, 3]))).toBe(3);
	});

	it("returns 0 for an empty iterable", () => {
		const set = new Set([1]);
		expect(addAll(set, [])).toBe(0);
	});
});
