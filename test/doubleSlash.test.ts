// @ts-nocheck
import { cleanDoubleSlash } from '../src'

describe('cleanDoubleSlash', () => {
  const tests = {
    '//foo//bar//': '/foo/bar/',
    'http://foo.com//': 'http://foo.com/',
    'http://foo.com/bar//foo/': 'http://foo.com/bar/foo/',
    'http://example.com/analyze//http://localhost:3000//': 'http://example.com/analyze/http://localhost:3000/'
  }

  for (const input in tests) {
    test(input, () => {
      expect(cleanDoubleSlash(input)).toBe(tests[input])
    })
  }
})
