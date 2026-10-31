/**
 * `true` if `value` is one of `options`, narrowing it to that union. Compared with
 * SameValueZero via `Array#includes`. For repeated checks against the same options,
 * `createOneOfGuard` builds a reusable `Set`-backed guard.
 *
 * @template T Union of the allowed values (inferred as literals from a `const` array).
 * @param value Value to test.
 * @param options Allowed values.
 * @returns `true` if `value` is in `options`.
 *
 * @example
 * if (isOneOf(input, ["sm", "md", "lg"] as const)) {
 *   input; // "sm" | "md" | "lg"
 * }
 */
export function isOneOf<const T>(value: unknown, options: readonly T[]): value is T {
	return options.includes(value as T);
}
