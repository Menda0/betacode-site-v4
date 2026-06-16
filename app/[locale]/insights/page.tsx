import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getBlogPosts } from '@/lib/blog-content'
import { BlogCard } from '@/app/components/blog/blog-card'
import { BlogBackground } from '@/app/components/blog/blog-background'
import { CTA } from '@/app/components/cta'
import { VenturesPromo } from '@/app/components/ventures-promo'
import { Footer } from '@/app/components/footer'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.insights' })

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: '/images/betacode-facebook.png',
      url: `/${locale}/insights`,
    },
  }
}

export default async function InsightsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'insights' })
  const posts = getBlogPosts(locale)

  return (
    <>
      <BlogBackground>
        <div className="relative isolate">
          <div className="mx-auto max-w-7xl px-6 pt-16 pb-12 sm:pt-20 lg:px-8 lg:pt-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-base/7 font-semibold text-secondary-600 uppercase dark:text-secondary-400">
                {t('eyebrow')}
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
                {t('title')}
              </h1>
              <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-400">
                {t('description')}
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
      </BlogBackground>
      <VenturesPromo />
      <CTA />
      <Footer />
    </>
  )
}
