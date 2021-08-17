# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.7.9](https://github.com/unjs/ufo/compare/v0.7.8...v0.7.9) (2021-08-17)


### Bug Fixes

* encode plus as `%2B` ([500885b](https://github.com/unjs/ufo/commit/500885be5c353b81688065dcebb837950895cd9d)), closes [#34](https://github.com/unjs/ufo/issues/34)
* **parseURL:** support url with leading `?` (resolves [#33](https://github.com/unjs/ufo/issues/33)) ([aab7d5f](https://github.com/unjs/ufo/commit/aab7d5f458095a07f645d68e0526040acef03174))

### [0.7.8](https://github.com/unjs/ufo/compare/v0.7.7...v0.7.8) (2021-08-17)


### Bug Fixes

* handle uppercase encoding ([#32](https://github.com/unjs/ufo/issues/32)) ([7a663e2](https://github.com/unjs/ufo/commit/7a663e21d1d0e7eec21be5c4b57eae9ad81cf590))

### [0.7.7](https://github.com/unjs/ufo/compare/v0.7.6...v0.7.7) (2021-06-30)


### Features

* support query params for `trailingSlash` utils ([#24](https://github.com/unjs/ufo/issues/24)) ([aa31481](https://github.com/unjs/ufo/commit/aa314810f1fc5c85a1c35a9661f671c2e337115d))

### [0.7.6](https://github.com/unjs/ufo/compare/v0.7.5...v0.7.6) (2021-06-30)


### Bug Fixes

* **stringifyParsedURL:** check query existence in search ([#29](https://github.com/unjs/ufo/issues/29)) ([dd8bc35](https://github.com/unjs/ufo/commit/dd8bc3563c8a134a50ed5a484326c86c15261656))

### [0.7.5](https://github.com/unjs/ufo/compare/v0.7.4...v0.7.5) (2021-05-17)


### Features

* **parseURL:** support default proto ([f0f79f0](https://github.com/unjs/ufo/commit/f0f79f0f9ebc3acee41441d62a4f451a714281c1)), closes [#25](https://github.com/unjs/ufo/issues/25)

### [0.7.4](https://github.com/unjs/ufo/compare/v0.7.3-deno...v0.7.4) (2021-05-11)

### [0.7.3](https://github.com/unjs/ufo/compare/v0.7.2...v0.7.3) (2021-05-11)


### Features

* support query params for `trailingSlash` utils ([7655066](https://github.com/unjs/ufo/commit/7655066f6d8eee1bc7b6deae6fef76c4058b3fee)), closes [#19](https://github.com/unjs/ufo/issues/19)


### Bug Fixes

* **parseQuery:** prevent possible prototype pollution ([f4be854](https://github.com/unjs/ufo/commit/f4be854bf7ee46335fa70be170b61c6b76e0c2d3))
* slash encode in path ([#23](https://github.com/unjs/ufo/issues/23)) ([912399f](https://github.com/unjs/ufo/commit/912399f0682974def7c9bea548f96ddab0d09659))

### [0.7.2](https://github.com/unjs/ufo/compare/v0.7.1...v0.7.2) (2021-04-28)


### Bug Fixes

* allow pkg subpath import ([#20](https://github.com/unjs/ufo/issues/20)) ([7b2a068](https://github.com/unjs/ufo/commit/7b2a068672c451b2bfa2698814d736cd2a14df79))

### [0.7.1](https://github.com/unjs/ufo/compare/v0.7.0...v0.7.1) (2021-04-23)

## [0.7.0](https://github.com/unjs/ufo/compare/v0.6.11...v0.7.0) (2021-04-23)


### ⚠ BREAKING CHANGES

* add module exports field

### Features

* add module exports field ([7c26571](https://github.com/unjs/ufo/commit/7c26571f0b5df2b93a694f4787cac4b6bdf73625))

### [0.6.11](https://github.com/unjs/ufo/compare/v0.6.10...v0.6.11) (2021-04-06)


### Bug Fixes

* **pkg:** remove exports field to improve compatibility with webpack4 ([be3b1ae](https://github.com/unjs/ufo/commit/be3b1ae3a5880e5127006a7b86362fd833b4992a))

### [0.6.10](https://github.com/unjs/ufo/compare/v0.6.9...v0.6.10) (2021-03-09)


### Bug Fixes

* **joinURL:** allow falsy base ([#18](https://github.com/unjs/ufo/issues/18)) ([73220dd](https://github.com/unjs/ufo/commit/73220ddc1e9b89ffba82155ebac41976e777a668))

### [0.6.9](https://github.com/unjs/ufo/compare/v0.6.8...v0.6.9) (2021-03-05)


### Features

* add `isRelative` helper ([#17](https://github.com/unjs/ufo/issues/17)) ([63efb7b](https://github.com/unjs/ufo/commit/63efb7bc7fe09be7a6c4e25957d6481ff68f5f6f))

### [0.6.8](https://github.com/unjs/ufo/compare/v0.6.7...v0.6.8) (2021-03-05)


### Features

* **hasProtocol:** optionally allow protocol relative url ([#16](https://github.com/unjs/ufo/issues/16)) ([81a3f3e](https://github.com/unjs/ufo/commit/81a3f3e9f203fb27869ea7d3d0e99f256d33e968))

### [0.6.7](https://github.com/unjs/ufo/compare/v0.6.6...v0.6.7) (2021-02-22)


### Features

* isEmptyURL and isNonEmptyURL utils ([3c1c6d8](https://github.com/unjs/ufo/commit/3c1c6d8ec83518805b451ffd76c49210acbb1a29))


### Bug Fixes

* **joinURL, resolveURL:** ignore empty url parts ([c5fd74d](https://github.com/unjs/ufo/commit/c5fd74d9bc3311a44e1be0635e7a4e62a7aea416))

### [0.6.6](https://github.com/unjs/ufo/compare/v0.6.5...v0.6.6) (2021-02-10)


### Bug Fixes

* bail base utils if base is / or empty ([bb09b06](https://github.com/unjs/ufo/commit/bb09b0655d936fe06cfdafda8e5dcd8fcc230f06))

### [0.6.5](https://github.com/unjs/ufo/compare/v0.6.4...v0.6.5) (2021-02-10)


### Features

* `withBase` and `withoutBase` utils ([1667eca](https://github.com/unjs/ufo/commit/1667eca8199a42fbec3403375d716ced38a5b6c5))

### [0.6.4](https://github.com/unjs/ufo/compare/v0.6.3...v0.6.4) (2021-02-08)


### Bug Fixes

* **joinURL:** don't allow double '//' when single slashes are passed ([#13](https://github.com/unjs/ufo/issues/13)) ([e44fe2b](https://github.com/unjs/ufo/commit/e44fe2bc3f8aa65a7c6a7c8d70458b8ccd73a979))

### [0.6.3](https://github.com/unjs/ufo/compare/v0.6.2...v0.6.3) (2021-02-08)


### Bug Fixes

* avoid empty string with without*Slash utils ([126667d](https://github.com/unjs/ufo/commit/126667dc9125905077ce79ad699935ba806a2600))

### [0.6.2](https://github.com/unjs/ufo/compare/v0.6.1...v0.6.2) (2021-02-08)


### Features

* `isSamePath` utility ([3e55aa9](https://github.com/unjs/ufo/commit/3e55aa91ca8a666ef7a24fb3314d13a116c331c9))

### [0.6.1](https://github.com/unjs/ufo/compare/v0.6.0...v0.6.1) (2021-02-02)

## [0.6.0](https://github.com/unjs/ufo/compare/v0.5.4...v0.6.0) (2021-02-02)


### Features

* `decodeQueryValue` and decode query params with support for space ([#11](https://github.com/unjs/ufo/issues/11)) ([44a0538](https://github.com/unjs/ufo/commit/44a05380c7619d942059d0f62a9eee4e3da68639))

### [0.5.4](https://github.com/unjs/ufo/compare/v0.5.3...v0.5.4) (2021-01-07)


### Bug Fixes

* enable plus encoding for query value ([82ab3f1](https://github.com/unjs/ufo/commit/82ab3f17de0088529bb25f1b0ed31ab09443ed26))

### [0.5.3](https://github.com/unjs/ufo/compare/v0.5.2...v0.5.3) (2021-01-06)


### Bug Fixes

* **parseQuery:** skip ? in query value while parsing (fixes [#9](https://github.com/unjs/ufo/issues/9)) ([0cf9f1a](https://github.com/unjs/ufo/commit/0cf9f1aed440013e53f7186b8f47648121c4bc8e))

### [0.5.2](https://github.com/unjs/ufo/compare/v0.5.1...v0.5.2) (2020-12-16)


### Bug Fixes

* **pkg:** allow requiring package.json ([#6](https://github.com/unjs/ufo/issues/6)) ([5fd5dc7](https://github.com/unjs/ufo/commit/5fd5dc7fd0336915e97cb92b52e01e897b04d2e4))

### [0.5.1](https://github.com/unjs/ufo/compare/v0.5.0...v0.5.1) (2020-12-16)


### Bug Fixes

* update encodeQueryValue to match URL spec for space and plus ([9446d9c](https://github.com/unjs/ufo/commit/9446d9c3f0decaa76754ab74954905375e3b0fc7))

## [0.5.0](https://github.com/unjs/ufo/compare/v0.4.0...v0.5.0) (2020-12-16)


### ⚠ BREAKING CHANGES

* api updates and params renamed to query

### Features

* reduce dependency on $URL for less encode/decoding ([38631cf](https://github.com/unjs/ufo/commit/38631cfb90995acde56e0cbef0e341710dcc9e65))

## [0.4.0](https://github.com/unjs/ufo/compare/v0.3.1...v0.4.0) (2020-12-16)


### ⚠ BREAKING CHANGES

* lightweight joinURL + resolveURL

### Features

* lightweight joinURL + resolveURL ([9a34622](https://github.com/unjs/ufo/commit/9a3462285bd84a5fec68bac1439828f21794e418))

### [0.3.1](https://github.com/unjs/ufo/compare/v0.3.0...v0.3.1) (2020-12-16)


### Bug Fixes

* **pkg:** remove trailing slash in exports ([9d94e3c](https://github.com/unjs/ufo/commit/9d94e3cf8d25c12fb4c84b6c63c46a8af476ecf0))

## [0.3.0](https://github.com/unjs/ufo/compare/v0.2.0...v0.3.0) (2020-12-16)


### ⚠ BREAKING CHANGES

* **pkg:** add exports and drop browser field
* custom url parser

### Features

* **pkg:** add exports and drop browser field ([218225d](https://github.com/unjs/ufo/commit/218225d8f5e29462bcba5721d4c484cce573c3ea))
* compact punycode support ([edaf5ca](https://github.com/unjs/ufo/commit/edaf5ca6ec07bfe7f54ca80cda7c86c3d0dfafce))
* custom url parser ([be8578f](https://github.com/unjs/ufo/commit/be8578f5c556e72f6473fe682ef6ecee00ef306f))
* use custom parsers for urls without hostname ([b22eb2e](https://github.com/unjs/ufo/commit/b22eb2ec12c160ed7c713d9bc1285e3509048c1f)), closes [nuxt/nuxt.js#8457](https://github.com/nuxt/nuxt.js/issues/8457)


### Bug Fixes

* preserve trailingslash from parse state ([adc9688](https://github.com/unjs/ufo/commit/adc9688f2a9096e79910f7475e702839ceef9fb9))
* remove password from auth when is not provided ([6616f02](https://github.com/unjs/ufo/commit/6616f0288f0df757f5896eed5f9290ea1d3b1632))

## [0.2.0](https://github.com/unjs/ufo/compare/v0.1.6...v0.2.0) (2020-12-15)


### ⚠ BREAKING CHANGES

* rewrite with URL ponyfill (#4)

### Features

* rewrite with URL ponyfill ([#4](https://github.com/unjs/ufo/issues/4)) ([3809d28](https://github.com/unjs/ufo/commit/3809d28e0fcb653ae91ed9c9707ad670ded68c6e))

### [0.1.6](https://github.com/unjs/ufo/compare/v0.1.5...v0.1.6) (2020-12-15)


### Bug Fixes

* enforce double slash ([90d8172](https://github.com/unjs/ufo/commit/90d8172189081a173b721a5c3d3bb53e8bed1e4b))

### [0.1.5](https://github.com/unjs/ufo/compare/v0.1.4...v0.1.5) (2020-12-15)


### Bug Fixes

* fix issue with hasProtocol ([239cdf7](https://github.com/unjs/ufo/commit/239cdf748a47aa9c32cf054b91cce87d5cae29bc))

### [0.1.4](https://github.com/unjs/ufo/compare/v0.1.3...v0.1.4) (2020-12-12)


### Bug Fixes

* **joinURL:** preserve params from input path ([8f8f10a](https://github.com/unjs/ufo/commit/8f8f10af829046ad27696acec7b123fecd8dca43))

### [0.1.3](https://github.com/unjs/ufo/compare/v0.1.2...v0.1.3) (2020-12-12)


### Bug Fixes

* **withParams:** prevent double encoding raw params ([28eb848](https://github.com/unjs/ufo/commit/28eb8484961a8af64ebfce12c369d844386c44bb))

### [0.1.2](https://github.com/unjs/ufo/compare/v0.1.1...v0.1.2) (2020-12-12)


### Bug Fixes

* getParams object keys ([72bcdf2](https://github.com/unjs/ufo/commit/72bcdf283473dc350be4a82db716ecca3989f2cf))

### [0.1.1](https://github.com/unjs/ufo/compare/v0.1.0...v0.1.1) (2020-12-12)


### Features

* `withParams` ([309f38a](https://github.com/unjs/ufo/commit/309f38a1d1e9496ed08e219238fc8cd306e5e8b8))
* getParams ([5ad02f6](https://github.com/unjs/ufo/commit/5ad02f68e8b9deba144d090b5244dfc7d90f2443))

## [0.1.0](https://github.com/unjs/ufo/compare/v0.0.3...v0.1.0) (2020-12-09)


### ⚠ BREAKING CHANGES

* preserve relative urls without leading slash

### Features

* add `cleanDoubleSlashes` ([#2](https://github.com/unjs/ufo/issues/2)) ([cbb72de](https://github.com/unjs/ufo/commit/cbb72de41abf1afd01f7234ba0084efbf0adf80a))
* preserve relative urls without leading slash ([34afd1e](https://github.com/unjs/ufo/commit/34afd1eebf0afbd4f0c692e17e2392c0152ebf73))

### [0.0.3](https://github.com/unjs/ufo/compare/v0.0.2...v0.0.3) (2020-12-04)


### Bug Fixes

* sideEffects field ([bbc36d1](https://github.com/unjs/ufo/commit/bbc36d107a86e305f814fdb1e3ae664a7c4874d4))

### 0.0.2 (2020-12-04)

### 0.0.1 (2020-12-04)
