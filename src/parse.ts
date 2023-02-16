import { decode } from "./encoding";
import { hasProtocol } from "./utils";
export interface ParsedURL {
  protocol?: string;
  host?: string;
  auth?: string;
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

export function parseURL(input = "", defaultProto?: string): ParsedURL {
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

export function parseAuth(input = ""): ParsedAuth {
  const [username, password] = input.split(":");
  return {
    username: decode(username),
    password: decode(password),
  };
}

export function parseHost(input = ""): ParsedHost {
  const [hostname, port] = (input.match(/([^/:]*):?(\d+)?/) || []).splice(1);
  return {
    hostname: decode(hostname),
    port,
  };
}

export function stringifyParsedURL(parsed: ParsedURL) {
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
