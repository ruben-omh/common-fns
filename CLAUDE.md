# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Monorepo for `@common-fns/js`: small, focused, tree-shakeable utility functions for JavaScript and TypeScript. The one published package lives under `packages/js`; the root is a private pnpm + Turborepo workspace.

`@common-fns/js` groups ~85 functions into 8 domains, plus the `BoundedMap` class and the TypeScript types each domain exports:

| Domain   | What it covers                                                           |
| -------- | ------------------------------------------------------------------------ |
| `array`  | Chunking, partitioning, deduplication, keyed indexing, binary search     |
| `date`   | Local-time arithmetic, same-period checks, bounds, locale-aware parsing  |
| `map`    | Grouping/counting, value and entry transforms, guards, and `BoundedMap`  |
| `number` | Clamping, ranges, rounding, interpolation, compensated summation, guards |
| `object` | Picking, omitting, deep merge, deep freeze, plain-object checks          |
| `set`    | Bulk add/remove, toggling, equality, and a `Set` guard                   |
| `string` | Case conversion, slugs, grapheme-aware length and truncation, escaping   |
| `value`  | Nullish and emptiness guards shared across the other domains             |

## Commands

Turbo orchestrates the build/test/typecheck graph; root scripts delegate to it.

```sh
pnpm build                    # turbo build (build depends on ^build and typecheck)
pnpm test                     # turbo test
pnpm typecheck                # turbo typecheck
pnpm lint                     # eslint .
pnpm dev                      # turbo dev (watch, persistent)
pnpm clean                    # turbo clean
pnpm clean:reset              # full wipe: .turbo + lockfile + node_modules
```

Single-package operations (only `@common-fns/js` today):

```sh
pnpm --filter @common-fns/js build
pnpm --filter @common-fns/js test
pnpm --filter @common-fns/js test -- path/to/file.test.ts          # single test file
pnpm --filter @common-fns/js test -- -t "test name"                # single test by name
```

The package `build` chains `pnpm dts` (its own `lazyconfig compile types` step: tsc via `tsconfig.lib.json` + api-extractor over `api-extractor.*.json`, with `--ext mts cts` emitting `.d.mts`/`.d.cts` alongside `.d.ts`) then `rollup --config`. The `dev` script is `tsc -p tsconfig.lib.json --watch`.

## Architecture conventions

- **One bundle per public entry.** `rollup.config.js` globs `src/*/` at build time: it emits one bundle for the root barrel `src/index.ts`, plus one per domain that has an `index.ts`. Folders without an `index.ts` (a scaffolded, not-yet-wired domain) are skipped, and `src/internal` is excluded explicitly.
- **Per-domain subpath exports.** `package.json` `exports` maps `.`, `./array`, `./date`, `./map`, `./number`, `./object`, `./set`, `./string`, and `./value`. Each maps to dual ESM/CJS bundles (`.min.mjs` / `.min.cjs`) with matching `.d.ts` / `.d.mts` / `.d.cts`. Output file names follow `common-fns.js.<entry>.*` in `dist/`. Adding a function means wiring it through the domain barrel and the root barrel; adding a domain means a new `src/<domain>/index.ts`, a new `api-extractor.<domain>.json`, and a new `exports` entry.
- **Public surfaces are curated in barrels** - the root `src/index.ts` and each `src/<domain>/index.ts` list named exports explicitly. No `export *`.
- **Two-tier internal architecture.** Package-wide cross-domain privates live in `src/internal/`; domain-private helpers live in `src/<domain>/internal/` (present in every domain except `value`). `internal/` is private: never add it to the `exports` map, and never import it across a domain boundary except through `src/internal/`.
- **Realm-safe type guards.** Guards such as `isDate`, `isMap`, `isSet`, `isNumberObject`, and `isStringObject` use branded internal-slot checks (see the `src/**/internal/constants.ts` files) so they recognize values created in another realm.

### Intentional eslint-disables - do not strip

Two kinds of `eslint-disable-next-line` comments are deliberate and must be preserved when editing the files that carry them:

- `@typescript-eslint/unbound-method` on the uncurried brand-check method references in the `internal/constants.ts` files (`src/internal`, and the `date`/`map`/`number`/`set`/`string` domain internals). The method is intentionally uncurried and invoked via `.call(value)` as a robust brand check.
- `@typescript-eslint/no-wrapper-object-types` in `src/number/isNumberObject.ts` and `src/string/isStringObject.ts`, where the boxed `Number` / `String` wrapper type is the deliberate guard target.

## Dependency management

Single source of truth is `pnpm-workspace.yaml`'s `catalog:` block. Every third-party version is pinned there; each `package.json` references it as `"<pkg>": "catalog:"`. To bump a dep, edit the catalog once.

Other relevant `pnpm-workspace.yaml` settings:

- `saveExact: true` - `pnpm add` writes exact versions.
- `engineStrict: true` - `engines` is enforced at install (`node >=22`, `pnpm >=10`).
- `minimumReleaseAgeStrict: true` - supply-chain defense; fresh registry publishes are refused unless allowlisted. Do not weaken casually.
- `overrides` + `allowedDeprecatedVersions` - pin `glob` to `^10` and silence its deprecation warning.
- `allowBuilds` - the only packages permitted to run install scripts (`@parcel/watcher`, `@swc/core`, `unrs-resolver`).

## Commits, hooks, and the release pipeline

### Commits

- **Conventional Commits, enforced by commitlint** (`.commitlintrc.json` extends `@lazyconfig/presets/commitlint`). Allowed scopes are pinned: `contributing`, `commitlint`, `changeset`, `ci`, `js`, `deps`, `eslint`, `jest`, `prettier`, `release`, `turbo`, `husky`, `repo`. Unknown scopes are rejected.
- Husky runs commitlint on `commit-msg` and lint-staged on `pre-commit`.

### Releases (Changesets)

Add a `.changeset/*.md` for any source or public-API change in `packages/js`. Bump levels: breaking -> `major`, additive -> `minor`, fix/perf/internal -> `patch`. `.changeset/config.json` uses `@changesets/changelog-github` (repo `ruben-omh/common-fns`), `baseBranch: main`, and `updateInternalDependencies: "patch"`.

The `.github/workflows/` pipeline is `ci.yml` (validates PRs), `test-suite.yml` (reusable build + lint + test matrix on Node 22/24), `version.yml` (opens/refreshes the Version PR on push to `main`), `release.yml` (manual `workflow_dispatch` publish to npm), `release-reminder.yml` (opens a "Release pending" issue when a Version PR merges), and `bootstrap-package.yml` (one-time first publish for a brand-new package name).

## Testing

Jest via `@lazyconfig/presets/jest` (SWC transform). `jest.config.js` sets `coverage: true`, `typescript: true`, JUnit output under `reports/unit`, and raises `coverageThreshold.global` to 100% for branches, functions, lines, and statements. It also adds `src/date/types.ts` to `coveragePathIgnorePatterns` (a module named `types.ts` that still carries no coverable logic to exclude).

Test files mirror the `src/` tree under `test/<domain>/<fn>.test.ts` (tab indent, `describe(fnName)` with nested `describe`/`it`, relative `../../src` imports). The suite is 90 files / ~555 tests and meets the 100% global threshold. Run it with `pnpm --filter @common-fns/js test`.

Known gotcha: the jest preset's `collectCoverageFrom` excludes `!src/index.*` and `!src/**/index.*`, so the barrels are coverage-invisible; cover each function through its own domain file, not the root barrel. A few genuinely-unreachable defensive branches (an incomplete-`Intl`-parts guard in `toZonedTime.ts`, and `parseDateInput.ts` lines 71/101) are covered with test-only `jest.spyOn(Intl.DateTimeFormat.prototype, "formatToParts")` mocks rather than `istanbul-ignore` or config excludes - preserve that technique if you touch those files.

## Dogfooding caveat

This repo consumes the `@lazyconfig/*` presets for its own toolchain: root `eslint.config.js`, per-package `jest.config.js` and `rollup.config.js` extend the presets, `.commitlintrc.json` extends the commitlint preset, and the `build` script invokes the `lazyconfig` CLI. A preset bump can therefore break this repo's own build. Run `pnpm build && pnpm lint && pnpm test` end-to-end after any toolchain change.
