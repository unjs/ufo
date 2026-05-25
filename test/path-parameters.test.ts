import { describe, expect, test } from "vitest";
import { withPathParameters } from "../src";

describe("withPathParameters", () => {
  test("replaces curly-brace path parameters", () => {
    expect(withPathParameters("/api/users/{userId}", { userId: "abc" })).toBe(
      "/api/users/abc",
    );
  });

  test("supports mustache-style interpolation", () => {
    expect(
      withPathParameters(
        "/api/users/{{userId}}",
        { userId: "abc" },
        { interpolate: /\{\{([\s\S]+?)\}\}/g },
      ),
    ).toBe("/api/users/abc");
  });

  test("encodes parameter values", () => {
    expect(withPathParameters("/api/users/{userId}", { userId: "a/b?c" })).toBe(
      "/api/users/a%2Fb%3Fc",
    );
  });

  test("preserves placeholders when params are missing", () => {
    expect(withPathParameters("/api/users/{userId}", {})).toBe(
      "/api/users/{userId}",
    );
  });

  test("works with full URLs", () => {
    expect(
      withPathParameters("https://example.com/api/{id}/view", { id: "42" }),
    ).toBe("https://example.com/api/42/view");
  });
});
