import { toDate } from "../../src/date/toDate";

describe("toDate", () => {
	describe("Date input", () => {
		it("returns a copy of a valid Date", () => {
			const input = new Date(2026, 9, 28);
			const result = toDate(input);
			expect(result).not.toBe(input);
			expect(result.getTime()).toBe(input.getTime());
		});

		it("throws for an Invalid Date", () => {
			expect(() => toDate(new Date(NaN))).toThrow(RangeError);
		});
	});

	describe("number input", () => {
		it("treats a number as milliseconds since the epoch", () => {
			expect(toDate(0).getTime()).toBe(0);
		});

		it("throws for NaN", () => {
			expect(() => toDate(NaN)).toThrow(RangeError);
		});

		it("throws for an out-of-range timestamp", () => {
			expect(() => toDate(8.64e15 * 2)).toThrow(RangeError);
		});
	});

	describe("string input", () => {
		it("parses a date-only string as local midnight", () => {
			const result = toDate("2026-10-28");
			expect(result.getFullYear()).toBe(2026);
			expect(result.getMonth()).toBe(9);
			expect(result.getDate()).toBe(28);
			expect(result.getHours()).toBe(0);
		});

		it("parses an ISO date-time", () => {
			const result = toDate("2026-10-28T09:30:00");
			expect(result.getHours()).toBe(9);
			expect(result.getMinutes()).toBe(30);
		});

		it("parses an ISO date-time with a UTC offset", () => {
			const result = toDate("2026-10-28T12:00:00Z");
			expect(result.getTime()).toBe(Date.UTC(2026, 9, 28, 12, 0, 0));
		});

		it("throws for an impossible ISO date", () => {
			expect(() => toDate("2026-02-30")).toThrow(RangeError);
		});

		it("throws for an ISO date-time whose time is invalid", () => {
			expect(() => toDate("2026-10-28T25:00")).toThrow(RangeError);
		});

		it("throws for an ISO date-time whose date part is impossible", () => {
			expect(() => toDate("2026-02-30T10:00")).toThrow(RangeError);
		});

		it("throws for a non-ISO string with no locale or order", () => {
			expect(() => toDate("28/10/2026")).toThrow(RangeError);
		});

		it("parses a non-ISO string leniently when a locale is given", () => {
			const result = toDate("28/10/2026", { locale: "es-MX" });
			expect(result.getMonth()).toBe(9);
			expect(result.getDate()).toBe(28);
		});

		it("parses a non-ISO string leniently when only an order is given", () => {
			const result = toDate("28/10/2026", { order: "DMY" });
			expect(result.getMonth()).toBe(9);
		});

		it("throws when a lenient string still cannot be parsed", () => {
			expect(() => toDate("not a date", { locale: "es-MX" })).toThrow(RangeError);
		});

		it("names the order in the error when lenient parsing used order alone", () => {
			expect(() => toDate("not a date", { order: "DMY" })).toThrow("DMY");
		});
	});

	describe("other types", () => {
		it("throws a TypeError for null", () => {
			expect(() => toDate(null as unknown as Date)).toThrow(TypeError);
		});

		it("throws a TypeError for an array", () => {
			expect(() => toDate([] as unknown as Date)).toThrow(TypeError);
		});

		it("throws a TypeError for a boolean", () => {
			expect(() => toDate(true as unknown as Date)).toThrow(TypeError);
		});
	});
});
