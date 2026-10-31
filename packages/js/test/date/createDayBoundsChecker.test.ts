import { createDayBoundsChecker } from "../../src/date/createDayBoundsChecker";

describe("createDayBoundsChecker", () => {
	it("returns true within the inclusive day bounds", () => {
		const isSelectable = createDayBoundsChecker({
			min: new Date(2026, 0, 1),
			max: new Date(2026, 11, 31),
		});
		expect(isSelectable(new Date(2026, 5, 15))).toBe(true);
		expect(isSelectable(new Date(2026, 0, 1))).toBe(true);
		expect(isSelectable(new Date(2026, 11, 31, 23, 59))).toBe(true);
	});

	it("returns false below min and above max", () => {
		const isSelectable = createDayBoundsChecker({
			min: new Date(2026, 0, 1),
			max: new Date(2026, 11, 31),
		});
		expect(isSelectable(new Date(2025, 11, 31))).toBe(false);
		expect(isSelectable(new Date(2027, 0, 1))).toBe(false);
	});

	it("treats a missing min as no lower limit", () => {
		const isSelectable = createDayBoundsChecker({ max: new Date(2026, 11, 31) });
		expect(isSelectable(new Date(1900, 0, 1))).toBe(true);
	});

	it("treats a missing max as no upper limit", () => {
		const isSelectable = createDayBoundsChecker({ min: new Date(2026, 0, 1) });
		expect(isSelectable(new Date(2200, 0, 1))).toBe(true);
	});

	it("allows any date for empty bounds", () => {
		const isSelectable = createDayBoundsChecker({});
		expect(isSelectable(new Date(2026, 5, 15))).toBe(true);
	});
});
