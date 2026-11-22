---
"@common-fns/js": patch
---

Fix type resolution for subpath imports. Each `exports` subpath no longer carries a top-level `types` entry that shadowed the per-condition `import`/`require` type declarations, and a `typesVersions` map now points legacy (`node10`-style) module resolution at the correct `.d.ts` for every subpath (`./array`, `./date`, `./object`, ...). Consumers on both modern and classic `moduleResolution` now resolve the right types; no runtime or API change.

Also renames the second parameter of `date/getDaysInMonth` from `month` to `monthIndex` in its public type declaration and docs, for clarity. Calls are positional and unchanged.
