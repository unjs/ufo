export function encodeSearchParam (key: string, val: string | string[]) {
  if (!val) {
    return key
  }

  if (Array.isArray(val)) {
    return val.map(_val => `${key}=${_val}`).join('&')
  }

  return `${key}=${val}`
}
