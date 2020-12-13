import { hasProtocol, parseURLNative, ParamsObject } from './parse'
import { withoutLeadingSlash, withLeadingSlash, withTrailingSlash } from './utils'
import { encodeSearchParam } from './encoding'

export class UFO implements URL {
   params: ParamsObject = {}
   hash: string;
   hostname: string;
   password: string;
   pathname: string;
   port: string;
   protocol: string;
   username: string;

   constructor (input: string = '') {
     if (typeof input !== 'string') {
       throw new TypeError(`URL input should be string received ${typeof input} (${input})`)
     }
     const _hasProtocol = hasProtocol(input)
     const _isAbsolute = _hasProtocol || input[0] === '/'

     // Use native URL for parsing (replacable)
     const parsed = parseURLNative(input, _hasProtocol)
     this.hash = parsed.hash || ''
     this.hostname = parsed.hostname || ''
     this.pathname = _isAbsolute ? withLeadingSlash(parsed.pathname) : withoutLeadingSlash(parsed.pathname)
     this.username = parsed.username || ''
     this.password = parsed.password || ''
     this.port = parsed.port || ''
     this.protocol = _hasProtocol ? (parsed.protocol || '') : ''
     this.params = parsed.params || {}
   }

   get hasProtocol () {
     return this.protocol.length
   }

   get isAbsolute () {
     return this.hasProtocol || this.pathname[0] === '/'
   }

   get search (): string {
     const components = Object.keys(this.params).map(k => encodeSearchParam(k, this.params[k]))
     return components.length ? ('?' + components.join('&')) : ''
   }

   get searchParams (): URLSearchParams {
     const p = new URLSearchParams()
     for (const name in this.params) {
       const value = this.params[name]
       if (Array.isArray(value)) {
         value.forEach(v => p.append(name, v))
       } else {
         p.append(name, value)
       }
     }
     return p
   }

   get host () {
     return this.hostname + (this.port ? `:${this.port}` : '')
   }

   get origin (): string {
     return (this.protocol ? this.protocol + '//' : '') + this.host
   }

   get fullpath (): string {
     return this.pathname + this.search + this.hash
   }

   get href (): string {
     return this.isAbsolute ? (this.origin + this.fullpath) : this.fullpath
   }

   append (url: UFO) {
     if (url.hasProtocol) {
       throw new Error('Cannot append a URL with protocol')
     }

     Object.assign(this.params, url.params)

     if (url.pathname) {
       this.pathname = withTrailingSlash(this.pathname) + withoutLeadingSlash(url.pathname)
     }

     if (url.hash) {
       this.hash = url.hash
     }
   }

   toJSON (): string {
     return this.href
   }

   toString (): string {
     return this.href
   }
}
