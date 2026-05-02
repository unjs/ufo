import { QueryObject, QueryValue } from "./types";

/**
 * Returns the URL with the given query parameters. If a query parameter is undefined, it is omitted.
 */
export function withQuery(input: string, query?: QueryObject): string {
  if (!query || Object.keys(query).length === 0) {
    return input;
  }

  const searchIndex = input.indexOf("?");

  if (searchIndex === -1) {
    const normalizedQuery = Object.entries(query)
      .filter(([, value]) => value !== undefined)
      .flatMap(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map((item) => [key, normalizeQueryValue(item)]);
        }

        return [[key, normalizeQueryValue(value)]];
      });
    const searchParams = new URLSearchParams(normalizedQuery);
    const queryString = searchParams.toString();
    return queryString ? `${input}?${queryString}` : input;
  }

  const searchParams = new URLSearchParams(input.slice(searchIndex + 1));
  const base = input.slice(0, searchIndex);

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined) {
      searchParams.delete(key);
    } else if (Array.isArray(value)) {
      for (const item of value) {
        searchParams.append(key, normalizeQueryValue(item));
      }
    } else {
      searchParams.set(key, normalizeQueryValue(value));
    }
  }

  const queryString = searchParams.toString();
  return queryString ? `${base}?${queryString}` : base;
}

function normalizeQueryValue(value: QueryValue): string {
  if (value === null) {
    return "";
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
}
