import { $URL } from './url'
import { parseURL, stringifyParsedURL } from './parse'
import { QueryObject, parseQuery, stringifyQuery } from './query'
import { decode } from './encoding'

export function hasProtocol (inputStr: string): boolean {
  return /^\w+:\/\//.test(inputStr)
}

export function hasTrailingSlash (input: string = ''): boolean {
  return input.endsWith('/')
}

export function withoutTrailingSlash (input: string = ''): string {
  return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || '/'
}

export function withTrailingSlash (input: string = ''): string {
  return input.endsWith('/') ? input : (input + '/')
}

export function hasLeadingSlash (input: string = ''): boolean {
  return input.startsWith('/')
}

export function withoutLeadingSlash (input: string = ''): string {
  return (hasLeadingSlash(input) ? input.substr(1) : input) || '/'
}

export function withLeadingSlash (input: string = ''): string {
  return hasLeadingSlash(input) ? input : ('/' + input)
}

export function cleanDoubleSlashes (input: string = ''): string {
  return input.split('://').map(str => str.replace(/\/{2,}/g, '/')).join('://')
}

export function withBase (input: string, base: string) {
  if (!base || base === '/') {
    return input
  }
  const _base = withoutTrailingSlash(base)
  if (input.startsWith(_base)) {
    return input
  }
  return joinURL(_base, input)
}

export function withoutBase (input: string, base: string) {
  if (!base || base === '/') {
    return input
  }
  const _base = withoutTrailingSlash(base)
  if (input.startsWith(_base)) {
    return input.substr(_base.length) || '/'
  }
  return input
}

export function withQuery (input: string, query: QueryObject): string {
  const parsed = parseURL(input)
  const mergedQuery = { ...parseQuery(parsed.search), ...query }
  parsed.search = stringifyQuery(mergedQuery)
  return stringifyParsedURL(parsed)
}

export function getQuery (input: string): QueryObject {
  return parseQuery(parseURL(input).search)
}

export function isRelativeUrl (input: string): boolean {
  return ['./', '../'].some(part => input.startsWith(part))
}

export function joinURL (base: string, ...input: string[]): string {
  return input
    .filter(i => i && i !== '/')
    .reduce((p, c) => withTrailingSlash(p) + withoutLeadingSlash(c), base || '')
}

// $URL based utils

export function createURL (input: string): $URL {
  return new $URL(input)
}

export function normalizeURL (input: string): string {
  return createURL(input).toString()
}

export function resolveURL (base: string, ...input: string[]): string {
  const url = createURL(base)

  for (const i of input) {
    url.append(createURL(i))
  }

  return url.toString()
}

export function isSamePath (p1: string, p2: string) {
  return decode(withoutTrailingSlash(p1)) === decode(withoutTrailingSlash(p2))
}
