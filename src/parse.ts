import { decode } from "./encoding";
import { hasProtocol } from "./utils";

const protocolRelative = Symbol.for("ufo:protocolRelative");

export interface ParsedURL {
  protocol?: string;
  host?: string;
  auth?: string;
  href?: string;
  pathname: string;
  hash: string;
  search: string;
  [protocolRelative]?: boolean;
}

export type ParsedPath = Pick<ParsedURL, "pathname" | "hash" | "search">;

export interface ParsedAuth {
  username: string;
  password: string;
}

export interface ParsedHost {
  hostname: string;
  port: string;
}

/**
 * Takes a URL string and returns an object with the URL's `protocol`, `auth`, `host`, `pathname`, `search`, and `hash`.
 *
 * @example
 *
 * ```js
 * parseURL("http://foo.com/foo?test=123#token");
 * // { protocol: 'http:', auth: '', host: 'foo.com', pathname: '/foo', search: '?test=123', hash: '#token' }
 *
 * parseURL("foo.com/foo?test=123#token");
 * // { pathname: 'foo.com/foo', search: '?test=123', hash: '#token' }
 *
 * parseURL("foo.com/foo?test=123#token", "https://");
 * // { protocol: 'https:', auth: '', host: 'foo.com', pathname: '/foo', search: '?test=123', hash: '#token' }
 * ```
 *
 * @group parsing_utils
 *
 * @param [input] - The URL to parse.
 * @param [defaultProto] - The default protocol to use if the input doesn't have one.
 * @returns A parsed URL object.
 */
export function parseURL(input = "", defaultProto?: string): ParsedURL {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i,
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: "",
    };
  }

  if (!hasProtocol(input, { acceptRelative: true })) {
    return defaultProto ? parseURL(defaultProto + input) : parsePath(input);
  }

  // Protocols without a `//` authority (e.g. `mailto:`, `tel:`, `urn:`) have an
  // opaque path that must be preserved instead of being dropped by the
  // host-based parser below.
  const _opaqueProtoMatch = input.match(/^[\s\0]*([\w+.-]{2,}:)(?!\/\/)(.*)/);
  if (_opaqueProtoMatch) {
    const [, _proto, _rest = ""] = _opaqueProtoMatch;
    const { pathname, search, hash } = parsePath(_rest);
    return {
      protocol: _proto.toLowerCase(),
      auth: "",
      host: "",
      pathname,
      search,
      hash,
    };
  }

  const [, protocol = "", auth, hostAndPath = ""] =
    input
      .replace(/\\/g, "/")
      .match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];

  // eslint-disable-next-line prefer-const
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];

  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }

  const { pathname, search, hash } = parsePath(path);

  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol,
  };
}

/**
 * Splits the input string into three parts, and returns an object with those three parts.
 *
 * @example
 *
 * ```js
 * parsePath("http://foo.com/foo?test=123#token");
 * // { pathname: 'http://foo.com/foo', search: '?test=123', hash: '#token' }
 * ```
 *
 * @group parsing_utils
 *
 * @param [input] - The URL to parse.
 * @returns An object with three properties: `pathname`, `search`, and `hash`.
 */
export function parsePath(input = ""): ParsedPath {
  const [pathname = "", search = "", hash = ""] = (
    input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []
  ).splice(1);

  return {
    pathname,
    search,
    hash,
  };
}

/**
 * Takes a string of the form `username:password` and returns an object with the username and
 * password decoded.
 *
 * @group parsing_utils
 *
 * @param [input] - The URL to parse.
 * @returns An object with two properties: username and password.
 */
export function parseAuth(input = ""): ParsedAuth {
  const [username, password] = input.split(":");
  return {
    username: decode(username),
    password: decode(password),
  };
}

/**
 * Takes a string, and returns an object with two properties: `hostname` and `port`.
 *
 * @example
 *
 * ```js
 * parseHost("foo.com:8080");
 * // { hostname: 'foo.com', port: '8080' }
 * ```
 *
 * @group parsing_utils
 *
 * @param [input] - The URL to parse.
 * @returns A function that takes a string and returns an object with two properties: `hostname` and
 * `port`.
 */
export function parseHost(input = ""): ParsedHost {
  const [hostname, port] = (input.match(/([^/:]*):?(\d+)?/) || []).splice(1);
  return {
    hostname: decode(hostname),
    port,
  };
}

/**
 * Takes a `ParsedURL` object and returns the stringified URL.
 *
 * @group parsing_utils
 *
 * @example
 *
 * ```js
 * const obj = parseURL("http://foo.com/foo?test=123#token");
 * obj.host = "bar.com";
 *
 * stringifyParsedURL(obj); // "http://bar.com/foo?test=123#token"
 * ```
 *
 * @param [parsed] - The parsed URL
 * @returns A stringified URL.
 */
export function stringifyParsedURL(parsed: Partial<ParsedURL>): string {
  const pathname = parsed.pathname || "";
  const search = parsed.search
    ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search
    : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  // Only emit the `//` authority separator when there is an authority to
  // separate (a host/auth) or for protocol-relative URLs. Opaque-path
  // protocols such as `mailto:`, `tel:` or `data:` must not gain a spurious
  // `//`, otherwise the parse↔stringify round-trip corrupts the URL.
  let proto = "";
  if (parsed[protocolRelative]) {
    proto = (parsed.protocol || "") + "//";
  } else if (parsed.protocol) {
    // `file:` URLs canonically keep their (possibly empty) `//` authority,
    // while opaque-path protocols (`mailto:`, `tel:`, `data:`, ...) without a
    // host/auth must not gain a spurious `//`.
    const hasAuthority = host || auth || parsed.protocol === "file:";
    proto = hasAuthority ? parsed.protocol + "//" : parsed.protocol;
  }
  return proto + auth + host + pathname + search + hash;
}

const FILENAME_STRICT_REGEX = /\/([^/]+\.[^/]+)$/;
const FILENAME_REGEX = /\/([^/]+)$/;

/**
 * Parses a URL and returns last segment in path as filename.
 *
 * If `{ strict: true }` is passed as the second argument, it will only return the last segment only if ending with an extension.
 *
 * @group parsing_utils
 *
 * @example
 *
 * ```js
 * // Result: filename.ext
 * parseFilename("http://example.com/path/to/filename.ext");
 *
 * // Result: undefined
 * parseFilename("/path/to/.hidden-file", { strict: true });
 * ```
 *
 * @param [input] - The URL to parse.
 * @param [opts]  - Options to use while parsing
 */
export function parseFilename(
  input = "",
  opts?: { strict?: boolean },
): string | undefined {
  const { pathname } = parseURL(input);
  const matches = opts?.strict
    ? pathname.match(FILENAME_STRICT_REGEX)
    : pathname.match(FILENAME_REGEX);
  return matches ? matches[1] : undefined;
}
