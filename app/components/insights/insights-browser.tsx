'use client'

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import { useCopy } from '@/lib/use-copy'
import type { CategoryId } from '@/lib/insights/taxonomy'
import type ptInsights from '@/messages/pt/insights.json'

type InsightsCopy = typeof ptInsights

export type InsightCard = {
  slug: string
  href: string
  cat: CategoryId
  catLabel: string
  cover: string
  mins: string
  title: string
  ex: string
  glyph: string
  code: string
  author: string
  role: string
  av: string
  avPos: string
}

type Props = {
  articles: InsightCard[]
  categories: { id: CategoryId; label: string }[]
}

export function InsightsBrowser({ articles, categories }: Props) {
  const t = useCopy<InsightsCopy>('insights')
  const [cat, setCat] = useState<'all' | CategoryId>('all')
  const [query, setQuery] = useState('')

  const q = query.trim().toLowerCase()
  const list = articles.filter(
    (a) =>
      (cat === 'all' || a.cat === cat) &&
      (!q || (a.title + ' ' + a.ex).toLowerCase().indexOf(q) >= 0)
  )
  const feat = list[0]
  const rest = list.slice(1)
  const cats = [
    { id: 'all' as const, label: t.all, count: articles.length },
    ...categories.map((c) => ({
      ...c,
      count: articles.filter((a) => a.cat === c.id).length,
    })),
  ]

  const clear = () => {
    setCat('all')
    setQuery('')
  }

  return (
    <>
      {/* FILTERS */}
      <section aria-label={t.filterLabel} style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px 28px', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div role="group" aria-label={t.filterLabel} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {cats.map((c) => (
            <button key={c.id} type="button" className="filter" aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
              {c.label} <span className="n">{c.count}</span>
            </button>
          ))}
        </div>
        <label className="search">
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: 'var(--muted)', flex: 'none' }}><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-3.5-3.5"></path></svg>
          <span style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{t.searchLabel}</span>
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.searchPh} />
        </label>
      </section>

      {/* ARTICLES */}
      <section aria-live="polite" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px 96px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {feat && (
          <Link className="card" href={feat.href} style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <div className="cover" style={{ backgroundColor: feat.cover, flex: '1 1 420px', minHeight: '320px' }}>
              <span aria-hidden="true" className="mono" style={{ position: 'absolute', right: '-10px', top: '-40px', fontSize: '260px', lineHeight: '1', fontWeight: '700', color: 'rgba(255,255,255,0.07)' }}>{feat.glyph}</span>
              <span className="cover-code" aria-hidden="true" style={{ fontSize: '18px' }}>{feat.code}</span>
            </div>
            <div style={{ flex: '1 1 420px', minWidth: '0', padding: '36px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span className="chip" style={{ background: '#EB5648', color: '#13143A', fontWeight: '700' }}>{t.featured}</span>
                <span className="chip">{feat.catLabel}</span>
                <span className="mono" style={{ fontSize: '12px', color: 'var(--muted)' }}>{feat.mins}</span>
              </div>
              <h2 className="disp sec-h" style={{ margin: '0', fontSize: '36px', lineHeight: '1.12', fontWeight: '800', letterSpacing: '-0.02em' }}>{feat.title}</h2>
              <p style={{ margin: '0', fontSize: '17px', lineHeight: '1.6', color: 'var(--muted)' }}>{feat.ex}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', paddingTop: '6px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={feat.av} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', objectPosition: feat.avPos, display: 'block' }} />
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}><span style={{ fontSize: '14px', fontWeight: '600' }}>{feat.author}</span><span style={{ fontSize: '12px', color: 'var(--muted)' }}>{feat.role}</span></span>
                </span>
                <span className="go" style={{ fontWeight: '700', fontSize: '15px', transition: 'color .2s' }}>{t.read} →</span>
              </div>
            </div>
          </Link>
        )}

        {/* min(320px, 100%) keeps the 320px track from overflowing at 360px viewports. */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))', gap: '18px' }}>
          {rest.map((a) => (
            <Link key={a.slug} className="card" href={a.href}>
              <div className="cover" style={{ backgroundColor: a.cover, height: '170px' }}>
                <span aria-hidden="true" className="mono" style={{ position: 'absolute', right: '-6px', top: '-30px', fontSize: '160px', lineHeight: '1', fontWeight: '700', color: 'rgba(255,255,255,0.07)' }}>{a.glyph}</span>
                <span className="cover-code" aria-hidden="true">{a.code}</span>
              </div>
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', flex: '1' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="chip">{a.catLabel}</span>
                  <span className="mono" style={{ fontSize: '12px', color: 'var(--muted)' }}>{a.mins}</span>
                </div>
                <h3 className="disp" style={{ margin: '0', fontSize: '21px', lineHeight: '1.22', fontWeight: '800', letterSpacing: '-0.01em' }}>{a.title}</h3>
                <p style={{ margin: '0', fontSize: '14px', lineHeight: '1.55', color: 'var(--muted)', flex: '1' }}>{a.ex}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', borderTop: '1px solid var(--border)', paddingTop: '14px', marginTop: '4px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={a.av} alt="" loading="lazy" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', objectPosition: a.avPos, display: 'block' }} />
                    <span style={{ fontSize: '13px', fontWeight: '600' }}>{a.author}</span>
                  </span>
                  <span className="go" style={{ fontWeight: '700', fontSize: '14px', transition: 'color .2s' }}>{t.read} →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {list.length === 0 && (
          <div style={{ border: '1.5px dashed var(--border2)', borderRadius: '22px', padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px' }}>
            <span className="mono" aria-hidden="true" style={{ fontSize: '28px', color: '#EB5648', fontWeight: '700' }}>{'{ }'}</span>
            <span className="disp" style={{ fontSize: '20px', fontWeight: '800' }}>{t.emptyTitle}</span>
            <span style={{ fontSize: '15px', color: 'var(--muted)' }}>{t.emptyText}</span>
            <button type="button" className="filter" onClick={clear}>{t.clear}</button>
          </div>
        )}
      </section>
    </>
  )
}
