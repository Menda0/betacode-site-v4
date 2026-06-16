import type { BlogAuthor } from './blog-authors'

export type ContentBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'heading'; content: string; level?: 2 | 3 }
  | { type: 'list'; items: string[]; ordered?: boolean }

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  author: BlogAuthor
  category: string
  readingTimeMinutes: number
  content: ContentBlock[]
}
