import { DAYS_PER_400_YEARS, MS_PER_DAY } from "./constants";

/**
 * Days since 1970-01-01 for the date's LOCAL calendar day.
 * Reads only the calendar fields, so DST cannot affect it. Invalid Date → NaN.
 */
export function getLocalEpochDay(date: Date): number {
	// Date.UTC maps years 0–99 to 1900–1999. Shifting by 400 years avoids that,
	// and subtracting the days in 400 years undoes the shift exactly.
	const shifted = Date.UTC(date.getFullYear() + 400, date.getMonth(), date.getDate());
	return shifted / MS_PER_DAY - DAYS_PER_400_YEARS;
}
