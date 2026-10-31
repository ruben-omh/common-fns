import { lerp } from "../../src/number/lerp";

describe("lerp", () => {
	it("interpolates between start and end", () => {
		expect(lerp(10, 20, 0.25)).toBe(12.5);
	});

	it("returns exactly start at t = 0", () => {
		expect(lerp(10, 20, 0)).toBe(10);
	});

	it("returns exactly end at t = 1", () => {
		expect(lerp(10, 20, 1)).toBe(20);
	});

	it("extrapolates for t outside 0 to 1", () => {
		expect(lerp(10, 20, 2)).toBe(30);
		expect(lerp(10, 20, -1)).toBe(0);
	});
});
