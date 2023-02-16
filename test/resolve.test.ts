import { describe, expect, test } from "vitest";
import { resolveURL } from "../src";

describe("resolveURL", () => {
  const tests = [
    { input: [], out: "" },
    { input: ["/"], out: "/" },
    { input: ["/a"], out: "/a" },
    { input: ["a", "b"], out: "a/b" },
    { input: ["a", "b/", "c"], out: "a/b/c" },
    { input: ["a", "b/", "/c"], out: "a/b/c" },
    { input: ["/a?foo=bar#123", "b/", "c/"], out: "/a/b/c/?foo=bar#123" },
    { input: ["http://foo.com", "a"], out: "http://foo.com/a" },
    { input: ["a?x=1", "b?y=2&y=3&z=4"], out: "a/b?x=1&y=2&y=3&z=4" },
  ];

  for (const t of tests) {
    test(t.input.toString(), () => {
      expect(resolveURL(...t.input)).toBe(t.out);
    });
  }

  test("invalid URL (null)", () => {
    // eslint-disable-next-line unicorn/no-null
    expect(() => resolveURL(null as any)).toThrow(
      "URL input should be string received object (null)"
    );
  });

  test("invalid URL (array)", () => {
    expect(() => resolveURL([])).toThrow(
      "URL input should be string received object ()"
    );
  });

  test("no arguments", () => {
    expect(resolveURL()).toBe("");
  });
});
