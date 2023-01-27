import { parseURL, parseAuth, parseHost } from "./parse";
import { QueryObject, parseQuery, stringifyQuery } from "./query";
import { withoutLeadingSlash, withTrailingSlash } from "./utils";
import { encodeHash, encodePath, decodePath, decode, encodeHost } from "./encoding";

export class $URL implements URL {
  protocol: string;
  host: string;
  auth: string;
  pathname: string;
  query: QueryObject = {};
  hash: string;

  constructor (input: string = "") {
    if (typeof input !== "string") {
      throw new TypeError(`URL input should be string received ${typeof input} (${input})`);
    }

    const parsed = parseURL(input);

    this.protocol = decode(parsed.protocol);
    this.host = decode(parsed.host);
    this.auth = decode(parsed.auth);
    this.pathname = decodePath(parsed.pathname);
    this.query = parseQuery(parsed.search);
    this.hash = decode(parsed.hash);
  }

  get hostname (): string {
    return parseHost(this.host).hostname;
  }

  get port (): string {
    return parseHost(this.host).port || "";
  }

  get username (): string {
    return parseAuth(this.auth).username;
  }

  get password (): string {
    return parseAuth(this.auth).password || "";
  }

  get hasProtocol () {
    return this.protocol.length;
  }

  get isAbsolute () {
    return this.hasProtocol || this.pathname[0] === "/";
  }

  get search (): string {
    const q = stringifyQuery(this.query);
    return q.length > 0 ? "?" + q : "";
  }

  get searchParams (): URLSearchParams {
    const p = new URLSearchParams();
    for (const name in this.query) {
      const value = this.query[name];

      const appendValues = (name, value) => {
        if (Array.isArray(value)) {
          for (const v of value) { p.append(name, v); }
        } else if (typeof value === 'object') {
          for (const [objKey, objVal] of Object.entries(value)) { appendValues(`${name}[${objKey}]`, objVal); }
        } else {
          p.append(name, value || '');
        }
      }

      appendValues(name, value);
    }
    return p;
  }

  get origin (): string {
    return (this.protocol ? this.protocol + "//" : "") + encodeHost(this.host);
  }

  get fullpath (): string {
    return encodePath(this.pathname) + this.search + encodeHash(this.hash);
  }

  get encodedAuth (): string {
    if (!this.auth) { return ""; }
    const { username, password } = parseAuth(this.auth);
    return encodeURIComponent(username) + (password ? ":" + encodeURIComponent(password) : "");
  }

  get href (): string {
    const auth = this.encodedAuth;
    const originWithAuth = (this.protocol ? this.protocol + "//" : "") + (auth ? auth + "@" : "") + encodeHost(this.host);
    return (this.hasProtocol && this.isAbsolute) ? (originWithAuth + this.fullpath) : this.fullpath;
  }

  append (url: $URL) {
    if (url.hasProtocol) {
      throw new Error("Cannot append a URL with protocol");
    }

    Object.assign(this.query, url.query);

    if (url.pathname) {
      this.pathname = withTrailingSlash(this.pathname) + withoutLeadingSlash(url.pathname);
    }

    if (url.hash) {
      this.hash = url.hash;
    }
  }

  toJSON (): string {
    return this.href;
  }

  toString (): string {
    return this.href;
  }
}
