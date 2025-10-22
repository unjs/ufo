export {
  encode,
  encodeHash,
  encodeHost,
  encodeQueryValue,
  encodeQueryKey,
  encodePath,
  encodeParam,
  decode,
  decodePath,
  decodeQueryKey,
  decodeQueryValue,
} from "./encoding";

export type { ParsedURL, ParsedAuth, ParsedHost } from "./parse";

export {
  parseURL,
  parsePath,
  parseAuth,
  parseHost,
  stringifyParsedURL,
  parseFilename,
} from "./parse";

export type { QueryValue, QueryObject, ParsedQuery } from "./query";

export { parseQuery, encodeQueryItem, stringifyQuery } from "./query";

export { $URL, createURL } from "./url";

export type { HasProtocolOptions } from "./utils";

export {
  isRelative,
  hasProtocol,
  isScriptProtocol,
  hasTrailingSlash,
  withoutTrailingSlash,
  withTrailingSlash,
  hasLeadingSlash,
  withoutLeadingSlash,
  withLeadingSlash,
  cleanDoubleSlashes,
  withBase,
  withoutBase,
  withQuery,
  filterQuery,
  getQuery,
  isEmptyURL,
  isNonEmptyURL,
  joinURL,
  joinRelativeURL,
  withHttp,
  withHttps,
  withoutProtocol,
  withProtocol,
  normalizeURL,
  resolveURL,
  isSamePath,
  isEqual,
  withFragment,
  withoutFragment,
  withoutHost,
} from "./utils";
