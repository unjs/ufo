import { hasProtocol, isRelative } from '../src'

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
