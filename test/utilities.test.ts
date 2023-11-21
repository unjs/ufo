import { describe, expect, test } from "vitest";
import {
  hasProtocol,
  isEqual,
  isRelative,
  parsePath,
  stringifyParsedURL,
  withHttp,
  withHttps,
  withoutProtocol,
  withProtocol,
  isScriptProtocol,
  withFragment,
} from "../src";

describe("hasProtocol", () => {
  const tests = [
    // No protocol
    { input: "//", out: [false, false, false] },
    { input: "///", out: [false, false, false] },
    { input: "C:/test", out: [false, false, false] },
    { input: "/test", out: [false, false, false] },

    // Has protocol (strict)
    { input: "custom:/", out: [true, true, true] },
    { input: "https://", out: [true, true, true] },
    { input: "https://test.com", out: [true, true, true] },
    { input: "file:///home/user", out: [true, true, true] },
    { input: "https:\\/foo.com", out: [true, true, true] },

    // Has protocol (non strict)
    { input: "tel:", out: [true, false, true] },
    { input: "javascript:alert(true)", out: [true, false, true] },
    { input: " javascript:alert(true)", out: [true, false, true] },
    { input: "\0javascript:alert(true)", out: [true, false, true] },
    { input: "\0https://", out: [true, true, true] },
    { input: "tel:123456", out: [true, false, true] },
    { input: "mailto:support@example.com", out: [true, false, true] },

    // Relative
    { input: "//test.com", out: [false, false, true] },
    { input: "///test.com", out: [false, false, true] },
    { input: "/\t//test.com", out: [false, false, true] },
    { input: "/\\/test.com", out: [false, false, true] },
    { input: "/\\localhost//", out: [false, false, true] },
  ];

  for (const t of tests) {
    test(t.input.toString(), () => {
      const [withDefault, withStrict, withAcceptRelative] = t.out;
      expect(hasProtocol(t.input)).toBe(withDefault);
      expect(hasProtocol(t.input, { strict: true })).toBe(withStrict);
      expect(hasProtocol(t.input, { acceptRelative: true })).toBe(
        withAcceptRelative
      );
      expect(hasProtocol(t.input, true)).toBe(withAcceptRelative);
    });
  }
});

describe("isScriptProtocol", () => {
  const tests = [
    { input: "blob:", out: true },
    { input: "data:", out: true },
    { input: "javascript:", out: true },
    { input: "javaScript:", out: true },
    { input: "vbscript:", out: true },
    { input: "\0vbscript:", out: true },
  ];
  for (const t of tests) {
    test(t.input.toString(), () => {
      expect(isScriptProtocol(t.input)).toBe(t.out);
    });
  }
});

describe("isRelative", () => {
  const tests = [
    { input: "/", out: false },
    { input: ".//", out: true },
    { input: "../test", out: true },
    { input: "https://", out: false },
  ];

  for (const t of tests) {
    test(t.input.toString(), () => {
      expect(isRelative(t.input)).toBe(t.out);
    });
  }
});

describe("stringifyParsedURL", () => {
  const tests = [
    { input: ".#hash", out: ".#hash" },
    { input: ".?foo=123", out: ".?foo=123" },
    { input: "./?foo=123#hash", out: "./?foo=123#hash" },
    { input: "/test?query=123#hash", out: "/test?query=123#hash" },
    { input: "test?query=123#hash", out: "test?query=123#hash" },
    { input: "/%c", out: "/%c" },
    { input: "/%", out: "/%" },
    {
      input: "http://foo.com/test?query=123#hash",
      out: "http://foo.com/test?query=123#hash",
    },
    { input: "http://localhost:3000", out: "http://localhost:3000" },
    {
      input: "http://my_email%40gmail.com:password@www.my_site.com",
      out: "http://my_email%40gmail.com:password@www.my_site.com",
    },
    {
      input: "/test?query=123,123#hash, test",
      out: "/test?query=123,123#hash, test",
    },
    {
      input: { host: "google.com" },
      out: "google.com",
    },
    {
      input: { protocol: "https:", host: "google.com" },
      out: "https://google.com",
    },
  ];

  for (const t of tests) {
    test(t.input.toString(), () => {
      expect(
        stringifyParsedURL(
          typeof t.input === "string" ? parsePath(t.input) : t.input
        )
      ).toBe(t.out);
    });
  }
});

describe("withHttp", () => {
  const tests = [
    { input: "https://example.com", out: "http://example.com" },
    { input: "ftp://example.com/test?foo", out: "http://example.com/test?foo" },
    {
      input: "https://foo.com/test?query=123#hash",
      out: "http://foo.com/test?query=123#hash",
    },
    { input: "file:///home/user", out: "http:///home/user" },
    { input: "foo.bar.com", out: "http://foo.bar.com" },
  ];

  for (const t of tests) {
    test(t.input.toString(), () => {
      expect(withHttp(t.input)).toBe(t.out);
    });
  }
});

describe("withHttps", () => {
  const tests = [
    { input: "http://example.com", out: "https://example.com" },
    {
      input: "ftp://example.com/test?foo",
      out: "https://example.com/test?foo",
    },
    {
      input: "http://foo.com/test?query=123#hash",
      out: "https://foo.com/test?query=123#hash",
    },
    { input: "file:///home/user", out: "https:///home/user" },
    { input: "foo.bar.com", out: "https://foo.bar.com" },
  ];

  for (const t of tests) {
    test(t.input.toString(), () => {
      expect(withHttps(t.input)).toBe(t.out);
    });
  }
});

describe("withProtocol", () => {
  const tests = [
    {
      input: "http://example.com",
      protocol: "https://",
      out: "https://example.com",
    },
    {
      input: "https://example.com",
      protocol: "http://",
      out: "http://example.com",
    },
    {
      input: "ftp://example.com/test?foo",
      protocol: "http://",
      out: "http://example.com/test?foo",
    },
    {
      input: "http://foo.com/test?query=123#hash",
      protocol: "ftp://",
      out: "ftp://foo.com/test?query=123#hash",
    },
    {
      input: "file:///home/user",
      protocol: "https://",
      out: "https:///home/user",
    },
    { input: "tel:1234567890", protocol: "skype:", out: "skype:1234567890" },
    {
      input: "tel://+1234567890",
      protocol: "callto://",
      out: "callto://+1234567890",
    },
  ];

  for (const t of tests) {
    test(t.input.toString(), () => {
      expect(withProtocol(t.input, t.protocol)).toBe(t.out);
    });
  }
});

describe("withoutProtocol", () => {
  const tests = [
    { input: "http://example.com", out: "example.com" },
    { input: "https://example.com", out: "example.com" },
    { input: "ftp://example.com/test?foo", out: "example.com/test?foo" },
    {
      input: "http://foo.com/test?query=123#hash",
      out: "foo.com/test?query=123#hash",
    },
    { input: "file:///home/user", out: "/home/user" },
    { input: "tel:1234567890", out: "1234567890" },
    { input: "mailto:support@example.com", out: "support@example.com" },
    { input: "skype:1234567890", out: "1234567890" },
    { input: "callto://+1234567890", out: "+1234567890" },
  ];

  for (const t of tests) {
    test(t.input.toString(), () => {
      expect(withoutProtocol(t.input)).toBe(t.out);
    });
  }
});

describe("isEqual", () => {
  const tests: { input: [string, string, any?]; out: boolean }[] = [
    { input: ["/foo", "/foo/"], out: true },
    { input: ["foo", "/foo"], out: true },
    { input: ["foo", "/foo/"], out: true },
    { input: ["/foo%20bar/", "/foo bar"], out: true },
    { input: ["foo", "/foo", { leadingSlash: true }], out: false },
    { input: ["foo", "foo/", { trailingSlash: true }], out: false },
    { input: ["/foo%20bar/", "/foo bar", { encoding: true }], out: false },
  ];

  for (const t of tests) {
    test(`${t.input[0]} == ${t.input[1]} ${
      t.input[2] ? JSON.stringify(t.input[2]) : ""
    }`, () => {
      expect(isEqual(t.input[0], t.input[1], t.input[2])).toBe(t.out);
    });
  }
});

describe("withFragment", () => {
  const tests = [
    {
      input: "https://example.com",
      fragment: "foo",
      out: "https://example.com#foo",
    },
    {
      input: "https://example.com#bar",
      fragment: "foo",
      out: "https://example.com#foo",
    },
    { input: "https://example.com", fragment: "", out: "https://example.com" },
    {
      input: "https://example.com#bar",
      fragment: "",
      out: "https://example.com",
    },
    {
      input: "https://example.com#bar",
      fragment: "0",
      out: "https://example.com#0",
    },
    {
      input: "https://example.com#bar",
      fragment: "foo bar",
      out: "https://example.com#foo%20bar",
    },
    {
      input: "https://example.com?foo=bar",
      fragment: "baz",
      out: "https://example.com?foo=bar#baz",
    },
  ];

  for (const t of tests) {
    test(`${t.input} + ${t.fragment}`, () => {
      expect(withFragment(t.input, t.fragment)).toBe(t.out);
    });
  }
});
