import { mapRange } from "../../src/number/mapRange";

describe("mapRange", () => {
	it("remaps a value from one range to another", () => {
		expect(mapRange(75, 0, 100, 0, 400)).toBe(300);
	});

	it("extrapolates beyond the output range by default", () => {
		expect(mapRange(150, 0, 100, 0, 400)).toBe(600);
	});

	it("clamps above the output range when clamp is true", () => {
		expect(mapRange(150, 0, 100, 0, 400, { clamp: true })).toBe(400);
	});

	it("clamps below the output range when clamp is true", () => {
		expect(mapRange(-50, 0, 100, 0, 400, { clamp: true })).toBe(0);
	});

	it("leaves a value inside the range unchanged when clamp is true", () => {
		expect(mapRange(50, 0, 100, 0, 400, { clamp: true })).toBe(200);
	});

	it("supports a reversed output range", () => {
		expect(mapRange(0, 0, 100, 400, 0)).toBe(400);
	});

	it("returns outStart when the input range is empty", () => {
		expect(mapRange(5, 10, 10, 0, 400)).toBe(0);
	});
});
