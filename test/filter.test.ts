import { describe, expect, test } from "vitest";
import { createFilter } from "../src";

describe("createFilter", () => {
  const excludeFilter = createFilter({
    exclude: ["/admin/**", "/admin", /^\/regex\/.*/]
  });

  const valid: string[] = [
    "/foo",
    "/foo/",
    "/foo/bar",
    "/foo/bar/",
    "/bar/foo/",
    "/prefixed/admin/",
    "/some/path/regex/may/catch"
  ];
  const invalid: string[] = [
    "/admin",
    "/admin/",
    "/admin/test",
    "/admin/foo/some-really-long/url",
    "/regex/path",
    "/regex/"
  ];

  for (const t of valid) {
    test(`excludeFilter: ${t} valid`, () => {
      expect(excludeFilter(t)).toBeTruthy();
    });
  }
  for (const t of invalid) {
    test(`excludeFilter: ${t} invalid`, () => {
      expect(excludeFilter(t)).toBeFalsy();
    });
  }

  const includeFilter = createFilter({
    include: ["/admin/**", "/admin", /^\/regex\/.*/]
  });

  for (const t of valid) {
    test(`includeFilter: ${t} invalid`, () => {
      expect(includeFilter(t)).toBeFalsy();
    });
  }
  for (const t of invalid) {
    test(`includeFilter: ${t} valid`, () => {
      expect(includeFilter(t)).toBeTruthy();
    });
  }

  const bothFilter = createFilter({
    include: ["/admin/**", /^\/regex\/.*/],
    exclude: ["/admin/foo/**", /^\/regex\/foo\/.*/]
  });

  for (const t of ["/admin/fo", "/regex/bar"]) {
    test(`bothFilter: ${t} valid`, () => {
      expect(bothFilter(t)).toBeTruthy();
    });
  }
  for (const t of ["/admin/foo/", "/regex/foo/test"]) {
    test(`bothFilter: ${t} invalid`, () => {
      expect(bothFilter(t)).toBeFalsy();
    });
  }
});

describe("createFilter example", () => {
  const adminUrl = createFilter({
    include: ["/admin/**", "/admin", /^\/_api\/\d*/]
  });

  for (const t of ["/admin", "/admin/", "/admin/foo", "/admin/foo/bar", "/_api/123"]) {
    test(`adminUrl: ${t} valid`, () => {
      expect(adminUrl(t)).toBeTruthy();
    });
  }
});
