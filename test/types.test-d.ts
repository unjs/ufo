import { describe, expectTypeOf, test } from "vitest";
import { getQuery, parseQuery } from "../src";

describe("query", () => {
  test("getQuery generic type support", () => {
    const result = getQuery<{ foo: string }>("http://foo.com/?foo=bar");
    expectTypeOf(result).toEqualTypeOf<{ foo: string }>();
  });

  test("parseQuery generic type support", () => {
    const result = parseQuery<{ foo: string }>("http://foo.com/?foo=bar");
    expectTypeOf(result).toEqualTypeOf<{ foo: string }>();
  });
});
