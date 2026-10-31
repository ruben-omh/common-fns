import { mapObjectValues } from "../../src/object/mapObjectValues";

describe("mapObjectValues", () => {
	it("transforms every value, keeping keys", () => {
		expect(mapObjectValues({ a: 1, b: 2 }, (n) => n * 10)).toEqual({ a: 10, b: 20 });
	});

	it("passes the key to the transform", () => {
		expect(mapObjectValues({ a: 1 }, (value, key) => `${key}=${value}`)).toEqual({ a: "a=1" });
	});

	it("does not mutate the source object", () => {
		const source = { a: 1 };
		mapObjectValues(source, (n) => n + 1);
		expect(source).toEqual({ a: 1 });
	});

	it("returns an empty object for an empty source", () => {
		expect(mapObjectValues({}, (value) => value)).toEqual({});
	});
});
