# @common-fns/js

[![npm](https://img.shields.io/npm/v/@common-fns/js?style=flat-square&logo=npm&logoColor=white&color=FFCA28)](https://www.npmjs.com/package/@common-fns/js)
[![Downloads](https://img.shields.io/npm/dm/@common-fns/js?style=flat-square&logo=npm&logoColor=white&label=downloads&color=8957E5)](https://www.npmjs.com/package/@common-fns/js)
[![Coverage](https://img.shields.io/codecov/c/github/ruben-omh/common-fns?flag=js&style=flat-square&logo=codecov&logoColor=white&label=coverage)](https://app.codecov.io/gh/ruben-omh/common-fns/flags?flag=js)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/npm/l/@common-fns/js?style=flat-square&color=blue)](LICENSE)
[![Sponsor](https://img.shields.io/github/sponsors/ruben-omh?style=flat-square&logo=githubsponsors&logoColor=white&color=EA4AAA&label=Sponsor)](https://github.com/sponsors/ruben-omh)

Small, focused utility functions for JavaScript and TypeScript, grouped into eight domains: arrays, dates, maps, numbers, objects, sets, strings, and values. Every function is typed, documented, and importable on its own, so a bundler includes only what you use.

---

## Installation

```sh
# pnpm
pnpm add @common-fns/js

# npm
npm install @common-fns/js

# yarn
yarn add @common-fns/js

# bun
bun add @common-fns/js
```

Requires Node.js `>=22`.

---

## Subpath exports

Import everything from the package root, or a single domain from its subpath. Importing from a subpath lets a bundler drop the domains you never touch.

| Import                  | Contents                                                                           |
| ----------------------- | ---------------------------------------------------------------------------------- |
| `@common-fns/js`        | Every export below, re-exported from one entry point                               |
| `@common-fns/js/array`  | Array helpers: `chunk`, `partition`, `uniqueBy`, `keyBy`, `binarySearch`, ...      |
| `@common-fns/js/date`   | Local-time date helpers: `addDays`, `toDate`, `isSameDay`, `parseDateInput`, ...   |
| `@common-fns/js/map`    | `Map` helpers and `BoundedMap`: `countBy`, `mapValues`, `getOrInsertComputed`, ... |
| `@common-fns/js/number` | Numeric helpers: `clamp`, `round`, `lerp`, `sum`, `inRange`, ...                   |
| `@common-fns/js/object` | Object helpers: `pick`, `omit`, `mergeDeep`, `deepFreeze`, ...                     |
| `@common-fns/js/set`    | `Set` helpers: `addAll`, `deleteAll`, `toggle`, `isSetEqual`, ...                  |
| `@common-fns/js/string` | String helpers: `slugify`, `truncate`, `toCamelCase`, `capitalize`, ...            |
| `@common-fns/js/value`  | Value guards: `isDefined`, `isEmpty`, `isNullOrUndefined`                          |

Each domain also exports the TypeScript types it uses, such as `SearchComparator`, `DateBounds`, and `TruncateOptions`.

---

## Package format

- **Dual ESM and CJS.** `import` resolves to an `.mjs` bundle, `require` to a `.cjs` bundle, through the `exports` map.
- **Types for both module systems.** `.d.mts` and `.d.cts` declaration files are emitted alongside each bundle, so editor hints and type-checking work from either entry point.
- **Tree-shakeable.** The package is marked `"sideEffects": false`, and each domain is its own subpath, so unused functions are dropped from your build.
- **Typed and documented.** Every public function and type carries JSDoc with parameters, return values, and runnable examples that surface on hover.

---

## Usage

```ts
// Import a whole domain:
import { partition, uniqueBy } from "@common-fns/js/array";

const [allDay, timed] = partition(events, (event) => event.allDay);
const distinct = uniqueBy(events, (event) => event.id);
```

```ts
// Or reach for a single function across domains:
import { toDate, isSameDay } from "@common-fns/js/date";
import { slugify } from "@common-fns/js/string";
import { clamp } from "@common-fns/js/number";

const start = toDate("2026-10-28"); // local midnight
isSameDay(start, new Date()); // false
slugify("Reunion de Planeacion 2026"); // "reunion-de-planeacion-2026"
clamp(42, 0, 10); // 10
```

```ts
// Everything is also available from the root entry point:
import { chunk, countBy, mergeDeep } from "@common-fns/js";
```

---

## What is inside

| Domain   | What it covers                                                                  |
| -------- | ------------------------------------------------------------------------------- |
| `array`  | Chunking, partitioning, deduplication, keyed indexing, and binary search        |
| `date`   | Local-time arithmetic, same-period checks, bounds, and locale-aware parsing     |
| `map`    | Grouping and counting, value/entry transforms, guards, and a size-bounded `Map` |
| `number` | Clamping, ranges, rounding, interpolation, compensated summation, and guards    |
| `object` | Picking, omitting, deep merge, deep freeze, and plain-object checks             |
| `set`    | Bulk add/remove, toggling, equality, and a `Set` guard                          |
| `string` | Case conversion, slugs, grapheme-aware length and truncation, and escaping      |
| `value`  | Nullish and emptiness guards shared across the other domains                    |

Type guards (`isDate`, `isMap`, `isSet`, `isNumberObject`, and the rest) use branded internal-slot checks, so they recognize values created in another realm (for example, another iframe).

---

## License

[MIT](LICENSE) (c) [ruben-omh](https://github.com/ruben-omh)
