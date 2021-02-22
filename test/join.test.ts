// @ts-nocheck
import { joinURL } from '../src'

describe('joinURL', () => {
  const tests = [
    { input: [], out: '' },
    { input: ['/'], out: '/' },
    { input: [null, './'], out: '/./' },
    { input: ['/', './'], out: '/./' },
    { input: ['/a'], out: '/a' },
    { input: ['a', 'b'], out: 'a/b' },
    { input: ['/', '/b'], out: '/b' },
    { input: ['a', 'b/', 'c'], out: 'a/b/c' },
    { input: ['a', 'b/', '/c'], out: 'a/b/c' }
  ]

  for (const t of tests) {
    test(t.input.toString(), () => {
      expect(joinURL(...t.input)).toBe(t.out)
    })
  }

  test('no arguments', () => {
    expect(joinURL()).toBe('')
  })
})
