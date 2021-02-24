// @ts-nocheck
import { $URL, hasProtocol } from '../src'
import urlTests from './fixture/urltestdata.json'

describe('URL', () => {
  const tests = urlTests.splice(1)
    .filter(t => t.input && t.href && hasProtocol(t.input))

  for (const t of tests) {
    test(t.input, () => {
      const url = new $URL(t.input)
      expect(url.href).toBe(t.href)
    })
  }
})
