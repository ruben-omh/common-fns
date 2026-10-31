/**
 * Builds the union `0 | 1 | ... | N-1` by counting with a tuple.
 *
 * @template N Exclusive upper bound of the generated union.
 */
export type Enumerate<N extends number, Counter extends number[] = []> = Counter["length"] extends N
	? Counter[number]
	: Enumerate<N, [...Counter, Counter["length"]]>;

/**
 * Can the `Enumerate` union be computed for `N`? Needs a literal, non-negative integer below
 * 1000 (TypeScript's recursion limit).
 *
 * @template N Number type to test.
 */
export type IsEnumerable<N extends number> = number extends N
	? false // plain `number`, not a literal
	: `${N}` extends
				| `-${string}`
				| `${string}.${string}`
				| `${string}e${string}`
				| `${number}${number}${number}${number}${string}`
		? false // negative, fractional, exponent notation, or 4+ digits
		: true;

/**
 * The integers from `Min` to `Max` inclusive, as a union: `IntegerRange<0, 3>` is `0 | 1 | 2 | 3`.
 * Falls back to `number` when that union can't be computed: non-literal bounds, negative or
 * fractional bounds, or bounds of 1000 or more.
 *
 * @template Min Lower bound, inclusive.
 * @template Max Upper bound, inclusive.
 */
export type IntegerRange<Min extends number, Max extends number> =
	IsEnumerable<Min> extends true
		? IsEnumerable<Max> extends true
			? Exclude<Enumerate<Max>, Enumerate<Min>> | Max
			: number
		: number;

export interface MapRangeOptions {
	/** Limit the result to the output range instead of extrapolating. Default: `false`. */
	readonly clamp?: boolean;
}

export interface ApproximateEqualityOptions {
	/**
	 * Allowed difference relative to the larger magnitude. Default: 1e-9 (about 9 matching
	 * significant digits). Works at any scale, but cannot match a value against 0.
	 */
	readonly relativeTolerance?: number;
	/**
	 * Allowed absolute difference. Default: 0. Set it when comparing against 0:
	 * `isApproximatelyEqual(0.1 + 0.2 - 0.3, 0, { absoluteTolerance: 1e-12 })`.
	 */
	readonly absoluteTolerance?: number;
}
