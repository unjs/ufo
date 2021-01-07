# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.5.4](https://github.com/nuxt-contrib/ufo/compare/v0.5.3...v0.5.4) (2021-01-07)


### Bug Fixes

* enable plus encoding for query value ([82ab3f1](https://github.com/nuxt-contrib/ufo/commit/82ab3f17de0088529bb25f1b0ed31ab09443ed26))

### [0.5.3](https://github.com/nuxt-contrib/ufo/compare/v0.5.2...v0.5.3) (2021-01-06)


### Bug Fixes

* **parseQuery:** skip ? in query value while parsing (fixes [#9](https://github.com/nuxt-contrib/ufo/issues/9)) ([0cf9f1a](https://github.com/nuxt-contrib/ufo/commit/0cf9f1aed440013e53f7186b8f47648121c4bc8e))

### [0.5.2](https://github.com/nuxt-contrib/ufo/compare/v0.5.1...v0.5.2) (2020-12-16)


### Bug Fixes

* **pkg:** allow requiring package.json ([#6](https://github.com/nuxt-contrib/ufo/issues/6)) ([5fd5dc7](https://github.com/nuxt-contrib/ufo/commit/5fd5dc7fd0336915e97cb92b52e01e897b04d2e4))

### [0.5.1](https://github.com/nuxt-contrib/ufo/compare/v0.5.0...v0.5.1) (2020-12-16)


### Bug Fixes

* update encodeQueryValue to match URL spec for space and plus ([9446d9c](https://github.com/nuxt-contrib/ufo/commit/9446d9c3f0decaa76754ab74954905375e3b0fc7))

## [0.5.0](https://github.com/nuxt-contrib/ufo/compare/v0.4.0...v0.5.0) (2020-12-16)


### ⚠ BREAKING CHANGES

* api updates and params renamed to query

### Features

* reduce dependency on $URL for less encode/decoding ([38631cf](https://github.com/nuxt-contrib/ufo/commit/38631cfb90995acde56e0cbef0e341710dcc9e65))

## [0.4.0](https://github.com/nuxt-contrib/ufo/compare/v0.3.1...v0.4.0) (2020-12-16)


### ⚠ BREAKING CHANGES

* lightweight joinURL + resolveURL

### Features

* lightweight joinURL + resolveURL ([9a34622](https://github.com/nuxt-contrib/ufo/commit/9a3462285bd84a5fec68bac1439828f21794e418))

### [0.3.1](https://github.com/nuxt-contrib/ufo/compare/v0.3.0...v0.3.1) (2020-12-16)


### Bug Fixes

* **pkg:** remove trailing slash in exports ([9d94e3c](https://github.com/nuxt-contrib/ufo/commit/9d94e3cf8d25c12fb4c84b6c63c46a8af476ecf0))

## [0.3.0](https://github.com/nuxt-contrib/ufo/compare/v0.2.0...v0.3.0) (2020-12-16)


### ⚠ BREAKING CHANGES

* **pkg:** add exports and drop browser field
* custom url parser

### Features

* **pkg:** add exports and drop browser field ([218225d](https://github.com/nuxt-contrib/ufo/commit/218225d8f5e29462bcba5721d4c484cce573c3ea))
* compact punycode support ([edaf5ca](https://github.com/nuxt-contrib/ufo/commit/edaf5ca6ec07bfe7f54ca80cda7c86c3d0dfafce))
* custom url parser ([be8578f](https://github.com/nuxt-contrib/ufo/commit/be8578f5c556e72f6473fe682ef6ecee00ef306f))
* use custom parsers for urls without hostname ([b22eb2e](https://github.com/nuxt-contrib/ufo/commit/b22eb2ec12c160ed7c713d9bc1285e3509048c1f)), closes [nuxt/nuxt.js#8457](https://github.com/nuxt/nuxt.js/issues/8457)


### Bug Fixes

* preserve trailingslash from parse state ([adc9688](https://github.com/nuxt-contrib/ufo/commit/adc9688f2a9096e79910f7475e702839ceef9fb9))
* remove password from auth when is not provided ([6616f02](https://github.com/nuxt-contrib/ufo/commit/6616f0288f0df757f5896eed5f9290ea1d3b1632))

## [0.2.0](https://github.com/nuxt-contrib/ufo/compare/v0.1.6...v0.2.0) (2020-12-15)


### ⚠ BREAKING CHANGES

* rewrite with URL ponyfill (#4)

### Features

* rewrite with URL ponyfill ([#4](https://github.com/nuxt-contrib/ufo/issues/4)) ([3809d28](https://github.com/nuxt-contrib/ufo/commit/3809d28e0fcb653ae91ed9c9707ad670ded68c6e))

### [0.1.6](https://github.com/nuxt-contrib/ufo/compare/v0.1.5...v0.1.6) (2020-12-15)


### Bug Fixes

* enforce double slash ([90d8172](https://github.com/nuxt-contrib/ufo/commit/90d8172189081a173b721a5c3d3bb53e8bed1e4b))

### [0.1.5](https://github.com/nuxt-contrib/ufo/compare/v0.1.4...v0.1.5) (2020-12-15)


### Bug Fixes

* fix issue with hasProtocol ([239cdf7](https://github.com/nuxt-contrib/ufo/commit/239cdf748a47aa9c32cf054b91cce87d5cae29bc))

### [0.1.4](https://github.com/nuxt-contrib/ufo/compare/v0.1.3...v0.1.4) (2020-12-12)


### Bug Fixes

* **joinURL:** preserve params from input path ([8f8f10a](https://github.com/nuxt-contrib/ufo/commit/8f8f10af829046ad27696acec7b123fecd8dca43))

### [0.1.3](https://github.com/nuxt-contrib/ufo/compare/v0.1.2...v0.1.3) (2020-12-12)


### Bug Fixes

* **withParams:** prevent double encoding raw params ([28eb848](https://github.com/nuxt-contrib/ufo/commit/28eb8484961a8af64ebfce12c369d844386c44bb))

### [0.1.2](https://github.com/nuxt-contrib/ufo/compare/v0.1.1...v0.1.2) (2020-12-12)


### Bug Fixes

* getParams object keys ([72bcdf2](https://github.com/nuxt-contrib/ufo/commit/72bcdf283473dc350be4a82db716ecca3989f2cf))

### [0.1.1](https://github.com/nuxt-contrib/ufo/compare/v0.1.0...v0.1.1) (2020-12-12)


### Features

* `withParams` ([309f38a](https://github.com/nuxt-contrib/ufo/commit/309f38a1d1e9496ed08e219238fc8cd306e5e8b8))
* getParams ([5ad02f6](https://github.com/nuxt-contrib/ufo/commit/5ad02f68e8b9deba144d090b5244dfc7d90f2443))

## [0.1.0](https://github.com/nuxt-contrib/ufo/compare/v0.0.3...v0.1.0) (2020-12-09)


### ⚠ BREAKING CHANGES

* preserve relative urls without leading slash

### Features

* add `cleanDoubleSlashes` ([#2](https://github.com/nuxt-contrib/ufo/issues/2)) ([cbb72de](https://github.com/nuxt-contrib/ufo/commit/cbb72de41abf1afd01f7234ba0084efbf0adf80a))
* preserve relative urls without leading slash ([34afd1e](https://github.com/nuxt-contrib/ufo/commit/34afd1eebf0afbd4f0c692e17e2392c0152ebf73))

### [0.0.3](https://github.com/nuxt-contrib/ufo/compare/v0.0.2...v0.0.3) (2020-12-04)


### Bug Fixes

* sideEffects field ([bbc36d1](https://github.com/nuxt-contrib/ufo/commit/bbc36d107a86e305f814fdb1e3ae664a7c4874d4))

### 0.0.2 (2020-12-04)

### 0.0.1 (2020-12-04)
