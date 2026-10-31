import { parseDateInput } from "../../src/date/parseDateInput";

/** Local-field triple for a parsed date, or null. */
function ymd(date: Date | null): [number, number, number] | null {
	return date === null ? null : [date.getFullYear(), date.getMonth(), date.getDate()];
}

describe("parseDateInput", () => {
	describe("all-numeric dates", () => {
		it("parses the locale's day/month/year order (es-MX)", () => {
			expect(ymd(parseDateInput("28/10/2026", { locale: "es-MX" }))).toEqual([2026, 9, 28]);
		});

		it("parses the locale's month/day/year order (en-US)", () => {
			expect(ymd(parseDateInput("10/28/2026", { locale: "en-US" }))).toEqual([2026, 9, 28]);
		});

		it("accepts any separators and optional leading zeros", () => {
			expect(ymd(parseDateInput("8-1-2026", { locale: "es-MX" }))).toEqual([2026, 0, 8]);
			expect(ymd(parseDateInput("28.10.2026", { locale: "es-MX" }))).toEqual([2026, 9, 28]);
		});

		it("reads ISO order when the first number has 4 digits, whatever the locale", () => {
			expect(ymd(parseDateInput("2026-10-28", { locale: "es-MX" }))).toEqual([2026, 9, 28]);
		});

		it("sets the time to local midnight", () => {
			const date = parseDateInput("28/10/2026", { locale: "es-MX" });
			expect(date?.getHours()).toBe(0);
			expect(date?.getMinutes()).toBe(0);
		});

		it("parses to midnight for years 0 to 99 without the century remap", () => {
			const date = parseDateInput("2050-01-01", { locale: "es-MX" });
			expect(date?.getFullYear()).toBe(2050);
			const early = parseDateInput("0050-01-01", { locale: "es-MX" });
			expect(early?.getFullYear()).toBe(50);
		});
	});

	describe("two-digit years", () => {
		it("resolves within the reference window", () => {
			expect(
				parseDateInput("28/10/26", { locale: "es-MX", referenceYear: 2026 })?.getFullYear(),
			).toBe(2026);
		});

		it("rolls a far-future two-digit year back a century", () => {
			expect(
				parseDateInput("28/10/76", { locale: "es-MX", referenceYear: 2026 })?.getFullYear(),
			).toBe(1976);
		});

		it("rolls a far-past two-digit year forward a century", () => {
			expect(
				parseDateInput("28/10/10", { locale: "es-MX", referenceYear: 2080 })?.getFullYear(),
			).toBe(2110);
		});

		it("rejects two-digit years when allowTwoDigitYear is false", () => {
			expect(parseDateInput("28/10/26", { locale: "es-MX", allowTwoDigitYear: false })).toBeNull();
		});
	});

	describe("month names", () => {
		it("parses a long localized name with filler words (es-MX)", () => {
			expect(ymd(parseDateInput("28 de octubre de 2026", { locale: "es-MX" }))).toEqual([
				2026, 9, 28,
			]);
		});

		it("parses a short localized name (es-MX)", () => {
			expect(ymd(parseDateInput("28 oct 2026", { locale: "es-MX" }))).toEqual([2026, 9, 28]);
		});

		it("parses an English month name with the year last", () => {
			expect(ymd(parseDateInput("October 28, 2026", { locale: "en-US" }))).toEqual([2026, 9, 28]);
		});

		it("parses a German month name", () => {
			expect(ymd(parseDateInput("28. Oktober 2026", { locale: "de-DE" }))).toEqual([2026, 9, 28]);
		});

		it("accepts a four-digit year before the month name", () => {
			expect(ymd(parseDateInput("2026 octubre 28", { locale: "es-MX" }))).toEqual([2026, 9, 28]);
		});

		it("is case- and accent-insensitive for month names", () => {
			expect(ymd(parseDateInput("28 OCTUBRE 2026", { locale: "es-MX" }))).toEqual([2026, 9, 28]);
		});

		it("returns null for an unrecognized word", () => {
			expect(parseDateInput("28 frobuary 2026", { locale: "en-US" })).toBeNull();
		});

		it("returns null for two month-name-like words", () => {
			expect(parseDateInput("oct nov 2026", { locale: "en-US" })).toBeNull();
		});
	});

	describe("locale filler words at the edges (ja-JP)", () => {
		it("parses a date whose format ends in a month/day suffix", () => {
			expect(ymd(parseDateInput("2026年10月28日", { locale: "ja-JP" }))).toEqual([2026, 9, 28]);
		});

		it("rejects a filler word where the locale would not place it", () => {
			expect(parseDateInput("de 28 octubre 2026", { locale: "es-MX" })).toBeNull();
		});
	});

	describe("rejections", () => {
		it("rejects an impossible calendar date", () => {
			expect(parseDateInput("31/02/2026", { locale: "es-MX" })).toBeNull();
		});

		it("rejects a day of 0", () => {
			expect(parseDateInput("0/10/2026", { locale: "es-MX" })).toBeNull();
		});

		it("rejects a month outside 1 to 12", () => {
			expect(parseDateInput("28/13/2026", { locale: "es-MX" })).toBeNull();
		});

		it("rejects too few parts", () => {
			expect(parseDateInput("28/10", { locale: "es-MX" })).toBeNull();
		});

		it("rejects too many parts", () => {
			expect(parseDateInput("28/10/2026/01", { locale: "es-MX" })).toBeNull();
		});

		it("rejects a one-digit year", () => {
			expect(parseDateInput("28/10/6", { locale: "es-MX" })).toBeNull();
		});

		it("rejects a three-digit year", () => {
			expect(parseDateInput("28/10/202", { locale: "es-MX" })).toBeNull();
		});

		it("rejects a three-digit day", () => {
			expect(parseDateInput("281/10/2026", { locale: "es-MX" })).toBeNull();
		});

		it("rejects empty input", () => {
			expect(parseDateInput("", { locale: "es-MX" })).toBeNull();
		});
	});

	describe("order override", () => {
		it("honors an explicit field order", () => {
			expect(ymd(parseDateInput("10/28/2026", { order: "MDY" }))).toEqual([2026, 9, 28]);
		});
	});

	describe("month-name number ordering", () => {
		it("keeps the locale day/year order for two short numbers (MDY)", () => {
			expect(ymd(parseDateInput("oct 28 26", { locale: "en-US", referenceYear: 2026 }))).toEqual([
				2026, 9, 28,
			]);
		});

		it("puts the year first for two short numbers under a YMD order", () => {
			expect(
				ymd(parseDateInput("oct 26 28", { locale: "en-US", order: "YMD", referenceYear: 2026 })),
			).toEqual([2026, 9, 28]);
		});

		it("rejects an all-numeric date whose month field has too many digits", () => {
			expect(parseDateInput("28/100/2026", { locale: "es-MX" })).toBeNull();
		});
	});

	// Defensive guards in the locale-info builder that no real CLDR locale triggers. They are
	// exercised by mocking Intl so the builder sees the malformed output they protect against.
	describe("defensive handling of malformed Intl output", () => {
		it("tolerates a month format that omits the month part", () => {
			// eslint-disable-next-line @typescript-eslint/unbound-method -- intentional uncurried method, invoked via .call(this) to pass through to the real implementation
			const real = Intl.DateTimeFormat.prototype.formatToParts;
			const spy = jest
				.spyOn(Intl.DateTimeFormat.prototype, "formatToParts")
				.mockImplementation(function (this: Intl.DateTimeFormat, date?: Date | number) {
					return real.call(this, date).filter((part) => part.type !== "month");
				});

			// A fresh locale forces the builder to run under the mock; the ISO input still parses.
			expect(ymd(parseDateInput("2026-10-28", { locale: "en-GB" }))).toEqual([2026, 9, 28]);
			spy.mockRestore();
		});

		it("ignores a filler word that coincides with a month name", () => {
			// eslint-disable-next-line @typescript-eslint/unbound-method -- intentional uncurried method, invoked via .call(this) to pass through to the real implementation
			const real = Intl.DateTimeFormat.prototype.formatToParts;
			const spy = jest
				.spyOn(Intl.DateTimeFormat.prototype, "formatToParts")
				.mockImplementation(function (this: Intl.DateTimeFormat, date?: Date | number) {
					const parts = real.call(this, date);
					const options = this.resolvedOptions();
					// Append a month-name literal to the long year/month/day format only.
					if (options.year === "numeric" && options.month === "long" && options.day === "numeric") {
						return [...parts, { type: "literal", value: "January" }];
					}
					return parts;
				});

			expect(ymd(parseDateInput("2026-10-28", { locale: "en-CA" }))).toEqual([2026, 9, 28]);
			spy.mockRestore();
		});
	});

	it("defaults the locale to the runtime locale", () => {
		expect(parseDateInput("2026-10-28")).not.toBeNull();
	});

	describe("locale metadata building", () => {
		// ko-KR month names are a number plus a suffix (e.g. "10wol"), exercising the suffix branch
		// of the locale-info builder; the ISO input still parses cleanly.
		it("builds locale info for a suffix-based month locale (ko-KR)", () => {
			expect(ymd(parseDateInput("2026-10-28", { locale: "ko-KR" }))).toEqual([2026, 9, 28]);
		});

		// Tibetan short month names collide across months, exercising the ambiguous-name branch of
		// the locale-info builder.
		it("builds locale info for a locale with ambiguous month names (bo)", () => {
			expect(ymd(parseDateInput("2026-10-28", { locale: "bo" }))).toEqual([2026, 9, 28]);
		});
	});
});
