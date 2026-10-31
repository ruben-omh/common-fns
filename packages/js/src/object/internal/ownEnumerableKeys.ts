/** Own enumerable string AND symbol keys: exactly what object spread (`{ ...obj }`) copies. */
export function ownEnumerableKeys(object: object): PropertyKey[] {
	const keys: PropertyKey[] = Object.keys(object);
	for (const symbol of Object.getOwnPropertySymbols(object)) {
		if (Object.prototype.propertyIsEnumerable.call(object, symbol)) {
			keys.push(symbol);
		}
	}
	return keys;
}
