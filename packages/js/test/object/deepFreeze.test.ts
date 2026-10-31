import { deepFreeze } from "../../src/object/deepFreeze";

describe("deepFreeze", () => {
	it("freezes the top-level object", () => {
		const frozen = deepFreeze({ a: 1 });
		expect(Object.isFrozen(frozen)).toBe(true);
	});

	it("freezes nested objects", () => {
		const frozen = deepFreeze({ picker: { weekStartsOn: 1 } });
		expect(Object.isFrozen(frozen.picker)).toBe(true);
	});

	it("freezes nested arrays", () => {
		const frozen = deepFreeze({ list: [1, 2, 3] });
		expect(Object.isFrozen(frozen.list)).toBe(true);
	});

	it("freezes function values reachable through properties", () => {
		const fn = (): number => 1;
		const frozen = deepFreeze({ fn });
		expect(Object.isFrozen(frozen.fn)).toBe(true);
	});

	it("returns a non-object value unchanged", () => {
		expect(deepFreeze(42)).toBe(42);
		expect(deepFreeze(null)).toBe(null);
	});

	it("freezes a function passed directly", () => {
		const fn = (): number => 1;
		expect(deepFreeze(fn)).toBe(fn);
		expect(Object.isFrozen(fn)).toBe(true);
	});

	it("does not call getters", () => {
		let called = false;
		const value = {
			get trap() {
				called = true;
				return 1;
			},
		};
		deepFreeze(value);
		expect(called).toBe(false);
	});

	it("handles circular references", () => {
		const a: Record<string, unknown> = {};
		a.self = a;
		expect(() => deepFreeze(a)).not.toThrow();
		expect(Object.isFrozen(a)).toBe(true);
	});

	it("skips typed arrays, which cannot be frozen", () => {
		const value = { bytes: new Uint8Array([1, 2, 3]) };
		expect(() => deepFreeze(value)).not.toThrow();
		expect(Object.isFrozen(value)).toBe(true);
		expect(Object.isFrozen(value.bytes)).toBe(false);
	});
});
