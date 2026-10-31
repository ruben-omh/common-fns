import { inverseLerp } from "../../src/number/inverseLerp";

describe("inverseLerp", () => {
	it("returns the fraction between start and end", () => {
		expect(inverseLerp(10, 20, 12.5)).toBe(0.25);
	});

	it("returns 0 at start and 1 at end", () => {
		expect(inverseLerp(10, 20, 10)).toBe(0);
		expect(inverseLerp(10, 20, 20)).toBe(1);
	});

	it("extrapolates outside the 0 to 1 range", () => {
		expect(inverseLerp(10, 20, 30)).toBe(2);
		expect(inverseLerp(10, 20, 0)).toBe(-1);
	});

	it("returns 0 when start equals end", () => {
		expect(inverseLerp(5, 5, 5)).toBe(0);
		expect(inverseLerp(5, 5, 100)).toBe(0);
	});
});
