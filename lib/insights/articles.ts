import fs from 'node:fs'
import path from 'node:path'
import { cache } from 'react'
import matter from 'gray-matter'
import type { Locale } from '@/i18n/routing'
import type { AuthorId, CategoryId } from './taxonomy'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'insights')

export type ArticleMeta = {
  slug: string
  title: string
  lead: string
  /** Shorter summary used on listing cards; falls back to the lead. */
  excerpt: string
  category: CategoryId
  author: AuthorId
  /** ISO date, YYYY-MM-DD. */
  date: string
  readingTime: number
  takeaways: string[]
  glyph: string
  coverCode: string
  related: string[]
}

export type Article = ArticleMeta & { body: string }

function toIsoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value)
}

function readArticle(file: string): Article {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8')
  const { data, content } = matter(raw)
  return {
    slug: String(data.slug),
    title: String(data.title),
    lead: String(data.lead),
    excerpt: String(data.excerpt ?? data.lead),
    category: data.category as CategoryId,
    author: data.author as AuthorId,
    date: toIsoDate(data.date),
    readingTime: Number(data.readingTime),
    takeaways: (data.takeaways ?? []) as string[],
    glyph: String(data.glyph),
    coverCode: String(data.coverCode),
    related: (data.related ?? []) as string[],
    body: content,
  }
}

const loadAll = cache((locale: Locale): Article[] => {
  const suffix = `.${locale}.mdx`
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(suffix))
    .map(readArticle)
    .sort((a, b) => b.date.localeCompare(a.date))
})

function stripBody(article: Article): ArticleMeta {
  const meta: Partial<Article> = { ...article }
  delete meta.body
  return meta as ArticleMeta
}

/** All articles for a locale, newest first. */
export function getArticles(locale: Locale): ArticleMeta[] {
  return loadAll(locale).map(stripBody)
}

export function getArticle(slug: string, locale: Locale): Article | undefined {
  return loadAll(locale).find((article) => article.slug === slug)
}

export function getRelatedArticles(article: ArticleMeta, locale: Locale): ArticleMeta[] {
  const all = getArticles(locale)
  return article.related
    .map((slug) => all.find((entry) => entry.slug === slug))
    .filter((entry): entry is ArticleMeta => Boolean(entry))
}

export function getArticleSlugs(): string[] {
  return getArticles('pt').map((article) => article.slug)
}

const PT_MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

/** "28 out 2026" in PT and "Oct 28, 2026" in EN, as in the prototype. */
export function formatArticleDate(date: string, locale: Locale) {
  const d = new Date(`${date}T00:00:00Z`)
  if (locale === 'pt') {
    return `${d.getUTCDate()} ${PT_MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`
  }
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(d)
}
