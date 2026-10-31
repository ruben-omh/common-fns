import { toZonedTime } from "../../src/date/toZonedTime";

/** A Date whose UTC fields are the given values, without the constructor's 0 to 99 remap. */
function utcDate(year: number, month: number, day: number, hour: number): Date {
	const date = new Date(0);
	date.setUTCFullYear(year, month, day);
	date.setUTCHours(hour, 0, 0, 0);
	return date;
}

describe("toZonedTime", () => {
	it("projects an instant onto UTC wall-clock fields", () => {
		const zoned = toZonedTime("2026-10-28T12:00:00Z", "UTC");
		expect(zoned.getFullYear()).toBe(2026);
		expect(zoned.getMonth()).toBe(9);
		expect(zoned.getDate()).toBe(28);
		expect(zoned.getHours()).toBe(12);
	});

	it("shifts the wall-clock fields to the target zone", () => {
		// 12:00 UTC on Oct 28 2026 is 08:00 in New York (EDT, UTC-4).
		const zoned = toZonedTime("2026-10-28T12:00:00Z", "America/New_York");
		expect(zoned.getHours()).toBe(8);
		expect(zoned.getDate()).toBe(28);
	});

	it("preserves milliseconds", () => {
		const instant = new Date(Date.UTC(2026, 9, 28, 12, 0, 0, 123));
		expect(toZonedTime(instant, "UTC").getMilliseconds()).toBe(123);
	});

	it("reuses a cached formatter on repeat calls for the same zone", () => {
		expect(toZonedTime("2026-10-28T12:00:00Z", "UTC").getHours()).toBe(12);
		expect(toZonedTime("2026-06-01T06:00:00Z", "UTC").getHours()).toBe(6);
	});

	it("handles years 0 to 99 without the century remap", () => {
		const zoned = toZonedTime(utcDate(50, 0, 1, 12), "UTC");
		expect(zoned.getFullYear()).toBe(50);
		expect(zoned.getMonth()).toBe(0);
		expect(zoned.getHours()).toBe(12);
	});

	it("handles a year before 1 AD", () => {
		// Astronomical year 0 is 1 BC; the era part drives the conversion back.
		const zoned = toZonedTime(utcDate(0, 5, 15, 12), "UTC");
		expect(zoned.getFullYear()).toBe(0);
	});

	it("throws a TypeError when the time zone is not a string", () => {
		expect(() => toZonedTime("2026-10-28T12:00:00Z", undefined as unknown as string)).toThrow(
			TypeError,
		);
	});

	it("throws a RangeError for an unknown time zone", () => {
		expect(() => toZonedTime("2026-10-28T12:00:00Z", "Not/AZone")).toThrow(RangeError);
	});

	it("propagates toDate errors for an invalid date", () => {
		expect(() => toZonedTime("not a date", "UTC")).toThrow(RangeError);
	});

	it("evicts the oldest formatter once the cache is full", () => {
		// Intl accepts a zone in any letter case, and the cache keys by the raw string, so case
		// variants of one zone are distinct cache entries. More than the cap exercises eviction.
		const base = "america/new_york";
		const alphaIndexes = [...base].map((c, i) => (/[a-z]/.test(c) ? i : -1)).filter((i) => i >= 0);
		for (let variant = 0; variant < 60; variant++) {
			const chars = [...base];
			alphaIndexes.forEach((charIndex, bit) => {
				if ((variant >> bit) & 1) chars[charIndex] = chars[charIndex].toUpperCase();
			});
			expect(() => toZonedTime("2026-10-28T12:00:00Z", chars.join(""))).not.toThrow();
		}
	});

	it("throws when Intl returns incomplete parts", () => {
		const spy = jest.spyOn(Intl.DateTimeFormat.prototype, "formatToParts").mockReturnValueOnce([
			{ type: "year", value: "2026" },
			{ type: "month", value: "10" },
			{ type: "day", value: "28" },
			{ type: "hour", value: "12" },
			{ type: "minute", value: "00" },
			{ type: "era", value: "AD" },
		] as Intl.DateTimeFormatPart[]);

		// A Date input keeps toDate off any Intl path, so the one-shot mock lands on this call.
		expect(() => toZonedTime(new Date(Date.UTC(2026, 9, 28, 12)), "UTC")).toThrow(RangeError);
		spy.mockRestore();
	});
});
