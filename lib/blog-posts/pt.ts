import type { BlogPost } from '../blog-types'
import { blogPostsPtPart1 } from './pt-posts-1'
import { blogPostsPtPart2 } from './pt-posts-2'
import { blogPostsPtPart3 } from './pt-posts-3'

export const blogPostsPt: BlogPost[] = [
  ...blogPostsPtPart1,
  ...blogPostsPtPart2,
  ...blogPostsPtPart3,
]
