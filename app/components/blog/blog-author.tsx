import Image from 'next/image'
import type { BlogAuthor } from '@/lib/blog-authors'

type BlogAuthorProps = {
  author: BlogAuthor
  size?: 'sm' | 'md'
}

export function BlogAuthor({ author, size = 'md' }: BlogAuthorProps) {
  const avatarSize = size === 'sm' ? 32 : 48

  return (
    <div className="flex items-center gap-x-3">
      <Image
        src={author.avatar}
        alt={author.name}
        width={avatarSize}
        height={avatarSize}
        className={`rounded-full object-cover ${size === 'sm' ? 'size-8' : 'size-12'}`}
      />
      <div>
        <p className={`font-semibold text-gray-900 dark:text-white ${size === 'sm' ? 'text-sm' : ''}`}>
          {author.name}
        </p>
        <p className={`text-gray-600 dark:text-gray-400 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
          {author.role}
        </p>
      </div>
    </div>
  )
}
