import { hasProtocol, isRelative, parsePath, stringifyParsedURL } from '../src'

describe('hasProtocol', () => {
  const tests = [
    { input: '//', out: [false, false] },
    { input: '///', out: [false, false] },
    { input: '//test.com', out: [true, false] },
    { input: 'https://', out: [false, false] },
    { input: 'https://test.com', out: [true, true] },
    { input: '/test', out: [false, false] },
    { input: 'file:///home/user', out: [true, true] }
  ]

  for (const t of tests) {
    test(t.input.toString(), () => {
      const [withAcceptRelative, withoutAcceptRelative] = t.out
      expect(hasProtocol(t.input, true)).toBe(withAcceptRelative)
      expect(hasProtocol(t.input)).toBe(withoutAcceptRelative)
    })
  }
})

describe('isRelative', () => {
  const tests = [
    { input: '/', out: false },
    { input: './/', out: true },
    { input: '../test', out: true },
    { input: 'https://', out: false }
  ]

  for (const t of tests) {
    test(t.input.toString(), () => {
      expect(isRelative(t.input)).toBe(t.out)
    })
  }
})

describe('stringifyParsedURL', () => {
  const tests = [
    { input: '.#hash', out: '.#hash' },
    { input: '.?foo=123', out: '.?foo=123' },
    { input: './?foo=123#hash', out: './?foo=123#hash' },
    { input: '/test?query=123#hash', out: '/test?query=123#hash' },
    { input: 'test?query=123#hash', out: 'test?query=123#hash' },
    { input: '/%c', out: '/%c' },
    { input: '/%', out: '/%' },
    { input: 'http://foo.com/test?query=123#hash', out: 'http://foo.com/test?query=123#hash' },
    { input: 'http://localhost:3000', out: 'http://localhost:3000' },
    { input: 'http://my_email%40gmail.com:password@www.my_site.com', out: 'http://my_email%40gmail.com:password@www.my_site.com' },
    { input: '/test?query=123,123#hash, test', out: '/test?query=123,123#hash, test' }
  ]

  for (const t of tests) {
    test(t.input.toString(), () => {
      expect(stringifyParsedURL(parsePath(t.input))).toBe(t.out)
    })
  }
})
