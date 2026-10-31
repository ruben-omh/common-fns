import { omit } from "../../src/object/omit";

describe("omit", () => {
	it("returns a new object without the listed keys", () => {
		expect(omit({ a: 1, b: 2, c: 3 }, ["b"])).toEqual({ a: 1, c: 3 });
	});

	it("does not mutate the source object", () => {
		const source = { a: 1, b: 2 };
		omit(source, ["b"]);
		expect(source).toEqual({ a: 1, b: 2 });
	});

	it("copies enumerable symbol keys but drops non-enumerable ones", () => {
		const kept = Symbol("kept");
		const hidden = Symbol("hidden");
		const source: Record<string | symbol, number> = { a: 1 };
		source[kept] = 2;
		Object.defineProperty(source, hidden, { value: 3, enumerable: false });

		const result = omit(source, ["a"]);
		expect(result[kept]).toBe(2);
		expect(Object.getOwnPropertySymbols(result)).toEqual([kept]);
	});

	it("uses the Set-backed path for many keys to omit", () => {
		const source = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9 };
		const result = omit(source, ["a", "b", "c", "d", "e", "f", "g", "h", "i"]);
		expect(result).toEqual({});
	});

	it("ignores keys the object does not have", () => {
		expect(omit({ a: 1 }, ["z"])).toEqual({ a: 1 });
	});
});
