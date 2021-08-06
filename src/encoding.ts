// @ts-ignore
import { toASCII } from './punycode'

// Utils used from https://github.com/vuejs/vue-router-next/blob/master/src/encoding.ts (Author @posva)

const HASH_RE = /#/g // %23
const AMPERSAND_RE = /&/g // %26
const SLASH_RE = /\//g // %2F
const EQUAL_RE = /=/g // %3D
const IM_RE = /\?/g // %3F
const PLUS_RE = /\+/g // %2B

const ENC_BRACKET_OPEN_RE = /%5B/g // [
const ENC_BRACKET_CLOSE_RE = /%5D/g // ]
const ENC_CARET_RE = /%5E/g // ^
const ENC_BACKTICK_RE = /%60/g // `
const ENC_CURLY_OPEN_RE = /%7B/g // {
const ENC_PIPE_RE = /%7C/g // |
const ENC_CURLY_CLOSE_RE = /%7D/g // }
const ENC_SPACE_RE = /%20/g
const ENC_SLASH_RE = /%2F/gi
const ENC_ENC_SLASH_RE = /%252F/g

/**
 * Encode characters that need to be encoded on the path, search and hash
 * sections of the URL.
 *
 * @internal
 * @param text - string to encode
 * @returns encoded string
 */
export function encode (text: string | number): string {
  return encodeURI('' + text)
    .replace(ENC_PIPE_RE, '|')
    .replace(ENC_BRACKET_OPEN_RE, '[')
    .replace(ENC_BRACKET_CLOSE_RE, ']')
}

/**
 * Encode characters that need to be encoded on the hash section of the URL.
 *
 * @param text - string to encode
 * @returns encoded string
 */
export function encodeHash (text: string): string {
  return encode(text)
    .replace(ENC_CURLY_OPEN_RE, '{')
    .replace(ENC_CURLY_CLOSE_RE, '}')
    .replace(ENC_CARET_RE, '^')
}

/**
 * Encode characters that need to be encoded query values on the query
 * section of the URL.
 *
 * @param text - string to encode
 * @returns encoded string
 */
export function encodeQueryValue (text: string | number): string {
  return (
    encode(text)
      // Encode the space as +, encode the + to differentiate it from the space
      .replace(PLUS_RE, '%2B')
      .replace(ENC_SPACE_RE, '+')
      .replace(HASH_RE, '%23')
      .replace(AMPERSAND_RE, '%26')
      .replace(ENC_BACKTICK_RE, '`')
      .replace(ENC_CURLY_OPEN_RE, '{')
      .replace(ENC_CURLY_CLOSE_RE, '}')
      .replace(ENC_CARET_RE, '^')
  )
}

/**
 * Like `encodeQueryValue` but also encodes the `=` character.
 *
 * @param text - string to encode
 */
export function encodeQueryKey (text: string | number): string {
  return encodeQueryValue(text).replace(EQUAL_RE, '%3D')
}

/**
 * Encode characters that need to be encoded on the path section of the URL.
 *
 * @param text - string to encode
 * @returns encoded string
 */
export function encodePath (text: string | number): string {
  return encode(text)
           .replace(HASH_RE, '%23')
           .replace(IM_RE, '%3F')
           .replace(ENC_ENC_SLASH_RE, '%2F')
           .replace(AMPERSAND_RE, '%26')
}

/**
 * Encode characters that need to be encoded on the path section of the URL as a
 * param. This function encodes everything {@link encodePath} does plus the
 * slash (`/`) character.
 *
 * @param text - string to encode
 * @returns encoded string
 */
export function encodeParam (text: string | number): string {
  return encodePath(text).replace(SLASH_RE, '%2F')
}

/**
 * Decode text using `decodeURIComponent`. Returns the original text if it
 * fails.
 *
 * @param text - string to decode
 * @returns decoded string
 */
export function decode (text: string | number = ''): string {
  try {
    return decodeURIComponent('' + text)
  } catch (_err) {
    return '' + text
  }
}

/**
 * Decode path section of URL (consitant with encodePath for slash encoding).
 *
 * @param text - string to decode
 * @returns decoded string
 */
export function decodePath (text: string): string {
  return decode(text.replace(ENC_SLASH_RE, '%252F'))
}

/**
 * Decode query value (consitant with encodeQueryValue for plus encoding).
 *
 * @param text - string to decode
 * @returns decoded string
 */
export function decodeQueryValue (text: string): string {
  return decode(text.replace(PLUS_RE, ' '))
}

export function encodeHost (name: string = '') {
  return toASCII(name)
}
