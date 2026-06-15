import type { Metadata } from 'next'
import { getBlogPosts } from '@/lib/blog-content'
import { BlogCard } from '@/app/components/blog/blog-card'
import { CTA } from '@/app/components/cta'
import { VenturesPromo } from '@/app/components/ventures-promo'
import { Footer } from '@/app/components/footer'

export const metadata: Metadata = {
  title: 'Blog — Betacode',
  description:
    'Insights on software development, startups, and building products — from the Betacode team.',
  openGraph: {
    title: 'Blog — Betacode',
    description:
      'Insights on software development, startups, and building products — from the Betacode team.',
    images: '/images/betacode-facebook.png',
    url: '/blog',
  },
}

export default function BlogPage() {
  const posts = getBlogPosts()

  return (
    <>
      <div className="bg-white dark:bg-gray-900">
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-primary-50 to-transparent dark:from-primary-950/30 dark:to-transparent"
          />
          <div className="mx-auto max-w-7xl px-6 pt-16 pb-12 sm:pt-20 lg:px-8 lg:pt-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-base/7 font-semibold text-primary-600 uppercase dark:text-primary-400">
                Blog
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
                Insights from the Betacode team
              </h1>
              <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-400">
                Practical advice on building software, launching startups, and choosing the right
                technology for your business.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <div key={post.slug} className="relative">
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <VenturesPromo />
      <CTA />
      <Footer />
    </>
  )
}
