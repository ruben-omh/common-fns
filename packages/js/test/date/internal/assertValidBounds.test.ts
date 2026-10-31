import { assertValidBounds } from "../../../src/date/internal/assertValidBounds";

// assertValidBounds is an internal helper that no public function calls (consumers invoke it where
// they create bounds), so it is tested directly against its source module.
describe("assertValidBounds", () => {
	it("passes for valid bounds", () => {
		expect(() =>
			assertValidBounds({ min: new Date(2026, 0, 1), max: new Date(2026, 11, 31) }, "DateCursor"),
		).not.toThrow();
	});

	it("passes for empty bounds", () => {
		expect(() => assertValidBounds({}, "DateCursor")).not.toThrow();
	});

	it("passes when only one side is given", () => {
		expect(() => assertValidBounds({ min: new Date(2026, 0, 1) }, "DateCursor")).not.toThrow();
		expect(() => assertValidBounds({ max: new Date(2026, 0, 1) }, "DateCursor")).not.toThrow();
	});

	it("throws when min is an Invalid Date", () => {
		expect(() => assertValidBounds({ min: new Date(NaN) }, "DateCursor")).toThrow(RangeError);
	});

	it("throws when max is an Invalid Date", () => {
		expect(() => assertValidBounds({ max: new Date(NaN) }, "DateCursor")).toThrow(RangeError);
	});

	it("throws when min is after max", () => {
		expect(() =>
			assertValidBounds({ min: new Date(2026, 11, 31), max: new Date(2026, 0, 1) }, "DateCursor"),
		).toThrow(RangeError);
	});

	it("includes the caller name in the message", () => {
		expect(() => assertValidBounds({ min: new Date(NaN) }, "DateCursor")).toThrow("DateCursor");
	});
});
