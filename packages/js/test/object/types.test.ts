import * as objectTypes from "../../src/object/types";

// object/types.ts is type-only, but the jest preset still collects it for coverage. A namespace
// import loads the emitted module so coverage sees it, and the assertion documents that it exposes
// no runtime values.
describe("object/types", () => {
	it("exposes only type-level exports", () => {
		expect(Object.keys(objectTypes)).toHaveLength(0);
	});
});
