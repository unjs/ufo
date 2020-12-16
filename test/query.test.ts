// @ts-nocheck
import { getQuery, withQuery } from '../src'

describe('withQuery', () => {
  const tests = [
    { input: '', query: {}, out: '' },
    { input: '/', query: {}, out: '/' },
    { input: '?test', query: {}, out: '?test' },
    { input: '/?test', query: {}, out: '/?test' },
    { input: '/?test', query: { foo: 1 }, out: '/?test&foo=1' },
    { input: '/?foo=1', query: { foo: 2 }, out: '/?foo=2' },
    { input: '/?x=1,2,3', query: { y: '1,2,3' }, out: '/?x=1,2,3&y=1,2,3' }
  ]

  for (const t of tests) {
    test(t.input.toString() + ' with ' + JSON.stringify(t.query), () => {
      expect(withQuery(t.input, t.query)).toBe(t.out)
    })
  }
})

describe('getQuery', () => {
  const tests = {
    'http://foo.com/foo?test=123&unicode=%E5%A5%BD': { test: '123', unicode: '好' }
  }

  for (const t in tests) {
    test(t, () => {
      expect(getQuery(t)).toMatchObject(tests[t])
    })
  }
})
