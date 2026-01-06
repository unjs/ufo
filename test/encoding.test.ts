import { describe, expect, test } from "vitest";
import {
  encode,
  encodeHash,
  encodeQueryValue,
  encodeQueryKey,
  encodePath,
  encodeParam,
  decode,
  decodeQueryKey,
} from "../src/";

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
      input: String.raw`!@#$%^&*()_+{}[]|\:;<>,./?`,
      out: "!@%23$%25%5E%26*()_%2B%7B%7D%5B%5D%7C%5C:;%3C%3E,.%2F?",
    },
  ];

  for (const t of tests) {
    test(t.input.toString(), () => {
      expect(encodeQueryValue(t.input.toString())).toStrictEqual(t.out);
    });
  }
});

describe("encodeQueryKey", () => {
  const tests = [
    { input: "key", out: "key" },
    { input: "key=value", out: "key%3Dvalue" },
    { input: 123, out: "123" },
    { input: "=value", out: "%3Dvalue" },
  ];

  for (const t of tests) {
    test(t.input.toString(), () => {
      expect(encodeQueryKey(t.input.toString())).toStrictEqual(t.out);
    });
  }
});

describe("encodePath", () => {
  const tests = [
    { input: "path/to/resource", out: "path/to/resource" },
    { input: "/path/to/resource", out: "/path/to/resource" },
    { input: "path?query=value", out: "path%3Fquery=value" },
    { input: "path#hash", out: "path%23hash" },
    { input: "path&param=value", out: "path%26param=value" },
    { input: "path+to+resource", out: "path%2Bto%2Bresource" },
    { input: "path/to/resource/", out: "path/to/resource/" },
    { input: "path/to/re source", out: "path/to/re%20source" },
    { input: "p@th", out: "p@th" },
    { input: "path/to/resource/file.txt", out: "path/to/resource/file.txt" },
  ];

  for (const t of tests) {
    test(t.input, () => {
      expect(encodePath(t.input)).toStrictEqual(t.out);
    });
  }
});

describe("encodeParam", () => {
  const tests = [
    { input: "hello world", out: "hello%20world" },
    { input: "a/b", out: "a%2Fb" },
    { input: "1+2=3", out: "1%2B2=3" },
    { input: "áéíóú", out: "%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA" },
    {
      input: String.raw`!@#$%^&*()_-+=[]{}\|;:'",.<>/?`,
      out: "!@%23$%25%5E%26*()_-%2B=%5B%5D%7B%7D%5C|;:'%22,.%3C%3E%2F%3F",
    },
    { input: 123, out: "123" },
    { input: true, out: "true" },
  ];

  for (const t of tests) {
    test(t.input.toString(), () => {
      expect(encodeParam(t.input.toString())).toStrictEqual(t.out);
    });
  }
});

describe("decode", () => {
  const tests = [
    { input: "%7B%7D%5E", out: "{}^" },
    { input: "%2B%3D%26", out: "+=&" },
    {
      input:
        "!%40%23%24%25%26%2A%28%29-_%3D%2B%5B%5D%7B%7D%3B%3A%27%22%2C.%3C%3E%2F%3F%60%7C%5C%22",
      out: '!@#$%&*()-_=+[]{};:\'",.<>/?`|\\"',
    },
    { input: "hello%20world", out: "hello world" },
    {
      input: "%3Fkey%3Dvalue%26anotherKey%3DanotherValue",
      out: "?key=value&anotherKey=anotherValue",
    },
    {
      input: "http%3A%2F%2Fexample.com%2Fpage%3Fid%3D123%23details",
      out: "http://example.com/page?id=123#details",
    },
    { input: "foo%2Bbar%2Bbaz", out: "foo+bar+baz" },
  ];

  for (const t of tests) {
    test(t.input.toString(), () => {
      expect(decode(t.input.toString())).toStrictEqual(t.out);
    });
  }
});

describe("decodeQueryKey", () => {
  const tests = [
    { input: "key", out: "key" },
    { input: "key%3Dvalue", out: "key=value" },
    { input: "123", out: "123" },
    { input: "%3Dvalue", out: "=value" },
    { input: "key+with+space", out: "key with space" },
    { input: "key%2bwith%2bplus", out: "key+with+plus" },
  ];

  for (const t of tests) {
    test(t.input.toString(), () => {
      expect(decodeQueryKey(t.input.toString())).toStrictEqual(t.out);
    });
  }
});
