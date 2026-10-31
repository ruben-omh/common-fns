import { uniqueBy } from "../../src/array/uniqueBy";

describe("uniqueBy", () => {
	it("keeps the first occurrence of each key and preserves order", () => {
		const events = [
			{ id: 1, v: "a" },
			{ id: 2, v: "b" },
			{ id: 1, v: "c" },
		];
		expect(uniqueBy(events, (event) => event.id)).toEqual([
			{ id: 1, v: "a" },
			{ id: 2, v: "b" },
		]);
	});

	it("passes the index to the key function", () => {
		expect(uniqueBy(["a", "b", "c"], (_, index) => index % 2)).toEqual(["a", "b"]);
	});

	it("does not mutate the source array", () => {
		const source = [{ id: 1 }, { id: 1 }];
		uniqueBy(source, (item) => item.id);
		expect(source).toHaveLength(2);
	});

	it("returns an empty array for an empty input", () => {
		expect(uniqueBy([], (item) => item)).toEqual([]);
	});

	it("compares keys with SameValueZero, so NaN is one key", () => {
		expect(uniqueBy([1, 2, 3], () => NaN)).toEqual([1]);
	});
});
