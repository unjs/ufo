import { describe, expectTypeOf, test } from "vitest";
import { getQuery } from "../src";

describe("getQuery", () => {
  test("type tests for getQuery", () => {
    const result = getQuery<{ foo: string }>("http://foo.com/?foo=bar");
    expectTypeOf(result).toEqualTypeOf<{ foo: string }>();
  });
});
