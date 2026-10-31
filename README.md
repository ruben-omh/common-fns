# common-fns

[![CI](https://img.shields.io/github/actions/workflow/status/ruben-omh/common-fns/ci.yml?branch=main&style=flat-square&logo=githubactions&logoColor=white&label=CI)](https://github.com/ruben-omh/common-fns/actions/workflows/ci.yml)
[![Codecov](https://img.shields.io/codecov/c/github/ruben-omh/common-fns?style=flat-square&logo=codecov&logoColor=white)](https://codecov.io/gh/ruben-omh/common-fns)
[![License](https://img.shields.io/github/license/ruben-omh/common-fns?style=flat-square&color=blue)](LICENSE)
[![Changesets](https://img.shields.io/badge/maintained_with-changesets-176de3?style=flat-square&logo=changesets&logoColor=white)](https://github.com/changesets/changesets)
[![Conventional Commits](https://img.shields.io/badge/conventional_commits-1.0.0-FE5196?style=flat-square&logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)
[![Node](https://img.shields.io/badge/node-%3E%3D22-5FA04E?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-%3E%3D10-F69220?style=flat-square&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Sponsor](https://img.shields.io/github/sponsors/ruben-omh?style=flat-square&logo=githubsponsors&logoColor=white&color=EA4AAA&label=Sponsor)](https://github.com/sponsors/ruben-omh)

Small, focused, tree-shakeable utility functions for JavaScript and TypeScript, published from a pnpm workspace.

---

## Packages

| Package                         | Description                                                                                  |
| ------------------------------- | -------------------------------------------------------------------------------------------- |
| [`@common-fns/js`](packages/js) | Typed utility functions for arrays, dates, maps, numbers, objects, sets, strings, and values |

More packages may join the workspace over time; each is published independently.

---

## Installation

```sh
pnpm add @common-fns/js
```

See [`packages/js`](packages/js) for subpath exports, the dual ESM/CJS layout, and usage examples.

---

## Usage

```ts
import { partition } from "@common-fns/js/array";
import { toDate } from "@common-fns/js/date";

const [allDay, timed] = partition(events, (event) => event.allDay);
const start = toDate("2026-10-28");
```

Full API and per-domain imports live in the [`@common-fns/js` README](packages/js).

---

## Development

**Requirements:** Node.js `>=22`, pnpm `>=10`

```sh
# Install dependencies
pnpm install

# Build every package (via Turbo, respecting the dependency graph)
pnpm build

# Run the test suites
pnpm test

# Type-check
pnpm typecheck

# Lint
pnpm lint

# Remove build artifacts, coverage, and reports
pnpm clean
```

Single-package operations use pnpm filters:

```sh
pnpm --filter @common-fns/js build
pnpm --filter @common-fns/js typecheck
pnpm --filter @common-fns/js test
```

---

## Toolchain

The workspace is configured with [`@lazyconfig`](https://github.com/ruben-omh/lazyconfig) presets and CLI, which keep the build, lint, and type setup consistent across packages.

- **pnpm workspaces** with a `catalog:` block as the single source of truth for third-party versions.
- **Turbo** orchestrates the `build`, `test`, and `typecheck` task graph and caches results.
- **TypeScript** compiles the sources; **API Extractor** rolls the declarations into a single `.d.ts` per subpath (plus `.d.mts` and `.d.cts` for the dual-package `exports` map).
- **Rollup** emits minified ESM and CJS bundles, one per domain subpath and one for the root barrel.
- **Jest** runs the tests; **ESLint** and **Prettier** enforce style.
- **Changesets** drives versioning and release notes; **Husky** and **commitlint** enforce [Conventional Commits](https://www.conventionalcommits.org/).

---

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before opening a pull request. All commits follow [Conventional Commits](https://www.conventionalcommits.org/).

---

## License

[MIT](LICENSE) (c) [ruben-omh](https://github.com/ruben-omh)
