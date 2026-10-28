
<div className="site" style={css(rootStyle)}>

  {/* NAV */}
  <header style={{ position: "sticky", top: "0", zIndex: "10", background: "var(--bg)", borderBottom: "1px solid var(--border)" }}>
    <nav aria-label={t.navLabel} style={{ maxWidth: "1240px", margin: "0 auto", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
      <Link href={base} aria-label="Betacode" style={{ display: "flex", alignItems: "center", minHeight: "44px" }}>
        <img className="logo-anim" src="/assets/brand/logo-animated.gif" alt="Betacode" style={css(logoAnimStyle)} />
        <img className="logo-static" src={logo} alt="Betacode" style={{ height: "34px", width: "auto" }} />
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: "28px", flexWrap: "wrap" }}>
        <Link className="navlink" href={base}>{t.navHome}</Link>
        <Link className="navlink on" href={links.pricing} aria-current="page">{t.navPricing}</Link>
        <Link className="navlink" href={links.ventures}>Betacode Ventures</Link>
        <Link className="navlink" href={links.insights}>Insights</Link>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div className="seg" role="group" aria-label={t.langLabel}>
          <button aria-pressed={isPt} onClick={setPt}>PT</button>
          <button aria-pressed={isEn} onClick={setEn}>EN</button>
        </div>
        <button className="iconbtn" aria-label={t.themeLabel} onClick={toggleTheme}>
          {dark && (
<>
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></svg>
          </>
)}
          {light && (
<>
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"></path></svg>
          </>
)}
        </button>
        <Link className="btn-coral" href={links.contact} style={{ minHeight: "44px", padding: "0 20px" }}>{t.navContact}</Link>
      </div>
    </nav>
  </header>

  {/* INTRO */}
  <section style={{ maxWidth: "860px", margin: "0 auto", padding: "56px 24px 28px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "14px" }}>
    <span className="mono" style={{ fontSize: "13px", color: "var(--kicker)" }}>{t.kicker}</span>
    <h1 className="disp hero-h" style={{ margin: "0", fontSize: "46px", lineHeight: "1.08", fontWeight: "800", letterSpacing: "-0.03em" }}>{t.title}</h1>
    <p style={{ margin: "0", fontSize: "18px", lineHeight: "1.6", color: "var(--muted)", maxWidth: "640px" }}>{t.sub}</p>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 20px", paddingTop: "4px" }}>
      {t.promises.map((p, pI) => (
<Fragment key={pI}><span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: "500" }}><span className="mono" aria-hidden="true" style={{ color: "#EB5648", fontWeight: "700" }}>{'{'} {'}'}</span>{p}</span></Fragment>
))}
    </div>
  </section>

  {/* WIZARD */}
  <section aria-label={t.kicker} style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px 80px", display: "flex", flexDirection: "column", gap: "18px" }}>

    {/* Stepper */}
    <nav aria-label={t.railLabel} style={{ display: "flex", alignItems: "flex-start", padding: "0 4px" }}>
      {rail.map((r, rI) => (
<Fragment key={rI}>
        <button className="step" data-go={r.canGo} disabled={r.locked} onClick={r.go} aria-current={r.cur}>
          <span className="step-line" aria-hidden="true" style={css(r.lineStyle)}></span>
          <span className="dot" style={{ position: "relative" }}>{r.mark}</span>
          <span className="hide-sm" style={{ fontSize: "13px", fontWeight: "600", color: `${r.labelColor}`, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>{r.label}</span>
        </button>
      </Fragment>
))}
    </nav>

    {/* Stage */}
    <div className="wz-pad" style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "24px", padding: "36px 40px", boxSizing: "border-box", minHeight: "480px", display: "flex", flexDirection: "column", boxShadow: "0 20px 50px rgba(27,28,81,0.06)" }}>

      {/* top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "22px", minHeight: "44px" }}>
        {canBack && (
<>
          <button className="btn-text" onClick={back} style={{ marginLeft: "-6px" }}><span aria-hidden="true">←</span> {t.back}</button>
        </>
)}
        {noBack && (
<><span></span></>
)}
        <span className="mono" style={{ fontSize: "12px", color: "var(--muted)" }}>{stepLabel}</span>
      </div>

      {/* QUESTION STEPS */}
      {isQ && (
<>
        <div className="wz" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <h2 className="disp" style={{ margin: "0", fontSize: "30px", lineHeight: "1.15", fontWeight: "800", letterSpacing: "-0.02em" }}>{q.title}</h2>
            <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.55", color: "var(--muted)" }}>{q.why}</p>
          </div>
          <div role="radiogroup" aria-label={q.title} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {q.opts.map((o, oI) => (
<Fragment key={oI}>
              <button className="opt" role="radio" aria-checked={o.on} aria-pressed={o.on} onClick={o.pick} style={css(o.span)}>
                <span className="opt-ico" aria-hidden="true">
                  {o.i.rocket && (
<><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 15l-3-3c2-6 7-9 14-9 0 7-3 12-9 14l-2-2zM15 9h.01"></path></svg></>
)}
                  {o.i.building && (
<><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"></rect><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3"></path></svg></>
)}
                  {o.i.yes && (
<><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"></path></svg></>
)}
                  {o.i.no && (
<><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6L6 18"></path></svg></>
)}
                  {o.i.box && (
<><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8l-9-5-9 5v8l9 5 9-5V8z"></path><path d="M3 8l9 5 9-5M12 13v8"></path></svg></>
)}
                  {o.i.users && (
<><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.5"></circle><path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5M16 4.6a3.5 3.5 0 0 1 0 6.8M18 13.8c2 .8 3.5 3 3.5 6.2"></path></svg></>
)}
                  {o.i.plus && (
<><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="8" r="4"></circle><path d="M3 21c0-3.9 3.1-7 7-7 1.5 0 2.9.5 4 1.3M19 14v6M16 17h6"></path></svg></>
)}
                  {o.i.refresh && (
<><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 11a8 8 0 0 0-14.9-3.5M4 4v4h4M4 13a8 8 0 0 0 14.9 3.5M20 20v-4h-4"></path></svg></>
)}
                  {o.i.wrench && (
<><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4 2.5-2.5z"></path></svg></>
)}
                  {o.i.compass && (
<><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z"></path></svg></>
)}
                </span>
                <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontWeight: "700", fontSize: "16px" }}>{o.label}</span>
                  <span style={{ fontSize: "14px", lineHeight: "1.5", color: "var(--muted)" }}>{o.desc}</span>
                </span>
                <svg className="chev" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"></path></svg>
              </button>
            </Fragment>
))}
          </div>
        </div>
      </>
)}

      {/* RESULT STEP */}
      {isResult && (
<>
        <div className="wz" style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span className="mono" style={{ fontSize: "12px", color: "var(--kicker)" }}>{res.kicker}</span>
            <h2 className="disp" style={{ margin: "0", fontSize: "30px", lineHeight: "1.15", fontWeight: "800", letterSpacing: "-0.02em" }}>{res.title}</h2>
          </div>

          {res.hasAlts && (
<>
            <div role="tablist" aria-label={res.tabsLabel} style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {res.tabs.map((b, bI) => (
<Fragment key={bI}>
                <button className="svc-tab" role="tab" aria-selected={b.on} onClick={b.pick}>
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", width: "100%" }}>
                    <span style={{ fontWeight: "700", fontSize: "14px", lineHeight: "1.25" }}>{b.name}</span>
                    {b.best && (
<><span className="mono" style={{ flex: "none", fontSize: "10px", fontWeight: "700", color: "#fff", background: "#EB5648", padding: "4px 6px", borderRadius: "6px" }}>{t.bestShort}</span></>
)}
                  </span>
                  <span className="mono" style={{ fontSize: "12px", color: "var(--muted)" }}>{b.price}</span>
                </button>
              </Fragment>
))}
            </div>
          </>
)}

          <article role="tabpanel" style={{ border: "2px solid #EB5648", borderRadius: "20px", overflow: "hidden" }}>
            <div style={{ background: "var(--band)", color: "#FFFFFF", padding: "22px 24px", display: "flex", flexWrap: "wrap", gap: "14px 28px", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "0" }}>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                  <span className="disp" style={{ fontSize: "24px", fontWeight: "800" }}>{sel.name}</span>
                  <span className="chip" style={{ background: "rgba(255,255,255,0.12)", color: "#fff" }}>{sel.model}</span>
                  {sel.isBest && (
<><span className="chip" style={{ background: "#EB5648", color: "#13143A", fontWeight: "700" }}>{t.best}</span></>
)}
                </div>
                <span style={{ fontSize: "14px", lineHeight: "1.5", color: "#C9CAE6", maxWidth: "460px", minHeight: "42px" }}>{sel.desc}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px", textAlign: "right" }}>
                <span style={{ fontSize: "12px", color: "#C9CAE6" }}>{sel.priceL}</span>
                <span className="disp" style={{ fontSize: "30px", fontWeight: "800", whiteSpace: "nowrap" }}>{sel.price}</span>
              </div>
            </div>

            <div className="svc-body" style={{ padding: "22px 24px", display: "flex", flexDirection: "column", gap: "18px", minHeight: `${res.bodyMin}`, boxSizing: "border-box" }}>
              <div className="pr-panel" aria-hidden="true">
                {sel.isV && (
<>
                  <div className="pr-stage" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
                      <div className="pr-l" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}><div className="pr-av"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"></path></svg></div><span className="pr-cap">{an.founder}</span></div>
                      <div style={{ position: "relative", width: "64px", height: "64px" }}><span className="pr-ring"></span><span className="pr-ring" style={{ animationDelay: ".18s" }}></span><div className="pr-hs"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3"></path><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"></path><path d="m21 3 1 11h-2"></path><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"></path><path d="M3 4h8"></path></svg></div></div>
                      <div className="pr-r" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}><div className="pr-av" style={{ borderColor: "#EB5648", color: "#EB5648", font: "700 14px/1 var(--font-jetbrains), monospace" }}>{'{'}B{'}'}</div><span className="pr-cap">betacode</span></div>
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}><span className="pr-chip pr-pop">0 € dev</span><span className="pr-chip pr-pop" style={{ background: "#EB5648", animationDelay: ".15s" }}>equity</span></div>
                  </div>
                </>
)}
                {sel.isE && (
<>
                  <div className="pr-stage" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "18px" }}>
                    <div style={{ display: "flex", justifyContent: "center", gap: "14px" }}>
                      {an.team.map((m, mI) => (
<Fragment key={mI}>
                        <div className="pr-bob" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}><div className="pr-av c"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"></path></svg></div><span className="pr-cap">{m.role}</span></div>
                      </Fragment>
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
                </>
)}
                {sel.isR && (
<>
                  <div className="pr-stage" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px" }}>
                    <span className="pr-cap">{an.yourTeam}</span>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <div className="pr-av"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"></path></svg></div>
                      <div className="pr-av"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"></path></svg></div>
                      <div className="pr-av"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"></path></svg></div>
                      <div className="pr-av c pr-join"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"></path></svg></div>
                      <div className="pr-av c pr-join d2"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"></path></svg></div>
                    </div>
                    <span className="pr-chip pr-pop5" style={{ background: "#EB5648" }}>{an.join}</span>
                  </div>
                </>
)}
                {sel.isF && (
<>
                  <div className="pr-stage" style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                    <div className="pr-capico" style={{ flex: "none", width: "72px", height: "72px", borderRadius: "18px", background: "#EB5648", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9l10-5 10 5-10 5L2 9z"></path><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v6"></path></svg></div>
                    <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "12px" }}>
                      {an.skills.map((k, kI) => (
<Fragment key={kI}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><span className="pr-cap" style={{ width: "92px" }}>{k.l}</span><div className="pr-skill"><i className={k.c} style={css(k.d)}></i></div></div>
                      </Fragment>
))}
                    </div>
                  </div>
                </>
)}
                {sel.isS && (
<>
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
                </>
)}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={{ fontSize: "14px", fontWeight: "700" }}>{t.why}</span>
                <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", minHeight: "72px" }}>
                  {sel.why.map((w, wI) => (
<Fragment key={wI}>
                    <li style={{ display: "flex", gap: "10px", fontSize: "14px", lineHeight: "1.5" }}><span className="mono" aria-hidden="true" style={{ color: "#EB5648", fontWeight: "700" }}>{'{'} {'}'}</span>{w}</li>
                  </Fragment>
))}
                </ul>
              </div>

              <div style={{ minHeight: "44px", display: "flex", alignItems: "center" }}>
                {sel.isE && (
<>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
                    <div className="tgl" role="group" aria-label={t.cfgLabel}>
                      <button aria-pressed={cfg.small} onClick={cfg.setSmall}>{t.small}</button>
                      <button aria-pressed={cfg.base} onClick={cfg.setBase}>{t.baseTeam}</button>
                    </div>
                    <span style={{ fontSize: "13px", color: "var(--muted)" }}>{cfg.desc}</span>
                  </div>
                </>
)}
                {sel.notE && (
<>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {sel.inc.map((c, cI) => (
<Fragment key={cI}><span className="chip" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 12px" }}><span aria-hidden="true" style={{ color: "#EB5648" }}>✓</span>{c}</span></Fragment>
))}
                  </div>
                </>
)}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "10px" }}>
                {sel.figs.map((f, fI) => (
<Fragment key={fI}>
                  <div style={{ background: "var(--surface)", borderRadius: "14px", padding: "14px 16px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "4px", minHeight: "76px", boxSizing: "border-box" }}>
                    <span style={{ fontSize: "13px", color: "var(--muted)" }}>{f.label}</span>
                    <span className="disp" style={{ fontSize: "20px", fontWeight: "800", lineHeight: "1.2" }}>{f.value}</span>
                  </div>
                </Fragment>
))}
              </div>

              {true && (
<>
                <details style={{ border: "1px solid var(--border)", borderRadius: "14px", padding: "0 16px" }}>
                  <summary style={{ cursor: "pointer", minHeight: "48px", display: "flex", alignItems: "center", fontSize: "14px", fontWeight: "600" }}>{t.how}</summary>
                  <div style={{ paddingBottom: "12px" }}>
                    {sel.rows.map((r, rI) => (
<Fragment key={rI}>
                      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.3fr) minmax(0, 1fr)", gap: "10px", padding: "10px 0", borderTop: "1px solid var(--border)", fontSize: "14px" }}>
                        <span style={{ fontWeight: "500" }}>{r.who}</span>
                        <span style={{ color: "var(--muted)" }}>{r.time}</span>
                        <span className="mono" style={{ textAlign: "right", fontSize: "13px" }}>{r.rate}</span>
                      </div>
                    </Fragment>
))}
                  </div>
                </details>
              </>
)}

              <p style={{ margin: "0", fontSize: "12px", lineHeight: "1.5", color: "var(--muted)" }}>{sel.note}</p>
            </div>
          </article>


          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--border)", paddingTop: "20px" }}>
            <span style={{ fontSize: "14px", color: "var(--muted)", flex: "1 1 260px" }}>{t.nextHint}</span>
            <button className="btn-coral" onClick={toContact}>{t.toContact} <span aria-hidden="true">→</span></button>
          </div>
        </div>
      </>
)}

      {/* CONTACT STEP */}
      {isContact && (
<>
        <div className="wz" style={{ display: "flex", flexWrap: "wrap", gap: "28px" }}>
          {sentNo && (
<>
            <div style={{ flex: "999 1 340px", minWidth: "0", display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <h2 className="disp" style={{ margin: "0", fontSize: "30px", lineHeight: "1.15", fontWeight: "800", letterSpacing: "-0.02em" }}>{t.formTitle}</h2>
                <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.55", color: "var(--muted)" }}>{t.formSub}</p>
              </div>
              <form onSubmit={submit} noValidate style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                <div className="field">
                  <label htmlFor="f-name">{t.fName}</label>
                  <input id="f-name" autoComplete="name" value={form.name} onInput={onName} placeholder={t.phName} />
                  {err.name && (
<><span className="err">{t.eName}</span></>
)}
                </div>
                <div className="field">
                  <label htmlFor="f-email">{t.fEmail}</label>
                  <input id="f-email" type="email" autoComplete="email" value={form.email} onInput={onEmail} placeholder="nome@empresa.com" />
                  {err.email && (
<><span className="err">{t.eEmail}</span></>
)}
                </div>
                <div className="field" style={{ gridColumn: "1 / -1" }}>
                  <label htmlFor="f-site">{t.fSite} <span style={{ fontWeight: "400", color: "var(--muted)" }}>({t.optional})</span></label>
                  <input id="f-site" type="url" value={form.site} onInput={onSite} placeholder="https://" />
                  {err.site && (
<><span className="err">{t.eSite}</span></>
)}
                </div>
                <div className="field" style={{ gridColumn: "1 / -1" }}>
                  <span id="when-l" style={{ fontWeight: "600", fontSize: "14px" }}>{t.fWhen} <span style={{ fontWeight: "400", color: "var(--muted)" }}>({t.optional})</span></span>
                  <div role="radiogroup" aria-labelledby="when-l" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {when.map((w, wI) => (
<Fragment key={wI}><button type="button" className="pill" role="radio" aria-checked={w.on} aria-pressed={w.on} onClick={w.pick}>{w.label}</button></Fragment>
))}
                  </div>
                </div>
                <div className="field" style={{ gridColumn: "1 / -1" }}>
                  <label htmlFor="f-desc">{t.fDesc} <span style={{ fontWeight: "400", color: "var(--muted)" }}>({t.optional})</span></label>
                  <textarea id="f-desc" rows="4" onInput={onDesc} placeholder={t.phDesc}>{form.desc}</textarea>
                </div>
                <div style={{ gridColumn: "1 / -1", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "13px", color: "var(--muted)", flex: "1 1 220px" }}>{t.privacy}</span>
                  <button className="btn-coral" type="submit">{t.send} <span aria-hidden="true">→</span></button>
                </div>
              </form>
            </div>
          </>
)}
          {sent && (
<>
            <div role="status" style={{ flex: "1 1 100%", minWidth: "0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "26px", padding: "8px 0" }}>
              <div className="ok-wrap" aria-hidden="true">
                <span className="ok-ring"></span><span className="ok-ring" style={{ animationDelay: ".2s" }}></span>
                <span className="ok-disc"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path className="ok-path" d="M5 12.5l4.5 4.5L19 7.5"></path></svg></span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center", maxWidth: "560px" }}>
                <span className="mono" style={{ fontSize: "12px", color: "var(--kicker)" }}>{t.sentKicker}</span>
                <h2 className="disp" style={{ margin: "0", fontSize: "34px", lineHeight: "1.1", fontWeight: "800", letterSpacing: "-0.02em" }}>{thanks}</h2>
                <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "var(--muted)" }}>{success.text}</p>
              </div>

              <div style={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px", textAlign: "left" }}>
                <div style={{ background: "var(--surface)", borderRadius: "18px", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <span className="mono" style={{ fontSize: "12px", color: "var(--kicker)" }}>{t.reqTitle}</span>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "baseline", flexWrap: "wrap" }}>
                    <span className="disp" style={{ fontSize: "17px", fontWeight: "800" }}>{sel.name}</span>
                    <span className="disp" style={{ fontSize: "17px", fontWeight: "800", whiteSpace: "nowrap" }}>{sel.price}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {summary.map((c, cI) => (
<Fragment key={cI}><span className="chip" style={{ background: "var(--card)" }}>{c}</span></Fragment>
))}
                    {success.hasWhen && (
<><span className="chip" style={{ background: "var(--card)" }}>{success.when}</span></>
)}
                  </div>
                  <span style={{ fontSize: "13px", color: "var(--muted)", borderTop: "1px solid var(--border)", paddingTop: "10px" }}>{success.contact}</span>
                </div>
                <div style={{ border: "1px solid var(--border)", borderRadius: "18px", padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
                  <span style={{ fontSize: "14px", fontWeight: "700" }}>{t.nextTitle}</span>
                  {success.steps.map((n, nI) => (
<Fragment key={nI}>
                    <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <span className="dot" style={{ width: "24px", height: "24px", fontSize: "11px" }}>{n.mark}</span>
                      <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ fontSize: "14px", lineHeight: "1.45", fontWeight: `${n.weight}` }}>{n.t}</span><span style={{ fontSize: "12px", color: "var(--muted)" }}>{n.s}</span></span>
                    </div>
                  </Fragment>
))}
                </div>
              </div>

              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "10px", textAlign: "left" }}>
                <span style={{ fontSize: "14px", fontWeight: "700" }}>{t.readWhile}</span>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
                  {t.reads.map((r, rI) => (
<Fragment key={rI}>
                    <Link href={links.insights} className="read" style={{ textDecoration: "none", border: "1px solid var(--border)", borderRadius: "14px", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "8px", minHeight: "92px", justifyContent: "space-between" }}>
                      <span className="mono" style={{ fontSize: "11px", color: "var(--kicker)" }}>{r.tag}</span>
                      <span style={{ fontSize: "15px", fontWeight: "700", lineHeight: "1.3" }}>{r.title} →</span>
                    </Link>
                  </Fragment>
))}
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
                <Link className="btn-coral" href={base}>{t.home}</Link>
                <Link className="btn-ghost" href={links.ventures}>Betacode Ventures</Link>
                <button className="btn-text" onClick={reset}>{t.newEstimate}</button>
              </div>
            </div>
          </>
)}

          {sentNo && (
<>
          <aside style={{ flex: "1 1 260px", minWidth: "0", display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ background: "var(--surface)", borderRadius: "18px", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <span className="mono" style={{ fontSize: "12px", color: "var(--kicker)" }}>{t.yourEstimate}</span>
              <span className="disp" style={{ fontSize: "18px", fontWeight: "800" }}>{sel.name}</span>
              <span className="disp" style={{ fontSize: "24px", fontWeight: "800" }}>{sel.price}</span>
              <span style={{ fontSize: "12px", color: "var(--muted)" }}>{sel.priceL}</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", paddingTop: "4px" }}>
                {summary.map((c, cI) => (
<Fragment key={cI}><span className="chip" style={{ background: "var(--card)" }}>{c}</span></Fragment>
))}
              </div>
            </div>
            <div style={{ border: "1px solid var(--border)", borderRadius: "18px", padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <span style={{ fontSize: "14px", fontWeight: "700" }}>{t.nextTitle}</span>
              {t.next.map((n, nI) => (
<Fragment key={nI}>
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span className="dot" style={{ width: "24px", height: "24px", background: "var(--surface)", color: "#EB5648", fontSize: "11px" }}>{n.n}</span>
                  <span style={{ fontSize: "14px", lineHeight: "1.45" }}>{n.t}</span>
                </div>
              </Fragment>
))}
            </div>
          </aside>
          </>
)}
        </div>
      </>
)}
    </div>

    {/* below card: answers + direct contact */}
    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 20px", alignItems: "center", justifyContent: "space-between", padding: "0 4px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center", minWidth: "0" }}>
        {hasAnswers && (
<>
          <span style={{ fontSize: "13px", color: "var(--muted)" }}>{t.yourAnswers}</span>
          {answers.map((a, aI) => (
<Fragment key={aI}><span className="chip" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>{a}</span></Fragment>
))}
        </>
)}
      </div>
      <span style={{ fontSize: "14px", color: "var(--muted)" }}>{t.railHelp} <Link href={links.contact} style={{ fontWeight: "600", textUnderlineOffset: "4px" }}>{t.railTalk}</Link></span>
    </div>
  </section>

  {/* FOOTER */}
  <footer style={css(foot.style)}>
    <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "64px 24px 36px", display: "flex", flexDirection: "column", gap: "44px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "36px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "320px" }}>
          <img src={foot.logo} alt="Betacode" style={{ height: "36px", width: "auto", alignSelf: "flex-start", display: "block" }} />
          <p style={{ margin: "0", color: "var(--fm)", fontSize: "15px", lineHeight: "1.6" }}>{t.footTag}</p>
        </div>
        <div style={{ display: "flex", gap: "64px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="mono" style={{ fontSize: "12px", color: "var(--fk)", marginBottom: "10px" }}>{t.footNav}</span>
            <Link className="flink" href={links.pricing}>{t.navPricing}</Link>
            <Link className="flink" href={links.ventures}>Betacode Ventures</Link>
            <Link className="flink" href={links.insights}>Insights</Link>
            <Link className="flink" href={links.contact}>{t.navContact}</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="mono" style={{ fontSize: "12px", color: "var(--fk)", marginBottom: "10px" }}>social</span>
            <a className="flink" href="https://www.facebook.com/betacode.tech/">Facebook</a>
            <a className="flink" href="https://www.instagram.com/betacode.tech">Instagram</a>
            <a className="flink" href="https://twitter.com/betacode_tech">X / Twitter</a>
            <a className="flink" href="https://github.com/BetacodeTech">GitHub</a>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--fb)", borderBottom: "1px solid var(--fb)", padding: "28px 0", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "20px 40px" }}>
        <div style={{ display: "flex", gap: "28px", flexWrap: "wrap", alignItems: "center" }}>
          <img src={foot.iefp} alt="IEFP" style={{ height: "48px", width: "auto", display: "block" }} />
          <img src={foot.pessoas} alt="Pessoas 2030" style={{ height: "40px", width: "auto", display: "block" }} />
          <img src={foot.pt} alt="Portugal 2030" style={{ height: "44px", width: "auto", display: "block" }} />
          <img src={foot.ue} alt={t.altEu} style={{ height: "44px", width: "auto", display: "block" }} />
        </div>
        <p style={{ margin: "0", flex: "1 1 300px", fontSize: "13px", lineHeight: "1.55", color: "var(--fm)" }}>{t.funding}</p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "12px", color: "var(--fm)", fontSize: "13px" }}>
        <span>{t.copy}</span>
        <span className="mono">{t.made}</span>
      </div>
    </div>
  </footer>
</div>
