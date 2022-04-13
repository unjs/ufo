import { $URL } from './url'
import { withTrailingSlash } from './utils'

interface TraversePathTreeRuntime {
  /**
   * Whether we need to append a trailing slash to each path node.
   */
  trailingSlash?: boolean
  /**
   * The URL nodes found when traversing
   */
  nodes: string[]
}

/**
 * Steps through a URL removing the last segment each time, giving you a tree of urls leading up to the provided url.
 *
 * For example, the traversal for the URL /blog/article/my-long-article-title will be:
 * - /blog/article/my-long-article-title
 * - /blog/article
 * - /blog
 * - /
 */
export const traversePathTree = (url: string, runtime: TraversePathTreeRuntime = { nodes: [] }) => {
  const node = new $URL(url)
  // boot the trailing slash runtime so we can handle them properly
  if (typeof runtime.trailingSlash === 'undefined') { runtime.trailingSlash = node.pathname.endsWith('/') }
  // when we hit the root the path will be an empty string; we swap it out for a slash
  runtime.nodes.push(url || '/')
  const currentPathName = node.pathname
  // note: $URL will strip the leading slash
  const childNode = new $URL(url)
  childNode.pathname = currentPathName.substring(0, currentPathName.lastIndexOf('/'))
  // need to do another step on the slash if we're dealing with a trailing slash
  if (runtime.trailingSlash) {
    childNode.pathname = childNode.pathname.substring(0, childNode.pathname.lastIndexOf('/'))
    childNode.pathname = withTrailingSlash(childNode.pathname)
  }
  // if we still have a pathname and it's different, traverse
  if (childNode.pathname !== currentPathName) { traversePathTree(childNode.toString(), runtime) }
  return runtime.nodes
}
