import { $URL } from "./url";
import { parseURL, stringifyParsedURL } from "./parse";
import { QueryObject, parseQuery, stringifyQuery } from "./query";
import { decode } from "./encoding";

export function isRelative(inputString: string) {
  return ["./", "../"].some((string_) => inputString.startsWith(string_));
}

const PROTOCOL_STRICT_REGEX = /^\w{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^\w{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;

export interface HasProtocolOptions {
  acceptRelative?: boolean;
  strict?: boolean;
}
export function hasProtocol(
  inputString: string,
  opts?: HasProtocolOptions
): boolean;
/**
 * @deprecated
 * Same as { hasProtocol(inputString, { acceptRelative: true })
 */
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

const TRAILING_SLASH_RE = /\/$|\/\?/;

export function hasTrailingSlash(input = "", queryParameters = false): boolean {
  if (!queryParameters) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}

export function withoutTrailingSlash(
  input = "",
  queryParameters = false
): string {
  if (!queryParameters) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  const [s0, ...s] = input.split("?");
  return (s0.slice(0, -1) || "/") + (s.length > 0 ? `?${s.join("?")}` : "");
}

export function withTrailingSlash(input = "", queryParameters = false): string {
  if (!queryParameters) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  const [s0, ...s] = input.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "");
}

export function hasLeadingSlash(input = ""): boolean {
  return input.startsWith("/");
}

export function withoutLeadingSlash(input = ""): string {
  return (hasLeadingSlash(input) ? input.slice(1) : input) || "/";
}

export function withLeadingSlash(input = ""): string {
  return hasLeadingSlash(input) ? input : "/" + input;
}

export function cleanDoubleSlashes(input = ""): string {
  return input
    .split("://")
    .map((string_) => string_.replace(/\/{2,}/g, "/"))
    .join("://");
}

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

export function withQuery(input: string, query: QueryObject): string {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}

export function getQuery<T extends QueryObject = QueryObject>(input: string): T {
  return parseQuery<T>(parseURL(input).search);
}

export function isEmptyURL(url: string) {
  return !url || url === "/";
}

export function isNonEmptyURL(url: string) {
  return url && url !== "/";
}

export function joinURL(base: string, ...input: string[]): string {
  let url = base || "";

  for (const index of input.filter((url) => isNonEmptyURL(url))) {
    url = url ? withTrailingSlash(url) + withoutLeadingSlash(index) : index;
  }

  return url;
}

export function withHttp(input: string): string {
  return withProtocol(input, "http://");
}

export function withHttps(input: string): string {
  return withProtocol(input, "https://");
}

export function withoutProtocol(input: string): string {
  return withProtocol(input, "");
}

export function withProtocol(input: string, protocol: string): string {
  const match = input.match(PROTOCOL_REGEX);
  if (!match) {
    return protocol + input;
  }
  return protocol + input.slice(match[0].length);
}

// $URL based utils

export function createURL(input: string): $URL {
  return new $URL(input);
}

export function normalizeURL(input: string): string {
  return createURL(input).toString();
}

export function resolveURL(base: string, ...input: string[]): string {
  const url = createURL(base);

  for (const index of input.filter((url) => isNonEmptyURL(url))) {
    url.append(createURL(index));
  }

  return url.toString();
}

export function isSamePath(p1: string, p2: string) {
  return decode(withoutTrailingSlash(p1)) === decode(withoutTrailingSlash(p2));
}

interface CompareURLOptions {
  trailingSlash?: boolean;
  leadingSlash?: boolean;
  encoding?: boolean;
}

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
