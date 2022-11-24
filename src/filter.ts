import { toRouteMatcher, createRouter } from "radix3";

export interface CreateFilterOptions {
    include?: (string | RegExp)[]
    exclude?: (string | RegExp)[]
    strictTrailingSlash?: boolean;
}

export function createFilter (options: CreateFilterOptions = {}) : (path: string) => boolean {
  const include = options.include || [];
  const exclude = options.exclude || [];

  return function (path: string): boolean {
    for (const v of [{ rules: exclude, result: false }, { rules: include, result: true }]) {
      const regexRules = v.rules.filter(r => r instanceof RegExp) as RegExp[];
      // need to define routes as keys in an object
      const routes = Object.fromEntries(Object.entries(v.rules.filter(r => !(r instanceof RegExp))).map(([k, v]) => [v, k]));
      const routeRulesMatcher = toRouteMatcher(createRouter({ routes, ...options }));
      if (regexRules.some(r => r.test(path)) || routeRulesMatcher.matchAll(path).length > 0) {
        return Boolean(v.result);
      }
    }
    return include.length === 0;
  };
}
