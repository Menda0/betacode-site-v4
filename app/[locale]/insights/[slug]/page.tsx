import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { createPageMetadata } from '@/lib/metadata'
import { Link } from '@/i18n/navigation'
import { notFound } from 'next/navigation'
import { IconArrowLeft } from '@tabler/icons-react'
import { blogPostsEn } from '@/lib/blog-posts/en'
import {
  getBlogPost,
  getNextBlogPost,
  getOtherBlogPosts,
  resolveBlogLocale,
} from '@/lib/blog-content'
import { routing } from '@/i18n/routing'
import { JsonLd } from '@/app/components/json-ld'
import { createBlogPostSchema } from '@/lib/structured-data'
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
  return routing.locales.flatMap((locale) =>
    blogPostsEn.map((post) => ({ locale, slug: post.slug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const post = getBlogPost(slug, locale)

  if (!post) {
    const t = await getTranslations({ locale, namespace: 'metadata.blogPostNotFound' })
    return createPageMetadata({
      locale,
      path: `/insights/${slug}`,
      title: t('title'),
      description: t('description'),
    })
  }

  return createPageMetadata({
    locale,
    path: `/insights/${post.slug}`,
    title: `${post.title} — Betacode Insights`,
    description: post.excerpt,
    ogType: 'article',
    publishedTime: post.publishedAt,
    authors: [post.author.name],
    section: post.category,
    ...(post.ogImage ? { image: post.ogImage } : {}),
  })
}

export default async function InsightPostPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'blog' })
  const post = getBlogPost(slug, locale)

  if (!post) {
    notFound()
  }

  const nextPost = getNextBlogPost(slug, locale)
  const otherPosts = getOtherBlogPosts(slug, locale)
  const resolvedLocale = resolveBlogLocale(locale)
  const formattedDate = new Intl.DateTimeFormat(resolvedLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(post.publishedAt))

  return (
    <>
      <JsonLd data={createBlogPostSchema(resolvedLocale, post)} />
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
              <time
                dateTime={post.publishedAt}
                className="text-gray-500 dark:text-gray-400"
              >
                {formattedDate}
              </time>
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
