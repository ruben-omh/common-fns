/**
 * A `Map` that holds at most `maxSize` entries. Adding a NEW key when full evicts the oldest
 * entry (first inserted). Updating an existing key keeps its position.
 *
 * Use it for caches keyed by outside input (locales, time zones), so they cannot grow without
 * limit. It is a real `Map`: every Map method and `instanceof Map` work.
 *
 * @template K Key type.
 * @template V Value type.
 * @example
 * const formatterCache = new BoundedMap<string, Intl.DateTimeFormat>(50);
 */
export class BoundedMap<K, V> extends Map<K, V> {
	readonly #maxSize: number;

	/**
	 * @param maxSize Maximum number of entries to retain. Must be a positive integer.
	 * @param entries Optional initial entries, added in order. More than `maxSize` of them evicts as it fills.
	 * @throws {RangeError} If `maxSize` is not a positive integer.
	 */
	constructor(maxSize: number, entries?: Iterable<readonly [K, V]> | null) {
		// Entries are added below, not via `super(entries)`: the Map constructor calls `set`,
		// which needs `#maxSize`, and private fields are only initialized after `super()`.
		super();

		if (!Number.isInteger(maxSize) || maxSize < 1) {
			throw new RangeError(
				`BoundedMap: "maxSize" must be a positive integer; received ${String(maxSize)}.`,
			);
		}
		this.#maxSize = maxSize;

		if (entries) {
			for (const [key, value] of entries) {
				this.set(key, value);
			}
		}
	}

	get maxSize(): number {
		return this.#maxSize;
	}

	override set(key: K, value: V): this {
		if (!this.has(key) && this.size >= this.#maxSize) {
			// Map iterates in insertion order, so the first key is the oldest.
			const oldest = this.keys().next();
			if (!oldest.done) {
				this.delete(oldest.value);
			}
		}

		return super.set(key, value);
	}
}
