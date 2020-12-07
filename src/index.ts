export interface ParsedURL {
  url: URL
  hasProtocol: boolean
}

export type InputURL = string | ParsedURL

export function withoutTrailingSlash (input: string = '/'): string {
  return input.endsWith('/') ? input.slice(0, -1) : input
}

export function withTrailingSlash (input: string = '/'): string {
  return input.endsWith('/') ? input : (input + '/')
}

export function cleanDoubleSlashes (input: string = '/'): string {
  return input.split('://').map(str => str.replace(/\/{2,}/g, '/')).join('://')
}

export function hasProtocol (inputStr: string): boolean {
  return /^\w+:\//.test(inputStr)
}

export function parseURL (input: InputURL = '/'): ParsedURL {
  if (typeof input !== 'string') {
    if (!input || !input.url) {
      throw new Error(`Invalid url: ${JSON.stringify(input)}`)
    }
    return input
  }
  const _hasProtocol = hasProtocol(input)
  const url = new URL(input, _hasProtocol ? undefined : 'default:/')
  return { url, hasProtocol: _hasProtocol }
}

export function joinPath (...path: string[]) {
  const last = path.pop()
  if (!last) { return '/' }
  return path.map(withoutTrailingSlash).join('') + last
}

export function normalizeURL (input: InputURL, stripBase?: boolean): string {
  const { url, hasProtocol } = parseURL(input)
  return (!stripBase && hasProtocol) ? url.href : (url.pathname + url.search + url.hash)
}

export function joinURL (input0: string, ...input: string[]): string {
  const path = input.map(parseURL)
  const baseURL = parseURL(input0)
  baseURL.url.pathname = joinPath(baseURL.url.pathname, ...path.map(p => p.url.pathname))
  return normalizeURL(baseURL)
}
