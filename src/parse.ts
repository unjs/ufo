import { decode } from './encoding'
export type ParamsObject = Record<string, string | string[]>

export interface ParsedURL {
  protocol?: string
  hostname?: string
  port?: string
  username?: string
  password?: string
  pathname: string
  hash?: string
  params?: ParamsObject
}

export function parseURLNative (input: string = ''): ParsedURL {
  const url: URL & { params: ParamsObject } = new URL(input) as any
  url.params = parsedParamsToObject(Array.from(url.searchParams.entries()))
  return url
}

export function parsePath (input: string = ''): ParsedURL {
  const searchIndex = input.indexOf('?')
  const hashIndex = input.indexOf('#')
  let search, hash

  if (hashIndex >= 0) {
    hash = input.substr(hashIndex)
    input = input.substr(0, hashIndex)
  }

  if (searchIndex >= 0) {
    search = input.substr(searchIndex + 1)
    input = input.substr(0, searchIndex)
  }

  return {
    pathname: input,
    params: search ? parsedParamsToObject(parseParams(search)) : {},
    hash
  }
}

export function parseParams (paramsStr: string = ''): [string, string][] {
  return paramsStr.split('&').map((param) => {
    const [key, value] = param.split('=')
    return [decode(key), decode(value)]
  })
}

export function hasProtocol (inputStr: string): boolean {
  return /^\w+:\/\//.test(inputStr)
}

export function parsedParamsToObject (entries: [string, string][]): Record<string, string|string[]> {
  const obj: Record<string, string | string[]> = {}
  for (const [key, value] of entries) {
    if (obj[key]) {
      if (Array.isArray(obj[key])) {
        (obj[key] as string[]).push(value)
      } else {
        obj[key] = [obj[key] as string, value]
      }
    } else {
      obj[key] = value
    }
  }
  return obj
}
