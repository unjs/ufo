import { describe, expect, test } from "vitest";
import { getQuery, withQuery } from "../src";

describe("withQuery", () => {
  const tests = [
    { input: "", query: {}, out: "" },
    { input: "/", query: {}, out: "/" },
    { input: "?test", query: {}, out: "?test" },
    { input: "/?test", query: {}, out: "/?test" },
    { input: "/?test", query: { foo: "0" }, out: "/?test&foo=0" },
    { input: "/?test", query: { foo: 0 }, out: "/?test&foo=0" },
    { input: "/?test", query: { foo: 1 }, out: "/?test&foo=1" },
    { input: "/?test", query: { test: undefined }, out: "/" },
    { input: "/?foo=1", query: { foo: 2 }, out: "/?foo=2" },
    {
      input: "/?foo=1",
      query: { foo: true, bar: false },
      out: "/?foo=true&bar=false",
    },
    { input: "/?foo=1", query: { foo: undefined }, out: "/" },
    // eslint-disable-next-line unicorn/no-null
    { input: "/?foo=1", query: { foo: null }, out: "/?foo" },
    {
      input: "/",
      query: { email: "some email.com" },
      out: "/?email=some+email.com",
    },
    {
      input: "/",
      query: { str: "&", str2: "%26" },
      out: "/?str=%26&str2=%2526",
    },
    { input: "/?x=1,2,3", query: { y: "1,2,3" }, out: "/?x=1,2,3&y=1,2,3" },
    { input: "http://a.com?v=1", query: { x: 2 }, out: "http://a.com?v=1&x=2" },
    { input: "/", query: { param: ["3", ""] }, out: "/?param=3&param=" },
    { input: "/", query: { param: ["", "3"] }, out: "/?param=&param=3" },
  ];

  for (const t of tests) {
    test(t.input.toString() + " with " + JSON.stringify(t.query), () => {
      expect(withQuery(t.input, t.query)).toBe(t.out);
    });
  }
});

describe("getQuery", () => {
  const tests = {
    "http://foo.com/foo?test=123&unicode=%E5%A5%BD": {
      test: "123",
      unicode: "好",
    },
    "http://foo.com/?param=3&param=": { param: ["3", ""] },
    "http://foo.com/?param=&param=3": { param: ["", "3"] },
  };

  for (const t in tests) {
    test(t, () => {
      expect(getQuery(t)).toMatchObject(tests[t]);
    });
  }
});
