# ufo

> URL Utilities

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions][github-actions-src]][github-actions-href]
[![Codecov][codecov-src]][codecov-href]

- Depending on native `URL` to parse urls and encoding
- Zero dependency
- Treeshakable

## Install

Install using npm or yarn:

```bash
npm i @nuxt/ufo
# or
yarn add @nuxt/ufo
```

Import:

```js
// CommonJS
const { normalizeURL, joinURL } = require('@nuxt/ufo')

// ESM
import { normalizeURL, joinURL } from '@nuxt/ufo'
```

## Usage

### `normalizeURL`

- Ensures URL is properly encoded
- Ensures pathname starts with slash
- Preserves protocol/host if provided

```ts

// Result: /test?query=123%20123#hash,%20test
normalizeURL('test?query=123 123#hash, test')

// Result: http://loalhost:3000/
normalizeURL('http://localhost:3000')
```

### `joinURL`

```ts
// Result: /a/b/c
joinURL('a', '/b', '/c')

// Result: http://foo.com/foo/bar/baz?test=123#token
joinURL('http://foo.com/foo?test=123#token', 'bar', 'baz')
```

### `withTrailingSlash`

Ensures url ends with a trailing slash

```ts
// Result: /foo/
withTrailingSlash('/foo')
```

## `withoutTrailingSlash`

Ensures url does not ends with a trailing slash

```ts
// Result: /foo
withoutTrailingSlash('/foo/')
```

## License

MIT. Made with 💖

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@nuxt/ufo?style=flat-square
[npm-version-href]: https://npmjs.com/package/@nuxt/ufo

[npm-downloads-src]: https://img.shields.io/npm/dm/@nuxt/ufo?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@nuxt/ufo

[github-actions-src]: https://img.shields.io/github/workflow/status/nuxt-contrib/ufo/ci/master?style=flat-square
[github-actions-href]: https://github.com/nuxt-contrib/ufo/actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/gh/nuxt-contrib/ufo/master?style=flat-square
[codecov-href]: https://codecov.io/gh/nuxt-contrib/ufo
