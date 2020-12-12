// @ts-nocheck
import { joinURL, joinPath } from '../src'

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
    { input: ['a?p1=1', 'b?p2=2'], out: 'a/b?p1=1&p2=2' }
  ]

  for (const t of tests) {
    test(t.input.toString(), () => {
      expect(joinURL(...t.input)).toBe(t.out)
    })
  }

  test('invalid URL (null)', () => {
    expect(() => joinURL(null)).toThrow('Invalid url: null')
  })

  test('invalid URL (array)', () => {
    expect(() => joinURL([])).toThrow('Invalid url: []')
  })

  test('no arguments', () => {
    expect(joinURL()).toBe('')
  })

  test('joinPath', () => {
    expect(joinPath()).toBe('')
  })
})
