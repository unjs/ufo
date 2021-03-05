import { $URL } from './url'
import { parseURL, stringifyParsedURL } from './parse'
import { QueryObject, parseQuery, stringifyQuery } from './query'
import { decode } from './encoding'

export function isRelative (inputStr: string) {
  return ['./', '../'].some(str => inputStr.startsWith(str))
}

export function hasProtocol (inputStr: string, acceptProtocolRelative = false): boolean {
  return /^\w+:\/\/.+/.test(inputStr) || (acceptProtocolRelative && /^\/\/[^/]+/.test(inputStr))
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

export function isAbsolutePath (url: string) {
  return url && url[0] === '/'
}

export function isRelativeUrl (input: string): boolean {
  return ['./', '../'].some(part => input.startsWith(part))
}

/* eslint-disable no-redeclare */
export function resolveRelativeSegments (segments: string[]): string
export function resolveRelativeSegments (base: string, path: string): string
export function resolveRelativeSegments (arg1: string[] | string, arg2 = '') {
  const wasAbsolute = isAbsolutePath(arg1[0])
  const segments = (
    Array.isArray(arg1)
      ? arg1
      : [
          ...withoutLeadingSlash(arg1).split('/').slice(0, -1),
          ...withoutLeadingSlash(arg2).split('/')
        ]).reduce((segments, segment, currentIndex, array) => {
    if (
      segment === '..' &&
      segments.length &&
      segments[segments.length - 1] !== '..'
    ) {
      segments.pop()
    } else if (segment !== '.') {
      segments.push(segment)
    }
    // Ensure final relative segment leaves trailing slash
    if (currentIndex === array.length - 1 && ['..', '.'].includes(segment)) {
      segments.push('')
    }
    return segments
  }, [] as string[])

  const resolvedPath = segments.join('/')
  return wasAbsolute ? withLeadingSlash(resolvedPath) : resolvedPath
}
/* eslint-enable no-redeclare */

export function joinURL (base: string, ...input: string[]): string {
  let url = base || ''

  for (const i of input.filter(isNonEmptyURL)) {
    url = url ? resolveRelativeSegments(withTrailingSlash(url), withoutLeadingSlash(i)) : i
  }

  return url
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
