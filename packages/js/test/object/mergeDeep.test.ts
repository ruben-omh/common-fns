import { mergeDeep } from "../../src/object/mergeDeep";

describe("mergeDeep", () => {
	it("merges plain objects recursively", () => {
		const base = { picker: { weekStartsOn: 0, locale: "en" } };
		const result = mergeDeep(base, { picker: { weekStartsOn: 1 } });
		expect(result).toEqual({ picker: { weekStartsOn: 1, locale: "en" } });
	});

	it("applies overrides in order", () => {
		const result = mergeDeep({ a: 1 }, { a: 2 }, { a: 3 });
		expect(result.a).toBe(3);
	});

	it("does not mutate the base or the overrides", () => {
		const base = { nested: { a: 1, b: 0 } };
		const override = { nested: { b: 2 } };
		mergeDeep(base, override);
		expect(base).toEqual({ nested: { a: 1, b: 0 } });
		expect(override).toEqual({ nested: { b: 2 } });
	});

	it("replaces arrays rather than merging them", () => {
		const result = mergeDeep({ list: [1, 2] }, { list: [3] });
		expect(result.list).toEqual([3]);
	});

	it("replaces a plain object with a non-plain value", () => {
		const base = { when: { a: 1 } as unknown };
		const date = new Date(2026, 0, 1);
		const result = mergeDeep(base, { when: date });
		expect(result.when).toBe(date);
	});

	it("deep-copies a plain-object override when the base has no such key", () => {
		const override = { added: { deep: 1 } };
		const result = mergeDeep({}, override);
		expect(result.added).toEqual({ deep: 1 });
		expect(result.added).not.toBe(override.added);
	});

	it("skips undefined values so they never erase a default", () => {
		const result = mergeDeep({ locale: "es-MX" }, { locale: undefined });
		expect(result.locale).toBe("es-MX");
	});

	it("lets null replace a value", () => {
		const result = mergeDeep({ locale: "es-MX" }, { locale: null });
		expect(result.locale).toBeNull();
	});

	it("skips an undefined override argument", () => {
		const result = mergeDeep({ a: 1 }, undefined, { a: 2 });
		expect(result.a).toBe(2);
	});

	it("skips a null override argument", () => {
		const result = mergeDeep({ a: 1 }, null as unknown as undefined, { a: 2 });
		expect(result.a).toBe(2);
	});

	it("treats a __proto__ key as an ordinary own property (no prototype pollution)", () => {
		const base = {};
		const malicious = JSON.parse('{"__proto__": {"polluted": true}}') as object;
		const result = mergeDeep(base, malicious);
		expect(Object.hasOwn(result, "__proto__")).toBe(true);
		expect((result as Record<string, unknown>).polluted).toBeUndefined();
		expect(({} as Record<string, unknown>).polluted).toBeUndefined();
	});

	it("throws when an override contains a circular reference", () => {
		const override: Record<string, unknown> = {};
		override.self = override;
		expect(() => mergeDeep({}, override)).toThrow(TypeError);
	});
});
