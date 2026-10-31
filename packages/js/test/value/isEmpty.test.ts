import { isEmpty } from "../../src/value/isEmpty";

describe("isEmpty", () => {
	describe("nullish", () => {
		it("treats null as empty", () => {
			expect(isEmpty(null)).toBe(true);
		});

		it("treats undefined as empty", () => {
			expect(isEmpty(undefined)).toBe(true);
		});
	});

	describe("strings", () => {
		it("treats an empty string as empty", () => {
			expect(isEmpty("")).toBe(true);
		});

		it("treats a non-empty string as not empty", () => {
			expect(isEmpty("x")).toBe(false);
		});
	});

	describe("non-container primitives and functions", () => {
		it("treats 0 as not empty", () => {
			expect(isEmpty(0)).toBe(false);
		});

		it("treats false as not empty", () => {
			expect(isEmpty(false)).toBe(false);
		});

		it("treats a function as not empty", () => {
			expect(isEmpty(() => undefined)).toBe(false);
		});
	});

	describe("arrays", () => {
		it("treats an empty array as empty", () => {
			expect(isEmpty([])).toBe(true);
		});

		it("treats a non-empty array as not empty", () => {
			expect(isEmpty([1])).toBe(false);
		});
	});

	describe("maps and sets", () => {
		it("treats an empty Map as empty", () => {
			expect(isEmpty(new Map())).toBe(true);
		});

		it("treats a non-empty Map as not empty", () => {
			expect(isEmpty(new Map([["a", 1]]))).toBe(false);
		});

		it("treats an empty Set as empty", () => {
			expect(isEmpty(new Set())).toBe(true);
		});

		it("treats a non-empty Set as not empty", () => {
			expect(isEmpty(new Set([1]))).toBe(false);
		});
	});

	describe("plain objects", () => {
		it("treats an empty object literal as empty", () => {
			expect(isEmpty({})).toBe(true);
		});

		it("treats an object with an own key as not empty", () => {
			expect(isEmpty({ a: 1 })).toBe(false);
		});

		it("treats a null-prototype object with no keys as empty", () => {
			expect(isEmpty(Object.create(null))).toBe(true);
		});

		it("treats a plain object whose only enumerable key is inherited as empty", () => {
			// Plain (prototype's prototype is null) but carries only an inherited enumerable key,
			// so the own-key scan finds nothing.
			const base = Object.create(null) as Record<string, unknown>;
			base.inherited = 1;
			const child = Object.create(base) as object;
			expect(isEmpty(child)).toBe(true);
		});
	});

	describe("other objects are never empty", () => {
		it("treats a Date as not empty", () => {
			expect(isEmpty(new Date())).toBe(false);
		});

		it("treats a class instance as not empty", () => {
			class Box {}
			expect(isEmpty(new Box())).toBe(false);
		});
	});
});
