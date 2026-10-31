import { isSameDecade } from "../../src/date/isSameDecade";

describe("isSameDecade", () => {
	it("returns true within the same decade", () => {
		expect(isSameDecade(new Date(2020, 0), new Date(2029, 11))).toBe(true);
	});

	it("returns false across a decade boundary", () => {
		expect(isSameDecade(new Date(2019, 11), new Date(2020, 0))).toBe(false);
	});
});
