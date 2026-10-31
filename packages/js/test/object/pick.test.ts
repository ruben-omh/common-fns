import { pick } from "../../src/object/pick";

describe("pick", () => {
	it("returns a new object with only the listed keys", () => {
		expect(pick({ a: 1, b: 2, c: 3 }, ["a", "c"])).toEqual({ a: 1, c: 3 });
	});

	it("does not mutate the source object", () => {
		const source = { a: 1, b: 2 };
		pick(source, ["a"]);
		expect(source).toEqual({ a: 1, b: 2 });
	});

	it("leaves a missing key missing rather than undefined", () => {
		const result = pick({ a: 1 }, ["a", "b"]);
		expect(Object.hasOwn(result, "b")).toBe(false);
	});

	it("ignores inherited properties", () => {
		const base = { inherited: 1 };
		const source = Object.create(base) as { inherited: number; own: number };
		source.own = 2;
		expect(pick(source, ["inherited", "own"])).toEqual({ own: 2 });
	});

	it("returns an empty object for an empty key list", () => {
		expect(pick({ a: 1 }, [])).toEqual({});
	});
});
