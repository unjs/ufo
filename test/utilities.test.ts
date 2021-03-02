import { hasProtocol, isURL } from '../src'

describe('isURL', () => {
  const tests = [
    { input: '//', out: true },
    { input: 'https://', out: true },
    { input: '/test', out: false },
    { input: 'file:///home/user', out: true }
  ]

  for (const t of tests) {
    test(t.input.toString(), () => {
      expect(isURL(t.input)).toBe(t.out)
    })
  }
})

describe('hasProtocol', () => {
  const tests = [
    { input: '//', out: false },
    { input: 'https://', out: true },
    { input: '/test', out: false },
    { input: 'file:///home/user', out: true }
  ]

  for (const t of tests) {
    test(t.input.toString(), () => {
      expect(hasProtocol(t.input)).toBe(t.out)
    })
  }
})
