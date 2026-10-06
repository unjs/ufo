import { describe, expect, test } from "vitest";
import {
  withTrailingSlash,
  withoutTrailingSlash,
  hasTrailingSlash,
} from "../src";

describe("withTrailingSlash, queryParams: false", () => {
  const tests = {
    "": "/",
    bar: "bar/",
    "bar#abc": "bar#abc/",
    "bar/": "bar/",
    "foo?123": "foo?123/",
    "foo/?123": "foo/?123/",
    "foo/?123#abc": "foo/?123#abc/",
  };

  for (const input in tests) {
    test(input, () => {
      expect(withTrailingSlash(input)).toBe(tests[input]);
    });
  }

  test("falsy value", () => {
    expect(withTrailingSlash()).toBe("/");
  });
});

describe("withTrailingSlash, queryParams: true", () => {
  const tests = {
    "": "/",
    bar: "bar/",
    "bar/": "bar/",
    "foo?123": "foo/?123",
    "foo/?123": "foo/?123",
    "foo?123#abc": "foo/?123#abc",
    "/foo?redirect=/bar/": "/foo/?redirect=/bar/",
    "/foo#/bar/": "/foo/#/bar/",
    "/foo?x=1#/bar/": "/foo/?x=1#/bar/",
    "/#abc": "/#abc",
    "#abc": "#abc",
    "#": "#",
  };

  for (const input in tests) {
    test(input, () => {
      expect(withTrailingSlash(input, true)).toBe(tests[input]);
    });
  }

  test("falsy value", () => {
    expect(withTrailingSlash()).toBe("/");
  });
});

describe("withoutTrailingSlash, queryParams: false", () => {
  const tests = {
    "": "/",
    "/": "/",
    bar: "bar",
    "bar#abc": "bar#abc",
    "bar/#abc": "bar/#abc",
    "foo?123": "foo?123",
    "foo/?123": "foo/?123",
    "foo/?123#abc": "foo/?123#abc",
    "foo/?k=v": "foo/?k=v",
    "foo/?k=/": "foo/?k=",
  };

  for (const input in tests) {
    test(input, () => {
      expect(withoutTrailingSlash(input)).toBe(tests[input]);
    });
  }

  test("falsy value", () => {
    expect(withoutTrailingSlash()).toBe("/");
  });
});

describe("withoutTrailingSlash, queryParams: true", () => {
  const tests = {
    "": "/",
    "/": "/",
    bar: "bar",
    "bar/": "bar",
    "bar#abc": "bar#abc",
    "bar/#abc": "bar#abc",
    "foo?123": "foo?123",
    "foo/?123": "foo?123",
    "foo/?123#abc": "foo?123#abc",
    "foo/?k=123": "foo?k=123",
    "foo?k=/": "foo?k=/",
    "foo/?k=/": "foo?k=/",
    "foo/?k=/&x=y#abc": "foo?k=/&x=y#abc",
    "/foo?redirect=/bar/": "/foo?redirect=/bar/",
    "/foo/?redirect=/bar/": "/foo?redirect=/bar/",
    "/foo#/bar/": "/foo#/bar/",
    "/foo/#/bar/": "/foo#/bar/",
    "/a/#abc": "/a#abc",
    "/#abc": "/#abc",
  };

  for (const input in tests) {
    test(input, () => {
      expect(withoutTrailingSlash(input, true)).toBe(tests[input]);
    });
  }

  test("falsy value", () => {
    expect(withoutTrailingSlash()).toBe("/");
  });
});

describe("hasTrailingSlash, queryParams: false", () => {
  const tests: Record<string, boolean> = {
    "": false,
    "/": true,
    bar: false,
    "bar/": true,
    "foo?123": false,
    "foo/?123": false,
    "/foo?redirect=/bar/": true,
    "/foo#/bar/": true,
  };

  for (const input in tests) {
    test(input, () => {
      expect(hasTrailingSlash(input)).toBe(tests[input]);
    });
  }

  test("falsy value", () => {
    expect(hasTrailingSlash()).toBe(false);
  });
});

describe("hasTrailingSlash, queryParams: true", () => {
  const tests: Record<string, boolean> = {
    "": false,
    "/": true,
    bar: false,
    "bar/": true,
    "foo?123": false,
    "foo/?123": true,
    "foo?123#abc": false,
    "/foo?redirect=/bar/": false,
    "/foo/?redirect=/bar/": true,
    "/foo#/bar/": false,
    "/foo/#/bar/": true,
    "/foo?x=1#/bar/": false,
    "/foo/?x=1#/bar/": true,
    "/#abc": true,
    "#abc": false,
    "#": false,
  };

  for (const input in tests) {
    test(input, () => {
      expect(hasTrailingSlash(input, true)).toBe(tests[input]);
    });
  }

  test("falsy value", () => {
    expect(hasTrailingSlash(undefined, true)).toBe(false);
  });
});
