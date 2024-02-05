# ufo

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]
[![JSDocs][jsdocs-src]][jsdocs-href]

URL utils for humans.

## Install

Install using npm or your favourite package manager:

Install package:

```sh
# npm
npm install ufo

# yarn
yarn add ufo

# pnpm
pnpm install ufo

# bun
bun install ufo
```

Import utils:

```js
// ESM
import { normalizeURL, joinURL } from "ufo";

// CommonJS
const { normalizeURL, joinURL } = require("ufo");

// Deno
import { parseURL } from "https://unpkg.com/ufo/dist/index.mjs";
```

## Usage

<!-- AUTOMD_START generator="api" src="./src/index.ts" -->

## `decode(text)`

Decode text using `decodeURIComponent`. Returns the original text if it fails.

## `decodePath(text)`

Decode path section of URL (consistent with encodePath for slash encoding).

## `decodeQueryKey(text)`

Decode query key (consistent with encodeQueryKey for plus encoding). Created different method for decoding key to avoid future changes on value encode/decode.

## `decodeQueryValue(text)`

Decode query value (consistent with encodeQueryValue for plus encoding).

## `encode(text)`

Encode characters that need to be encoded on the path, search and hash sections of the URL.

## `encodeHash(text)`

Encode characters that need to be encoded on the hash section of the URL.

## `encodeHost(name)`

Encodes hostname with punycode encoding.

## `encodeParam(text)`

Encode characters that need to be encoded on the path section of the URL as a param. This function encodes everything {@link encodePath} does plus the slash (`/`) character.

## `encodePath(text)`

Encode characters that need to be encoded on the path section of the URL.

## `encodeQueryKey(text)`

Like `encodeQueryValue` but also encodes the `=` character.

## `encodeQueryValue(input)`

Encode characters that need to be encoded query values on the query section of the URL.

## `parseAuth(input)`

It takes a string of the form `username:password` and returns an object with the username and password decoded

## `parseFilename(input)`

parses a url and returns last pathname segment as filename.

If `{ strict: true }` is passed as the second argument, it will only return the last segment ending with a file extension.

## `parseHost(input)`

It takes a string, and returns an object with two properties: `hostname` and `port`

## `parsePath(input)`

It splits the input string into three parts, and returns an object with those three parts

## `parseURL(input, defaultProto)`

It takes a URL string and returns an object with the URL's protocol, auth, host, pathname, search, and hash

## `stringifyParsedURL(parsed)`

It takes a `ParsedURL` object and returns the stringified URL

## `encodeQueryItem(key, value)`

Encodes a pair of key and value into a url query string value.

If the value is an array, it will be encoded as multiple key-value pairs with the same key.

## `parseQuery(parametersString)`

parses and decodes a query string into an object.

input can be a query string with or without the leading `?`

## `stringifyQuery(query)`

Stringfies and encodes a query object into a query string.

## `$URL()`


## `cleanDoubleSlashes(input)`

Removes double slashes from the URL.

## `getQuery(input)`

Parses the query object of an input URL into an object.

## `hasLeadingSlash(input)`

Checks if the input has a leading slash. (e.g. `/foo`)

## `hasProtocol(inputString, opts)`


## `hasTrailingSlash(input, respectQueryAndFragment)`


## `isEmptyURL(url)`

Checks if the input URL or pathname is empty or `/`.

## `isEqual(a, b, options)`

Checks if two paths are equal regardless of encoding, trailing slash, and leading slash differences.

You can make slash check strict by setting `{ trailingSlash: true, leadingSlash: true }` as options.
You can make encoding check strict by setting `{ encoding: true }` as options.

## `isNonEmptyURL(url)`

Checks if the input URL or pathname is not empty nor `/`.

## `isRelative(inputString)`

Checks if the input is a relative URL starting with `./` or `../`

## `isSamePath(p1, p2)`

Checks if two paths are the same regardless of encoding and trailing slash differences.

## `isScriptProtocol(protocol)`

Checks if the input protocol is any of the dangrous `blob:`, `data:`, `javascript`: or `vbscript:` protocols.

## `joinURL(base)`

Joins multiple URL segments into a single URL.

## `normalizeURL(input)`

- Ensures URL is properly encoded - Ensures pathname starts with slash - Preserves protocol/host if provided

## `resolveURL(base)`

Resolves multiple URL segments into a single URL.

## `withBase(input, base)`

Ensures the URL or pathname has a trailing slash.

If input aleady start with base, it will not be added again.

## `withFragment(input, hash)`

Add/Replace the fragment section of the URL.

**Example:**

```ts
withFragment("/foo", "bar"); // "/foo#bar"
withFragment("/foo#bar", "baz"); // "/foo#baz"
withFragment("/foo#bar", ""); // "/foo"
```

## `withHttp(input)`

Adds `http://` to the input if it doesn't have a protocol.

## `withHttps(input)`

Adds `https://` to the input if it doesn't have a protocol.

## `withLeadingSlash(input)`

Ensures the URL or pathname has a leading slash.

## `withProtocol(input, protocol)`

Adds or Replaces protocol of the input URL.

## `withQuery(input, query)`

Add/Replace the query section of the URL.

## `withTrailingSlash(input, respectQueryAndFragment)`

Ensures the URL or pathname has a trailing slash.

If sercond argument is is true, it will only add the trailing slash if it's not part of the query or fragment with cost of more expensive operation.

## `withoutBase(input, base)`

Removes the base from the URL or pathname.

If input does not start with base, it will not be removed.

## `withoutFragment(input)`

Removes the fragment/hash part from the URL.

**Example:**

```js
withoutFragment("http://example.com/foo?q=123#bar") // "http://example.com/foo?q=123"
```

## `withoutLeadingSlash(input)`

Removes leading slash from the URL or pathname.

## `withoutProtocol(input)`

Removes the protocol from the input.

## `withoutTrailingSlash(input, respectQueryAndFragment)`

Removes trailing slash from the URL or pathname.

If sercond argument is is true, it will only remove the trailing slash if it's not part of the query or fragment with cost of more expensive operation.


<!-- AUTOMD_END -->

## License

[MIT](./LICENSE)

Special thanks to Eduardo San Martin Morote ([posva](https://github.com/posva)) for [encoding utilities](https://github.com/vuejs/vue-router-next/blob/v4.0.1/src/encoding.ts)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/ufo?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/ufo
[npm-downloads-src]: https://img.shields.io/npm/dm/ufo?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/ufo
[codecov-src]: https://img.shields.io/codecov/c/gh/unjs/ufo/main?style=flat&colorA=18181B&colorB=F0DB4F
[codecov-href]: https://codecov.io/gh/unjs/ufo
[bundle-src]: https://img.shields.io/bundlephobia/minzip/ufo?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=ufo
[license-src]: https://img.shields.io/github/license/unjs/ufo.svg?style=flat&colorA=18181B&colorB=F0DB4F
[license-href]: https://github.com/unjs/ufo/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsDocs.io-reference-18181B?style=flat&colorA=18181B&colorB=F0DB4F
[jsdocs-href]: https://www.jsdocs.io/package/ufo
