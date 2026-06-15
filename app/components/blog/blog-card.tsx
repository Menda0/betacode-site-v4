import Link from 'next/link'
import type { BlogPost } from '@/lib/blog-content'
import { BlogAuthor } from '@/app/components/blog/blog-author'

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="flex flex-col rounded-2xl border border-secondary-200/80 bg-white/95 p-6 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-gray-900/90">
      <div className="flex items-center gap-x-3 text-xs font-medium">
        <span className="rounded-full bg-secondary-100 px-3 py-1 text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-300">
          {post.category}
        </span>
      </div>
      <h2 className="mt-4 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
        <Link href={`/insights/${post.slug}`} className="hover:text-primary-600 dark:hover:text-primary-400">
          <span className="absolute inset-0" />
          {post.title}
        </Link>
      </h2>
      <p className="mt-3 flex-1 text-base/7 text-gray-600 dark:text-gray-400">{post.excerpt}</p>
      <div className="mt-6 flex items-center justify-between gap-4">
        <BlogAuthor author={post.author} size="sm" />
        <span className="shrink-0 text-sm text-gray-500 dark:text-gray-400">
          {post.readingTimeMinutes} min read
        </span>
      </div>
    </article>
  )
}
