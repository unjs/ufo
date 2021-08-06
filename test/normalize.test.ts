// @ts-nocheck
import { normalizeURL, withoutTrailingSlash } from '../src'

describe('normalizeURL', () => {
  const tests = {
    'http://foo.com': 'http://foo.com',
    'http://foo.com/bar': 'http://foo.com/bar',
    'proto://path/to': 'proto://path/to',
    '/bar': '/bar',
    bar: 'bar',
    './': './',
    '.': '.',
    '': '',
    './foo': './foo',
    '.#hash': '.#hash',
    '.?foo=123': '.?foo=123',
    './?foo=123#hash': './?foo=123#hash',
    '/test?query=123#hash': '/test?query=123#hash',
    'test?query=123#hash': 'test?query=123#hash',
    '/%c': '/%25c',
    '/%': '/%25',
    'http://foo.com/test?query=123#hash': 'http://foo.com/test?query=123#hash',
    'http://localhost:3000': 'http://localhost:3000',
    'http://my_email%40gmail.com:password@www.my_site.com': 'http://my_email%40gmail.com:password@www.my_site.com',
    '/test?query=123,123#hash, test': '/test?query=123,123#hash,%20test',
    'http://test.com/%C3%B6?foo=تست': 'http://test.com/%C3%B6?foo=%D8%AA%D8%B3%D8%AA',
    '/http:/': '/http:/',
    'http://[2001:db8:85a3:8d3:1319:8a2e:370:7348]/': 'http://[2001:db8:85a3:8d3:1319:8a2e:370:7348]/',
    'http://localhost/?redirect=http://google.com?q=test': 'http://localhost/?redirect=http://google.com?q=test',
    'http://localhost/?email=some+v1@email.com': 'http://localhost/?email=some+v1@email.com',
    'http://localhost/?email=some%2Bv1%40email.com': 'http://localhost/?email=some%2Bv1@email.com',
    'http://localhost/abc/deg%2F%2Ftest?email=some+v1@email.com': 'http://localhost/abc/deg%2F%2Ftest?email=some+v1@email.com',
    'http://localhost/abc/deg%2f%3f%26test?email=some+v1@email.com': 'http://localhost/abc/deg%2F%3F%26test?email=some+v1@email.com'
  }

  const validURLS = [
    'http://foo.com/blah_blah',
    'http://foo.com/blah_blah/',
    'http://foo.com/blah_blah_(wikipedia)',
    'http://foo.com/blah_blah_(wikipedia)_(again)',
    'http://www.example.com/wpstyle/?p=364',
    'https://www.example.com/foo/?bar=baz&inga=42&quux',
    'http://✪df.ws/123',
    'http://userid:password@example.com:8080',
    'http://userid:password@example.com:8080/',
    'http://userid@example.com',
    'http://userid@example.com/',
    'http://userid@example.com:8080',
    'http://userid@example.com:8080/',
    'http://userid:password@example.com',
    'http://userid:password@example.com/',
    'http://142.42.1.1/',
    'http://142.42.1.1:8080/',
    'http://➡.ws/䨹',
    'http://⌘.ws',
    'http://⌘.ws/',
    'http://foo.com/blah_(wikipedia)#cite-1',
    'http://foo.com/blah_(wikipedia)_blah#cite-1',
    'http://foo.com/unicode_(✪)_in_parens',
    'http://foo.com/(something)?after=parens',
    'http://☺.damowmow.com/',
    'http://code.google.com/events/#&product=browser',
    'http://j.mp',
    'ftp://foo.bar/baz',
    // 'http://foo.bar/?q=Tes +URL-encoded stuff#FOO bAR+BAZ',
    'http://مثال.إختبار',
    'http://例子.测试',
    'http://उदाहरण.परीक्षा',
    // 'http://-.~_!$&\'() * +,;=:% 40: 80 % 2f:::::: @example.com',
    'http://1337.net',
    'http://a.b-c.de',
    'http://223.255.255.254'
  ]

  for (const input in tests) {
    test(input, () => {
      expect(normalizeURL(input)).toBe(tests[input])
    })
  }

  for (const input of validURLS) {
    test(input, () => {
      expect(withoutTrailingSlash(normalizeURL(input)))
        .toBe(withoutTrailingSlash(new URL(input).href))
    })
  }
})
