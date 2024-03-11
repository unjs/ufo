import { describe, expect, test } from "vitest";
import { joinURL } from "../src";

describe("joinURL", () => {
  const tests = [
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

    // Relative with ../
    { input: ["/a", "../b"], out: "/b" },
    { input: ["/a/b/c", "../../d"], out: "/a/d" },
    { input: ["/c", "../../d"], out: "/d" },
    { input: ["/c", ".././../d"], out: "/d" },
    { input: ["/c", "../../../d"], out: "../d" },
    { input: ["../a", "../b"], out: "b" },
    { input: ["../a", "./../b"], out: "b" },
    { input: ["../a", "./../../b"], out: "../b" },
    { input: ["../a", "../../../b"], out: "../../b" },
    { input: ["../a", "../../../../b"], out: "../../../b" },
    { input: ["../a/", "../b"], out: "b" },
  ];

  for (const t of tests) {
    test(`joinURL(${t.input.map((i) => JSON.stringify(i)).join(", ")}) === ${JSON.stringify(t.out)}`, () => {
      expect(joinURL(...(t.input as string[]))).toBe(t.out);
    });
  }
});
