'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { IconArrowRight } from '@tabler/icons-react'
import type { BlogPost } from '@/lib/blog-content'
import { BlogCard } from '@/app/components/blog/blog-card'

const ROTATE_INTERVAL_MS = 8000
const FEATURED_COUNT = 3

function pickRandomPosts(posts: BlogPost[], count: number, excludeSlugs: string[] = []): BlogPost[] {
  if (posts.length <= count) {
    return [...posts].sort(() => Math.random() - 0.5)
  }

  let pool = posts.filter((post) => !excludeSlugs.includes(post.slug))
  if (pool.length < count) {
    pool = [...posts]
  }

  return [...pool].sort(() => Math.random() - 0.5).slice(0, count)
}

export function InsightsPreview({ posts }: { posts: BlogPost[] }) {
  const [featured, setFeatured] = useState<BlogPost[]>(() =>
    pickRandomPosts(posts, FEATURED_COUNT)
  )
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (posts.length <= FEATURED_COUNT) return

    let fadeTimeout: ReturnType<typeof setTimeout> | undefined

    const interval = setInterval(() => {
      setVisible(false)

      fadeTimeout = setTimeout(() => {
        setFeatured((current) =>
          pickRandomPosts(
            posts,
            FEATURED_COUNT,
            current.map((post) => post.slug)
          )
        )
        setVisible(true)
      }, 300)
    }, ROTATE_INTERVAL_MS)

    return () => {
      clearInterval(interval)
      if (fadeTimeout) clearTimeout(fadeTimeout)
    }
  }, [posts])

  if (posts.length === 0) return null

  return (
    <section className="bg-white py-16 sm:py-24 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-base/7 font-semibold text-secondary-600 uppercase dark:text-secondary-400">
              Insights
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              From the Betacode team
            </h2>
            <p className="mt-4 text-lg/8 text-gray-600 dark:text-gray-400">
              Practical advice on building software, launching startups, and modernizing products.
            </p>
          </div>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
          >
            View all insights
            <IconArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div
          className={`mt-12 grid grid-cols-1 gap-8 transition-opacity duration-300 lg:grid-cols-3 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {featured.map((post) => (
            <div key={post.slug} className="relative">
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
