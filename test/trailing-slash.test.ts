import { describe, expect, test } from "vitest";
import {
  hasTrailingSlash,
  withTrailingSlash,
  withoutTrailingSlash,
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
    "foo?query=/": "foo/?query=/",
    "foo?query=/#abc": "foo/?query=/#abc",
    "/foo#/bar/": "/foo/#/bar/",
    "foo/?query=/": "foo/?query=/",
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

describe("hasTrailingSlash, queryParams: true", () => {
  const tests = {
    "foo?query=/": false,
    "foo?query=/#abc": false,
    "/foo#/bar/": false,
    "foo/?query=/": true,
    "foo/#abc": true,
  };

  for (const input in tests) {
    test(input, () => {
      expect(hasTrailingSlash(input, true)).toBe(tests[input]);
    });
  }
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
