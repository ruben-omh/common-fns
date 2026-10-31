import type { DeepReadonly } from "./types";

function freezeRecursively(value: object, seen: WeakSet<object>): void {
	if (seen.has(value) || ArrayBuffer.isView(value)) {
		return; // already handled (cycle), or a typed array, which cannot be frozen
	}
	seen.add(value);

	// Descriptors, not `value[key]`, so getters are never called.
	for (const key of Reflect.ownKeys(value)) {
		const descriptor = Object.getOwnPropertyDescriptor(value, key);
		const child: unknown = descriptor?.value;
		if ((typeof child === "object" && child !== null) || typeof child === "function") {
			freezeRecursively(child, seen);
		}
	}

	Object.freeze(value);
}

/**
 * Freezes `value` and every object reachable through its own data properties, IN PLACE,
 * and returns it typed as deeply readonly. Use it for shared constants (defaults, tables).
 *
 * Limits of `Object.freeze` itself: Maps and Sets can still be changed with `set`/`add`, Dates
 * with their setters, and typed arrays are skipped (freezing one with elements throws).
 * Getters are not called. Circular references are handled.
 *
 * @template T Type of the value being frozen.
 * @param value Value to freeze in place. A non-object is returned unchanged.
 * @returns The same `value`, typed as deeply readonly.
 *
 * @example
 * const DEFAULTS = deepFreeze({ picker: { weekStartsOn: 1 } });
 * // DEFAULTS.picker.weekStartsOn = 0; // throws in strict mode, rejected by the type otherwise
 */
export function deepFreeze<T>(value: T): DeepReadonly<T> {
	if ((typeof value === "object" && value !== null) || typeof value === "function") {
		freezeRecursively(value, new WeakSet());
	}
	return value as DeepReadonly<T>;
}
