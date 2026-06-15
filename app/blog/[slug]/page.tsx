import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { IconArrowLeft } from '@tabler/icons-react'
import { blogPosts, formatBlogDate, getBlogPost } from '@/lib/blog-content'
import { BlogContent } from '@/app/components/blog/blog-content'
import { CTA } from '@/app/components/cta'
import { VenturesPromo } from '@/app/components/ventures-promo'
import { Footer } from '@/app/components/footer'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return { title: 'Post not found — Betacode' }
  }

  return {
    title: `${post.title} — Betacode Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: '/images/betacode-facebook.png',
      url: `/blog/${post.slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <article className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-3xl px-6 pt-12 pb-24 lg:px-8 lg:pt-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <IconArrowLeft className="size-4" aria-hidden="true" />
            Back to blog
          </Link>

          <header className="mt-8">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
              <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                {post.category}
              </span>
              <time dateTime={post.publishedAt} className="text-gray-500 dark:text-gray-400">
                {formatBlogDate(post.publishedAt)}
              </time>
              <span className="text-gray-500 dark:text-gray-400">
                {post.readingTimeMinutes} min read
              </span>
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
              {post.title}
            </h1>
            <p className="mt-6 text-xl/8 text-gray-600 dark:text-gray-400">{post.excerpt}</p>
            <div className="mt-8 flex items-center gap-x-4 border-t border-gray-200 pt-8 dark:border-white/10">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{post.author.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{post.author.role}</p>
              </div>
            </div>
          </header>

          <div className="mt-12">
            <BlogContent blocks={post.content} />
          </div>
        </div>
      </article>
      <VenturesPromo />
      <CTA />
      <Footer />
    </>
  )
}
