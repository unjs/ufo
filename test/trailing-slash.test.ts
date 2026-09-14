import { describe, expect, test } from "vitest";
import {
  hasTrailingSlash,
  withTrailingSlash,
  withoutTrailingSlash,
} from "../src";

describe("trailing slashes in query and fragment values", () => {
  test.each([
    "?redirect=/",
    "?redirect=/?page=2",
    "?redirect=/#section",
    "#section/",
    "#section/?page=2",
    "#section/#nested",
    "?page=2#section/",
  ])("respects the pathname before %s", (suffix) => {
    const input = `/docs${suffix}`;
    const withSlash = `/docs/${suffix}`;

    expect(hasTrailingSlash(input, true)).toBe(false);
    expect(hasTrailingSlash(withSlash, true)).toBe(true);
    expect(withTrailingSlash(input, true)).toBe(withSlash);
    expect(withTrailingSlash(withSlash, true)).toBe(withSlash);
    expect(withoutTrailingSlash(withSlash, true)).toBe(input);
    expect(withoutTrailingSlash(input, true)).toBe(input);
  });

  test("adds the pathname slash before a redirect query", () => {
    expect(withTrailingSlash("/login?redirect=/", true)).toBe(
      "/login/?redirect=/",
    );
  });

  test.each(["#section/", "#section/?page=2", "#section/#nested"])(
    "preserves fragment-only references: %s",
    (input) => {
      expect(hasTrailingSlash(input, true)).toBe(false);
      expect(withTrailingSlash(input, true)).toBe(input);
    },
  );
});

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
