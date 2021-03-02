import { hasProtocol, isURL } from '../src'

describe('isURL', () => {
  const tests = [
    { input: '//', out: [false, false] },
    { input: '//test.com', out: [true, false] },
    { input: 'https://', out: [false, false] },
    { input: 'https://test.com', out: [true, true] },
    { input: '/test', out: [false, false] },
    { input: 'file:///home/user', out: [true, true] }
  ]

  for (const t of tests) {
    test(t.input.toString(), () => {
      const [withAcceptRelative, withoutAcceptRelative] = t.out
      expect(isURL(t.input, true)).toBe(withAcceptRelative)
      expect(isURL(t.input)).toBe(withoutAcceptRelative)
    })
  }
})

describe('hasProtocol', () => {
  const tests = [
    { input: '//', out: false },
    { input: 'https://', out: false },
    { input: 'https://test.com', out: true },
    { input: '/test', out: false },
    { input: 'file:///home/user', out: true }
  ]

  for (const t of tests) {
    test(t.input.toString(), () => {
      expect(hasProtocol(t.input)).toBe(t.out)
    })
  }
})
