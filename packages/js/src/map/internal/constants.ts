// eslint-disable-next-line @typescript-eslint/unbound-method -- intentional uncurried method, invoked via .call(value) as a robust brand check
export const mapHas = Map.prototype.has;
// eslint-disable-next-line @typescript-eslint/unbound-method -- intentional uncurried method, invoked via .call(value) as a robust brand check
export const weakMapHas = WeakMap.prototype.has;

/** Throwaway key used only to probe internal slots; never stored anywhere. */
export const PROBE_KEY: object = Object.freeze({});
