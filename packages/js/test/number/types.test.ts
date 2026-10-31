import * as numberTypes from "../../src/number/types";

// number/types.ts is type-only, but the jest preset still collects it for coverage. A namespace
// import loads the emitted module so coverage sees it, and the assertion documents that it exposes
// no runtime values.
describe("number/types", () => {
	it("exposes only type-level exports", () => {
		expect(Object.keys(numberTypes)).toHaveLength(0);
	});
});
