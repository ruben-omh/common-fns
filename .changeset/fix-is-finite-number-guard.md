---
"@common-fns/js": patch
---

Fix the `isFiniteNumber` type guard to narrow to `number` instead of `number | bigint`. `Number.isFinite` returns `false` for every bigint, so a bigint never actually passed the guard even though the return type permitted it; narrowing to `number` makes the type match the runtime behavior. Also aligns the `range` validation error messages with the package-wide `fnName():` prefix convention.
