'use client'

import { useState, type CSSProperties } from 'react'
import { Link } from '@/i18n/navigation'
import { SITE_ROUTES } from '@/lib/site-routes'
import type ptHome from '@/messages/pt/home.json'

type HomeCopy = typeof ptHome
type Track = HomeCopy['tracks'][number]

const TRACK_HREF: Record<string, string> = {
  trad: SITE_ROUTES.contact,
  tech: SITE_ROUTES.contact,
  start: SITE_ROUTES.pricing,
  vent: SITE_ROUTES.ventures,
}

const SELECTED_TAB: CSSProperties = { background: '#EB5648', color: '#13143A', borderColor: '#EB5648' }
const AVATAR_SLOTS = [1, 2, 3, 4, 5, 6]

function PersonIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"></path></svg>
  )
}

export function ServicesTabs({ tracks, an, tabsLabel }: { tracks: Track[]; an: HomeCopy['an']; tabsLabel: string }) {
  const [picked, setPicked] = useState('trad')
  const active = tracks.find((x) => x.id === picked) ?? tracks[0]

  return (
    <>
      <div role="tablist" aria-label={tabsLabel} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
        {tracks.map((tr) => (
          <button
            key={tr.id}
            id={`svc-tab-${tr.id}`}
            type="button"
            className="tab"
            role="tab"
            aria-selected={tr.id === active.id}
            aria-controls="svc-panel"
            onClick={() => setPicked(tr.id)}
            style={tr.id === active.id ? SELECTED_TAB : undefined}
          >
            <span className="mono" style={{ fontSize: '12px', opacity: 0.75 }}>{tr.num}</span>
            {tr.label}
          </button>
        ))}
      </div>

      <div id="svc-panel" role="tabpanel" aria-labelledby={`svc-tab-${active.id}`} style={{ background: 'var(--card)', color: 'var(--text)', borderRadius: '24px', overflow: 'hidden', display: 'flex', flexWrap: 'wrap' }}>
        <div className="pad-sm" style={{ flex: '999 1 520px', minWidth: 0, padding: '48px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <span className="mono" style={{ fontSize: '13px', color: 'var(--kicker)' }}>{active.kicker}</span>
          <h3 className="disp" style={{ margin: 0, fontSize: '36px', lineHeight: '1.12', fontWeight: 800, letterSpacing: '-0.02em' }}>{active.title}</h3>
          <p style={{ margin: 0, fontSize: '18px', lineHeight: '1.6', color: 'var(--muted)', maxWidth: '560px' }}>{active.text}</p>
          <ul style={{ listStyle: 'none', margin: '6px 0 0', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
            {active.services.map((s) => (
              <li key={s} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--surface)', borderRadius: '12px', padding: '15px 16px', fontWeight: 600, fontSize: '15px' }}>
                <span className="mono" aria-hidden="true" style={{ color: '#EB5648', fontWeight: 700 }}>{'{'} {'}'}</span>
                {s}
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', marginTop: '6px' }}>
            <Link className="btn-coral" href={TRACK_HREF[active.id] ?? SITE_ROUTES.contact} style={{ fontSize: '15px', padding: '0 22px', minHeight: '50px' }}>
              {active.cta} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="an-panel" aria-hidden="true">
          {active.id === 'trad' && (
            <div className="an-stage">
              <div className="an-paper" style={{ top: '30px' }}></div>
              <div className="an-paper" style={{ top: '110px', animationDelay: '.6s' }}></div>
              <div className="an-paper" style={{ top: '190px', animationDelay: '1.2s' }}></div>
              <div className="an-screen">
                <div className="an-dots"><span></span><span></span><span></span></div>
                <div className="an-row k" style={{ width: '70%' }}></div>
                <div className="an-row" style={{ width: '90%', animationDelay: '.2s' }}></div>
                <div className="an-row" style={{ width: '55%', animationDelay: '.4s' }}></div>
                <div className="an-bars">
                  <i style={{ height: '40%' }}></i><i style={{ height: '65%', animationDelay: '.1s' }}></i><i style={{ height: '50%', animationDelay: '.2s' }}></i><i style={{ height: '85%', animationDelay: '.3s' }}></i><i style={{ height: '100%', animationDelay: '.4s' }}></i>
                </div>
              </div>
              <div style={{ position: 'absolute', left: 0, bottom: 0 }}><span className="an-chip">{an.paper}</span></div>
            </div>
          )}
          {active.id === 'tech' && (
            <div className="an-stage">
              <div className="an-cap" style={{ position: 'absolute', left: 0, top: 0 }}>{an.team}</div>
              <div className="an-team">
                {AVATAR_SLOTS.map((s) => (
                  <div key={s} className="an-av"><PersonIcon /></div>
                ))}
                <div className="an-av new"><PersonIcon /></div>
                <div className="an-av new d2"><PersonIcon /></div>
              </div>
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: '30px', display: 'flex', justifyContent: 'center' }}><span className="an-chip an-pop" style={{ background: '#EB5648' }}>{an.join}</span></div>
            </div>
          )}
          {active.id === 'start' && (
            <div className="an-stage">
              <div style={{ position: 'absolute', left: '10px', right: '10px', top: '30px', height: '110px' }}>
                <div className="an-track"><i></i><span className="an-trav"></span></div>
                <div className="an-node n1"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z"></path></svg></div>
                <div className="an-node n2"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3"></circle><path d="M3 20c0-3.3 2.7-6 6-6M15 16l2 2 4-4"></path></svg></div>
                <div className="an-node n3"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 15l-3-3c2-6 7-9 14-9 0 7-3 12-9 14l-2-2zM15 9h.01"></path></svg></div>
                <div className="an-cap an-lbl" style={{ left: '-13px' }}>{an.idea}</div>
                <div className="an-cap an-lbl" style={{ left: 'calc(50% - 45px)' }}>{an.validate}</div>
                <div className="an-cap an-lbl" style={{ right: '-13px' }}>{an.mvp}</div>
              </div>
              <div className="an-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span className="an-cap" style={{ color: 'var(--text)' }}>{an.build}</span><span className="an-cap an-ok">✓ ok</span></div>
                <div className="an-prog"><i></i></div>
              </div>
            </div>
          )}
          {active.id === 'vent' && (
            <div className="an-stage">
              <div className="an-meet">
                <div className="an-who l">
                  <div className="an-av" style={{ borderColor: 'var(--barc)' }}><PersonIcon /></div>
                  <span className="an-cap">{an.founder}</span>
                </div>
                <div className="an-hs">
                  <span className="ring"></span><span className="ring b"></span>
                  <div className="ico"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3"></path><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"></path><path d="m21 3 1 11h-2"></path><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"></path><path d="M3 4h8"></path></svg></div>
                </div>
                <div className="an-who r">
                  <div className="an-av" style={{ background: 'var(--card)', borderColor: '#EB5648', color: '#EB5648', font: '700 16px/1 var(--font-jetbrains), monospace' }}>{'{'}B{'}'}</div>
                  <span className="an-cap">betacode</span>
                </div>
              </div>
              <div className="an-deal">
                <span className="an-chip" style={{ background: '#EB5648' }}>{an.deal}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
