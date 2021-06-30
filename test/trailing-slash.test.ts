// @ts-nocheck
import { withTrailingSlash, withoutTrailingSlash } from '../src'

describe('withTrailingSlash, queryParams: false', () => {
  const tests = {
    '': '/',
    bar: 'bar/',
    'bar/': 'bar/',
    'foo?123': 'foo?123/',
    'foo/?123': 'foo/?123/'
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

describe('withTrailingSlash, queryParams: true', () => {
  const tests = {
    '': '/',
    bar: 'bar/',
    'bar/': 'bar/',
    'foo?123': 'foo/?123',
    'foo/?123': 'foo/?123'
  }

  for (const input in tests) {
    test(input, () => {
      expect(withTrailingSlash(input, true)).toBe(tests[input])
    })
  }

  test('falsy value', () => {
    expect(withTrailingSlash()).toBe('/')
  })
})

describe('withoutTrailingSlash, queryParams: false', () => {
  const tests = {
    '': '/',
    '/': '/',
    bar: 'bar',
    'bar/': 'bar',
    'foo?123': 'foo?123',
    'foo/?123': 'foo/?123'
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

describe('withoutTrailingSlash, queryParams: true', () => {
  const tests = {
    '': '/',
    '/': '/',
    bar: 'bar',
    'bar/': 'bar',
    'foo?123': 'foo?123',
    'foo/?123': 'foo?123'
  }

  for (const input in tests) {
    test(input, () => {
      expect(withoutTrailingSlash(input, true)).toBe(tests[input])
    })
  }

  test('falsy value', () => {
    expect(withoutTrailingSlash()).toBe('/')
  })
})
