import { describe, expect, test } from "vitest";
import { joinURL } from "../src";

describe("joinURL", () => {
  const tests = [
    { input: [], out: "" },
    { input: ["/"], out: "/" },
    // eslint-disable-next-line unicorn/no-null
    { input: [null, "./"], out: "./" },
    { input: ["./", "a"], out: "./a" },
    { input: ["./a", "./b"], out: "./a/b" },
    { input: ["/a"], out: "/a" },
    { input: ["a", "b"], out: "a/b" },
    { input: ["/", "/b"], out: "/b" },
    { input: ["/a", "../b"], out: "/b" },
    { input: ["../a", "../b"], out: "../b" },
    { input: ["../a", "./../b"], out: "../b" },
    { input: ["../a", "./../../b"], out: "b" },
    { input: ["../a", "../../../b"], out: "../b" },
    { input: ["../a", "../../../../b"], out: "../../b" },
    { input: ["../a/", "../b"], out: "../b" },
    { input: ["/a/b/c", "../../d"], out: "/a/d" },
    { input: ["/c", "../../d"], out: "../d" },
    { input: ["/c", ".././../d"], out: "../d" },
    { input: ["a", "b/", "c"], out: "a/b/c" },
    { input: ["a", "b/", "/c"], out: "a/b/c" },
    { input: ["/", "./"], out: "/" },
    { input: ["/", "./foo"], out: "/foo" },
    { input: ["/", "./foo/"], out: "/foo/" },
    { input: ["/", "./foo", "bar"], out: "/foo/bar" },
  ];

  for (const t of tests) {
    test(JSON.stringify(t.input), () => {
      expect(joinURL(...t.input)).toBe(t.out);
    });
  }

  test("no arguments", () => {
    expect(joinURL()).toBe("");
  });
});
