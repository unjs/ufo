import { toRouteMatcher, createRouter } from 'radix3'

export interface CreateFilterOptions {
    include?: (string | RegExp)[] | string | RegExp
    exclude?: (string | RegExp)[] | string | RegExp
    strictTrailingSlash?: boolean;
}

export function createFilter (options: CreateFilterOptions = {}) : (path: string) => boolean {
  // include everything by default
  const asArray = i => i ? (Array.isArray(i) ? i : [i]) : []
  const include = asArray(options.include) || []
  const exclude = asArray(options.exclude) || []

  return function (path: string): boolean {
    for (const v of [{ rules: exclude, result: false }, { rules: include, result: true }]) {
      const regexRules = v.rules.filter(r => r instanceof RegExp)
      // need to define routes as keys in an object
      const routes = Object.fromEntries(Object.entries(v.rules.filter(r => !(r instanceof RegExp))).map(([k, v]) => [v, k]))
      const routeRulesMatcher = toRouteMatcher(createRouter({ routes, ...options }))
      if (regexRules.find(r => r.test(path)) || routeRulesMatcher.matchAll(path).length > 0) {
        return Boolean(v.result)
      }
    }
    return include.length === 0
  }
}
