/**
 * Builds a type guard that checks whether a value is one of `options`, using a `Set` for
 * O(1) membership. Prefer it over `isOneOf` when the same options are checked many times,
 * since the lookup set is built once.
 *
 * Values are compared with SameValueZero, so `options` should hold primitives.
 *
 * @template T Union of the allowed values (inferred as literals from a `const` array).
 * @param options Allowed values. Captured when the guard is created.
 * @returns A type guard narrowing an `unknown` value to `T`.
 *
 * @example
 * const isDirection = createOneOfGuard(["up", "down", "left", "right"]);
 * isDirection("up"); // true, and narrows the value to the union type
 */
export function createOneOfGuard<const T>(options: readonly T[]): (value: unknown) => value is T {
	const lookup = new Set<unknown>(options);
	return (value: unknown): value is T => lookup.has(value);
}
