import { mapValues } from "../../src/map/mapValues";

describe("mapValues", () => {
	it("transforms every value, keeping keys and order", () => {
		const source = new Map([
			["a", 1],
			["b", 2],
		]);
		const result = mapValues(source, (value) => value * 10);
		expect([...result]).toEqual([
			["a", 10],
			["b", 20],
		]);
	});

	it("passes the key to the transform", () => {
		const source = new Map([["a", 1]]);
		const result = mapValues(source, (value, key) => `${key}=${value}`);
		expect(result.get("a")).toBe("a=1");
	});

	it("does not mutate the source map", () => {
		const source = new Map([["a", 1]]);
		mapValues(source, (value) => value + 1);
		expect(source.get("a")).toBe(1);
	});

	it("returns an empty Map for an empty source", () => {
		expect(mapValues(new Map<string, number>(), (value) => value).size).toBe(0);
	});
});
