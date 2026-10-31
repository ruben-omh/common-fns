import { defineConfig } from "@lazyconfig/presets/eslint";

/** @type {import('@lazyconfig/presets/eslint').DefineConfigOptions} */
const config = {
	node: true,
	typescript: true,
	prettier: true,
	ignores: true,
	extends: [
		{
			// Console logs are intentional for this repo
			files: ["packages/core/src/**"],
			rules: {
				"no-console": "off",
			},
		},
	],
};

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig(config);
