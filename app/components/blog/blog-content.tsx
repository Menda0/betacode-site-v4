import type { ContentBlock } from '@/lib/blog-content'

export function BlogContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="prose prose-gray max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary-600 dark:prose-a:text-primary-400">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={index} className="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">
                {block.content}
              </p>
            )
          case 'heading': {
            const Tag = block.level === 3 ? 'h3' : 'h2'
            return (
              <Tag
                key={index}
                className={
                  block.level === 3
                    ? 'mt-10 text-xl font-semibold text-gray-900 dark:text-white'
                    : 'mt-12 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'
                }
              >
                {block.content}
              </Tag>
            )
          }
          case 'list': {
            const ListTag = block.ordered ? 'ol' : 'ul'
            return (
              <ListTag
                key={index}
                className={`mt-6 space-y-3 text-lg/8 text-gray-600 dark:text-gray-300 ${
                  block.ordered ? 'list-decimal pl-6' : 'list-disc pl-6'
                }`}
              >
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ListTag>
            )
          }
        }
      })}
    </div>
  )
}
