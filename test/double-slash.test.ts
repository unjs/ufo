import { describe, expect, test } from "vitest";
import { cleanDoubleSlashes } from "../src";

describe("cleanDoubleSlashes", () => {
  const tests = {
    "//foo//bar//": "/foo/bar/",
    "http://foo.com//": "http://foo.com/",
    "http://foo.com/bar//foo/": "http://foo.com/bar/foo/",
    "http://example.com/analyze//http://localhost:3000//": "http://example.com/analyze/http://localhost:3000/"
  };

  for (const input in tests) {
    test(input, () => {
      expect(cleanDoubleSlashes(input)).toBe(tests[input]);
    });
  }

  test("no input", () => {
    expect(cleanDoubleSlashes()).toBe("");
  });
});
