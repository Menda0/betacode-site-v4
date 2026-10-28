import type { Locale } from '@/i18n/routing'

export type CategoryId = 'eng' | 'biz' | 'start' | 'ven'
export type AuthorId = 'marco' | 'pedro'

export const CATEGORY_IDS: CategoryId[] = ['eng', 'biz', 'start', 'ven']

export const CATEGORIES: Record<CategoryId, { label: Record<Locale, string>; cover: string }> = {
  eng: { label: { pt: 'Engenharia', en: 'Engineering' }, cover: '#1B1C51' },
  biz: { label: { pt: 'Negócio', en: 'Business' }, cover: '#D8402F' },
  start: { label: { pt: 'Startups', en: 'Startups' }, cover: '#2A2C6E' },
  ven: { label: { pt: 'Ventures', en: 'Ventures' }, cover: '#13143A' },
}

export type Author = {
  id: AuthorId
  name: string
  role: string
  avatar: string
  /** Tuned `object-position` for the round avatar crop. */
  position: string
  bio: Record<Locale, string>
}

export const AUTHORS: Record<AuthorId, Author> = {
  marco: {
    id: 'marco',
    name: 'Marco Mendão',
    role: 'Co-Founder & CTO',
    avatar: '/assets/avatars/marco-mendao.jpg',
    position: 'center',
    bio: {
      pt: 'Co-fundador e CTO da Betacode. Escreve sobre arquitetura, engenharia de produto e como usar a tecnologia certa para entregar mais depressa.',
      en: 'Co-founder and CTO at Betacode. Writes about architecture, product engineering and using the right technology to ship faster.',
    },
  },
  pedro: {
    id: 'pedro',
    name: 'Pedro Gorrão',
    role: 'Co-Founder & CEO',
    avatar: '/assets/avatars/pedro-gorrao.jpg',
    position: '60% 20%',
    bio: {
      pt: 'Co-fundador e CEO da Betacode. Escreve sobre lean startup, construção de produto e o que aprendemos a lançar empresas com os nossos parceiros.',
      en: 'Co-founder and CEO at Betacode. Writes about lean startup, building products and what we learn launching companies with our partners.',
    },
  },
}

/** Articles in these categories end with the Ventures CTA; the rest with the contact CTA. */
export function usesVenturesCta(category: CategoryId) {
  return category === 'ven' || category === 'start'
}
