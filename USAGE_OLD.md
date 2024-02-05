## Usage

### `normalizeURL`

- Ensures URL is properly encoded
- Ensures pathname starts with slash
- Preserves protocol/host if provided

```ts
normalizeURL("test?query=123 123#hash, test");
// test?query=123%20123#hash,%20test

normalizeURL("http://localhost:3000");
// http://localhost:3000
```

### `joinURL`

```ts
joinURL("a", "/b", "/c");
// a/b/c
```

### `resolveURL`

```ts
resolveURL("http://foo.com/foo?test=123#token", "bar", "baz");
// http://foo.com/foo/bar/baz?test=123#token
```

### `parseURL`

```ts
parseURL("http://foo.com/foo?test=123#token");
// { protocol: 'http:', auth: '', host: 'foo.com', pathname: '/foo', search: '?test=123', hash: '#token' }

parseURL("foo.com/foo?test=123#token");
// { pathname: 'foo.com/foo', search: '?test=123', hash: '#token' }

parseURL("foo.com/foo?test=123#token", "https://");
// { protocol: 'https:', auth: '', host: 'foo.com', pathname: '/foo', search: '?test=123', hash: '#token' }
```

### `stringifyParsedURL`

```ts
const obj = parseURL("http://foo.com/foo?test=123#token");
obj.host = "bar.com";

stringifyParsedURL(obj);
// http://bar.com/foo?test=123#token
```

### `withQuery`

```ts
withQuery("/foo?page=a", { token: "secret" });
// /foo?page=a&token=secret
```

### `getQuery`

```ts
getQuery("http://foo.com/foo?test=123&unicode=%E5%A5%BD");
// { test: '123', unicode: '好' }
```

### `parseFilename`

```ts
// Result: filename.ext
parseFilename("http://example.com/path/to/filename.ext");

// Result: undefined
parseFilename("/path/to/.hidden-file", { strict: true });
```

### `withTrailingSlash`

Ensures url ends with a trailing slash.

```ts
withTrailingSlash("/foo");
// /foo/
```

Set the second option to `true` to support query parameters:

```ts
withTrailingSlash("/path?query=true", true);
// /path/?query=true
```

### `withoutTrailingSlash`

Ensures url does not ends with a trailing slash.

```ts
withoutTrailingSlash("/foo/");
// /foo
```

Set the second option to `true` to support query parameters:

```ts
withoutTrailingSlash("/path/?query=true", true);
// /path?query=true
```

### `cleanDoubleSlashes`

Ensures url does not have double slash (except for protocol).

```ts
cleanDoubleSlashes("//foo//bar//");
// /foo/bar/

cleanDoubleSlashes("http://example.com/analyze//http://localhost:3000//");
// http://example.com/analyze/http://localhost:3000/
```

### `isSamePath`

Check two paths are equal or not. Trailing slash and encoding are normalized before comparison.

```ts
isSamePath("/foo", "/foo/");
// true
```

### `isRelative`

Check if a path starts with `./` or `../`.

```ts
isRelative("./foo");
// true
```

### `withHttp`

Ensures url protocol is `http`

```ts
withHttp("https://example.com");
// http://example.com
```

### `withHttps`

Ensures url protocol is `https`

```ts
withHttps("http://example.com");
// https://example.com
```

### `withProtocol`

Changes url protocol passed as second argument

```ts
withProtocol("http://example.com", "ftp://");
// ftp://example.com
```

### `withoutProtocol`

Removes url protocol

```ts
withoutProtocol("http://example.com");
// example.com
```

### `isEqual`

Compare two URLs regardless of their slash condition or encoding:

```ts
isEqual("/foo", "foo");
// true
isEqual("foo/", "foo");
// true
isEqual("/foo bar", "/foo%20bar");
// true

// Strict compare
isEqual("/foo", "foo", { leadingSlash: true });
// false
isEqual("foo/", "foo", { trailingSlash: true });
// false
isEqual("/foo bar", "/foo%20bar", { encoding: true });
// false
```

### `withFragment`

Add a fragment (or hash) to a URL:

```ts
withFragment("/foo", "bar");
// /foo#bar
withFragment("/foo#bar", "baz");
// /foo#baz
withFragment("/foo#bar", "");
// /foo
```

### `withoutFragment`

Removes the fragment (or hash) part of URL.

```ts
withoutFragment("http://example.com/foo?q=123#bar");
// 'http://example.com/foo?q=123'
```
