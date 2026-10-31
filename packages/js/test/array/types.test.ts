import * as arrayTypes from "../../src/array/types";

// array/types.ts is type-only, but the jest preset still collects it for coverage. A namespace
// import loads the emitted module so coverage sees it, and the assertion documents that it exposes
// no runtime values.
describe("array/types", () => {
	it("exposes only type-level exports", () => {
		expect(Object.keys(arrayTypes)).toHaveLength(0);
	});
});
