import { defineConfig } from "@lazyconfig/presets/jest";

/** @type {import('@lazyconfig/presets/jest').DefineConfigOptions} */
const config = {
	coverage: true,
	typescript: true,
	junit: {
		outputDirectory: "reports/unit",
		outputName: "test-results.xml",
		suiteName: "@common-fns/js - unit tests",
	},
	extends: {
		coveragePathIgnorePatterns: [
			"<rootDir>/src/array/types.ts",
			"<rootDir>/src/date/types.ts",
			"<rootDir>/src/number/types.ts",
			"<rootDir>/src/object/types.ts",
			"<rootDir>/src/string/types.ts",
		],
		coverageThreshold: {
			global: {
				branches: 95,
				functions: 95,
				lines: 95,
				statements: 95,
			},
		},
	},
};

/** @type {import('jest').Config} */
export default defineConfig(config);
