// @ts-nocheck
import { withTrailingSlash, withoutTrailingSlash } from '../src'

describe('withTrailingSlash', () => {
  const tests = {
    '': '/',
    bar: 'bar/',
    'bar/': 'bar/'
  }

  for (const input in tests) {
    test(input, () => {
      expect(withTrailingSlash(input)).toBe(tests[input])
    })
  }

  test('falsy value', () => {
    expect(withTrailingSlash()).toBe('/')
  })
})

describe('withoutTrailingSlash', () => {
  const tests = {
    '': '/',
    '/': '/',
    bar: 'bar',
    'bar/': 'bar'
  }

  for (const input in tests) {
    test(input, () => {
      expect(withoutTrailingSlash(input)).toBe(tests[input])
    })
  }

  test('falsy value', () => {
    expect(withoutTrailingSlash()).toBe('/')
  })
})
