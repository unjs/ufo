import { isMatch } from 'picomatch'

export interface CreateFilterOptions {
    include?: (string | RegExp)[] | string | RegExp
    exclude?: (string | RegExp)[] | string | RegExp
    matchOptions?: Record<string, any>
}

export function createFilter (options: CreateFilterOptions = {}) {
  // include everything by default
  options.include = options.include || ['**']
  options.exclude = options.exclude || []

  return function (id: string): boolean {
    for (const [k, v] of Object.entries({ exclude: false, include: true })) {
      const matchers = (Array.isArray(options[k]) ? options[k] : [options[k]]).map(
        id => id instanceof RegExp ? id : { test: (s: string) => isMatch(s, id, options.matchOptions) }
      )
      for (let i = 0; i < matchers.length; ++i) {
        const matcher = matchers[i]
        if (matcher.test(id)) { return v }
      }
    }
    return false
  }
}
