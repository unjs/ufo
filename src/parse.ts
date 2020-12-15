export type ParamsObject = Record<string, string | string[]>

export interface ParsedURL {
  protocol: string
  hostname: string
  port: string
  username: string
  password: string
  pathname: string
  hash: string
  params: ParamsObject
}

export function parseURLNative (input: string = '', _hasProtocol: boolean): ParsedURL {
  const url: URL & { params: ParamsObject } = new URL(input, _hasProtocol ? undefined : 'http://default') as any
  url.params = entriesToObject(url.searchParams.entries())
  return url
}

export function hasProtocol (inputStr: string): boolean {
  return /^\w+:\/\//.test(inputStr)
}

export function entriesToObject<T = string> (entries: IterableIterator<[string, T]>): Record<string, T | T[]> {
  const obj: Record<string, T | T[]> = {}
  for (const [key, value] of entries) {
    if (obj[key]) {
      if (Array.isArray(obj[key])) {
        (obj[key] as T[]).push(value)
      } else {
        obj[key] = [(obj[key] as T), value]
      }
    } else {
      obj[key] = value
    }
  }
  return obj
}
