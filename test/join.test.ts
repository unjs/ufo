import { describe, expect, test } from "vitest";
import { joinURL, joinRelativeURL } from "../src";

const joinURLTests = [
  { input: [], out: "" },
  { input: ["/"], out: "/" },
  { input: [undefined, "./"], out: "./" },
  { input: ["./", "a"], out: "./a" },
  { input: ["./a", "./b"], out: "./a/b" },
  { input: ["/a"], out: "/a" },
  { input: ["a", "b"], out: "a/b" },
  { input: ["/", "/b"], out: "/b" },
  { input: ["a", "b/", "c"], out: "a/b/c" },
  { input: ["a", "b/", "/c"], out: "a/b/c" },
  { input: ["/", "./"], out: "/" },
  { input: ["/", "./foo"], out: "/foo" },
  { input: ["/", "./foo/"], out: "/foo/" },
  { input: ["/", "./foo", "bar"], out: "/foo/bar" },
  {
    input: ["https://google.com/", "./foo", "/bar"],
    out: "https://google.com/foo/bar",
  },
] as const;

describe("joinURL", () => {
  for (const t of joinURLTests) {
    test(`joinURL(${t.input.map((i) => JSON.stringify(i)).join(", ")}) === ${JSON.stringify(t.out)}`, () => {
      expect(joinURL(...(t.input as any[]))).toBe(t.out);
    });
  }
});

describe("joinRelativeURL", () => {
  const relativeTests = [
    ...joinURLTests,
    // Relative with ../
    { input: ["/a", "../b"], out: "/b" },
    { input: ["/a/b/c", "../../d"], out: "/a/d" },
    { input: ["/a", "../../d"], out: "/d" },
    { input: ["/a", ".././../d"], out: "/d" },
    { input: ["/a", "../../../d"], out: "../d" },
    { input: ["/a/b", "../../../d"], out: "/d" },
    { input: ["../a", "../b"], out: "b" },
    { input: ["../a", "./../b"], out: "b" },
    { input: ["../a", "./../../b"], out: "../b" },
    { input: ["../a", "../../../b"], out: "../../b" },
    { input: ["../a", "../../../../b"], out: "../../../b" },
    { input: ["../a/", "../b"], out: "b" },
    {
      input: ["https://google.com/", "../foo"],
      out: "https://google.com/foo",
    },
  ];

  for (const t of relativeTests) {
    test(`joinRelativeURL(${t.input.map((i) => JSON.stringify(i)).join(", ")}) === ${JSON.stringify(t.out)}`, () => {
      expect(joinRelativeURL(...(t.input as string[]))).toBe(t.out);
    });
  }
});
