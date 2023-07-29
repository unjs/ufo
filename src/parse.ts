import { decode } from "./encoding";
import { hasProtocol } from "./utils";
export interface ParsedURL {
  protocol?: string;
  host?: string;
  auth?: string;
  href?: string;
  pathname: string;
  hash: string;
  search: string;
}

export interface ParsedAuth {
  username: string;
  password: string;
}

export interface ParsedHost {
  hostname: string;
  port: string;
}

/**
 * It takes a URL string and returns an object with the URL's protocol, auth, host, pathname, search,
 * and hash
 * @param [input] - The URL to parse.
 * @param [defaultProto] - The default protocol to use if the input doesn't have one.
 * @returns A parsed URL object.
 */
export function parseURL(input = "", defaultProto?: string): ParsedURL {
  const dataMatch = input.match(/^(data:|blob:)/);
  if (dataMatch) {
    const proto = dataMatch[1];
    return {
      protocol: proto,
      pathname: input.slice(proto.length),
      href: input,
      auth: "",
      host: "",
      search: "",
      hash: "",
    };
  }

  if (!hasProtocol(input, { acceptRelative: true })) {
    return defaultProto ? parseURL(defaultProto + input) : parsePath(input);
  }

  const [protocol = "", auth, hostAndPath = ""] = (
    input.replace(/\\/g, "/").match(/([^/:]+:)?\/\/([^/@]+@)?(.*)/) || []
  ).splice(1);
  const [host = "", path = ""] = (
    hostAndPath.match(/([^#/?]*)(.*)?/) || []
  ).splice(1);
  const { pathname, search, hash } = parsePath(
    path.replace(/\/(?=[A-Za-z]:)/, "")
  );

  return {
    protocol,
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
  };
}

/**
 * It splits the input string into three parts, and returns an object with those three parts
 * @param [input] - The URL to parse.
 * @returns An object with three properties: `pathname`, `search`, and `hash`.
 */
export function parsePath(input = ""): ParsedURL {
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
 * It takes a string of the form `username:password` and returns an object with the username and
 * password decoded
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
 * It takes a string, and returns an object with two properties: `hostname` and `port`
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
 * It takes a `ParsedURL` object and returns the stringified URL
 * @param [parsed] - The parsed URL
 * @returns A stringified URL.
 */
export function stringifyParsedURL(parsed: ParsedURL): string {
  const fullpath =
    parsed.pathname +
    (parsed.search
      ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search
      : "") +
    parsed.hash;
  if (!parsed.protocol) {
    return fullpath;
  }
  return (
    parsed.protocol +
    "//" +
    (parsed.auth ? parsed.auth + "@" : "") +
    parsed.host +
    fullpath
  );
}

const FILENAME_STRICT_REGEX = /\/([^/]+\.[^/]+)$/;
const FILENAME_REGEX = /\/([^/]+)$/;

export function parseFilename(input = "", { strict }): string | undefined {
  const { pathname } = parseURL(input);
  const matches = strict
    ? pathname.match(FILENAME_STRICT_REGEX)
    : pathname.match(FILENAME_REGEX);
  return matches ? matches[1] : undefined;
}
