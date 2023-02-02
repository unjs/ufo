import { describe, expect, test } from "vitest";
import { parseHost } from "../src";

describe("parseHost", () => {
  const tests = [
    { input: "localhost:3000", out: { hostname: "localhost", port: "3000" } },
    { input: "google.com", out: { hostname: "google.com", port: undefined } }
  ];

  for (const t of tests) {
    test(t, () => {
      expect(parseHost(t.input)).toStrictEqual(t.out);
    });
  }
});
