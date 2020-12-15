// @ts-nocheck
import { normalizeURL } from '../src'

describe('normalizeURL', () => {
  const tests = {
    'http://foo.com': 'http://foo.com/',
    'http://foo.com/bar': 'http://foo.com/bar',
    'proto://path/to': 'proto://path/to',
    '/bar': '/bar',
    bar: 'bar',
    '/test?query=123#hash': '/test?query=123#hash',
    'test?query=123#hash': 'test?query=123#hash',
    'http://foo.com/test?query=123#hash': 'http://foo.com/test?query=123#hash',
    'http://localhost:3000': 'http://localhost:3000/',
    // '/test?query=123 123#hash, test': '/test?query=123 123#hash, test', // TODO
    // 'http://test.com/%C3%B6?foo=تست': 'http://test.com/%C3%B6?foo=%D8%AA%D8%B3%D8%AA', // TODO
    '/http:/': '/http:/'
  }

  for (const input in tests) {
    test(input, () => {
      expect(normalizeURL(input)).toBe(tests[input])
    })
  }
})
