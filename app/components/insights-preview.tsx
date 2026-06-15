'use client'

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Autoplay from 'embla-carousel-autoplay'
import { IconArrowRight } from '@tabler/icons-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { BlogPost } from '@/lib/blog-content'
import { BlogCard } from '@/app/components/blog/blog-card'

function shufflePosts(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(() => Math.random() - 0.5)
}

export function InsightsPreview({ posts }: { posts: BlogPost[] }) {
  const t = useTranslations('insights')
  const tCommon = useTranslations('common')
  const shuffledPosts = useMemo(() => shufflePosts(posts), [posts])

  if (posts.length === 0) return null

  return (
    <section className="overflow-x-hidden bg-white py-16 sm:py-24 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-base/7 font-semibold text-secondary-600 uppercase dark:text-secondary-400">
              {t('eyebrow')}
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              {t('title')}
            </h2>
            <p className="mt-4 text-lg/8 text-gray-600 dark:text-gray-400">
              {t('description')}
            </p>
          </div>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
          >
            {tCommon('viewAllInsights')}
            <IconArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-12 overflow-hidden">
          <Carousel
            className="w-full max-w-full"
            opts={{ align: 'start', loop: true }}
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              {shuffledPosts.length > 1 && (
                <CarouselPrevious
                  className="static top-auto left-auto shrink-0 translate-x-0 translate-y-0 border-gray-200 bg-white dark:border-white/10 dark:bg-gray-800"
                />
              )}
              <div className="min-w-0 flex-1 overflow-hidden">
                <CarouselContent className="-ml-4">
                  {shuffledPosts.map((post) => (
                    <CarouselItem
                      key={post.slug}
                      className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                    >
                      <BlogCard post={post} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </div>
              {shuffledPosts.length > 1 && (
                <CarouselNext
                  className="static top-auto right-auto shrink-0 translate-x-0 translate-y-0 border-gray-200 bg-white dark:border-white/10 dark:bg-gray-800"
                />
              )}
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
