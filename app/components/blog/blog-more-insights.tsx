'use client'

import Link from 'next/link'
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

export function BlogMoreInsights({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null

  return (
    <section className="overflow-x-hidden border-t border-secondary-200/80 bg-secondary-50/60 py-12 dark:border-white/10 dark:bg-[#0c1222] sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-secondary-600 uppercase dark:text-secondary-400">
              Keep reading
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
              More insights from the team
            </h2>
          </div>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
          >
            View all insights
            <IconArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 overflow-hidden">
          <Carousel
            className="w-full max-w-full"
            opts={{ align: 'start', loop: posts.length > 1 }}
            plugins={
              posts.length > 1
                ? [
                    Autoplay({
                      delay: 4000,
                    }),
                  ]
                : undefined
            }
          >
            <div className="flex items-center gap-2 sm:gap-3">
              {posts.length > 1 && (
                <CarouselPrevious
                  className="static top-auto left-auto shrink-0 translate-x-0 translate-y-0 border-gray-200 bg-white dark:border-white/10 dark:bg-gray-800"
                />
              )}
              <div className="min-w-0 flex-1 overflow-hidden">
                <CarouselContent className="-ml-4">
                  {posts.map((post) => (
                    <CarouselItem
                      key={post.slug}
                      className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                    >
                      <BlogCard post={post} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </div>
              {posts.length > 1 && (
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
