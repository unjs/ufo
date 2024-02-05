import { parseURL, stringifyParsedURL } from "./parse";
import { QueryObject, parseQuery, stringifyQuery, ParsedQuery } from "./query";
import {
  decode,
  decodePath,
  encodeHash,
  encodeHost,
  encodePath,
} from "./encoding";

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;

/**
 * Checks if the input is a relative URL starting with `./` or `../`
 */
export function isRelative(inputString: string) {
  return ["./", "../"].some((string_) => inputString.startsWith(string_));
}

export interface HasProtocolOptions {
  acceptRelative?: boolean;
  strict?: boolean;
}

/**
 * Checks if the input has a protocol.
 *
 * You can use `{ acceptRelative: true }` to accept relative URLs as valid protocol.
 */
export function hasProtocol(
  inputString: string,
  opts?: HasProtocolOptions
): boolean;
/** @deprecated Same as { hasProtocol(inputString, { acceptRelative: true }) */
export function hasProtocol(
  inputString: string,
  acceptRelative: boolean
): boolean;
export function hasProtocol(
  inputString: string,
  opts: boolean | HasProtocolOptions = {}
): boolean {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return (
    PROTOCOL_REGEX.test(inputString) ||
    (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false)
  );
}

/**
 * Checks if the input protocol is any of the dangrous `blob:`, `data:`, `javascript`: or `vbscript:` protocols.
 */
export function isScriptProtocol(protocol?: string) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}

export function hasTrailingSlash(
  input = "",
  respectQueryAndFragment?: boolean
): boolean {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}

/**
 * Removes trailing slash from the URL or pathname.
 *
 * If sercond argument is is true, it will only remove the trailing slash if it's not part of the query or fragment with cost of more expensive operation.
 */
export function withoutTrailingSlash(
  input = "",
  respectQueryAndFragment?: boolean
): string {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  return (
    (s0.slice(0, -1) || "/") +
    (s.length > 0 ? `?${s.join("?")}` : "") +
    fragment
  );
}

/**
 * Ensures the URL or pathname has a trailing slash.
 *
 * If sercond argument is is true, it will only add the trailing slash if it's not part of the query or fragment with cost of more expensive operation.
 */
export function withTrailingSlash(
  input = "",
  respectQueryAndFragment?: boolean
): string {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}

/**
 * Checks if the input has a leading slash. (e.g. `/foo`)
 */
export function hasLeadingSlash(input = ""): boolean {
  return input.startsWith("/");
}

/**
 * Removes leading slash from the URL or pathname.
 */
export function withoutLeadingSlash(input = ""): string {
  return (hasLeadingSlash(input) ? input.slice(1) : input) || "/";
}

/**
 * Ensures the URL or pathname has a leading slash.
 */
export function withLeadingSlash(input = ""): string {
  return hasLeadingSlash(input) ? input : "/" + input;
}

/**
 * Removes double slashes from the URL.
 */
export function cleanDoubleSlashes(input = ""): string {
  return input
    .split("://")
    .map((string_) => string_.replace(/\/{2,}/g, "/"))
    .join("://");
}

/**
 * Ensures the URL or pathname has a trailing slash.
 *
 * If input aleady start with base, it will not be added again.
 */
export function withBase(input: string, base: string) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}

/**
 * Removes the base from the URL or pathname.
 *
 * If input does not start with base, it will not be removed.
 */
export function withoutBase(input: string, base: string) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}

/**
 * Add/Replace the query section of the URL.
 */
export function withQuery(input: string, query: QueryObject): string {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}

/**
 * Parses the query object of an input URL into an object.
 */
export function getQuery<T extends ParsedQuery = ParsedQuery>(
  input: string
): T {
  return parseQuery<T>(parseURL(input).search);
}

/**
 * Checks if the input URL or pathname is empty or `/`.
 */
export function isEmptyURL(url: string) {
  return !url || url === "/";
}

/**
 * Checks if the input URL or pathname is not empty nor `/`.
 */
export function isNonEmptyURL(url: string) {
  return url && url !== "/";
}

/**
 * Joins multiple URL segments into a single URL.
 */
export function joinURL(base: string, ...input: string[]): string {
  let url = base || "";

  for (const segment of input.filter((url) => isNonEmptyURL(url))) {
    if (url) {
      // TODO: Handle .. when joining
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }

  return url;
}

/**
 * Adds `http://` to the input if it doesn't have a protocol.
 */
export function withHttp(input: string): string {
  return withProtocol(input, "http://");
}

/**
 * Adds `https://` to the input if it doesn't have a protocol.
 */
export function withHttps(input: string): string {
  return withProtocol(input, "https://");
}

/**
 * Removes the protocol from the input.
 */
export function withoutProtocol(input: string): string {
  return withProtocol(input, "");
}

/**
 * Adds or Replaces protocol of the input URL.
 */
export function withProtocol(input: string, protocol: string): string {
  const match = input.match(PROTOCOL_REGEX);
  if (!match) {
    return protocol + input;
  }
  return protocol + input.slice(match[0].length);
}

/**
 * - Ensures URL is properly encoded
 * - Ensures pathname starts with slash
 * - Preserves protocol/host if provided
 */
export function normalizeURL(input: string): string {
  const parsed = parseURL(input);
  parsed.pathname = encodePath(decodePath(parsed.pathname));
  parsed.hash = encodeHash(decode(parsed.hash));
  parsed.host = encodeHost(decode(parsed.host));
  parsed.search = stringifyQuery(parseQuery(parsed.search));
  return stringifyParsedURL(parsed);
}

/**
 * Resolves multiple URL segments into a single URL.
 */
export function resolveURL(base = "", ...inputs: string[]): string {
  if (typeof base !== "string") {
    throw new TypeError(
      `URL input should be string received ${typeof base} (${base})`
    );
  }

  const filteredInputs = inputs.filter((input) => isNonEmptyURL(input));

  if (filteredInputs.length === 0) {
    return base;
  }

  const url = parseURL(base);

  for (const inputSegment of filteredInputs) {
    const urlSegment = parseURL(inputSegment);

    // Append path
    if (urlSegment.pathname) {
      url.pathname =
        withTrailingSlash(url.pathname) +
        withoutLeadingSlash(urlSegment.pathname);
    }

    // Override hash
    if (urlSegment.hash && urlSegment.hash !== "#") {
      url.hash = urlSegment.hash;
    }

    // Append search
    if (urlSegment.search && urlSegment.search !== "?") {
      if (url.search && url.search !== "?") {
        const queryString = stringifyQuery({
          ...parseQuery(url.search),
          ...parseQuery(urlSegment.search),
        });
        url.search = queryString.length > 0 ? "?" + queryString : "";
      } else {
        url.search = urlSegment.search;
      }
    }
  }

  return stringifyParsedURL(url);
}

/**
 * Checks if two paths are the same regardless of encoding and trailing slash differences.
 */
export function isSamePath(p1: string, p2: string) {
  return decode(withoutTrailingSlash(p1)) === decode(withoutTrailingSlash(p2));
}

interface CompareURLOptions {
  trailingSlash?: boolean;
  leadingSlash?: boolean;
  encoding?: boolean;
}

/**
 *  Checks if two paths are equal regardless of encoding, trailing slash, and leading slash differences.
 *
 * You can make slash check strict by setting `{ trailingSlash: true, leadingSlash: true }` as options.
 *
 * You can make encoding check strict by setting `{ encoding: true }` as options.
 */
export function isEqual(a: string, b: string, options: CompareURLOptions = {}) {
  if (!options.trailingSlash) {
    a = withTrailingSlash(a);
    b = withTrailingSlash(b);
  }
  if (!options.leadingSlash) {
    a = withLeadingSlash(a);
    b = withLeadingSlash(b);
  }
  if (!options.encoding) {
    a = decode(a);
    b = decode(b);
  }
  return a === b;
}

/**
 * Add/Replace the fragment section of the URL.
 *
 * @example
 * withFragment("/foo", "bar"); // "/foo#bar"
 * withFragment("/foo#bar", "baz"); // "/foo#baz"
 * withFragment("/foo#bar", ""); // "/foo"
 */
export function withFragment(input: string, hash: string): string {
  if (!hash || hash === "#") {
    return input;
  }
  const parsed = parseURL(input);
  parsed.hash = hash === "" ? "" : "#" + encodeHash(hash);
  return stringifyParsedURL(parsed);
}

/**
 * Removes the fragment/hash part from the URL.
 *
 * @example
 *
 * ```js
 * withoutFragment("http://example.com/foo?q=123#bar") // "http://example.com/foo?q=123"
 * ```
 */
export function withoutFragment(input: string): string {
  return stringifyParsedURL({ ...parseURL(input), hash: "" });
}
