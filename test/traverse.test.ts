import { describe, it, expect } from 'vitest'
import { traversePathTree } from '../src'

describe('traversePathTree', () => {
  it('traversing full path works', () => {
    const link = 'https://example.com/blog/article/my-long-article-title'
    expect(traversePathTree(link)).toMatchInlineSnapshot(`
      [
        "https://example.com/blog/article/my-long-article-title",
        "https://example.com/blog/article",
        "https://example.com/blog",
        "https://example.com",
      ]
    `)
  })
  it('traversing path works', () => {
    const link = '/blog/article/my-long-article-title'
    expect(traversePathTree(link)).toMatchInlineSnapshot(`
      [
        "/blog/article/my-long-article-title",
        "/blog/article",
        "/blog",
        "/",
      ]
    `)
  })
  it('does not traverse when not needed', () => {
    const link = 'https://example.com/'
    const links = traversePathTree(link)
    expect(links.length).toEqual(1)
    expect(links[0]).toEqual('https://example.com/')
  })
  it('traversing path with leading slash works', () => {
    const link = 'https://example.com/blog/article/my-long-article-title/'
    const links = traversePathTree(link)
    expect(links).toMatchInlineSnapshot(`
      [
        "https://example.com/blog/article/my-long-article-title/",
        "https://example.com/blog/article/",
        "https://example.com/blog/",
        "https://example.com/",
      ]
    `)
  })
  it('traverses path with anchor and leading slash', () => {
    const link = 'https://example.com/blog/article/my-long-article-title/#anchor'
    const links = traversePathTree(link)
    expect(links).toMatchInlineSnapshot(`
      [
        "https://example.com/blog/article/my-long-article-title/#anchor",
        "https://example.com/blog/article/#anchor",
        "https://example.com/blog/#anchor",
        "https://example.com/#anchor",
      ]
    `)
  })
})
