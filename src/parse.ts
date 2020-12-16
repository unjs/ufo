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

export function parseURL (input: string = ''): ParsedURL {
  const [protocol, auth, hostAndPath] = (input.match(/([^:/]+:)\/\/([^/@]+@)?(.*)/) || []).splice(1)
  const [host = '', path = ''] = (hostAndPath.match(/([^/]*)(.*)?/) || []).splice(1)
  const [hostname = '', port = ''] = (host.match(/([^/]*)(:0-9+)?/) || []).splice(1)
  const { pathname, params, hash } = parsePath(path)
  const [username, password] = auth ? auth.substr(0, auth.length - 1).split(':') : []

  return {
    protocol,
    username,
    password,
    hostname,
    port,
    pathname,
    params,
    hash
  }
}

export function parsePath (input: string = ''): ParsedURL {
  const [pathname = '', search = '', hash = ''] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1)

  return {
    pathname,
    params: search ? parsedParamsToObject(parseParams(search.substr(1))) : {},
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
