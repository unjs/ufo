// @ts-nocheck
import { createURL, resolveURL } from '../src'

describe('resolveURL', () => {
  const tests = [
    { input: [], out: '' },
    { input: ['/'], out: '/' },
    { input: ['/a'], out: '/a' },
    { input: ['a', 'b'], out: 'a/b' },
    { input: ['a', 'b/', 'c'], out: 'a/b/c' },
    { input: ['a', 'b/', '/c'], out: 'a/b/c' },
    { input: ['/a?foo=bar#123', 'b/', 'c/'], out: '/a/b/c/?foo=bar#123' },
    { input: ['/a?foo=bar#123', '../b/', './c/'], out: '/b/c/?foo=bar#123' },
    { input: ['http://foo.com', 'a'], out: 'http://foo.com/a' },
    { input: ['a?x=1', 'b?y=2&y=3&z=4'], out: 'a/b?x=1&y=2&y=3&z=4' }
  ]

  for (const t of tests) {
    test(t.input.toString(), () => {
      expect(resolveURL(...t.input)).toBe(t.out)
    })
  }

  test('invalid URL (null)', () => {
    expect(() => resolveURL(null)).toThrow('URL input should be string received object (null)')
  })

  test('invalid URL (array)', () => {
    expect(() => resolveURL([])).toThrow('URL input should be string received object ()')
  })

  test('no arguments', () => {
    expect(resolveURL()).toBe('')
  })
})

// Tests from https://tools.ietf.org/html/rfc1808
describe('$URL.resolve (relative resolution)', () => {
  const base = 'http://a/b/c/d;p?q#f'
  const tests = [
    // Normal tests
    // This would require a different protocol parser
    // { input: 'g:h', out: 'g:h' },
    { input: 'g', out: 'http://a/b/c/g' },
    { input: './g', out: 'http://a/b/c/g' },
    { input: 'g/', out: 'http://a/b/c/g/' },
    { input: '/g', out: 'http://a/g' },
    // This would require a different protocol parser
    // { input: '//g', out: 'http://g' },
    { input: '?y', out: 'http://a/b/c/d;p?y' },
    { input: 'g?y', out: 'http://a/b/c/g?y' },
    { input: 'g?y/./x', out: 'http://a/b/c/g?y/./x' },
    { input: '#s', out: 'http://a/b/c/d;p?q#s' },
    { input: 'g#s', out: 'http://a/b/c/g#s' },
    { input: 'g#s/./x', out: 'http://a/b/c/g#s/./x' },
    { input: 'g?y#s', out: 'http://a/b/c/g?y#s' },
    // This would require treating ; differently in parser
    // { input: ';x', out: 'http://a/b/c/d;x' },
    { input: 'g;x', out: 'http://a/b/c/g;x' },
    { input: 'g;x?y#s', out: 'http://a/b/c/g;x?y#s' },
    { input: '.', out: 'http://a/b/c/' },
    { input: './', out: 'http://a/b/c/' },
    { input: '..', out: 'http://a/b/' },
    { input: '../', out: 'http://a/b/' },
    { input: '../g', out: 'http://a/b/g' },
    { input: '../..', out: 'http://a/' },
    { input: '../../', out: 'http://a/' },
    { input: '../../g', out: 'http://a/g' },

    // Abnormal situations
    // { input: '', out: 'http://a/b/c/d;p?q#f' },
    { input: '../../../g', out: 'http://a/../g' },
    { input: '../../../../g', out: 'http://a/../../g' },
    { input: '/./g', out: 'http://a/./g' },
    { input: '/../g', out: 'http://a/../g' },
    { input: 'g.', out: 'http://a/b/c/g.' },
    { input: '.g', out: 'http://a/b/c/.g' },
    { input: 'g..', out: 'http://a/b/c/g..' },
    { input: '..g', out: 'http://a/b/c/..g' },
    { input: './../g', out: 'http://a/b/g' },
    { input: './g/.', out: 'http://a/b/c/g/' },
    { input: 'g/./h', out: 'http://a/b/c/g/h' },
    { input: 'g/../h', out: 'http://a/b/c/h' },
    // These require a different protocol parser
    // { input: 'http:g', out: 'http:g' },
    // { input: 'http:', out: 'http:' },
    { input: 'http://g', out: 'http://g' }
    // We have decided to treat http:// as an invalid URL so this test won't pass
    // { input: 'http://', out: 'http://' }
  ]

  for (const t of tests) {
    test(t.input.toString(), () => {
      const url = createURL(base)
      url.resolve(createURL(t.input))
      expect(url.toString()).toBe(t.out)
    })
  }
})
