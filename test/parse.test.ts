import { describe, expect, test } from "vitest";
import { parseURL, parseHost, parseFilename } from "../src";

describe("parseURL", () => {
  const tests = [
    {
      input: "//test",
      out: {
        auth: "",
        hash: "",
        host: "test",
        pathname: "",
        protocol: "",
        search: "",
      },
    },
    {
      input: "https://test.com",
      out: {
        auth: "",
        hash: "",
        host: "test.com",
        pathname: "",
        protocol: "https:",
        search: "",
      },
    },
    {
      input: "http://test.com?foo=bar",
      out: {
        auth: "",
        hash: "",
        host: "test.com",
        pathname: "",
        protocol: "http:",
        search: "?foo=bar",
      },
    },
    { input: "/test", out: { hash: "", pathname: "/test", search: "" } },
    {
      input: "file:///home/user",
      out: {
        auth: "",
        hash: "",
        host: "",
        pathname: "/home/user",
        protocol: "file:",
        search: "",
      },
    },
    {
      input: "file:///C:/home/user",
      out: {
        auth: "",
        hash: "",
        host: "",
        pathname: "C:/home/user",
        protocol: "file:",
        search: "",
      },
    },
    {
      input: "https://test.com/t:est",
      out: {
        auth: "",
        hash: "",
        host: "test.com",
        pathname: "/t:est",
        protocol: "https:",
        search: "",
      },
    },
    {
      input: String.raw`https://host.name\@foo.bar/meme3.php?url=http://0.0.0.0/2.svg`,
      out: {
        auth: "",
        hash: "",
        host: "host.name",
        pathname: "/@foo.bar/meme3.php",
        protocol: "https:",
        search: "?url=http://0.0.0.0/2.svg",
      },
    },
    {
      input: "javascript:alert('hello')",
      out: {
        protocol: "javascript:",
        auth: "",
        host: "",
        href: "javascript:alert('hello')",
        pathname: "alert('hello')",
        search: "",
        hash: "",
      },
    },
    {
      input: "\0javascrIpt:alert('hello')",
      out: {
        protocol: "javascript:",
        auth: "",
        host: "",
        href: "javascrIpt:alert('hello')",
        pathname: "alert('hello')",
        search: "",
        hash: "",
      },
    },
    {
      input: "https://domain.test:3000#owo",
      out: {
        protocol: "https:",
        auth: "",
        host: "domain.test:3000",
        pathname: "",
        search: "",
        hash: "#owo",
      },
    },
    {
      input: "Https://domain.test:3000#owo",
      out: {
        protocol: "https:",
        auth: "",
        host: "domain.test:3000",
        pathname: "",
        search: "",
        hash: "#owo",
      },
    },
    {
      input: "data:image/png;base64,aaa//bbbbbb/ccc",
      out: {
        protocol: "data:",
        auth: "",
        host: "",
        href: "data:image/png;base64,aaa//bbbbbb/ccc",
        pathname: "image/png;base64,aaa//bbbbbb/ccc",
        search: "",
        hash: "",
      },
    },
    {
      input: "blob:https://video_url",
      out: {
        protocol: "blob:",
        auth: "",
        host: "",
        href: "blob:https://video_url",
        pathname: "https://video_url",
        search: "",
        hash: "",
      },
    },
    {
      input: "\0https://invalid.com",
      out: {
        protocol: "https:",
        auth: "",
        host: "invalid.com",
        pathname: "",
        search: "",
        hash: "",
      },
    },
    {
      input: "\0javascript:alert('hello')",
      out: {
        protocol: "javascript:",
        auth: "",
        host: "",
        href: "javascript:alert('hello')",
        pathname: "alert('hello')",
        search: "",
        hash: "",
      },
    },
  ];

  for (const t of tests) {
    test(t.input.toString(), () => {
      expect(structuredClone(parseURL(t.input))).toEqual(t.out);
    });
  }
});

describe("parseHost", () => {
  const tests = [
    { input: "localhost:3000", out: { hostname: "localhost", port: "3000" } },
    { input: "google.com", out: { hostname: "google.com", port: undefined } },
  ];

  for (const t of tests) {
    test(t.input, () => {
      expect(parseHost(t.input)).toStrictEqual(t.out);
    });
  }
});

describe("parseFilename", () => {
  const tests = [
    { input: ["/path/to/filename.ext", false], out: "filename.ext" },
    { input: ["/path/to/.hidden-file", false], out: ".hidden-file" },
    { input: ["/path/to/dir/", false], out: undefined },
    { input: [".", false], out: undefined },
    { input: ["/", false], out: undefined },
    { input: ["", false], out: undefined },
    {
      input: ["http://example.com/path/to/filename.ext", false],
      out: "filename.ext",
    },
    {
      input: ["http://example.com/path/to/filename.ext?query=true", false],
      out: "filename.ext",
    },
    {
      input: ["http://example.com/path/to/filename.ext#hash", false],
      out: "filename.ext",
    },
    {
      input: ["http://example.com/path/to/filename.ext?query=true#hash", false],
      out: "filename.ext",
    },
    {
      input: [
        "http://example.com/path/to/filename.ext/?query=true#hash",
        false,
      ],
      out: undefined,
    },
    { input: ["http://example.com/path/to/dir/", false], out: undefined },
    {
      input: ["http://example.com/path/to/dir/?query=true#hash", false],
      out: undefined,
    },
    { input: ["http://example.com/path/to/dir/#hash", false], out: undefined },
    { input: ["http://example.com", false], out: undefined },
    {
      input: ["ftp://example.com/path/to/filename.ext", false],
      out: "filename.ext",
    },
    { input: ["file:///path/to/filename.ext", false], out: "filename.ext" },
    { input: ["/path/to/filename.ext", true], out: "filename.ext" },
    { input: ["/path/to/.hidden-file", true], out: undefined },
    { input: ["/path/to/dir/", true], out: undefined },
    { input: [".", true], out: undefined },
    { input: ["/", true], out: undefined },
    { input: ["", true], out: undefined },
    {
      input: ["http://example.com/path/to/filename.ext", true],
      out: "filename.ext",
    },
    {
      input: ["http://example.com/path/to/filename.ext?query=true", true],
      out: "filename.ext",
    },
    {
      input: ["http://example.com/path/to/filename.ext#hash", true],
      out: "filename.ext",
    },
    {
      input: ["http://example.com/path/to/filename.ext?query=true#hash", true],
      out: "filename.ext",
    },
    {
      input: ["http://example.com/path/to/filename.ext/?query=true#hash", true],
      out: undefined,
    },
    { input: ["http://example.com/path/to/dir/", true], out: undefined },
    {
      input: ["http://example.com/path/to/dir/?query=true#hash", true],
      out: undefined,
    },
    { input: ["http://example.com/path/to/dir/#hash", true], out: undefined },
    { input: ["http://example.com", true], out: undefined },
    {
      input: ["ftp://example.com/path/to/filename.ext", true],
      out: "filename.ext",
    },
    { input: ["file:///path/to/filename.ext", true], out: "filename.ext" },
    { input: ["/path/to/filename.ext/", true], out: undefined },
    { input: ["/path/to/dir/../filename.ext", true], out: "filename.ext" },
    { input: ["/path/to/dir/../filename.ext/", true], out: undefined },
  ] as const;

  test("works", () => {
    expect(parseFilename("/path/to/filename.ext")).toEqual("filename.ext");
  });

  for (const t of tests) {
    test(t.input.toString(), () => {
      expect(
        parseFilename(t.input[0].toString(), { strict: t.input[1] }),
      ).toStrictEqual(t.out);
    });
  }
});
