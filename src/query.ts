import {
  decode,
  decodeQueryValue,
  encodeQueryKey,
  encodeQueryValue
} from "./encoding";

export type QueryValue = string | undefined | null
export type QueryObject = Record<string, QueryValue | QueryValue[]>

export function parseQuery (parametersString: string = ""): QueryObject {
  const object: QueryObject = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = (parameter.match(/([^=]+)=?(.*)/) || []);
    if (s.length < 2) { continue; }
    const key = decode(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key]) {
      if (Array.isArray(object[key])) {
        (object[key] as string[]).push(value);
      } else {
        object[key] = [object[key] as string, value];
      }
    } else {
      object[key] = value;
    }
  }
  return object;
}

export function encodeQueryItem (key: string, value: QueryValue | QueryValue[]): string {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }

  if (Array.isArray(value)) {
    return value.map(_value => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }

  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}

export function stringifyQuery (query: QueryObject) {
  return Object.keys(query).filter(k => query[k] !== undefined).map(k => encodeQueryItem(k, query[k])).join("&");
}
