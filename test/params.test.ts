// @ts-nocheck
import { withParams } from '../src'

describe('withParams', () => {
  const tests = [
    { input: '', params: {}, out: '' },
    { input: '/', params: {}, out: '/' },
    { input: '?test', params: {}, out: '?test' },
    { input: '/?test', params: {}, out: '/?test' },
    { input: '/?test', params: { foo: 1 }, out: '/?test=&foo=1' },
    { input: '/?foo=1', params: { foo: 2 }, out: '/?foo=2' }
  ]

  for (const t of tests) {
    test(t.input.toString() + ' with ' + JSON.stringify(t.params), () => {
      expect(withParams(t.input, t.params)).toBe(t.out)
    })
  }
})
