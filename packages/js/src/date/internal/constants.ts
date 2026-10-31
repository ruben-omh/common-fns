// eslint-disable-next-line @typescript-eslint/unbound-method -- intentional uncurried method, invoked via .call(value) as a robust brand check
export const dateGetTime = Date.prototype.getTime;

export const MS_PER_DAY = 86_400_000;

/** 400 Gregorian years always contain exactly 146,097 days. */
export const DAYS_PER_400_YEARS = 146_097;

// Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec
export const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] as const;
