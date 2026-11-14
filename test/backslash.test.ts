import { describe, expect, test } from "vitest";
import {
  getQuery,
  normalizeURL,
  parseURL,
  stringifyParsedURL,
  withQuery,
} from "../src";

describe("URL backslashes", () => {
  test.each([
    [
      String.raw`https://example.com/a\b?q=c\d#e\f`,
      "/a/b",
      String.raw`?q=c\d`,
      String.raw`#e\f`,
    ],
    [
      String.raw`//example.com/a\b?q=c\d#e\f`,
      "/a/b",
      String.raw`?q=c\d`,
      String.raw`#e\f`,
    ],
    [
      String.raw`https:\\example.com\a\b?q=c\d#e\f`,
      "/a/b",
      String.raw`?q=c\d`,
      String.raw`#e\f`,
    ],
    [
      String.raw`https://example.com?q=a\b#c\d`,
      "",
      String.raw`?q=a\b`,
      String.raw`#c\d`,
    ],
    [
      String.raw`https://example.com/p#h\i?q=a\b`,
      "/p",
      "",
      String.raw`#h\i?q=a\b`,
    ],
    [
      String.raw`https://example.com/p?q=a\b?c\d#e\f`,
      "/p",
      String.raw`?q=a\b?c\d`,
      String.raw`#e\f`,
    ],
    [
      String.raw`https://example.com\@other.test/a\b?q=c\d`,
      "/@other.test/a/b",
      String.raw`?q=c\d`,
      "",
    ],
    [
      String.raw`file:///C:\home\user?q=c\d#e\f`,
      "C:/home/user",
      String.raw`?q=c\d`,
      String.raw`#e\f`,
    ],
    [
      String.raw`custom://example.com/a\b?q=c\d#e\f`,
      "/a/b",
      String.raw`?q=c\d`,
      String.raw`#e\f`,
    ],
    [
      String.raw`/a\b?q=c\d#e\f`,
      String.raw`/a\b`,
      String.raw`?q=c\d`,
      String.raw`#e\f`,
    ],
    ["https://example.com/a%5Cb?q=c%5Cd#e%5Cf", "/a%5Cb", "?q=c%5Cd", "#e%5Cf"],
    [String.raw`https://example.com/a\b`, "/a/b", "", ""],
  ])("preserves URL boundaries in %s", (input, pathname, search, hash) => {
    expect(parseURL(input)).toMatchObject({ pathname, search, hash });
  });

  test("retains scheme and authority normalization", () => {
    expect(parseURL(String.raw`https:\\example.com\a\b?q=c\d`)).toMatchObject({
      protocol: "https:",
      host: "example.com",
      pathname: "/a/b",
      search: String.raw`?q=c\d`,
    });
  });

  test("retains a default protocol", () => {
    expect(
      parseURL(String.raw`example.com/a\b?q=c\d#e\f`, "https://"),
    ).toMatchObject({
      protocol: "https:",
      host: "example.com",
      pathname: "/a/b",
      search: String.raw`?q=c\d`,
      hash: String.raw`#e\f`,
    });
  });

  test.each([
    [String.raw`?file=a\b@example.org`, String.raw`?file=a\b@example.org`, ""],
    [String.raw`#file=a\b@example.org`, "", String.raw`#file=a\b@example.org`],
  ])("retains the host with suffix data %s", (suffix, search, hash) => {
    expect(parseURL(`https://example.com${suffix}`)).toMatchObject({
      host: "example.com",
      auth: "",
      pathname: "",
      search,
      hash,
    });
  });

  test("keeps opaque protocols unchanged", () => {
    const input = String.raw`data:text/plain,a\b?q=c\d#e\f`;
    expect(parseURL(input)).toMatchObject({
      href: input,
      pathname: input.slice("data:".length),
      search: "",
      hash: "",
    });
  });

  test("keeps the existing fallback for protocols without an authority", () => {
    expect(
      parseURL(String.raw`mailto:user@example.com?q=a\b#c\d`),
    ).toMatchObject({
      protocol: "",
      host: "",
      pathname: "",
      search: "",
      hash: "",
    });
  });

  test("keeps absolute and relative query values identical", () => {
    const path = String.raw`/download?file=C:\Users\me\a.txt`;
    expect(getQuery(`https://example.com${path}`)).toEqual({
      file: String.raw`C:\Users\me\a.txt`,
    });
    expect(getQuery(path)).toEqual({ file: String.raw`C:\Users\me\a.txt` });
  });

  test("encodes the preserved query value when adding a parameter", () => {
    expect(
      withQuery(String.raw`https://example.com/p?q=a\b`, { page: 2 }),
    ).toBe("https://example.com/p?q=a%5Cb&page=2");
  });

  test("normalizes the path without changing suffix data", () => {
    expect(normalizeURL(String.raw`https://example.com/a\b?q=c\d#e\f`)).toBe(
      "https://example.com/a/b?q=c%5Cd#e%5Cf",
    );
  });

  test("stringifies protocol-relative URLs without introducing a scheme", () => {
    expect(
      stringifyParsedURL(parseURL(String.raw`//example.com/a\b?q=c\d#e\f`)),
    ).toBe(String.raw`//example.com/a/b?q=c\d#e\f`);
  });
});
