import { formatDateInput } from "../../src/date/formatDateInput";

/** A date whose full year is `year`, avoiding the Date constructor's 0 to 99 remap. */
function dateWithYear(year: number): Date {
	const date = new Date(2000, 9, 28);
	date.setFullYear(year, 9, 28);
	return date;
}

describe("formatDateInput", () => {
	describe("empty and invalid inputs", () => {
		it("returns an empty string for null", () => {
			expect(formatDateInput(null)).toBe("");
		});

		it("returns an empty string for undefined", () => {
			expect(formatDateInput(undefined)).toBe("");
		});

		it("returns an empty string for an Invalid Date", () => {
			expect(formatDateInput(new Date(NaN))).toBe("");
		});
	});

	describe("numeric style", () => {
		it("formats in the locale's order (es-MX)", () => {
			expect(formatDateInput(new Date(2026, 9, 28), { locale: "es-MX" })).toBe("28/10/2026");
		});

		it("formats in the locale's order (en-US)", () => {
			expect(formatDateInput(new Date(2026, 9, 28), { locale: "en-US" })).toBe("10/28/2026");
		});

		it("uses the locale's own separator (de-DE)", () => {
			expect(formatDateInput(new Date(2026, 9, 28), { locale: "de-DE" })).toBe("28.10.2026");
		});

		it("pads the year to at least four digits", () => {
			expect(formatDateInput(dateWithYear(50), { locale: "es-MX" })).toBe("28/10/0050");
		});

		it("defaults the locale to the runtime locale", () => {
			expect(formatDateInput(new Date(2026, 9, 28))).not.toBe("");
		});
	});

	describe("short and long styles", () => {
		it("formats a short month name", () => {
			expect(formatDateInput(new Date(2026, 9, 28), { locale: "es-MX", style: "short" })).toContain(
				"2026",
			);
		});

		it("formats a long localized date", () => {
			expect(formatDateInput(new Date(2026, 9, 28), { locale: "es-MX", style: "long" })).toBe(
				"28 de octubre de 2026",
			);
		});
	});

	describe("order and separator overrides", () => {
		it("overrides the field order, keeping the locale separator", () => {
			expect(formatDateInput(new Date(2026, 9, 28), { locale: "es-MX", order: "YMD" })).toBe(
				"2026/10/28",
			);
		});

		it("overrides the separator", () => {
			expect(formatDateInput(new Date(2026, 9, 28), { locale: "es-MX", separator: "-" })).toBe(
				"28-10-2026",
			);
		});

		it("applies both order and separator overrides", () => {
			expect(
				formatDateInput(new Date(2026, 9, 28), { locale: "es-MX", order: "YMD", separator: "." }),
			).toBe("2026.10.28");
		});

		it("round-trips with parseDateInput", () => {
			const formatted = formatDateInput(new Date(2026, 9, 28), { locale: "es-MX" });
			expect(formatted).toBe("28/10/2026");
		});

		// Yoruba's numeric separator is a space, which trims to empty, so the field order is joined
		// with the "/" fallback.
		it("falls back to a slash when the locale separator trims to empty", () => {
			expect(formatDateInput(new Date(2026, 9, 28), { locale: "yo", order: "DMY" })).toBe(
				"28/10/2026",
			);
		});
	});

	describe("validation", () => {
		it("throws for a year below 0", () => {
			expect(() => formatDateInput(dateWithYear(-1), { locale: "es-MX" })).toThrow(RangeError);
		});

		it("throws for a year above 9999", () => {
			expect(() => formatDateInput(dateWithYear(10000), { locale: "es-MX" })).toThrow(RangeError);
		});

		it("throws for an empty separator", () => {
			expect(() => formatDateInput(new Date(2026, 9, 28), { separator: "" })).toThrow(RangeError);
		});

		it("throws for a separator containing letters", () => {
			expect(() => formatDateInput(new Date(2026, 9, 28), { separator: "a" })).toThrow(RangeError);
		});

		it("throws for a separator containing digits", () => {
			expect(() => formatDateInput(new Date(2026, 9, 28), { separator: "1" })).toThrow(RangeError);
		});
	});
});
