export function capitalizeWord(word: string): string {
	const first = String.fromCodePoint(word.codePointAt(0) as number);
	return first.toUpperCase() + word.slice(first.length).toLowerCase();
}
