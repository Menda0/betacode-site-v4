import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { notFound } from 'next/navigation'
import { IconArrowLeft } from '@tabler/icons-react'
import { blogPosts, getBlogPost, getNextBlogPost, getOtherBlogPosts } from '@/lib/blog-content'
import { BlogContent } from '@/app/components/blog/blog-content'
import { BlogBackground } from '@/app/components/blog/blog-background'
import { BlogAuthor } from '@/app/components/blog/blog-author'
import { BlogArticleSidebar } from '@/app/components/blog/blog-article-sidebar'
import { BlogArticleNext } from '@/app/components/blog/blog-article-next'
import { BlogMoreInsights } from '@/app/components/blog/blog-more-insights'
import { CTA } from '@/app/components/cta'
import { VenturesPromo } from '@/app/components/ventures-promo'
import { Footer } from '@/app/components/footer'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    const t = await getTranslations({ locale, namespace: 'metadata.blogPostNotFound' })
    return { title: t('title'), description: t('description') }
  }

  return {
    title: `${post.title} — Betacode Insights`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: '/images/betacode-facebook.png',
      url: `/${locale}/insights/${post.slug}`,
    },
  }
}

export default async function InsightPostPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'blog' })
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const nextPost = getNextBlogPost(slug)
  const otherPosts = getOtherBlogPosts(slug)

  return (
    <>
      <BlogBackground variant="article" sidebar={<BlogArticleSidebar />}>
        <article>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <IconArrowLeft className="size-4" aria-hidden="true" />
            {t('backToInsights')}
          </Link>

          <header className="mt-8">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
              <span className="rounded-full bg-secondary-100 px-3 py-1 text-xs font-medium text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-300">
                {post.category}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {t('minRead', { minutes: post.readingTimeMinutes })}
              </span>
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
              {post.title}
            </h1>
            <p className="mt-6 text-xl/8 text-gray-600 dark:text-gray-400">{post.excerpt}</p>
            <div className="mt-8 border-t border-gray-200 pt-8 dark:border-white/10">
              <BlogAuthor author={post.author} />
            </div>
          </header>

          <div className="mt-12">
            <BlogContent blocks={post.content} />
          </div>

          {nextPost && <BlogArticleNext post={nextPost} />}
        </article>
      </BlogBackground>
      <BlogMoreInsights posts={otherPosts} />
      <VenturesPromo />
      <CTA />
      <Footer />
    </>
  )
}
