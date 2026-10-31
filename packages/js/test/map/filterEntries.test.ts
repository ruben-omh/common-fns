import { filterEntries } from "../../src/map/filterEntries";

describe("filterEntries", () => {
	it("keeps only the entries matching the predicate", () => {
		const source = new Map([
			["a", 1],
			["b", 4],
			["c", 2],
		]);
		const result = filterEntries(source, (value) => value > 1);
		expect([...result]).toEqual([
			["b", 4],
			["c", 2],
		]);
	});

	it("passes the key to the predicate", () => {
		const source = new Map([
			["keep", 1],
			["drop", 2],
		]);
		const result = filterEntries(source, (_, key) => key === "keep");
		expect([...result.keys()]).toEqual(["keep"]);
	});

	it("does not mutate the source map", () => {
		const source = new Map([["a", 1]]);
		filterEntries(source, () => false);
		expect(source.size).toBe(1);
	});

	it("returns an empty Map when nothing matches", () => {
		const source = new Map([["a", 1]]);
		expect(filterEntries(source, () => false).size).toBe(0);
	});

	it("narrows value types with a type-guard predicate", () => {
		const source = new Map<string, string | number>([
			["a", 1],
			["b", "x"],
		]);
		const result = filterEntries(source, (value): value is number => typeof value === "number");
		expect([...result]).toEqual([["a", 1]]);
	});
});
