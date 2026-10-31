import { toggle } from "../../src/set/toggle";

describe("toggle", () => {
	it("adds a missing value and reports it is now present", () => {
		const set = new Set<string>();
		expect(toggle(set, "a")).toBe(true);
		expect(set.has("a")).toBe(true);
	});

	it("removes a present value and reports it is now absent", () => {
		const set = new Set(["a"]);
		expect(toggle(set, "a")).toBe(false);
		expect(set.has("a")).toBe(false);
	});

	it("only adds when force is true, even if already present", () => {
		const set = new Set(["a"]);
		expect(toggle(set, "a", true)).toBe(true);
		expect(set.has("a")).toBe(true);
	});

	it("only removes when force is false, even if already absent", () => {
		const set = new Set<string>();
		expect(toggle(set, "a", false)).toBe(false);
		expect(set.has("a")).toBe(false);
	});
});
