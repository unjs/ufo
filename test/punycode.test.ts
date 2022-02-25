import { describe, expect, test } from 'vitest'
import { toASCII } from '../src/punycode'
import toAsciiTests from './fixture/toascii.json'

const ignoredTests = ['a­b', 'a%C2%ADb']

describe('punycode (toASCII)', () => {
  const tests = toAsciiTests.splice(1)
    .filter(t => t.output && !ignoredTests.includes(t.input))

  for (const t of tests) {
    test(t.input + (t.comment ? ': ' + t.comment : ''), () => {
      expect(toASCII(t.input)).toBe(t.output)
    })
  }
})
