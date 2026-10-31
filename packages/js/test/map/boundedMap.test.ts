import { BoundedMap } from "../../src/map/boundedMap";

describe("BoundedMap", () => {
	describe("construction", () => {
		it("throws when maxSize is not a positive integer", () => {
			expect(() => new BoundedMap(0)).toThrow(RangeError);
			expect(() => new BoundedMap(-1)).toThrow(RangeError);
			expect(() => new BoundedMap(1.5)).toThrow(RangeError);
		});

		it("exposes maxSize", () => {
			expect(new BoundedMap(3).maxSize).toBe(3);
		});

		it("is a real Map", () => {
			const map = new BoundedMap<string, number>(3);
			expect(map).toBeInstanceOf(Map);
		});

		it("accepts initial entries", () => {
			const map = new BoundedMap<string, number>(3, [
				["a", 1],
				["b", 2],
			]);
			expect(map.get("a")).toBe(1);
			expect(map.get("b")).toBe(2);
			expect(map.size).toBe(2);
		});

		it("treats a null entries argument as no initial entries", () => {
			const map = new BoundedMap<string, number>(2, null);
			expect(map.size).toBe(0);
		});

		it("evicts while filling when more than maxSize entries are given", () => {
			const map = new BoundedMap<string, number>(2, [
				["a", 1],
				["b", 2],
				["c", 3],
			]);
			expect(map.size).toBe(2);
			expect(map.has("a")).toBe(false);
			expect([...map.keys()]).toEqual(["b", "c"]);
		});
	});

	describe("eviction on set", () => {
		it("evicts the oldest entry when a new key is added while full", () => {
			const map = new BoundedMap<string, number>(2);
			map.set("a", 1);
			map.set("b", 2);
			map.set("c", 3);
			expect(map.has("a")).toBe(false);
			expect([...map.keys()]).toEqual(["b", "c"]);
		});

		it("keeps position and does not evict when updating an existing key", () => {
			const map = new BoundedMap<string, number>(2);
			map.set("a", 1);
			map.set("b", 2);
			map.set("a", 10);
			expect(map.size).toBe(2);
			expect(map.get("a")).toBe(10);
			expect([...map.keys()]).toEqual(["a", "b"]);
		});

		it("returns the map from set for chaining", () => {
			const map = new BoundedMap<string, number>(2);
			expect(map.set("a", 1)).toBe(map);
		});
	});
});
