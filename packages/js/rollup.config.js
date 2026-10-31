import { defineConfig } from "@lazyconfig/presets/rollup";
import { existsSync, readdirSync } from "node:fs";

// One bundle for the root barrel, plus one per domain subpath that has a barrel.
// Folders without an `index.ts` (e.g. a scaffolded, not-yet-wired domain) are skipped.
const domains = readdirSync("src", { withFileTypes: true })
	.filter(
		(entry) =>
			entry.isDirectory() && entry.name !== "internal" && existsSync(`src/${entry.name}/index.ts`),
	)
	.map((entry) => entry.name);

/** @type {import('@lazyconfig/presets/rollup').DefineConfigOptions} */
const config = {
	bundles: [
		{
			input: "src/index.ts",
			file: "common-fns.js.index",
			sourcemap: true,
		},
		...domains.map((domain) => ({
			input: `src/${domain}/index.ts`,
			file: `common-fns.js.${domain}`,
			sourcemap: true,
		})),
	],
	plugins: {
		node: true,
		babel: { plugins: ["annotate-pure-calls"] },
	},
	formats: {
		es: {
			// ESM minified distribution bundle
			ext: "min.mjs",
			plugins: {
				terser: true,
			},
		},
		cjs: {
			// CJS minified distribution bundle
			ext: "min.cjs",
			plugins: {
				terser: true,
			},
		},
	},
};

/** @type {import('rollup').RollupOptions[]} */
export default defineConfig(config);
