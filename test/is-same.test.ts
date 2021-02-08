// @ts-nocheck
import { isSamePath } from '../src'

describe('isSamePath', () => {
  const samePaths = [
    ['/foo', '/foo'],
    ['/foo', '/foo/'],
    ['/', ''],
    ['/%D1%82%D0%B5%D1%81%D1%82', '/тест']
  ]

  const notSamePaths = [
    ['/foo', '/bar']
  ]

  for (const [u1, u2] of samePaths) {
    test(u1 + ' == ' + u2, () => {
      expect(isSamePath(u1, u2)).toBe(true)
    })
  }

  for (const [u1, u2] of notSamePaths) {
    test(u1 + ' != ' + u2, () => {
      expect(isSamePath(u1, u2)).toBe(false)
    })
  }
})
