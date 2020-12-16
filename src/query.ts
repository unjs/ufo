import { decode, encodeQueryKey, encodeQueryValue } from './encoding'

export type QueryValue = string | string[] | undefined
export type QueryObject = Record<string, QueryValue>

export function parseQuery (paramsStr: string = ''): QueryObject {
  const obj: QueryObject = {}
  if (paramsStr[0] === '?') {
    paramsStr = paramsStr.substr(1)
  }
  for (const param of paramsStr.split('&')) {
    const s = param.split('=')
    if (!s[0]) { continue }
    const key = decode(s[0])
    const value = decode(s[1])
    if (obj[key]) {
      if (Array.isArray(obj[key])) {
        (obj[key] as string[]).push(value)
      } else {
        obj[key] = [obj[key] as string, value]
      }
    } else {
      obj[key] = value
    }
  }
  return obj
}

export function encodeQueryItem (key: string, val: QueryValue): string {
  if (!val) {
    return encodeQueryKey(key)
  }

  if (Array.isArray(val)) {
    return val.map(_val => `${encodeQueryKey(key)}=${encodeQueryValue(_val)}`).join('&')
  }

  return `${encodeQueryKey(key)}=${encodeQueryValue(val)}`
}

export function stringifyQuery (query: QueryObject) {
  return Object.keys(query).map(k => encodeQueryItem(k, query[k])).join('&')
}
