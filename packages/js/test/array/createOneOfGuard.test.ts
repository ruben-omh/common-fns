import { createOneOfGuard } from "../../src/array/createOneOfGuard";

describe("createOneOfGuard", () => {
	const isDirection = createOneOfGuard(["up", "down", "left", "right"]);

	it("returns true for a value in the options", () => {
		expect(isDirection("up")).toBe(true);
		expect(isDirection("right")).toBe(true);
	});

	it("returns false for a value not in the options", () => {
		expect(isDirection("sideways")).toBe(false);
	});

	it("returns false for a value of a different type", () => {
		expect(isDirection(42)).toBe(false);
		expect(isDirection(null)).toBe(false);
	});

	it("uses SameValueZero, so NaN matches NaN", () => {
		const isValue = createOneOfGuard([NaN, 1]);
		expect(isValue(NaN)).toBe(true);
	});
});
