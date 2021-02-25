import { parseURL, parseAuth, parseHost } from './parse'
import { QueryObject, parseQuery, stringifyQuery } from './query'
import { isAbsolutePath, joinURL, resolveRelativeSegments, withLeadingSlash } from './utils'
import { encodeHash, encodePath, decode, encodeHost } from './encoding'

export class $URL implements URL {
  protocol: string
  host: string
  auth: string
  pathname: string
  query: QueryObject = {}
  hash: string

  constructor (input: string = '') {
    if (typeof input !== 'string') {
      throw new TypeError(`URL input should be string received ${typeof input} (${input})`)
    }

    const parsed = parseURL(input)

    this.protocol = decode(parsed.protocol)
    this.host = decode(parsed.host)
    this.auth = decode(parsed.auth)
    this.pathname = decode(parsed.pathname)
    this.query = parseQuery(parsed.search)
    this.hash = decode(parsed.hash)
  }

  get hostname (): string {
    return parseHost(this.host).hostname
  }

  get port (): string {
    return parseHost(this.host).port || ''
  }

  get username (): string {
    return parseAuth(this.auth).username
  }

  get password (): string {
    return parseAuth(this.auth).password || ''
  }

  get hasProtocol () {
    return this.protocol.length
  }

  get isAbsolute () {
    return this.hasProtocol || isAbsolutePath(this.pathname)
  }

  get search (): string {
    const q = stringifyQuery(this.query)
    return q.length ? '?' + q : ''
  }

  get searchParams (): URLSearchParams {
    const p = new URLSearchParams()
    for (const name in this.query) {
      const value = this.query[name]
      if (Array.isArray(value)) {
        value.forEach(v => p.append(name, v))
      } else {
        p.append(name, value || '')
      }
    }
    return p
  }

  get origin (): string {
    return (this.protocol ? this.protocol + '//' : '') + encodeHost(this.host)
  }

  get fullpath (): string {
    return encodePath(this.pathname) + this.search + encodeHash(this.hash)
  }

  get encodedAuth (): string {
    if (!this.auth) { return '' }
    const { username, password } = parseAuth(this.auth)
    return encodeURIComponent(username) + (password ? ':' + encodeURIComponent(password) : '')
  }

  get href (): string {
    const auth = this.encodedAuth
    const originWithAuth = (this.protocol ? this.protocol + '//' : '') + (auth ? auth + '@' : '') + encodeHost(this.host)
    return (this.hasProtocol && this.isAbsolute) ? (originWithAuth + this.fullpath) : this.fullpath
  }

  append (url: $URL) {
    if (url.hasProtocol) {
      throw new Error('Cannot append a URL with protocol')
    }

    Object.assign(this.query, url.query)

    if (url.pathname) {
      if (!this.pathname && this.host) {
        this.pathname = '/'
      }
      this.pathname = joinURL(this.pathname, url.pathname)
    }

    if (url.hash) {
      this.hash = url.hash
    }
  }

  resolve (url: $URL) {
    this.hash = url.hash

    if (Object.keys(url.query).length || url.pathname) {
      this.query = url.query
    }

    if (url.hasProtocol) {
      this.protocol = url.protocol
      this.host = url.host
      this.auth = url.auth
      this.pathname = url.pathname
      this.query = url.query
      this.hash = url.hash
      return
    }

    if (!url.pathname) {
      return
    }

    if (isAbsolutePath(url.pathname)) {
      this.pathname = url.pathname
      return
    }

    const wasAbsolute = isAbsolutePath(this.pathname)
    const resolvedPath = resolveRelativeSegments(this.pathname, url.pathname)
    this.pathname = wasAbsolute ? withLeadingSlash(resolvedPath) : resolvedPath
  }

  toJSON (): string {
    return this.href
  }

  toString (): string {
    return this.href
  }
}
