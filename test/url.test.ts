import { parseURL } from '../src'

describe('parseURL', () => {
  const tests = [
    { input: '//test', out: { auth: '', hash: '', host: 'test', pathname: '', protocol: '', search: '' } },
    { input: 'https://test.com', out: { auth: '', hash: '', host: 'test.com', pathname: '', protocol: 'https:', search: '' } },
    { input: 'http://test.com?foo=bar', out: { auth: '', hash: '', host: 'test.com', pathname: '', protocol: 'http:', search: '?foo=bar' } },
    { input: '/test', out: { hash: '', pathname: '/test', search: '' } },
    { input: 'file:///home/user', out: { auth: '', hash: '', host: '', pathname: '/home/user', protocol: 'file:', search: '' } }
  ]

  for (const t of tests) {
    test(t.input.toString(), () => {
      expect(parseURL(t.input)).toEqual(t.out)
    })
  }
})
