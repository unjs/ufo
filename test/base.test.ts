// @ts-nocheck
import { withBase, withoutBase } from '../src'

describe('withBase', () => {
  const tests = [
    { base: '/', input: '/', out: '/' },
    { base: '/foo', input: '/', out: '/foo' },
    { base: '/foo/', input: '/', out: '/foo' },
    { base: '/foo', input: '/bar', out: '/foo/bar' },
    { base: '/base/', input: '/base', out: '/base' },
    { base: '/base', input: '/base/', out: '/base/' },
    { base: '/base', input: '/base/a', out: '/base/a' },
    { base: '/base/', input: '/base/a', out: '/base/a' }
  ]

  for (const t of tests) {
    test(JSON.stringify(t.base) + ' + ' + JSON.stringify(t.input), () => {
      expect(withBase(t.input, t.base)).toBe(t.out)
    })
  }
})

describe('withoutBase', () => {
  const tests = [
    { base: '/', input: '/', out: '/' },
    { base: '/foo', input: '/', out: '/' },
    { base: '/foo/', input: '/', out: '/' },
    { base: '/foo', input: '/bar', out: '/bar' },
    { base: '/base/', input: '/base', out: '/' },
    { base: '/base', input: '/base/', out: '/' },
    { base: '/base', input: '/base/a', out: '/a' },
    { base: '/base/', input: '/base/a', out: '/a' },
    { base: '/base/a/', input: '/base/a', out: '/' },
    { base: '/', input: '/test/', out: '/test/' }
  ]

  for (const t of tests) {
    test(JSON.stringify(t.input) + '-' + JSON.stringify(t.base), () => {
      expect(withoutBase(t.input, t.base)).toBe(t.out)
    })
  }
})
