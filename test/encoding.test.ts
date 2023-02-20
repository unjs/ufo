import { describe, expect, test } from "vitest";
import { encode, encodeHash, encodeQueryValue } from "../src/";

describe("encode", () => {
  const tests = [
    {
      input: "https://www.example.com/path/to/file.html",
      out: "https://www.example.com/path/to/file.html",
    },
    {
      input: "https://www.example.com/path/to/file.html?foo=bar",
      out: "https://www.example.com/path/to/file.html?foo=bar",
    },
    {
      input: "https://www.example.com/path/to/file.html?foo=bar&baz=qux",
      out: "https://www.example.com/path/to/file.html?foo=bar&baz=qux",
    },
    {
      input: "https://www.example.com/path/to/file.html#section1",
      out: "https://www.example.com/path/to/file.html#section1",
    },
    {
      input: "https://www.example.com/path/to/file.html#section1&section2",
      out: "https://www.example.com/path/to/file.html#section1&section2",
    },
    {
      input: "https://www.example.com/My Path/File.html",
      out: "https://www.example.com/My%20Path/File.html",
    },
    {
      input: "https://www.example.com/file.html?foo=bar|baz",
      out: "https://www.example.com/file.html?foo=bar|baz",
    },
    {
      input: "https://www.example.com/file.html#section1|section2",
      out: "https://www.example.com/file.html#section1|section2",
    },
    {
      input: "https://www.example.com/file.html?foo=bar&baz=qux|quux",
      out: "https://www.example.com/file.html?foo=bar&baz=qux|quux",
    },
    {
      input: "https://www.example.com/file.html#section1&section2|section3",
      out: "https://www.example.com/file.html#section1&section2|section3",
    },
  ];

  for (const t of tests) {
    test(t.input, () => {
      expect(encode(t.input)).toStrictEqual(t.out);
    });
  }
});

describe("encodeHash", () => {
  const tests = [
    { input: "", output: "" },
    { input: "hello", output: "hello" },
    { input: "{}^", output: "{}^" },
    {
      input: "!@#$%&*()-_=+[]{};:'\",.<>/?`~",
      output: "!@#$%25&*()-_=+%5B%5D{};:'%22,.%3C%3E/?%60~",
    },
    { input: "+=&", output: "+=&" },
    { input: "abc{def}ghi^jkl", output: "abc{def}ghi^jkl" },
  ];

  for (const t of tests) {
    test(t.input.toString(), () => {
      expect(encodeHash(t.input)).toStrictEqual(t.output);
    });
  }
});

describe("encodeQueryValue", () => {
  const tests = [
    { input: "hello world", out: "hello+world" },
    { input: "hello+world", out: "hello%2Bworld" },
    { input: "key=value", out: "key=value" },
    { input: true, out: "true" },
    { input: 42, out: "42" },
    { input: "a=1&b=2", out: "a=1%26b=2" },
    {
      input: ["apple", "banana", "cherry"],
      out: "apple,banana,cherry",
    },
    {
      input: "!@#$%^&*()_+{}[]|\\:;<>,./?",
      out: "!@%23$%25^%26*()_%2B%7B%7D%5B%5D|%5C:;%3C%3E,./?",
    },
  ];

  for (const t of tests) {
    test(t.input.toString(), () => {
      expect(encodeQueryValue(t.input.toString())).toStrictEqual(t.out);
    });
  }
});
