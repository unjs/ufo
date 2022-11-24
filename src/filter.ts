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
      if (regexRules.some(r => r.test(path))) {
        return v.result;
      }
      const stringRules = v.rules.filter(r => typeof r === "string") as string[];
      if (stringRules.length > 0) {
        const routes = {};
        for (const r of stringRules) {
          // quick scan of literal string matches
          if (r === path) {
            return v.result;
          }
          // need to flip the array data for radix3 format, true value is arbitrary
          routes[r] = true;
        }
        const routeRulesMatcher = toRouteMatcher(createRouter({ routes, ...options }));
        if (routeRulesMatcher.matchAll(path).length > 0) {
          return Boolean(v.result);
        }
      }
    }
    return include.length === 0;
  };
}
