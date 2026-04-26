import { describe, expect, test } from "vitest";
import { filterQuery, getQuery, parseQuery, withQuery } from "../src";

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
    { input: "/?foo=1", query: { foo: null }, out: "/?foo" },
    {
      input: "/",
      query: { email: "some email.com" },
      out: "/?email=some+email.com",
    },
    {
      input: "/",
      query: { "key with space": "spaced value" },
      out: "/?key+with+space=spaced+value",
    },
    {
      input: "/",
      query: { str: "&", str2: "%26" },
      out: "/?str=%26&str2=%2526",
    },
    { input: "/?x=1,2,3", query: { y: "1,2,3" }, out: "/?x=1,2,3&y=1,2,3" },
    { input: "http://a.com?v=1", query: { x: 2 }, out: "http://a.com?v=1&x=2" },
    {
      input: "/",
      query: { json: '{"test":["content"]}' },
      out: "/?json=%7B%22test%22:%5B%22content%22%5D%7D",
    },
    { input: "/", query: { param: ["3", ""] }, out: "/?param=3&param=" },
    { input: "/", query: { param: ["", "3"] }, out: "/?param=&param=3" },
    {
      input: "/",
      query: { param: { a: { nested: { object: 123 } } } },
      out: "/?param=%7B%22a%22:%7B%22nested%22:%7B%22object%22:123%7D%7D%7D",
    },
    {
      input: "/",
      query: { param: { a: [{ obj: 1 }, { obj: 2 }] } },
      out: "/?param=%7B%22a%22:%5B%7B%22obj%22:1%7D,%7B%22obj%22:2%7D%5D%7D", // {"a":[{"obj":1},{"obj":2}]}
    },
    {
      input: "/",
      query: { param: { a: [{ obj: [1, 2, 3] }] } },
      out: "/?param=%7B%22a%22:%5B%7B%22obj%22:%5B1,2,3%5D%7D%5D%7D", // {"a":[{"obj":[1,2,3]}]}
    },
    {
      input: "/",
      query: { a: "X", "b[]": [], c: "Y" },
      out: "/?a=X&c=Y",
    },
  ];

  for (const t of tests) {
    test(t.input.toString() + " with " + JSON.stringify(t.query), () => {
      expect(withQuery(t.input, t.query)).toBe(t.out);
    });
  }
});

describe("parseQuery", () => {
  test("parses repeated keys into arrays", () => {
    const query = parseQuery("tags=javascript&tags=web&tags=dev");

    expect(query.tags).toEqual(["javascript", "web", "dev"]);
  });

  test("parses empty values and values containing equals", () => {
    const query = parseQuery("?empty=&flag&param=a=b=c");

    expect(query.empty).toBe("");
    expect(query.flag).toBe("");
    expect(query.param).toBe("a=b=c");
  });

  test("decodes plus and invalid percent sequences like encoding helpers", () => {
    const query = parseQuery("key+with+space=value+with+space&bad=%E0%A4%A");

    expect(query["key with space"]).toBe("value with space");
    expect(query.bad).toBe("%E0%A4%A");
  });

  test("ignores dangerous keys and returns a null-prototype object", () => {
    const query = parseQuery(
      "__proto__=polluted&%5F%5Fproto%5F%5F=encoded&constructor=evil&safe=ok",
    );

    expect(Object.getPrototypeOf(query)).toBe(null);
    expect(Object.prototype.hasOwnProperty.call(query, "__proto__")).toBe(
      false,
    );
    expect(Object.prototype.hasOwnProperty.call(query, "constructor")).toBe(
      false,
    );
    expect(query.safe).toBe("ok");
  });

  test("preserves leading equals compatibility", () => {
    const query = parseQuery("=foo=bar&==baz=qux&===");

    expect(query.foo).toBe("bar");
    expect(query.baz).toBe("qux");
    expect(Object.keys(query)).toEqual(["foo", "baz"]);
  });
});

describe("filterQuery", () => {
  const tests = [
    { input: "/foo", out: "/foo" },
    { input: "/foo?bar=1", out: "/foo" },
    { input: "/foo?bar=1&baz=2", out: "/foo?baz=2" },
  ];
  const predicate = (key: string) => key !== "bar";

  for (const t of tests) {
    test(t.input.toString() + ' filter "bar"', () => {
      expect(filterQuery(t.input, predicate)).toBe(t.out);
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
    "http://foo.com/?param=": { param: "" },
    "http://foo.com/?param=&param=2&param=3": { param: ["", "2", "3"] },
    "http://foo.com/?param=%7B%22a%22:%5B%7B%22obj%22:%5B1,2,3%5D%7D%5D%7D": {
      param: '{"a":[{"obj":[1,2,3]}]}',
    },
    "http://foo.com/?toString=foo": { toString: "foo" },
  };

  for (const t in tests) {
    test(t, () => {
      expect(getQuery(t)).toMatchObject(tests[t]);
    });
  }
});
