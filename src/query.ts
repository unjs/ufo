import {
  decodeQueryKey,
  decodeQueryValue,
  encodeQueryKey,
  encodeQueryValue,
} from "./encoding";

export type QueryValue =
  | string
  | number
  | undefined
  | null
  | boolean
  | Array<QueryValue>
  | Record<string, any>;

export type QueryObject = Record<string, QueryValue | QueryValue[]>;

export type ParsedQuery = Record<string, string | string[]>;

const AMPERSAND_CHAR_CODE = 38;
const EQUAL_CHAR_CODE = 61;

// const EmptyObject = /* @__PURE__ */ (() => {
//   const C = function () {};
//   C.prototype = Object.create(null);
//   return C;
// })() as unknown as { new (): any };

function appendQueryParameter(
  object: ParsedQuery,
  key: string,
  value: string,
): void {
  key = decodeQueryKey(key);
  if (key === "__proto__" || key === "constructor") {
    return;
  }

  value = decodeQueryValue(value);
  const currentValue = object[key];
  if (currentValue === undefined) {
    object[key] = value;
  } else if (Array.isArray(currentValue)) {
    currentValue.push(value);
  } else {
    object[key] = [currentValue, value];
  }
}

/**
 * Parses and decodes a query string into an object.
 *
 * The input can be a query string with or without the leading `?`.
 *
 * @example
 *
 * ```js
 * parseQuery("?foo=bar&baz=qux");
 * // { foo: "bar", baz: "qux" }
 *
 * parseQuery("tags=javascript&tags=web&tags=dev");
 * // { tags: ["javascript", "web", "dev"] }
 * ```
 *
 * @note
 * The `__proto__` and `constructor` keys are ignored to prevent prototype pollution.
 *
 * @group Query_utils
 */
export function parseQuery<T extends ParsedQuery = ParsedQuery>(
  parametersString = "",
): T {
  // TODO: Use new EmptyObject() instead of Object.create(null) for better performance in next major version
  // https://github.com/unjs/ufo/pull/290
  const object: ParsedQuery = Object.create(null);

  let keyStart = -1;
  let keyEnd = -1;
  const stringLength = parametersString.length;

  for (
    let index = parametersString[0] === "?" ? 1 : 0;
    index <= stringLength;
    index++
  ) {
    const isEnd = index === stringLength;
    const character = isEnd
      ? AMPERSAND_CHAR_CODE
      : parametersString.charCodeAt(index);

    if (character === AMPERSAND_CHAR_CODE) {
      if (keyStart !== -1) {
        appendQueryParameter(
          object,
          parametersString.slice(keyStart, keyEnd === -1 ? index : keyEnd),
          keyEnd === -1 ? "" : parametersString.slice(keyEnd + 1, index),
        );
      }
      keyStart = -1;
      keyEnd = -1;
      continue;
    }

    if (character === EQUAL_CHAR_CODE) {
      if (keyStart === -1) {
        // Match the old unanchored regex: `=a=b` parses as `a=b`.
        continue;
      }
      if (keyEnd === -1) {
        keyEnd = index;
      }
      continue;
    }

    if (keyStart === -1) {
      keyStart = index;
    }
  }
  return object as T;
}

/**
 * Encodes a pair of key and value into a url query string value.
 *
 * If the value is an array, it will be encoded as multiple key-value pairs with the same key.
 *
 * @example
 *
 * ```js
 * encodeQueryItem('message', 'Hello World')
 * // 'message=Hello+World'
 *
 * encodeQueryItem('tags', ['javascript', 'web', 'dev'])
 * // 'tags=javascript&tags=web&tags=dev'
 * ```
 *
 * @group Query_utils
 */
export function encodeQueryItem(
  key: string,
  value: QueryValue | QueryValue[],
): string {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }

  if (Array.isArray(value)) {
    return value
      .map(
        (_value: QueryValue) =>
          `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`,
      )
      .join("&");
  }

  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}

/**
 * Stringfies and encodes a query object into a query string.
 *
 * @example
 *
 * ```js
 * stringifyQuery({ foo: 'bar', baz: 'qux' })
 * // 'foo=bar&baz=qux'
 *
 * stringifyQuery({ foo: 'bar', baz: undefined })
 * // 'foo=bar'
 * ```
 *
 * @group Query_utils
 */
export function stringifyQuery(query: QueryObject): string {
  return Object.keys(query)
    .filter((k) => query[k] !== undefined)
    .map((k) => encodeQueryItem(k, query[k]))
    .filter(Boolean)
    .join("&");
}
