import type { Locale } from '@/i18n/routing'
import type { BlogPost, ContentBlock } from './blog-types'
import { blogPostsEn } from './blog-posts/en'
import { blogPostsPt } from './blog-posts/pt'

export type { BlogPost, ContentBlock } from './blog-types'

const blogPostsByLocale: Record<Locale, BlogPost[]> = {
  en: blogPostsEn,
  pt: blogPostsPt,
}

export function resolveBlogLocale(locale: string): Locale {
  return locale === 'pt' ? 'pt' : 'en'
}

export function getBlogPosts(locale: string = 'en'): BlogPost[] {
  const resolved = resolveBlogLocale(locale)
  return [...blogPostsByLocale[resolved]].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export function getBlogPost(slug: string, locale: string = 'en'): BlogPost | undefined {
  const resolved = resolveBlogLocale(locale)
  return blogPostsByLocale[resolved].find((post) => post.slug === slug)
}

export function getNextBlogPost(slug: string, locale: string = 'en'): BlogPost | undefined {
  const posts = getBlogPosts(locale)
  if (posts.length <= 1) return undefined

  const index = posts.findIndex((post) => post.slug === slug)
  if (index === -1) return undefined

  return posts[(index + 1) % posts.length]
}

export function getOtherBlogPosts(slug: string, locale: string = 'en'): BlogPost[] {
  return getBlogPosts(locale).filter((post) => post.slug !== slug)
}

/** @deprecated Use getBlogPosts(locale) */
export const blogPosts = blogPostsEn
