'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { IconArrowRight } from '@tabler/icons-react'
import type { BlogPost } from '@/lib/blog-content'

export function BlogArticleNext({ post }: { post: BlogPost }) {
  const t = useTranslations('blog')

  return (
    <div className="mt-12 border-t border-gray-200 pt-8 dark:border-white/10">
      <p className="text-sm font-semibold text-secondary-600 uppercase dark:text-secondary-400">
        {t('readNext')}
      </p>
      <Link
        href={`/insights/${post.slug}`}
        className="mt-4 block rounded-xl border border-secondary-200/80 bg-secondary-50/50 p-5 transition-colors hover:border-secondary-300 hover:bg-secondary-50 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <span className="rounded-full bg-secondary-100 px-3 py-1 text-xs font-medium text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-300">
              {post.category}
            </span>
            <h2 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white">{post.title}</h2>
            <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{post.excerpt}</p>
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              {t('minRead', { minutes: post.readingTimeMinutes })}
            </p>
          </div>
          <IconArrowRight
            className="mt-1 size-5 shrink-0 text-primary-600 dark:text-primary-400"
            aria-hidden="true"
          />
        </div>
      </Link>
    </div>
  )
}
