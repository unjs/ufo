// @ts-nocheck
import { normalizeURL } from '../src'

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
    'http://foo.com/test?query=123#hash': 'http://foo.com/test?query=123#hash',
    'http://localhost:3000': 'http://localhost:3000',
    'http://my_email%40gmail.com:password@www.my_site.com': 'http://my_email%40gmail.com:password@www.my_site.com',
    '/test?query=123 123#hash, test': '/test?query=123%20123#hash,%20test',
    'http://test.com/%C3%B6?foo=تست': 'http://test.com/%C3%B6?foo=%D8%AA%D8%B3%D8%AA',
    '/http:/': '/http:/',
    'http://[2001:db8:85a3:8d3:1319:8a2e:370:7348]/': 'http://[2001:db8:85a3:8d3:1319:8a2e:370:7348]/'
  }

  for (const input in tests) {
    test(input, () => {
      expect(normalizeURL(input)).toBe(tests[input])
    })
  }
})
