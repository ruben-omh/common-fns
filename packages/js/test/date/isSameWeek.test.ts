import { isSameWeek } from "../../src/date/isSameWeek";
import type { DayOfWeek } from "../../src/date/types";

describe("isSameWeek", () => {
	it("defaults to weeks starting on Sunday", () => {
		expect(isSameWeek(new Date(2026, 9, 26), new Date(2026, 9, 28))).toBe(true);
	});

	it("respects a Monday week start", () => {
		expect(isSameWeek(new Date(2026, 9, 26), new Date(2026, 9, 28), 1)).toBe(true);
	});

	it("returns false for dates in different weeks", () => {
		expect(isSameWeek(new Date(2026, 9, 19), new Date(2026, 9, 28))).toBe(false);
	});

	describe("weekStartsOn validation", () => {
		const a = new Date(2026, 9, 26);
		const b = new Date(2026, 9, 28);

		it("throws for a value above 6", () => {
			expect(() => isSameWeek(a, b, 7 as DayOfWeek)).toThrow(RangeError);
		});

		it("throws for a value below 0", () => {
			expect(() => isSameWeek(a, b, -1 as DayOfWeek)).toThrow(RangeError);
		});

		it("throws for a non-integer", () => {
			expect(() => isSameWeek(a, b, 1.5 as DayOfWeek)).toThrow(RangeError);
		});

		it("throws for a non-number", () => {
			expect(() => isSameWeek(a, b, "x" as unknown as DayOfWeek)).toThrow(RangeError);
		});
	});
});
