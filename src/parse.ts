import { decode } from './encoding'
import { hasProtocol } from './utils'
export interface ParsedURL {
  protocol?: string
  host?: string
  auth?: string
  pathname: string
  hash: string
  search: string
}

export interface ParsedAuth {
  username: string
  password: string
}

export interface ParsedHost {
  hostname: string
  port: string
}

export function parseURL (input: string = ''): ParsedURL {
  if (!hasProtocol(input)) {
    return parsePath(input)
  }

  const [protocol, auth, hostAndPath] = (input.match(/([^:/]+:)\/\/([^/@]+@)?(.*)/) || []).splice(1)
  const [host = '', path = ''] = (hostAndPath.match(/([^/]*)(.*)?/) || []).splice(1)
  const { pathname, search, hash } = parsePath(path)

  return {
    protocol,
    auth: auth ? auth.substr(0, auth.length - 1) : '',
    host,
    pathname,
    search,
    hash
  }
}

export function parsePath (input: string = ''): ParsedURL {
  const [pathname = '', search = '', hash = ''] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1)

  return {
    pathname,
    search,
    hash
  }
}

export function parseAuth (input: string = ''): ParsedAuth {
  const [username, password] = input.split(':')
  return {
    username: decode(username),
    password: decode(password)
  }
}

export function parseHost (input: string = ''): ParsedHost {
  const [hostname, port] = (input.match(/([^/]*)(:0-9+)?/) || []).splice(1)
  return {
    hostname: decode(hostname),
    port
  }
}

export function stringifyParsedURL (parsed: ParsedURL) {
  const fullpath = parsed.pathname + (parsed.search ? '?' + parsed.search : '') + parsed.hash
  if (!parsed.protocol) {
    return fullpath
  }
  return parsed.protocol + '//' + (parsed.auth ? parsed.auth + '@' : '') + parsed.host + fullpath
}
