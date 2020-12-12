// @ts-nocheck
import { getParams, withParams } from '../src'

describe('withParams', () => {
  const tests = [
    { input: '', params: {}, out: '' },
    { input: '/', params: {}, out: '/' },
    { input: '?test', params: {}, out: '?test' },
    { input: '/?test', params: {}, out: '/?test' },
    { input: '/?test', params: { foo: 1 }, out: '/?test&foo=1' },
    { input: '/?foo=1', params: { foo: 2 }, out: '/?foo=2' },
    { input: '/?x=1,2,3', params: { y: '1,2,3' }, out: '/?x=1,2,3&y=1,2,3' }
  ]

  for (const t of tests) {
    test(t.input.toString() + ' with ' + JSON.stringify(t.params), () => {
      expect(withParams(t.input, t.params)).toBe(t.out)
    })
  }
})

describe('getParams', () => {
  const tests = {
    'http://foo.com/foo?test=123&unicode=%E5%A5%BD': { test: '123', unicode: '好' }
  }

  for (const t in tests) {
    test(t, () => {
      expect(getParams(t)).toMatchObject(tests[t])
    })
  }
})
