import { describe, expect, test } from "vitest";
import { withTrailingSlash, withoutTrailingSlash } from "../src";

describe("withTrailingSlash, queryParams: false", () => {
  const tests = {
    "": "/",
    bar: "bar/",
    "bar#abc": "bar/#abc",
    "bar/": "bar/",
    "foo?123": "foo?123/",
    "foo/?123": "foo/?123/",
    "foo/?123#abc": "foo/?123/#abc",
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
    "bar/#abc": "bar#abc",
    "foo?123": "foo?123",
    "foo/?123": "foo/?123",
    "foo/?123#abc": "foo/?123#abc",
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
