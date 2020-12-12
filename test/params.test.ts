// @ts-nocheck
import { getParams, withParams } from '../src'

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

describe('getParams', () => {
  const tests = {
    'http://foo.com/foo?test=123&unicode=%E5%A5%BD': { 123: 'test', 好: 'unicode' }
  }

  for (const t in tests) {
    test(t, () => {
      expect(getParams(t)).toMatchObject(tests[t])
    })
  }
})
