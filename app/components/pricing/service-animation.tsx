import type { ServiceId } from '@/lib/pricing/rules'
import type { PricingCopy, TeamConfig } from '@/lib/pricing/services'

function Person({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"></path></svg>
  )
}

type Props = { id: ServiceId; cfg: TeamConfig; an: PricingCopy['anim'] }

/** Decorative per-service animation shown at the top of the estimate card. */
export function ServiceAnimation({ id, cfg, an }: Props) {
  return (
    <div className="pr-panel" aria-hidden="true">
      {id === 'V' && (
        <div className="pr-stage" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--pr-meet-gap, 22px)", maxWidth: "100%" }}>
            <div className="pr-l" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}><div className="pr-av"><Person size={22} /></div><span className="pr-cap">{an.founder}</span></div>
            <div style={{ position: "relative", width: "var(--pr-seal, 64px)", height: "var(--pr-seal, 64px)", flex: "none" }}><span className="pr-ring"></span><span className="pr-ring" style={{ animationDelay: ".18s" }}></span><div className="pr-hs"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3"></path><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"></path><path d="m21 3 1 11h-2"></path><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"></path><path d="M3 4h8"></path></svg></div></div>
            <div className="pr-r" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}><div className="pr-av" style={{ borderColor: "#EB5648", color: "#EB5648", font: "700 14px/1 var(--font-jetbrains), monospace" }}>{'{'}B{'}'}</div><span className="pr-cap">betacode</span></div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px", maxWidth: "100%" }}><span className="pr-chip pr-pop" style={{ background: "#EB5648" }}>{an.deal}</span></div>
        </div>
      )}
      {id === 'E' && (
        <div className="pr-stage" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "18px" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "var(--pr-role-gap, 14px)", maxWidth: "100%" }}>
            {(cfg === 'base' ? [an.junior, an.midSenior, 'PO'] : [an.junior, 'PO']).map((role, i) => (
              <div key={role} className="pr-bob" style={{ animationDelay: `${i * 0.4}s`, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}><div className="pr-av c"><Person size={22} /></div><span className="pr-cap">{role}</span></div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ position: "relative" }}>
              <div className="pr-bar"><i></i></div>
              <div style={{ position: "absolute", inset: "-6px 0 0", display: "flex", justifyContent: "space-between", padding: "0 22%", pointerEvents: "none" }}><span className="pr-ms m1">✓</span><span className="pr-ms m2">✓</span><span className="pr-ms m3">✓</span></div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span className="pr-cap">{an.plan}</span><span className="pr-cap">{an.build}</span><span className="pr-cap">{an.launch}</span></div>
          </div>
        </div>
      )}
      {id === 'R' && (
        <div className="pr-stage" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px" }}>
          <span className="pr-cap">{an.yourTeam}</span>
          <div style={{ display: "flex", justifyContent: "center", gap: "var(--pr-squad-gap, 10px)", maxWidth: "100%" }}>
            <div className="pr-av"><Person size={20} /></div>
            <div className="pr-av"><Person size={20} /></div>
            <div className="pr-av"><Person size={20} /></div>
            <div className="pr-av c pr-join"><Person size={20} /></div>
            <div className="pr-av c pr-join d2"><Person size={20} /></div>
          </div>
          <span className="pr-chip pr-pop5" style={{ background: "#EB5648" }}>{an.join}</span>
        </div>
      )}
      {id === 'F' && (
        <div className="pr-stage" style={{ display: "flex", alignItems: "center", gap: "var(--pr-train-gap, 24px)" }}>
          <div className="pr-capico" style={{ flex: "none", width: "var(--pr-ico, 72px)", height: "var(--pr-ico, 72px)", borderRadius: "18px", background: "#EB5648", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9l10-5 10 5-10 5L2 9z"></path><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v6"></path></svg></div>
          <div style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { l: an.languages, c: undefined, d: undefined },
              { l: an.frameworks, c: 'c', d: '.25s' },
              { l: an.bestPractice, c: undefined, d: '.5s' },
            ].map((k) => (
              <div key={k.l} style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: "0" }}><span className="pr-cap" style={{ width: "var(--pr-skill-w, 92px)" }}>{k.l}</span><div className="pr-skill"><i className={k.c} style={k.d ? { animationDelay: k.d } : undefined}></i></div></div>
            ))}
          </div>
        </div>
      )}
      {id === 'S' && (
        <div className="pr-stage">
          <div className="pr-win">
            <div style={{ display: "flex", gap: "5px", marginBottom: "2px" }}><span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#EB5648" }}></span><span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--border)" }}></span><span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--border)" }}></span></div>
            <div className="pr-ln" style={{ width: "70%" }}></div>
            <div className="pr-ln bad" style={{ width: "52%" }}></div>
            <div className="pr-ln" style={{ width: "84%" }}></div>
            <div className="pr-ln" style={{ width: "40%" }}></div>
            <span className="pr-bug"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="6" width="8" height="14" rx="4"></rect><path d="M12 20v-9M4 13h4M16 13h4M5 7l3 2M19 7l-3 2M5 19l3-2M19 19l-3-2M9 4l1.5 2M15 4l-1.5 2"></path></svg></span>
            <span className="pr-wr"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4 2.5-2.5z"></path></svg></span>
            <span className="pr-chip pr-ok" style={{ background: "#1F9D5C" }}>✓ {an.fixed}</span>
          </div>
        </div>
      )}
    </div>
  )
}
