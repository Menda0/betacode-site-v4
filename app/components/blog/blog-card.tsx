import Link from 'next/link'
import type { BlogPost } from '@/lib/blog-content'
import { formatBlogDate } from '@/lib/blog-content'

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-gray-900/50">
      <div className="flex items-center gap-x-3 text-xs font-medium">
        <span className="rounded-full bg-primary-50 px-3 py-1 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
          {post.category}
        </span>
        <time dateTime={post.publishedAt} className="text-gray-500 dark:text-gray-400">
          {formatBlogDate(post.publishedAt)}
        </time>
      </div>
      <h2 className="mt-4 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
        <Link href={`/blog/${post.slug}`} className="hover:text-primary-600 dark:hover:text-primary-400">
          <span className="absolute inset-0" />
          {post.title}
        </Link>
      </h2>
      <p className="mt-3 flex-1 text-base/7 text-gray-600 dark:text-gray-400">{post.excerpt}</p>
      <div className="mt-6 flex items-center gap-x-3 text-sm text-gray-500 dark:text-gray-400">
        <span>{post.author.name}</span>
        <span aria-hidden="true">&middot;</span>
        <span>{post.readingTimeMinutes} min read</span>
      </div>
    </article>
  )
}
