# @common-fns/js

## 0.2.0

### Minor Changes

- [`cefcd4a`](https://github.com/ruben-omh/common-fns/commit/cefcd4a5a2ad9f3e1409ce4a8f27e307c0f82f52) Thanks [@ruben-omh](https://github.com/ruben-omh)! - Add four functions.

  - `object/isKeyOf(obj, key)` - type guard that returns `true` when `key` is an OWN property key of `obj`, narrowing `key` to `keyof T`. Inherited keys do not match.
  - `object/getOwnValueOr(obj, key, fallback)` - returns `obj[key]` when `key` is an own key, otherwise `fallback`; safe for keys from untrusted input (e.g. `"toString"`, `"__proto__"` yield the fallback).
  - `date/isMonthInRange(year, monthIndex, bounds)` - `true` when any part of the given calendar month overlaps the `min`/`max` bounds, compared in local time.
  - `date/isYearInRange(year, bounds)` - `true` when any part of the given calendar year overlaps the `min`/`max` bounds, compared in local time.

  All four are exported from the root barrel and their domain subpaths (`@common-fns/js/object`, `@common-fns/js/date`).

### Patch Changes

- [`cefcd4a`](https://github.com/ruben-omh/common-fns/commit/cefcd4a5a2ad9f3e1409ce4a8f27e307c0f82f52) Thanks [@ruben-omh](https://github.com/ruben-omh)! - Fix type resolution for subpath imports. Each `exports` subpath no longer carries a top-level `types` entry that shadowed the per-condition `import`/`require` type declarations, and a `typesVersions` map now points legacy (`node10`-style) module resolution at the correct `.d.ts` for every subpath (`./array`, `./date`, `./object`, ...). Consumers on both modern and classic `moduleResolution` now resolve the right types; no runtime or API change.

  Also renames the second parameter of `date/getDaysInMonth` from `month` to `monthIndex` in its public type declaration and docs, for clarity. Calls are positional and unchanged.

## 0.1.0

### Minor Changes

- [`a11a6e6`](https://github.com/ruben-omh/common-fns/commit/a11a6e6934e4a2cc2b8cc5719e587c9a7309e9e6) Thanks [@ruben-omh](https://github.com/ruben-omh)! - Initial release of @common-fns/js: a collection of small, focused, tree-shakeable utility functions for JavaScript and TypeScript across eight domains (array, date, map, number, object, set, string, and value), plus the BoundedMap class. Ships per-domain subpath exports with dual ESM/CJS output and matching type declarations.
