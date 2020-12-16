import { UFO } from './ufo'
import { ParamsObject } from './parse'

export function withoutTrailingSlash (input: string = ''): string {
  return input.endsWith('/') ? input.slice(0, -1) : input
}

export function withTrailingSlash (input: string = ''): string {
  return input.endsWith('/') ? input : (input + '/')
}

export function withoutLeadingSlash (input: string = ''): string {
  return input.startsWith('/') ? input.substr(1) : input
}

export function withLeadingSlash (input: string = ''): string {
  return input.startsWith('/') ? input : ('/' + input)
}

export function cleanDoubleSlashes (input: string = ''): string {
  return input.split('://').map(str => str.replace(/\/{2,}/g, '/')).join('://')
}

export function createURL (input: string): UFO {
  return new UFO(input)
}

export function normalizeURL (input: string): string {
  return createURL(input).toString()
}

export function withParams (input: string, params: ParamsObject): string {
  const parsed = createURL(input)
  const mergedParams = { ...getParams(input), ...params }
  parsed.params = mergedParams
  return parsed.toString()
}

export function getParams (input: string): ParamsObject {
  return createURL(input).params
}

export function joinURL (base: string, ...input: string[]): string {
  let url = base || ''

  for (const i of input) {
    url = withTrailingSlash(url) + withoutLeadingSlash(i)
  }

  return url
}

export function resolveURL (base: string, ...input: string[]): string {
  const url = createURL(base)

  for (const i of input) {
    url.append(createURL(i))
  }

  return url.toString()
}
