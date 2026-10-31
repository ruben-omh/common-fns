import { omitUndefined } from "../../src/object/omitUndefined";

describe("omitUndefined", () => {
	it("drops properties whose value is undefined", () => {
		expect(omitUndefined({ locale: "es-MX", order: undefined })).toEqual({ locale: "es-MX" });
	});

	it("keeps null values", () => {
		expect(omitUndefined({ locale: null })).toEqual({ locale: null });
	});

	it("keeps falsy values that are not undefined", () => {
		expect(omitUndefined({ a: 0, b: "", c: false })).toEqual({ a: 0, b: "", c: false });
	});

	it("does not mutate the source object", () => {
		const source = { a: 1, b: undefined };
		omitUndefined(source);
		expect(Object.hasOwn(source, "b")).toBe(true);
	});

	it("returns an empty object when every value is undefined", () => {
		expect(omitUndefined({ a: undefined, b: undefined })).toEqual({});
	});
});
