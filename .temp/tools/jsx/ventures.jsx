
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
        <Link className="navlink" href={links.pricing}>{t.navPricing}</Link>
        <Link className="navlink on" href={links.ventures} aria-current="page">Betacode Ventures</Link>
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
        <a className="btn-coral" href="#candidatura" style={{ minHeight: "44px", padding: "0 20px" }}>{t.apply}</a>
      </div>
    </nav>
  </header>

  {/* HERO */}
  <section style={{ background: "var(--band)", color: "#FFFFFF", position: "relative", overflow: "hidden" }}>
    <div aria-hidden="true" className="mono hide-sm" style={{ position: "absolute", right: "-40px", top: "-80px", fontSize: "460px", lineHeight: "1", fontWeight: "700", color: "rgba(255,255,255,0.04)" }}>{'}'}</div>
    <div style={{ position: "relative", maxWidth: "1240px", margin: "0 auto", padding: "88px 24px 96px", display: "flex", flexWrap: "wrap", gap: "56px", alignItems: "center" }}>
      <div style={{ flex: "999 1 500px", minWidth: "0", display: "flex", flexDirection: "column", gap: "26px" }}>
        <span className="mono" style={{ display: "inline-flex", alignSelf: "flex-start", alignItems: "center", gap: "10px", fontSize: "13px", background: "rgba(255,255,255,0.08)", padding: "8px 14px", borderRadius: "999px" }}><span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#EB5648" }}></span>{t.heroChip}</span>
        <h1 className="disp hero-h" style={{ margin: "0", fontSize: "66px", lineHeight: "1.03", fontWeight: "800", letterSpacing: "-0.035em" }}>{t.heroL1}<br /><span style={{ color: "#FF8A7D" }}>{t.heroL2}</span></h1>
        <p style={{ margin: "0", fontSize: "19px", lineHeight: "1.6", color: "#C9CAE6", maxWidth: "560px" }}>{t.heroSub}</p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a className="btn-coral" href="#candidatura">{t.apply} <span aria-hidden="true">→</span></a>
          <a className="btn-line" href="#coachid" style={{ color: "#FFFFFF" }}>{t.seeCase}</a>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 26px", paddingTop: "6px" }}>
          {t.heroFacts.map((f, fI) => (
<Fragment key={fI}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span className="disp" style={{ fontSize: "26px", fontWeight: "800" }}>{f.v}</span>
              <span style={{ fontSize: "13px", color: "#C9CAE6" }}>{f.l}</span>
            </div>
          </Fragment>
))}
        </div>
      </div>

      {/* 0 → 100% */}
      <div aria-hidden="true" style={{ flex: "1 1 360px", minWidth: "0", display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", width: "340px", maxWidth: "100%", aspectRatio: "1 / 1" }}>
          <svg viewBox="0 0 240 240" width="100%" height="100%">
            <circle cx="120" cy="120" r="105" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="14"></circle>
            <g className="hz-ring"><circle className="hz-arc" cx="120" cy="120" r="105" fill="none" stroke="#EB5648" strokeWidth="14" strokeLinecap="round"></circle></g>
          </svg>
          <div style={{ position: "absolute", inset: "0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <div className="hz-pct disp" style={{ position: "relative", width: "200px", height: "74px", fontSize: "64px", fontWeight: "800", letterSpacing: "-0.03em" }}>
              <span className="p0">0%</span><span className="p1">33%</span><span className="p2">66%</span><span className="p3">100%</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-start" }}>
              <span className="hz-st s1 mono" style={{ fontSize: "12px" }}>① {t.s1short}</span>
              <span className="hz-st s2 mono" style={{ fontSize: "12px" }}>② {t.s2short}</span>
              <span className="hz-st s3 mono" style={{ fontSize: "12px" }}>③ {t.s3short}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* HOW IT WORKS */}
  <section aria-labelledby="como-h" style={{ maxWidth: "1240px", margin: "0 auto", padding: "104px 24px 40px" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "680px", marginBottom: "40px" }}>
      <span className="mono" style={{ fontSize: "13px", color: "var(--kicker)" }}>{t.howKicker}</span>
      <h2 id="como-h" className="disp sec-h" style={{ margin: "0", fontSize: "48px", lineHeight: "1.06", fontWeight: "800", letterSpacing: "-0.03em" }}>{t.howTitle}</h2>
    </div>
    <ol style={{ listStyle: "none", margin: "0", padding: "0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
      {t.steps.map((s, sI) => (
<Fragment key={sI}>
        <li className="step-card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="disp" style={{ width: "48px", height: "48px", borderRadius: "14px", background: "#EB5648", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "800" }}>{s.n}</span>
            <span className="mono" style={{ fontSize: "12px", color: "var(--muted)" }}>{s.tag}</span>
          </div>
          <h3 className="disp" style={{ margin: "0", fontSize: "22px", fontWeight: "800" }}>{s.t}</h3>
          <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "var(--muted)" }}>{s.d}</p>
        </li>
      </Fragment>
))}
    </ol>
  </section>

  {/* PARTNERSHIP */}
  <section aria-labelledby="parc-h" style={{ maxWidth: "1240px", margin: "0 auto", padding: "72px 24px 104px" }}>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "20px", marginBottom: "40px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "680px" }}>
        <span className="mono" style={{ fontSize: "13px", color: "var(--kicker)" }}>{t.parKicker}</span>
        <h2 id="parc-h" className="disp sec-h" style={{ margin: "0", fontSize: "48px", lineHeight: "1.06", fontWeight: "800", letterSpacing: "-0.03em" }}>{t.parTitle}</h2>
      </div>
      <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "var(--muted)", maxWidth: "420px" }}>{t.parSub}</p>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "stretch" }}>
      <div style={{ flex: "1 1 360px", minWidth: "0", background: "var(--band)", color: "#fff", borderRadius: "24px", padding: "32px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span className="hs-r" style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#EB5648", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", font: "700 15px/1 var(--font-jetbrains), monospace" }}>{'{'}B{'}'}</span>
          <h3 className="disp" style={{ margin: "0", fontSize: "22px", fontWeight: "800" }}>{t.weBring}</h3>
        </div>
        <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "14px" }}>
          {t.we.map((w, wI) => (
<Fragment key={wI}>
            <li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}><span className="mono" aria-hidden="true" style={{ color: "#FF8A7D", fontWeight: "700", paddingTop: "2px" }}>{'{'} {'}'}</span><span style={{ display: "flex", flexDirection: "column", gap: "3px" }}><span style={{ fontWeight: "700", fontSize: "15px" }}>{w.t}</span><span style={{ fontSize: "14px", lineHeight: "1.5", color: "#C9CAE6" }}>{w.d}</span></span></li>
          </Fragment>
))}
        </ul>
      </div>

      <div className="hide-sm" aria-hidden="true" style={{ flex: "0 0 96px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", width: "72px", height: "72px" }}>
          <span className="hs-ring"></span><span className="hs-ring" style={{ animationDelay: ".18s" }}></span>
          <div className="hs-c" style={{ width: "72px", height: "72px", borderRadius: "50%", background: "#EB5648", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3"></path><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"></path><path d="m21 3 1 11h-2"></path><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"></path><path d="M3 4h8"></path></svg></div>
        </div>
      </div>

      <div style={{ flex: "1 1 360px", minWidth: "0", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "24px", padding: "32px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span className="hs-l" style={{ width: "48px", height: "48px", borderRadius: "50%", background: "var(--surface)", color: "var(--text)", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"></path></svg></span>
          <h3 className="disp" style={{ margin: "0", fontSize: "22px", fontWeight: "800" }}>{t.youBring}</h3>
        </div>
        <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "14px" }}>
          {t.you.map((w, wI) => (
<Fragment key={wI}>
            <li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}><span className="mono" aria-hidden="true" style={{ color: "#EB5648", fontWeight: "700", paddingTop: "2px" }}>{'{'} {'}'}</span><span style={{ display: "flex", flexDirection: "column", gap: "3px" }}><span style={{ fontWeight: "700", fontSize: "15px" }}>{w.t}</span><span style={{ fontSize: "14px", lineHeight: "1.5", color: "var(--muted)" }}>{w.d}</span></span></li>
          </Fragment>
))}
        </ul>
      </div>
    </div>
  </section>

  {/* CASE: COACH ID */}
  <section id="coachid" aria-labelledby="case-h" style={{ background: "var(--surface)" }}>
    <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "104px 24px", display: "flex", flexDirection: "column", gap: "32px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "720px" }}>
        <span className="mono" style={{ fontSize: "13px", color: "var(--kicker)" }}>{t.caseKicker}</span>
        <h2 id="case-h" className="disp sec-h" style={{ margin: "0", fontSize: "48px", lineHeight: "1.06", fontWeight: "800", letterSpacing: "-0.03em" }}>{t.caseTitle}</h2>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ flex: "999 1 520px", minWidth: "0", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "24px", padding: "32px", display: "flex", flexDirection: "column", gap: "22px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ background: "#FFFFFF", border: "1px solid #E6E6EF", borderRadius: "14px", padding: "12px 18px", display: "flex", alignItems: "center" }}><img src="/assets/clients/coach-id.png" alt="Coach ID" style={{ height: "40px", width: "auto", display: "block" }} /></div>
            <a href="https://coachidapp.com" style={{ fontWeight: "600", fontSize: "15px", textUnderlineOffset: "4px", minHeight: "44px", display: "inline-flex", alignItems: "center" }}>coachidapp.com ↗</a>
          </div>
          <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6" }}>{t.caseDesc}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {t.caseTags.map((c, cI) => (
<Fragment key={cI}><span className="chip">{c}</span></Fragment>
))}
          </div>
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <span style={{ fontSize: "14px", fontWeight: "700" }}>{t.builtTitle}</span>
            <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px" }}>
              {t.built.map((b, bI) => (
<Fragment key={bI}>
                <li style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "14px", fontWeight: "500" }}><span aria-hidden="true" style={{ color: "#EB5648", fontWeight: "700" }}>✓</span>{b}</li>
              </Fragment>
))}
            </ul>
          </div>
        </div>

        <div style={{ flex: "1 1 320px", minWidth: "0", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ background: "#EB5648", color: "#13143A", borderRadius: "24px", padding: "28px", display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "20px" }}>
            <span className="mono" style={{ gridColumn: "1 / -1", fontSize: "12px", fontWeight: "500" }}>{t.resultsKicker}</span>
            {t.stats.map((s, sI) => (
<Fragment key={sI}>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span className="disp" style={{ fontSize: "40px", lineHeight: "1", fontWeight: "800", letterSpacing: "-0.03em" }}>{s.v}</span>
                <span style={{ fontSize: "13px", lineHeight: "1.4", fontWeight: "500" }}>{s.l}</span>
              </div>
            </Fragment>
))}
          </div>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "24px", padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <span style={{ fontSize: "14px", fontWeight: "700" }}>{t.alsoTitle}</span>
            {t.also.map((a, aI) => (
<Fragment key={aI}>
              <span style={{ display: "flex", gap: "10px", fontSize: "14px", lineHeight: "1.5" }}><span className="mono" aria-hidden="true" style={{ color: "#EB5648", fontWeight: "700" }}>{'{'} {'}'}</span>{a}</span>
            </Fragment>
))}
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* APPLY */}
  <section id="candidatura" aria-labelledby="apply-h" style={{ maxWidth: "1240px", margin: "0 auto", padding: "104px 24px" }}>
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "28px", overflow: "hidden", display: "flex", flexWrap: "wrap", boxShadow: "0 20px 50px rgba(27,28,81,0.06)" }}>
      <div style={{ flex: "1 1 360px", minWidth: "0", background: "var(--band)", color: "#FFFFFF", padding: "44px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "18px" }}>
        <span className="mono" style={{ fontSize: "13px", color: "#FF8A7D" }}>{t.applyKicker}</span>
        <h2 id="apply-h" className="disp sec-h" style={{ margin: "0", fontSize: "40px", lineHeight: "1.08", fontWeight: "800", letterSpacing: "-0.02em" }}>{t.applyTitle}</h2>
        <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#C9CAE6" }}>{t.applySub}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "8px" }}>
          {t.applySteps.map((n, nI) => (
<Fragment key={nI}>
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}><span className="mono" style={{ flex: "none", width: "26px", height: "26px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", color: "#FF8A7D", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>{n.n}</span><span style={{ fontSize: "15px", lineHeight: "1.5" }}>{n.t}</span></div>
          </Fragment>
))}
        </div>
      </div>

      <div style={{ flex: "999 1 460px", minWidth: "0", padding: "44px", boxSizing: "border-box" }}>
        {sentNo && (
<>
          <form onSubmit={submit} noValidate style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
            <div className="field">
              <label htmlFor="v-name">{t.fName}</label>
              <input id="v-name" autoComplete="name" value={form.name} onInput={onName} placeholder={t.phName} />
              {err.name && (
<><span className="err">{t.eName}</span></>
)}
            </div>
            <div className="field">
              <label htmlFor="v-email">{t.fEmail}</label>
              <input id="v-email" type="email" autoComplete="email" value={form.email} onInput={onEmail} placeholder="nome@empresa.com" />
              {err.email && (
<><span className="err">{t.eEmail}</span></>
)}
            </div>
            <div className="field" style={{ gridColumn: "1 / -1" }}>
              <span id="stage-l" style={{ fontWeight: "600", fontSize: "14px" }}>{t.fStage} <span style={{ fontWeight: "400", color: "var(--muted)" }}>({t.optional})</span></span>
              <div role="radiogroup" aria-labelledby="stage-l" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {stages.map((s, sI) => (
<Fragment key={sI}><button type="button" className="pill" role="radio" aria-checked={s.on} aria-pressed={s.on} onClick={s.pick}>{s.label}</button></Fragment>
))}
              </div>
            </div>
            <div className="field" style={{ gridColumn: "1 / -1" }}>
              <label htmlFor="v-site">{t.fSite} <span style={{ fontWeight: "400", color: "var(--muted)" }}>({t.optional})</span></label>
              <input id="v-site" type="url" value={form.site} onInput={onSite} placeholder="https://" />
              {err.site && (
<><span className="err">{t.eSite}</span></>
)}
            </div>
            <div className="field" style={{ gridColumn: "1 / -1" }}>
              <label htmlFor="v-desc">{t.fDesc}</label>
              <textarea id="v-desc" rows="5" onInput={onDesc} placeholder={t.phDesc}>{form.desc}</textarea>
              {err.desc && (
<><span className="err">{t.eDesc}</span></>
)}
            </div>
            <div style={{ gridColumn: "1 / -1", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px", justifyContent: "space-between" }}>
              <span style={{ fontSize: "13px", color: "var(--muted)", flex: "1 1 220px" }}>{t.privacy}</span>
              <button className="btn-coral" type="submit">{t.applyBtn} <span aria-hidden="true">→</span></button>
            </div>
          </form>
        </>
)}
        {sent && (
<>
          <div role="status" style={{ display: "flex", flexDirection: "column", gap: "18px", alignItems: "flex-start" }}>
            <div className="ok-wrap" aria-hidden="true"><span className="ok-disc"><svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path className="ok-path" d="M5 12.5l4.5 4.5L19 7.5"></path></svg></span></div>
            <span className="mono" style={{ fontSize: "12px", color: "var(--kicker)" }}>{t.sentKicker}</span>
            <h3 className="disp" style={{ margin: "0", fontSize: "32px", lineHeight: "1.1", fontWeight: "800" }}>{thanks}</h3>
            <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "var(--muted)" }}>{sentText}</p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <Link className="btn-coral" href={base}>{t.home}</Link>
              <Link className="btn-ghost" href={links.insights}>{t.readInsights}</Link>
            </div>
          </div>
        </>
)}
      </div>
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
