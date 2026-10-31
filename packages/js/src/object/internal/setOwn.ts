/**
 * Sets an own data property. Plain assignment of "__proto__" would call the prototype setter
 * and REPLACE the object's prototype (prototype pollution), so that key is defined explicitly.
 */
export function setOwn(target: object, key: PropertyKey, value: unknown): void {
	if (key === "__proto__") {
		Object.defineProperty(target, key, {
			value,
			writable: true,
			enumerable: true,
			configurable: true,
		});
	} else {
		(target as Record<PropertyKey, unknown>)[key] = value;
	}
}
