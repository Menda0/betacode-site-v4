import type { ReactElement } from 'react'
import { compileMDX } from 'next-mdx-remote/rsc'
import type { MDXComponents } from 'mdx/types'

export type TocEntry = { id: string; n: string; text: string }

type MdNode = {
  type: string
  depth?: number
  children?: MdNode[]
  data?: { hProperties?: Record<string, string> }
}

const sectionNumber = (index: number) => String(index).padStart(2, '0')

/** Gives every `##` heading `id="s<n>"` and `data-n="0<n>"`, matching `getToc`. */
function remarkNumberedHeadings() {
  return (tree: MdNode) => {
    let count = 0
    const walk = (node: MdNode) => {
      if (node.type === 'heading' && node.depth === 2) {
        count += 1
        node.data = {
          ...node.data,
          hProperties: { id: `s${count}`, 'data-n': sectionNumber(count) },
        }
      }
      node.children?.forEach(walk)
    }
    walk(tree)
  }
}

export function getToc(body: string): TocEntry[] {
  return body
    .split('\n')
    .filter((line) => line.startsWith('## '))
    .map((line, index) => ({
      id: `s${index + 1}`,
      n: sectionNumber(index + 1),
      text: line.slice(3).replace(/\\(.)/g, '$1').trim(),
    }))
}

export async function renderArticleBody(
  body: string,
  components: MDXComponents
): Promise<ReactElement> {
  const { content } = await compileMDX({
    source: body,
    components,
    options: { mdxOptions: { remarkPlugins: [remarkNumberedHeadings] } },
  })
  return content
}
