import { getOrInsertComputed } from "../../src/map/getOrInsertComputed";

describe("getOrInsertComputed", () => {
	it("returns the existing value without recomputing", () => {
		const map = new Map([["a", 1]]);
		const compute = jest.fn(() => 99);
		expect(getOrInsertComputed(map, "a", compute)).toBe(1);
		expect(compute).not.toHaveBeenCalled();
	});

	it("computes, stores and returns a missing value", () => {
		const map = new Map<string, number>();
		expect(getOrInsertComputed(map, "a", () => 42)).toBe(42);
		expect(map.get("a")).toBe(42);
	});

	it("passes the key to the compute function", () => {
		const map = new Map<string, string>();
		getOrInsertComputed(map, "key", (key) => `value-for-${key}`);
		expect(map.get("key")).toBe("value-for-key");
	});

	it("treats a stored undefined as present and does not recompute", () => {
		const map = new Map<string, number | undefined>([["a", undefined]]);
		const compute = jest.fn(() => 1);
		expect(getOrInsertComputed(map, "a", compute)).toBeUndefined();
		expect(compute).not.toHaveBeenCalled();
	});

	it("builds up groups when used with array values", () => {
		const groups = new Map<number, string[]>();
		getOrInsertComputed(groups, 1, () => []).push("a");
		getOrInsertComputed(groups, 1, () => []).push("b");
		expect(groups.get(1)).toEqual(["a", "b"]);
	});

	it("works with a WeakMap", () => {
		const map = new WeakMap<object, number>();
		const key = {};
		expect(getOrInsertComputed(map, key, () => 7)).toBe(7);
		expect(map.get(key)).toBe(7);
	});
});
