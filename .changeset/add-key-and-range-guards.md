---
"@common-fns/js": minor
---

Add four functions.

- `object/isKeyOf(obj, key)` - type guard that returns `true` when `key` is an OWN property key of `obj`, narrowing `key` to `keyof T`. Inherited keys do not match.
- `object/getOwnValueOr(obj, key, fallback)` - returns `obj[key]` when `key` is an own key, otherwise `fallback`; safe for keys from untrusted input (e.g. `"toString"`, `"__proto__"` yield the fallback).
- `date/isMonthInRange(year, monthIndex, bounds)` - `true` when any part of the given calendar month overlaps the `min`/`max` bounds, compared in local time.
- `date/isYearInRange(year, bounds)` - `true` when any part of the given calendar year overlaps the `min`/`max` bounds, compared in local time.

All four are exported from the root barrel and their domain subpaths (`@common-fns/js/object`, `@common-fns/js/date`).
