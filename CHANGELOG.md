# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## v1.6.3

[compare changes](https://github.com/unjs/ufo/compare/v1.6.2...v1.6.3)

### 🩹 Fixes

- **withBase, withoutBase:** Prevent false prefix matches ([#313](https://github.com/unjs/ufo/pull/313))

### 🏡 Chore

- Update deps ([04b73bd](https://github.com/unjs/ufo/commit/04b73bd))

### ❤️ Contributors

- Pooya Parsa ([@pi0](https://github.com/pi0))
- Florian Heuberger ([@Flo0806](https://github.com/Flo0806))

## v1.6.2

[compare changes](https://github.com/unjs/ufo/compare/v1.6.1...v1.6.2)

### 🩹 Fixes

- Fix `parsePath` return type ([#293](https://github.com/unjs/ufo/pull/293))

### 📖 Documentation

- Add more examples in jsdoc ([#291](https://github.com/unjs/ufo/pull/291))

### 📦 Build

- Fix exports condition order to prefer esm with default fallback ([8457581](https://github.com/unjs/ufo/commit/8457581))

### 🏡 Chore

- **release:** V1.6.1 ([b83cbea](https://github.com/unjs/ufo/commit/b83cbea))
- Update deps ([9d1833b](https://github.com/unjs/ufo/commit/9d1833b))
- Lint ([0181677](https://github.com/unjs/ufo/commit/0181677))

### ❤️ Contributors

- Daedalus ([@ComfortablyCoding](https://github.com/ComfortablyCoding))
- Pooya Parsa ([@pi0](https://github.com/pi0))
- Alex Liu ([@Mini-ghost](https://github.com/Mini-ghost))

## v1.6.1

[compare changes](https://github.com/unjs/ufo/compare/v1.6.0...v1.6.1)

### 🩹 Fixes

- **query:** Use `Object.create(null)` ([#290](https://github.com/unjs/ufo/pull/290))

### ❤️ Contributors

- Pooya Parsa ([@pi0](https://github.com/pi0))

## v1.6.0

[compare changes](https://github.com/unjs/ufo/compare/v1.5.4...v1.6.0)

### 🚀 Enhancements

- Add `filterQuery` utility ([#287](https://github.com/unjs/ufo/pull/287))

### 🩹 Fixes

- **parseQuery:** Use object with null prototype ([#286](https://github.com/unjs/ufo/pull/286))
- **parseFilename:** Use optional chaining to access `opts.strict` ([#284](https://github.com/unjs/ufo/pull/284))

### 📖 Documentation

- Clarify `withBase` jsdocs ([#266](https://github.com/unjs/ufo/pull/266))
- Fix typos ([#278](https://github.com/unjs/ufo/pull/278))
- Spelling and formatting ([#285](https://github.com/unjs/ufo/pull/285))

### 🏡 Chore

- Consistent spelling in JSDoc comments & update automd syntax ([#256](https://github.com/unjs/ufo/pull/256))
- Apply automated lint fixes ([aa6d406](https://github.com/unjs/ufo/commit/aa6d406))
- Apply automated lint fixes ([46d0a04](https://github.com/unjs/ufo/commit/46d0a04))
- Update dev dependencies ([9eaa57c](https://github.com/unjs/ufo/commit/9eaa57c))
- Lint ([a7012eb](https://github.com/unjs/ufo/commit/a7012eb))

### ✅ Tests

- **query:** Validate more than 2 values for key ([#273](https://github.com/unjs/ufo/pull/273))

### 🤖 CI

- Always update corepack ([e383832](https://github.com/unjs/ufo/commit/e383832))

### ❤️ Contributors

- Kricsleo ([@kricsleo](https://github.com/kricsleo))
- Ezra Ashenafi ([@Eazash](https://github.com/Eazash))
- Pooya Parsa ([@pi0](https://github.com/pi0))
- Bobbie Goede <bobbiegoede@gmail.com>
- Nano ([@Konano](https://github.com/Konano))
- Aman Desai ([@amandesai01](https://github.com/amandesai01))
- Dave Honneffer ([@pearofducks](https://github.com/pearofducks))
- Johann Schopplich ([@johannschopplich](https://github.com/johannschopplich))

## v1.5.4

[compare changes](https://github.com/unjs/ufo/compare/v1.5.3...v1.5.4)

### 🩹 Fixes

- **parseURL:** Only normalize windows drive letters with `file://` protocol ([#246](https://github.com/unjs/ufo/pull/246))
- **withProtocol:** Consider relative protocol ([#242](https://github.com/unjs/ufo/pull/242))

### 🏡 Chore

- Update deps ([0dbe44f](https://github.com/unjs/ufo/commit/0dbe44f))
- Lint with eslint v9 ([51b0565](https://github.com/unjs/ufo/commit/51b0565))

### 🎨 Styles

- Lint with prettier defaults ([666091d](https://github.com/unjs/ufo/commit/666091d))

### ❤️ Contributors

- Natanael Dos Santos Feitosa ([@natanfeitosa](http://github.com/natanfeitosa))
- Pooya Parsa ([@pi0](http://github.com/pi0))
- Emil ([@ea-agital](http://github.com/ea-agital))

## v1.5.3

[compare changes](https://github.com/unjs/ufo/compare/v1.5.2...v1.5.3)

### 🩹 Fixes

- **joinRelativeURL:** Avoid lookbehind regex for browser compatibility ([#228](https://github.com/unjs/ufo/pull/228))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v1.5.2

[compare changes](https://github.com/unjs/ufo/compare/v1.5.1...v1.5.2)

### 🩹 Fixes

- Use lookbehind regex only inside `joinRelativeURL` ([#226](https://github.com/unjs/ufo/pull/226))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v1.5.1

[compare changes](https://github.com/unjs/ufo/compare/v1.5.0...v1.5.1)

### 🩹 Fixes

- **joinRelativeURL:** Handle base with protocol ([#222](https://github.com/unjs/ufo/pull/222))

### 🏡 Chore

- Update readme ([ffc9d3e](https://github.com/unjs/ufo/commit/ffc9d3e))
- Add automd to autofix ci ([fffbcd4](https://github.com/unjs/ufo/commit/fffbcd4))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v1.5.0

[compare changes](https://github.com/unjs/ufo/compare/v1.4.0...v1.5.0)

### 🚀 Enhancements

- Add `withoutHost` utility ([#212](https://github.com/unjs/ufo/pull/212))
- **joinURL:** Handle segments with `../` ([#217](https://github.com/unjs/ufo/pull/217))
- `joinRelativeURL` ([#220](https://github.com/unjs/ufo/pull/220))

### 🩹 Fixes

- **withoutTrailingSlash:** Consider qurry param ([#219](https://github.com/unjs/ufo/pull/219))

### 💅 Refactors

- **joinURL:** Rewrite with clear syntax and relative `../` support ([#218](https://github.com/unjs/ufo/pull/218))

### 📖 Documentation

- Fix typo ([#213](https://github.com/unjs/ufo/pull/213))

### 🏡 Chore

- **release:** V1.4.0 ([541bc62](https://github.com/unjs/ufo/commit/541bc62))
- Update automd ([3301e51](https://github.com/unjs/ufo/commit/3301e51))
- Fix typo in jsdocs ([3aaf64d](https://github.com/unjs/ufo/commit/3aaf64d))

### ❤️ Contributors

- Thijs Wijnmaalen <thijs@wijnmaalen.name>
- Pooya Parsa ([@pi0](http://github.com/pi0))
- Daniel Roe ([@danielroe](http://github.com/danielroe))
- Diptesh Choudhuri <ignisda2001@gmail.com>
- Fabian B ([@madebyfabian](http://github.com/madebyfabian))

## v1.4.0

[compare changes](https://github.com/unjs/ufo/compare/v1.3.2...v1.4.0)

### 🚀 Enhancements

- Add `withFragment` utility ([#193](https://github.com/unjs/ufo/pull/193))
- Add `withoutFragment` util ([#199](https://github.com/unjs/ufo/pull/199))

### 🔥 Performance

- **withFragment:** Early return when no hash changes required ([d6ce037](https://github.com/unjs/ufo/commit/d6ce037))

### 🩹 Fixes

- **encodeQueryValue:** Encode the slash character ([#198](https://github.com/unjs/ufo/pull/198))
- Stringify protocol-relative URLs ([#207](https://github.com/unjs/ufo/pull/207))
- **withFragment:** Use `encodeHash` for encoding ([48237ab](https://github.com/unjs/ufo/commit/48237ab))

### 💅 Refactors

- **resolveUrl:** Decouple from $URL ([#186](https://github.com/unjs/ufo/pull/186))
- Deprecate `$URL` and `createURL` ([f1af9b3](https://github.com/unjs/ufo/commit/f1af9b3))
- **normalizeURL:** Decouple from `$URL` ([9013029](https://github.com/unjs/ufo/commit/9013029))
- **withoutFragment:** Decouple from `withFragment` ([712b8d5](https://github.com/unjs/ufo/commit/712b8d5))

### 📖 Documentation

- Remove mentioning `$URL` ([65e6be8](https://github.com/unjs/ufo/commit/65e6be8))
- Update normalizeURL example ([011777a](https://github.com/unjs/ufo/commit/011777a))
- Use jsdocs and automd ([#209](https://github.com/unjs/ufo/pull/209))

### 🏡 Chore

- Update dependencies and lockfile ([21e644e](https://github.com/unjs/ufo/commit/21e644e))
- Format readme with prettier ([6b00230](https://github.com/unjs/ufo/commit/6b00230))
- Gitignore vitest temp files ([89be2d1](https://github.com/unjs/ufo/commit/89be2d1))
- Update docs ([5ab6d16](https://github.com/unjs/ufo/commit/5ab6d16))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Daniel Acuña 
- Diptesh Choudhuri <ignisda2001@gmail.com>
- Daniel Roe ([@danielroe](http://github.com/danielroe))
- Petr Kolonicz

## v1.3.2

[compare changes](https://github.com/unjs/ufo/compare/v1.3.1...v1.3.2)

### 🩹 Fixes

- **parseURL:** Parse protocol case-insensitively ([#188](https://github.com/unjs/ufo/pull/188))
- Respect fragment in trailing slash utils ([#175](https://github.com/unjs/ufo/pull/175))

### 🏡 Chore

- **release:** V1.3.1 ([5da74c4](https://github.com/unjs/ufo/commit/5da74c4))
- Update lockfile ([11f161e](https://github.com/unjs/ufo/commit/11f161e))

### ❤️ Contributors

- Alexander Lichter ([@manniL](http://github.com/manniL))
- Pooya Parsa ([@pi0](http://github.com/pi0))
- Daniel Roe ([@danielroe](http://github.com/danielroe))

## v1.3.1

[compare changes](https://github.com/unjs/ufo/compare/v1.3.0...v1.3.1)

### 🩹 Fixes

- Test script protocols insensitively ([#180](https://github.com/unjs/ufo/pull/180))

### 🏡 Chore

- Update dependencies ([20e99e7](https://github.com/unjs/ufo/commit/20e99e7))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Daniel Roe <daniel@roe.dev>

## v1.3.0

[compare changes](https://github.com/unjs/ufo/compare/v1.2.0...v1.3.0)

### 🚀 Enhancements

- **stringifyParsedURL:** Support partial url inputs ([#166](https://github.com/unjs/ufo/pull/166))

### 🩹 Fixes

- **parseURL:** Handle `data:` and `blob` protocols ([#159](https://github.com/unjs/ufo/pull/159))
- **parseURL, hasProtocol, isScriptProtocol:** Ignore leading whitespaces ([#170](https://github.com/unjs/ufo/pull/170))

### 🏡 Chore

- **release:** V1.2.0 ([eee29ee](https://github.com/unjs/ufo/commit/eee29ee))
- Correct typos in readme ([#160](https://github.com/unjs/ufo/pull/160))
- Update depnednecie ([b6f6cee](https://github.com/unjs/ufo/commit/b6f6cee))
- Add `security.md` ([e600fc0](https://github.com/unjs/ufo/commit/e600fc0))

### 🤖 CI

- Use conventional commit message ([#157](https://github.com/unjs/ufo/pull/157))

### ❤️  Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Daniel Roe <daniel@roe.dev>
- Felix Yan ([@felixonmars](http://github.com/felixonmars))

## v1.2.0

[compare changes](https://github.com/unjs/ufo/compare/v1.1.2...v1.2.0)

### 🚀 Enhancements

- Add `isScriptProtocol` util ([#156](https://github.com/unjs/ufo/pull/156))
- Generic types for `getQuery` and `parseQuery` ([#131](https://github.com/unjs/ufo/pull/131))
- Add `parseFilename` utility ([#125](https://github.com/unjs/ufo/pull/125))

### 🩹 Fixes

- **parseQuery:** Decode space in query keys ([#150](https://github.com/unjs/ufo/pull/150))
- Parsed query types should be string only ([#139](https://github.com/unjs/ufo/pull/139))
- **stringifyQuery:** Filter out empty values ([#148](https://github.com/unjs/ufo/pull/148))
- **joinURL:** Handle leading dot ([#35](https://github.com/unjs/ufo/pull/35))

### 🏡 Chore

- **release:** V1.1.2 ([8f36c4f](https://github.com/unjs/ufo/commit/8f36c4f))
- Lint test file ([7fa45a0](https://github.com/unjs/ufo/commit/7fa45a0))
- Update dependencies ([b9b3b6c](https://github.com/unjs/ufo/commit/b9b3b6c))
- Lint ([17c0ad6](https://github.com/unjs/ufo/commit/17c0ad6))
- Add autofix ci ([5bb737f](https://github.com/unjs/ufo/commit/5bb737f))
- Move autofix ci to `.github/workflows` dir ([f1b3d5c](https://github.com/unjs/ufo/commit/f1b3d5c))
- Fix autofix ci ([a6fcce3](https://github.com/unjs/ufo/commit/a6fcce3))

### ❤️  Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Divine 
- Oleg Khalin 
- Daniel Roe <daniel@roe.dev>
- Raj Kadhi <raj.kadhi10@gmail.com>

## v1.1.2

[compare changes](https://github.com/unjs/ufo/compare/v1.1.1...v1.1.2)


### 🩹 Fixes

  - Provide node16 style types field ([#133](https://github.com/unjs/ufo/pull/133))

### 📖 Documentation

  - Add jsdocs for parse utils ([#134](https://github.com/unjs/ufo/pull/134))
  - Add `stringifyParsedURL` ([81e92b2](https://github.com/unjs/ufo/commit/81e92b2))

### 🏡 Chore

  - **readme:** Improvements ([e38bdf6](https://github.com/unjs/ufo/commit/e38bdf6))
  - Update lockfile ([29fd478](https://github.com/unjs/ufo/commit/29fd478))

### ❤️  Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Nozomu Ikuta 
- Sébastien Chopin <seb@nuxtjs.com>
- Daniel Roe <daniel@roe.dev>

## v1.1.1

[compare changes](https://github.com/unjs/ufo/compare/v1.1.0...v1.1.1)


### 🩹 Fixes

  - **hasProtocol:** Expand protocol relative url regexp ([#126](https://github.com/unjs/ufo/pull/126))

### ✅ Tests

  - Add more tests for full coverage ([#127](https://github.com/unjs/ufo/pull/127))

### ❤️  Contributors

- Divine 
- Daniel Roe <daniel@roe.dev>

## v1.1.0

[compare changes](https://github.com/unjs/ufo/compare/v1.0.1...v1.1.0)


### 🚀 Enhancements

  - **hasProtocol:** Strict mode support ([#124](https://github.com/unjs/ufo/pull/124))
  - Stringify query values ([#123](https://github.com/unjs/ufo/pull/123))

### 🩹 Fixes

  - **parseHost:** Correctly parse hostnames with and without port ([#120](https://github.com/unjs/ufo/pull/120))
  - Port should be string ([75a280c](https://github.com/unjs/ufo/commit/75a280c))
  - Encode `[]` and `{}` in query values to increase compatibility ([#118](https://github.com/unjs/ufo/pull/118))
  - **hasProtocol:** Accept backslash too ([#122](https://github.com/unjs/ufo/pull/122))

### 🏡 Chore

  - Lint ([09ea077](https://github.com/unjs/ufo/commit/09ea077))
  - Use changelogen for release ([74626fb](https://github.com/unjs/ufo/commit/74626fb))

### 🎨 Styles

  - Lint with prettier ([80cd389](https://github.com/unjs/ufo/commit/80cd389))

### ❤️  Contributors

- Pooya Parsa <pooya@pi0.io>
- Divine 
- Smeng9

### [1.0.1](https://github.com/unjs/ufo/compare/v1.0.0...v1.0.1) (2022-11-29)


### Bug Fixes

* fix `QueryValue` type to be array only as `QueryObject` values ([#101](https://github.com/unjs/ufo/issues/101)) ([3fbad8c](https://github.com/unjs/ufo/commit/3fbad8c04bb9a2e3438d5000de0c49ddc469536a))
* **hasProtocol:** do not treat windows drive letter as protocol ([#106](https://github.com/unjs/ufo/issues/106)) ([67c3dab](https://github.com/unjs/ufo/commit/67c3dab271f46abfa82a492ddb7e1e099f994203))
* **query:** uniform handling of empty array values ([#103](https://github.com/unjs/ufo/issues/103)) ([0b1007d](https://github.com/unjs/ufo/commit/0b1007dc58d9955dc24bab3312173b7a929387cb))

## [1.0.0](https://github.com/unjs/ufo/compare/v0.8.6...v1.0.0) (2022-11-14)


### Features

* remove undefined from withQuery ([#71](https://github.com/unjs/ufo/issues/71)) ([f8900d5](https://github.com/unjs/ufo/commit/f8900d5c1d6f8f2c34f6dda82aafc5d9521aba4e))


### Bug Fixes

* remove leading slash when parsing windows file urls ([#87](https://github.com/unjs/ufo/issues/87)) ([187afb0](https://github.com/unjs/ufo/commit/187afb0f954256eb953c1ef447fccf65e6ef5dff))

### [0.8.6](https://github.com/unjs/ufo/compare/v0.8.5...v0.8.6) (2022-10-15)


### Bug Fixes

* ensure `withBase` does not prefix URLs with protocol ([#68](https://github.com/unjs/ufo/issues/68)) ([b520298](https://github.com/unjs/ufo/commit/b520298a4c6979cffe452000039ff5ca41f287b1))

### [0.8.5](https://github.com/unjs/ufo/compare/v0.8.4...v0.8.5) (2022-07-07)


### Bug Fixes

* **withoutBase:** preserve leading slash ([fc72dd0](https://github.com/unjs/ufo/commit/fc72dd0b7e503c07e4788ebb7af6fb790c714035)), closes [#64](https://github.com/unjs/ufo/issues/64)

### [0.8.4](https://github.com/unjs/ufo/compare/v0.8.3...v0.8.4) (2022-05-06)


### Features

* `isEqual` utility ([5fb8267](https://github.com/unjs/ufo/commit/5fb826749fc04141655b615ab5868ed63b52db17))

### [0.8.3](https://github.com/unjs/ufo/compare/v0.8.2...v0.8.3) (2022-03-31)


### Bug Fixes

* **withProtocol:** handle input without protocol (resolves [#52](https://github.com/unjs/ufo/issues/52)) ([4f66249](https://github.com/unjs/ufo/commit/4f66249c2a5946483554ead832bb68db724b612e))

### [0.8.2](https://github.com/unjs/ufo/compare/v0.8.1...v0.8.2) (2022-03-31)


### Features

* withHttp, withHttps, withoutProtocol, withProtocol ([#48](https://github.com/unjs/ufo/issues/48)) ([f8ee0c0](https://github.com/unjs/ufo/commit/f8ee0c0a37f45ef695dd65943a5a20f838993e1e))


### Bug Fixes

* **encodeQueryItem:** stringify boolean values ([#51](https://github.com/unjs/ufo/issues/51)) ([469dd88](https://github.com/unjs/ufo/commit/469dd884deb3047ae70dce6fcbbf69154ad491b5))

### [0.8.1](https://github.com/unjs/ufo/compare/v0.8.0...v0.8.1) (2022-03-16)


### Bug Fixes

* **parseURL:** don't fail if hostAndPath not matching ([d297e60](https://github.com/unjs/ufo/commit/d297e60d01c91c2367a20e0779d8a6705c996a3e))

## [0.8.0](https://github.com/unjs/ufo/compare/v0.7.11...v0.8.0) (2022-03-15)


### ⚠ BREAKING CHANGES

* hasProtocol additional protocols (#46)

### Bug Fixes

* add typecheck ([a9626ff](https://github.com/unjs/ufo/commit/a9626ffcda8033a1ffa475464b088ceae0b90854))
* hasProtocol additional protocols ([#46](https://github.com/unjs/ufo/issues/46)) ([d66cb64](https://github.com/unjs/ufo/commit/d66cb646c3a63dc747397c3d1e8b2bd3eed13d7f))
* **parseURL:** respect 0 number as query value ([#44](https://github.com/unjs/ufo/issues/44)) ([f2f188f](https://github.com/unjs/ufo/commit/f2f188f08c02d969dff07d9f0d5d44408393dbbb))

### [0.7.11](https://github.com/unjs/ufo/compare/v0.7.10...v0.7.11) (2022-02-25)


### Bug Fixes

* **parseURL:** exclude hash from hostname match (resolves [#42](https://github.com/unjs/ufo/issues/42)) ([53a1cea](https://github.com/unjs/ufo/commit/53a1ceaaefe07afb3add74ca55998d302a4ce218))

### [0.7.10](https://github.com/unjs/ufo/compare/v0.7.9...v0.7.10) (2022-01-31)


### Bug Fixes

* **parseURL:** normalize unescaped backslash to slash ([07b97af](https://github.com/unjs/ufo/commit/07b97af2f5cd72f10fb0ff1a79953fb6841d04fc))

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
