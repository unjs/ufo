// @ts-nocheck
import { joinURL } from '../src'

describe('joinURL', () => {
  const tests = [
    { input: [], out: '' },
    { input: ['/'], out: '/' },
    { input: ['/a'], out: '/a' },
    { input: ['a', 'b'], out: 'a/b' },
    { input: ['a', 'b/', 'c'], out: 'a/b/c' },
    { input: ['a', 'b/', '/c'], out: 'a/b/c' },
    { input: ['/a?foo=bar#123', 'b/', 'c/'], out: '/a/b/c/?foo=bar#123' },
    { input: ['http://foo.com', 'a'], out: 'http://foo.com/a' },
    { input: ['a?x=1', 'b?y=2&y=3&z=4'], out: 'a/b?x=1&y=2&y=3&z=4' }
  ]

  for (const t of tests) {
    test(t.input.toString(), () => {
      expect(joinURL(...t.input)).toBe(t.out)
    })
  }

  test('invalid URL (null)', () => {
    expect(() => joinURL(null)).toThrow('URL input should be string recived object (null)')
  })

  test('invalid URL (array)', () => {
    expect(() => joinURL([])).toThrow('URL input should be string recived object ()')
  })

  test('no arguments', () => {
    expect(joinURL()).toBe('')
  })
})
