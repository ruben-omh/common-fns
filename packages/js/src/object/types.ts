/**
 * Recursively marks every property of `T` as `readonly`, descending into plain objects, arrays,
 * Maps and Sets. Functions are left as they are. This is the type `deepFreeze` returns.
 *
 * @template T Type to make deeply readonly.
 */
export type DeepReadonly<T> = T extends (...args: never[]) => unknown
	? T
	: T extends ReadonlyMap<infer K, infer V>
		? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
		: T extends ReadonlySet<infer V>
			? ReadonlySet<DeepReadonly<V>>
			: T extends object
				? { readonly [K in keyof T]: DeepReadonly<T[K]> }
				: T;

/**
 * Every property optional, recursively into plain objects. Arrays, Dates, Maps and the like are
 * replaced whole rather than deepened.
 *
 * @template T Type to make deeply partial.
 */
export type DeepPartial<T> = T extends
	readonly unknown[] | Date | Map<unknown, unknown> | Set<unknown> | ((...args: never[]) => unknown)
	? T
	: T extends object
		? { [K in keyof T]?: DeepPartial<T[K]> }
		: T;

/**
 * `T` with `undefined` removed from every property type; keys that could be `undefined` become
 * optional. The type `omitUndefined` returns.
 *
 * @template T Type to transform.
 */
export type OmitUndefined<T> = {
	[K in keyof T as undefined extends T[K] ? never : K]: T[K];
} & {
	[K in keyof T as undefined extends T[K] ? K : never]?: Exclude<T[K], undefined>;
};
