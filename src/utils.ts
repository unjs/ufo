import { $URL } from './url'
import { parseURL, stringifyParsedURL } from './parse'
import { QueryObject, parseQuery, stringifyQuery } from './query'
import { decode } from './encoding'

export function isRelative (inputStr: string) {
  return ['./', '../'].some(str => inputStr.startsWith(str))
}

const PROTOCOL_REGEX = /^\w+:(\/\/)?/
const PROTOCOL_RELATIVE_REGEX = /^\/\/[^/]+/

export function hasProtocol (inputStr: string, acceptProtocolRelative = false): boolean {
  return PROTOCOL_REGEX.test(inputStr) || (acceptProtocolRelative && PROTOCOL_RELATIVE_REGEX.test(inputStr))
}

const TRAILING_SLASH_RE = /\/$|\/\?/

export function hasTrailingSlash (input: string = '', queryParams: boolean = false): boolean {
  if (!queryParams) {
    return input.endsWith('/')
  }
  return TRAILING_SLASH_RE.test(input)
}

export function withoutTrailingSlash (input: string = '', queryParams: boolean = false): string {
  if (!queryParams) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || '/'
  }
  if (!hasTrailingSlash(input, true)) {
    return input || '/'
  }
  const [s0, ...s] = input.split('?')
  return (s0.slice(0, -1) || '/') + (s.length ? `?${s.join('?')}` : '')
}

export function withTrailingSlash (input: string = '', queryParams: boolean = false): string {
  if (!queryParams) {
    return input.endsWith('/') ? input : (input + '/')
  }
  if (hasTrailingSlash(input, true)) {
    return input || '/'
  }
  const [s0, ...s] = input.split('?')
  return s0 + '/' + (s.length ? `?${s.join('?')}` : '')
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
  if (isEmptyURL(base)) {
    return input
  }
  const _base = withoutTrailingSlash(base)
  if (input.startsWith(_base)) {
    return input
  }
  return joinURL(_base, input)
}

export function withoutBase (input: string, base: string) {
  if (isEmptyURL(base)) {
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

export function isEmptyURL (url: string) {
  return !url || url === '/'
}

export function isNonEmptyURL (url: string) {
  return url && url !== '/'
}

export function joinURL (base: string, ...input: string[]): string {
  let url = base || ''

  for (const i of input.filter(isNonEmptyURL)) {
    url = url ? withTrailingSlash(url) + withoutLeadingSlash(i) : i
  }

  return url
}

export function withHttp (input: string): string {
  return withProtocol(input, 'http://')
}

export function withHttps (input: string): string {
  return withProtocol(input, 'https://')
}

export function withoutProtocol (input: string): string {
  return withProtocol(input, '')
}

export function withProtocol (input: string, protocol: string): string {
  const match = input.match(PROTOCOL_REGEX)
  if (!match) {
    return protocol + input
  }
  return protocol + input.substring(match[0].length)
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

  for (const i of input.filter(isNonEmptyURL)) {
    url.append(createURL(i))
  }

  return url.toString()
}

export function isSamePath (p1: string, p2: string) {
  return decode(withoutTrailingSlash(p1)) === decode(withoutTrailingSlash(p2))
}
