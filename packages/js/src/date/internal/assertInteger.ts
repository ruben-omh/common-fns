export function assertInteger(value: number, caller: string, name: string): void {
	if (!Number.isInteger(value)) {
		throw new RangeError(`${caller}(): "${name}" must be an integer; received ${String(value)}.`);
	}
}
