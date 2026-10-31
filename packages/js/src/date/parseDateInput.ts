import { getDaysInMonth } from "./getDaysInMonth";
import type { DateOrder, ParseDateInputOptions } from "./types";

interface LocaleInfo {
	readonly order: DateOrder;
	/** Normalized month name (long and short, format and standalone forms) → month index 0–11. */
	readonly months: ReadonlyMap<string, number>;
	/** Normalized words the locale puts between date parts, e.g. "de" in "28 de octubre de 2026". */
	readonly fillerWords: ReadonlySet<string>;
	/** Filler words the locale's own format puts at the start / end (e.g. Japanese "日"). */
	readonly leadingWords: ReadonlySet<string>;
	readonly trailingWords: ReadonlySet<string>;
}

// Letter runs may contain single dots ("ก.ย." in Thai), which are removed from the token.
// Words include combining marks (Thai vowel signs, Hindi matras), or they would be split.
const TOKEN_PATTERN = /[\p{L}\p{M}]+(?:\.[\p{L}\p{M}]+)*|\d+/gu;
const DIGITS = /\d/;
// Only accents on LATIN letters are removed: in scripts like Thai, marks are vowels that tell
// months apart (ม.ค. = January, มี.ค. = March).
const LATIN_ACCENTS = /(\p{Script=Latin})\p{M}+/gu;
const NON_LETTERS = /[^\p{L}\p{M}]/gu;
/** Keyed by the locale string the CALLER passed, so the hot path skips Intl resolution. */
const localeInfoCache = new Map<string, LocaleInfo>();
const DEFAULT_LOCALE_KEY = "\u0000default";

/** Lowercases and strips accents from Latin letters, so "Févr." and "fevr" compare equal. */
function normalizeText(text: string): string {
	return text.normalize("NFD").replaceAll(LATIN_ACCENTS, "$1").normalize("NFC").toLowerCase();
}

function getLocaleInfo(locale: string | undefined): LocaleInfo {
	// NOSONAR
	const cacheKey = locale ?? DEFAULT_LOCALE_KEY;
	const cached = localeInfoCache.get(cacheKey);
	if (cached) {
		return cached;
	}

	const resolved = new Intl.DateTimeFormat(locale).resolvedOptions().locale;

	const sample = new Date(Date.UTC(2000, 10, 22)); // distinct day / month / year values
	const numericParts = new Intl.DateTimeFormat(resolved, {
		timeZone: "UTC",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).formatToParts(sample);

	const letters: Record<string, string> = { day: "D", month: "M", year: "Y" };
	const inferred = numericParts.map((part) => letters[part.type] ?? "").join("");
	const order: DateOrder = inferred === "MDY" || inferred === "YMD" ? inferred : "DMY";

	const months = new Map<string, number>();
	const ambiguous = new Set<string>();
	// Suffixes of numeric month names ("9월" in Korean, "9月" in Japanese) act as filler words.
	const monthSuffixes = new Set<string>();
	const monthFormats: Intl.DateTimeFormatOptions[] = [
		{ month: "long" },
		{ month: "short" },
		{ day: "numeric", month: "long" }, // format (genitive) form, e.g. Russian "октября"
		{ day: "numeric", month: "short" },
	];

	for (const options of monthFormats) {
		const formatter = new Intl.DateTimeFormat(resolved, { ...options, timeZone: "UTC" });
		for (let month = 0; month < 12; month++) {
			const part = formatter
				.formatToParts(new Date(Date.UTC(2000, month, 15)))
				.find((p) => p.type === "month");
			const value = part ? normalizeText(part.value) : "";
			const name = value.replaceAll(NON_LETTERS, "");
			if (name.length === 0) continue;
			if (DIGITS.test(value)) {
				monthSuffixes.add(name); // a number with a suffix, not a month name
				continue;
			}

			const existing = months.get(name);
			if (existing !== undefined && existing !== month) {
				ambiguous.add(name); // same text for two months: unusable
			} else {
				months.set(name, month);
			}
		}
	}
	for (const name of ambiguous) months.delete(name);

	const fillerWords = new Set<string>(monthSuffixes);
	const leadingWords = new Set<string>();
	const trailingWords = new Set<string>();
	const longParts = new Intl.DateTimeFormat(resolved, {
		timeZone: "UTC",
		year: "numeric",
		month: "long",
		day: "numeric",
	}).formatToParts(sample);
	longParts.forEach((part, index) => {
		if (part.type !== "literal") return;
		for (const word of normalizeText(part.value).match(TOKEN_PATTERN) ?? []) {
			if (months.has(word)) continue;
			fillerWords.add(word);
			if (index === 0) leadingWords.add(word);
			if (index === longParts.length - 1) trailingWords.add(word);
		}
	});

	for (const suffix of monthSuffixes) trailingWords.add(suffix); // e.g. a format ending in the month

	const info: LocaleInfo = { order, months, fillerWords, leadingWords, trailingWords };
	localeInfoCache.set(cacheKey, info);
	return info;
}

function resolveYear(
	token: string,
	allowTwoDigitYear: boolean,
	referenceYear: number,
): number | undefined {
	if (token.length === 4) {
		return Number(token);
	}
	if (token.length === 2 && allowTwoDigitYear) {
		const twoDigits = Number(token);
		let year = Math.floor(referenceYear / 100) * 100 + twoDigits;
		if (year > referenceYear + 49) year -= 100;
		else if (year < referenceYear - 50) year += 100;
		return year;
	}
	return undefined;
}

function toDayOrMonth(token: string): number | undefined {
	return token.length <= 2 ? Number(token) : undefined;
}

/**
 * Parses a date typed by a user into a Date at LOCAL midnight, or returns `null` if the
 * text is not a real calendar date. Never throws for bad input: in a text field that is
 * an expected case, not an error.
 *
 * Accepts:
 * - Numeric dates in the locale's order with any separators: "28/10/2026", "28-10-26", "28.10.2026"
 *   (es-MX), "10/28/2026" (en-US). Leading zeros are optional.
 * - ISO order whenever the first number has 4 digits: "2026-10-28", "2026/10/28".
 * - Month names in the locale's language, long or short, any case, with or without accents:
 *   "28 oct 2026", "28 de octubre de 2026", "October 28, 2026", "28. Oktober 2026".
 * - Locale words between parts ("de", "年 月 日"), which are ignored.
 *
 * Rejects impossible dates ("31/02/2026"), extra or missing parts, times, and 1- or 3-digit years.
 *
 * @param input Text typed by a user.
 * @param options Locale, field order and two-digit-year handling. See `ParseDateInputOptions`.
 * @returns A Date at local midnight, or `null` if `input` is not a real calendar date.
 *
 * @example
 * parseDateInput("28/10/26", { locale: "es-MX" }); // Oct 28, 2026
 * parseDateInput("10/28/26", { locale: "en-US" }); // Oct 28, 2026
 * parseDateInput("31/02/2026", { locale: "es-MX" }); // null
 */
export function parseDateInput(input: string, options: ParseDateInputOptions = {}): Date | null {
	// NOSONAR
	const { allowTwoDigitYear = true, referenceYear = new Date().getFullYear() } = options;
	const info = getLocaleInfo(options.locale);
	const order = options.order ?? info.order;

	const rawTokens = (normalizeText(input).match(TOKEN_PATTERN) ?? []).map((token) =>
		token.replaceAll(".", ""),
	);
	// Filler words are valid between date parts ("28 de octubre"), but at the edges only
	// where the locale's own format puts them (Japanese "…28日").
	const first = rawTokens[0] ?? "";
	const last = rawTokens.at(-1) ?? "";
	if (
		(info.fillerWords.has(first) && !info.leadingWords.has(first)) ||
		(info.fillerWords.has(last) && !info.trailingWords.has(last))
	) {
		return null;
	}

	const tokens = rawTokens.filter((token) => !info.fillerWords.has(token));
	if (tokens.length !== 3) {
		return null;
	}

	let year: number | undefined;
	let month: number | undefined; // 0-based
	let day: number | undefined;

	const wordIndex = tokens.findIndex((token) => /\p{L}/u.test(token));

	if (wordIndex === -1) {
		// All numeric. A 4-digit first number means ISO order, whatever the locale.
		const fieldOrder = tokens[0]?.length === 4 ? "YMD" : order;
		for (let index = 0; index < 3; index++) {
			const token = tokens[index];
			const field = fieldOrder[index];
			if (field === "Y") year = resolveYear(token, allowTwoDigitYear, referenceYear);
			else if (field === "M") month = (toDayOrMonth(token) ?? 0) - 1;
			else day = toDayOrMonth(token);
		}
	} else {
		// One month name plus two numbers.
		month = info.months.get(tokens[wordIndex]);
		const numbers = tokens.filter((_, index) => index !== wordIndex);
		if (month === undefined || numbers.some((token) => /\p{L}/u.test(token))) {
			return null;
		}

		const [firstNumber, secondNumber] = numbers as [string, string];
		// A 4-digit number is the year; otherwise use the locale's day/year order.
		const yearFirst =
			firstNumber.length === 4 ||
			(secondNumber.length !== 4 && order.indexOf("Y") < order.indexOf("D"));
		year = resolveYear(yearFirst ? firstNumber : secondNumber, allowTwoDigitYear, referenceYear);
		day = toDayOrMonth(yearFirst ? secondNumber : firstNumber);
	}

	if (year === undefined || month === undefined || day === undefined) return null;
	if (month < 0 || month > 11) return null;
	if (day < 1 || day > getDaysInMonth(year, month)) return null;

	const date = new Date(0);
	// setFullYear avoids the Date constructor's 0–99 → 1900–1999 mapping.
	date.setFullYear(year, month, day);
	date.setHours(0, 0, 0, 0);
	return date;
}
