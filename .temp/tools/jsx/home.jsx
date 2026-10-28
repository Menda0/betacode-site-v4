
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
        <Link className="btn-coral" href={links.contact} style={{ fontSize: "15px", padding: "0 20px", minHeight: "44px" }}>{t.navContact}</Link>
      </div>
    </nav>
  </header>

  {/* HERO */}
  <section style={{ position: "relative", overflow: "hidden" }}>
    <div aria-hidden="true" className="mono hide-sm" style={{ position: "absolute", left: "-40px", top: "40px", fontSize: "520px", lineHeight: "1", fontWeight: "700", color: "var(--ghost)" }}>{'{'}</div>
    <div style={{ position: "relative", maxWidth: "1240px", margin: "0 auto", padding: "80px 24px 88px", display: "flex", flexWrap: "wrap", gap: "56px", alignItems: "center" }}>
      <div style={{ flex: "999 1 500px", minWidth: "0", display: "flex", flexDirection: "column", gap: "28px" }}>
        <div className="mono" style={{ display: "inline-flex", alignSelf: "flex-start", alignItems: "center", gap: "10px", fontSize: "13px", color: "var(--text)", background: "var(--surface)", padding: "8px 14px", borderRadius: "999px" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#EB5648" }}></span>
          {t.heroChip}
        </div>
        <h1 className="disp hero-h" style={{ margin: "0", fontSize: "74px", lineHeight: "1.03", fontWeight: "800", letterSpacing: "-0.035em" }}><span className="mono" style={{ color: "#EB5648", fontWeight: "700" }}>{'{'}</span>Software<span className="mono" style={{ color: "#EB5648", fontWeight: "700" }}>{'}'}</span> {t.heroL1}</h1>
        <p style={{ margin: "0", fontSize: "20px", lineHeight: "1.6", color: "var(--muted)", maxWidth: "560px" }}>{t.heroSub}</p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <Link className="btn-coral" href={links.contact} style={{ fontSize: "16px", padding: "0 26px", minHeight: "54px" }}>{t.heroCta} <span aria-hidden="true">→</span></Link>
          <Link className="btn-ghost" href={links.pricing} style={{ fontSize: "16px", padding: "0 26px", minHeight: "54px" }}>{t.heroCta2}</Link>
          <a href="#servicos" style={{ textUnderlineOffset: "5px", fontWeight: "500", fontSize: "16px", padding: "0 10px", minHeight: "54px", display: "flex", alignItems: "center" }}>{t.heroCta3}</a>
        </div>
      </div>

      <div style={{ flex: "1 1 420px", minWidth: "0", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="mono" aria-hidden="true" style={{ width: "100%", maxWidth: "500px", background: "var(--term)", color: "#E6E6F4", borderRadius: "20px", padding: "22px 26px 26px", boxShadow: "0 30px 70px rgba(0,0,0,0.28)", fontSize: "14px", lineHeight: "1.85", boxSizing: "border-box", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#EB5648" }}></span>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#4A4B7A" }}></span>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#4A4B7A" }}></span>
            <span style={{ marginLeft: "auto", fontSize: "12px", color: "#8F90B8" }}>{termTitle}</span>
          </div>
          <div style={{ height: "280px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            {termLines.map((ln, lnI) => (
<Fragment key={lnI}>
              <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", color: `${ln.color}` }}><span style={{ color: `${ln.pc}` }}>{ln.p}</span>{ln.t}</div>
            </Fragment>
))}
            <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", color: `${typing.color}` }}><span style={{ color: `${typing.pc}` }}>{typing.p}</span>{typing.t}<span className="cursor">▍</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* CLIENTS */}
  <section aria-labelledby="clientes-h" style={{ background: "var(--surface)" }}>
    <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "44px 24px", display: "flex", flexWrap: "wrap", gap: "24px 48px", alignItems: "center" }}>
      <h2 id="clientes-h" className="disp" style={{ margin: "0", fontSize: "16px", fontWeight: "700", flex: "0 0 auto", maxWidth: "220px", lineHeight: "1.4" }}>{t.clientsTitle}</h2>
      <ul style={{ listStyle: "none", margin: "0", padding: "0", flex: "1 1 640px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px" }}>
        {clients.map((c, cI) => (
<Fragment key={cI}>
          <li className="logo-cell" style={{ height: "76px", background: "var(--card)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", padding: "14px 18px", boxSizing: "border-box" }}>
            <img src={c.src} alt={c.name} style={{ maxWidth: "100%", maxHeight: `${c.h}`, objectFit: "contain", display: "block" }} />
          </li>
        </Fragment>
))}
      </ul>
    </div>
  </section>

  {/* SERVICES / AUDIENCE TABS */}
  <section id="servicos" aria-labelledby="servicos-h" style={{ background: "var(--band)", color: "#FFFFFF", position: "relative", overflow: "hidden" }}>
    <div aria-hidden="true" className="mono hide-sm" style={{ position: "absolute", right: "-30px", top: "-60px", fontSize: "420px", lineHeight: "1", fontWeight: "700", color: "rgba(255,255,255,0.04)" }}>{'}'}</div>
    <div style={{ position: "relative", maxWidth: "1240px", margin: "0 auto", padding: "112px 24px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "700px", marginBottom: "40px" }}>
        <span className="mono" style={{ fontSize: "13px", color: "#FF8A7D", letterSpacing: "0.04em" }}>{t.svcKicker}</span>
        <h2 id="servicos-h" className="disp sec-h" style={{ margin: "0", fontSize: "52px", lineHeight: "1.06", fontWeight: "800", letterSpacing: "-0.03em" }}>{t.svcTitle}</h2>
        <p style={{ margin: "0", fontSize: "18px", lineHeight: "1.6", color: "#C9CAE6" }}>{t.svcSub}</p>
      </div>

      <div role="tablist" aria-label={t.svcTabsLabel} style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "24px" }}>
        {tracks.map((tr, trI) => (
<Fragment key={trI}>
          <button className="tab" role="tab" aria-selected={tr.selected} onClick={tr.pick} style={css(tr.tabStyle)}>
            <span className="mono" style={{ fontSize: "12px", opacity: "0.75" }}>{tr.num}</span>{tr.label}
          </button>
        </Fragment>
))}
      </div>

      <div role="tabpanel" style={{ background: "var(--card)", color: "var(--text)", borderRadius: "24px", overflow: "hidden", display: "flex", flexWrap: "wrap" }}>
        <div className="pad-sm" style={{ flex: "999 1 520px", minWidth: "0", padding: "48px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "20px" }}>
          <span className="mono" style={{ fontSize: "13px", color: "var(--kicker)" }}>{active.kicker}</span>
          <h3 className="disp" style={{ margin: "0", fontSize: "36px", lineHeight: "1.12", fontWeight: "800", letterSpacing: "-0.02em" }}>{active.title}</h3>
          <p style={{ margin: "0", fontSize: "18px", lineHeight: "1.6", color: "var(--muted)", maxWidth: "560px" }}>{active.text}</p>
          <ul style={{ listStyle: "none", margin: "6px 0 0", padding: "0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px" }}>
            {active.services.map((s, sI) => (
<Fragment key={sI}>
              <li style={{ display: "flex", alignItems: "center", gap: "12px", background: "var(--surface)", borderRadius: "12px", padding: "15px 16px", fontWeight: "600", fontSize: "15px" }}>
                <span className="mono" aria-hidden="true" style={{ color: "#EB5648", fontWeight: "700" }}>{'{'} {'}'}</span>
                {s}
              </li>
            </Fragment>
))}
          </ul>
          <div style={{ display: "flex", marginTop: "6px" }}>
            <a className="btn-coral" href={active.href} style={{ fontSize: "15px", padding: "0 22px", minHeight: "50px" }}>{active.cta} <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <div className="an-panel" aria-hidden="true">
          {isTrad && (
<>
            <div className="an-stage">
              <div className="an-paper" style={{ top: "30px" }}></div>
              <div className="an-paper" style={{ top: "110px", animationDelay: ".6s" }}></div>
              <div className="an-paper" style={{ top: "190px", animationDelay: "1.2s" }}></div>
              <div className="an-screen">
                <div className="an-dots"><span></span><span></span><span></span></div>
                <div className="an-row k" style={{ width: "70%" }}></div>
                <div className="an-row" style={{ width: "90%", animationDelay: ".2s" }}></div>
                <div className="an-row" style={{ width: "55%", animationDelay: ".4s" }}></div>
                <div className="an-bars">
                  <i style={{ height: "40%" }}></i><i style={{ height: "65%", animationDelay: ".1s" }}></i><i style={{ height: "50%", animationDelay: ".2s" }}></i><i style={{ height: "85%", animationDelay: ".3s" }}></i><i style={{ height: "100%", animationDelay: ".4s" }}></i>
                </div>
              </div>
              <div style={{ position: "absolute", left: "0", bottom: "0" }}><span className="an-chip">{an.paper}</span></div>
            </div>
          </>
)}
          {isTech && (
<>
            <div className="an-stage">
              <div className="an-cap" style={{ position: "absolute", left: "0", top: "0" }}>{an.team}</div>
              <div className="an-team">
                {an.slots.map((s, sI) => (
<Fragment key={sI}>
                  <div className="an-av"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"></path></svg></div>
                </Fragment>
))}
                <div className="an-av new"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"></path></svg></div>
                <div className="an-av new d2"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"></path></svg></div>
              </div>
              <div style={{ position: "absolute", left: "0", right: "0", bottom: "30px", display: "flex", justifyContent: "center" }}><span className="an-chip an-pop" style={{ background: "#EB5648" }}>{an.join}</span></div>
            </div>
          </>
)}
          {isStart && (
<>
            <div className="an-stage">
              <div style={{ position: "absolute", left: "10px", right: "10px", top: "30px", height: "110px" }}>
                <div className="an-track"><i></i><span className="an-trav"></span></div>
                <div className="an-node n1"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z"></path></svg></div>
                <div className="an-node n2"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3"></circle><path d="M3 20c0-3.3 2.7-6 6-6M15 16l2 2 4-4"></path></svg></div>
                <div className="an-node n3"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 15l-3-3c2-6 7-9 14-9 0 7-3 12-9 14l-2-2zM15 9h.01"></path></svg></div>
                <div className="an-cap an-lbl" style={{ left: "-13px" }}>{an.idea}</div>
                <div className="an-cap an-lbl" style={{ left: "calc(50% - 45px)" }}>{an.validate}</div>
                <div className="an-cap an-lbl" style={{ right: "-13px" }}>{an.mvp}</div>
              </div>
              <div className="an-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span className="an-cap" style={{ color: "var(--text)" }}>{an.build}</span><span className="an-cap an-ok">✓ ok</span></div>
                <div className="an-prog"><i></i></div>
              </div>
            </div>
          </>
)}
          {isVent && (
<>
            <div className="an-stage">
              <div className="an-meet">
                <div className="an-who l">
                  <div className="an-av" style={{ borderColor: "var(--barc)" }}><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"></path></svg></div>
                  <span className="an-cap">{an.founder}</span>
                </div>
                <div className="an-hs">
                  <span className="ring"></span><span className="ring b"></span>
                  <div className="ico"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3"></path><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"></path><path d="m21 3 1 11h-2"></path><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"></path><path d="M3 4h8"></path></svg></div>
                </div>
                <div className="an-who r">
                  <div className="an-av" style={{ background: "var(--card)", borderColor: "#EB5648", color: "#EB5648", font: "700 16px/1 var(--font-jetbrains), monospace" }}>{'{'}B{'}'}</div>
                  <span className="an-cap">betacode</span>
                </div>
              </div>
              <div className="an-deal">
                <span className="an-chip">0 € {an.cost}</span>
                <span className="an-chip" style={{ background: "#EB5648" }}>equity</span>
              </div>
            </div>
          </>
)}
          {/* sc-if false: 
            <div className="an-stage" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div className="an-side l">
                <div className="an-av" style={{ borderColor: "var(--barc)" }}><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"></path></svg></div>
                <span className="an-cap">{an.founder}</span>
              </div>
              <div style={{ position: "relative", width: "170px", height: "170px" }}>
                <svg width="170" height="170" viewBox="0 0 190 190">
                  <circle cx="95" cy="95" r="70" fill="none" style={{ stroke: "var(--border)" }} strokeWidth="18"></circle>
                  <circle className="an-seg" cx="95" cy="95" r="70" fill="none" style={{ stroke: "var(--barc)", "--len": "250px" }} strokeWidth="18" strokeDasharray="0 440" transform="rotate(-90 95 95)"></circle>
                  <circle className="an-seg s2" cx="95" cy="95" r="70" fill="none" style={{ stroke: "#EB5648", "--len": "180px" }} strokeWidth="18" strokeDasharray="0 440" transform="rotate(117 95 95)"></circle>
                </svg>
                <div style={{ position: "absolute", inset: "0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                  <span className="disp" style={{ fontSize: "30px", fontWeight: "800" }}>0 €</span>
                  <span className="an-cap">{an.cost}</span>
                </div>
              </div>
              <div className="an-side r">
                <div className="an-av" style={{ background: "#EB5648", borderColor: "#EB5648", color: "#fff", font: "700 16px/1 var(--font-jetbrains), monospace" }}>{'{'}B{'}'}</div>
                <span className="an-cap">betacode</span>
              </div>
            </div>
          */}
        </div>
      </div>
    </div>
  </section>

  {/* VENTURES */}
  <section aria-labelledby="ventures-h" style={{ background: "#EB5648", color: "#13143A" }}>
    <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "104px 24px", display: "flex", flexWrap: "wrap", gap: "56px", alignItems: "center" }}>
      <div style={{ flex: "999 1 520px", minWidth: "0", display: "flex", flexDirection: "column", gap: "22px" }}>
        <span className="mono" style={{ fontSize: "13px", letterSpacing: "0.04em", fontWeight: "500" }}>// betacode ventures</span>
        <h2 id="ventures-h" className="disp sec-h" style={{ margin: "0", fontSize: "64px", lineHeight: "1.02", fontWeight: "800", letterSpacing: "-0.035em" }}>{t.venTitle}</h2>
        <p style={{ margin: "0", fontSize: "19px", lineHeight: "1.55", maxWidth: "560px", fontWeight: "500" }}>{t.venText}</p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Link className="btn-navy" href={links.ventures} style={{ fontSize: "16px", padding: "0 26px", minHeight: "54px" }}>{t.venCta} <span aria-hidden="true">→</span></Link>
          <Link href={links.ventures} style={{ border: "1.5px solid #13143A", color: "#13143A", textDecoration: "none", fontWeight: "600", fontSize: "16px", padding: "0 26px", minHeight: "54px", display: "flex", alignItems: "center", borderRadius: "12px" }}>{t.venCta2}</Link>
        </div>
      </div>
      <div style={{ flex: "1 1 380px", minWidth: "0", display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "12px" }}>
        <div style={{ background: "#1B1C51", color: "#FFFFFF", borderRadius: "22px", padding: "28px", display: "flex", flexDirection: "column", gap: "10px", gridColumn: "span 2" }}>
          <span className="mono" style={{ fontSize: "12px", color: "#FF8A7D" }}>{t.venStat1}</span>
          <span className="disp" style={{ fontSize: "96px", lineHeight: "0.9", fontWeight: "800", letterSpacing: "-0.04em" }}>0 €</span>
        </div>
        <div style={{ background: "#FFFFFF", borderRadius: "22px", padding: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <span className="mono" style={{ fontSize: "12px", color: "#4A4B7A" }}>{t.venStat2}</span>
          <span className="disp" style={{ fontSize: "32px", lineHeight: "1", fontWeight: "800", color: "#1B1C51" }}>Equity</span>
        </div>
        <div style={{ background: "#FFFFFF", borderRadius: "22px", padding: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <span className="mono" style={{ fontSize: "12px", color: "#4A4B7A" }}>{t.venStat3L}</span>
          <span className="disp" style={{ fontSize: "28px", lineHeight: "1", fontWeight: "800", color: "#1B1C51" }}>{t.venStat3}</span>
        </div>
      </div>
    </div>
  </section>

  {/* TEAM */}
  <section aria-labelledby="equipa-h" style={{ maxWidth: "1240px", margin: "0 auto", padding: "112px 24px 0" }}>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "40px", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "36px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "640px" }}>
        <span className="mono" style={{ fontSize: "13px", color: "var(--kicker)", letterSpacing: "0.04em" }}>{t.teamKicker}</span>
        <h2 id="equipa-h" className="disp sec-h" style={{ margin: "0", fontSize: "52px", lineHeight: "1.06", fontWeight: "800", letterSpacing: "-0.03em" }}>{t.teamTitle}</h2>
      </div>
      <p style={{ margin: "0", fontSize: "18px", lineHeight: "1.6", color: "var(--muted)", maxWidth: "440px" }}>{t.teamText}</p>
    </div>
    <div className="team-grid">
      <img className="span2 tall" src="/assets/team/tshirts.jpg" alt={t.altTshirts} style={{ objectPosition: "center 70%" }} />
      <img src="/assets/team/portrait-1.jpg" alt={t.altPortrait} style={{ objectPosition: "center 30%" }} />
      <img src="/assets/team/portrait-2.jpg" alt={t.altPortrait} style={{ objectPosition: "center 30%" }} />
      <img src="/assets/team/portrait-3.jpg" alt={t.altPortrait} style={{ objectPosition: "center 35%" }} />
      <img src="/assets/team/beagle.jpg" alt={t.altBeagle} style={{ objectPosition: "center 35%" }} />
      <img className="span2" src="/assets/team/team.jpg" alt={t.altTeam} style={{ objectPosition: "center 30%" }} />
      <img src="/assets/team/duo.jpg" alt={t.altDuo} style={{ objectPosition: "center 25%" }} />
      <img src="/assets/team/portrait-4.jpg" alt={t.altPortrait} style={{ objectPosition: "center 25%" }} />
    </div>
  </section>

  {/* INSIGHTS */}
  <section aria-labelledby="insights-h" style={{ maxWidth: "1240px", margin: "0 auto", padding: "112px 24px" }}>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "24px", marginBottom: "40px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "640px" }}>
        <span className="mono" style={{ fontSize: "13px", color: "var(--kicker)", letterSpacing: "0.04em" }}>// insights</span>
        <h2 id="insights-h" className="disp sec-h" style={{ margin: "0", fontSize: "52px", lineHeight: "1.06", fontWeight: "800", letterSpacing: "-0.03em" }}>{t.insTitle}</h2>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{ display: "flex" }} aria-hidden="true">
          <img src="/assets/avatars/pedro-gorrao.jpg" alt="" style={{ width: "52px", height: "52px", borderRadius: "50%", objectFit: "cover", objectPosition: "60% 20%", border: "3px solid var(--bg)", display: "block" }} />
          <img src="/assets/avatars/marco-mendao.jpg" alt="" style={{ width: "52px", height: "52px", borderRadius: "50%", objectFit: "cover", border: "3px solid var(--bg)", marginLeft: "-14px", display: "block" }} />
        </div>
        <div style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--muted)" }}>{t.insBy1}<br />{t.insBy2}</div>
      </div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
      {articles.map((a, aI) => (
<Fragment key={aI}>
        <Link className="card" href={links.insights} style={{ background: "var(--surface)", borderRadius: "22px", padding: "28px", gap: "44px", minHeight: "220px", boxSizing: "border-box", justifyContent: "space-between" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="mono" style={{ fontSize: "12px", background: "var(--card)", padding: "6px 10px", borderRadius: "999px" }}>{a.tag}</span>
            <span className="mono" style={{ fontSize: "12px", color: "var(--muted)" }}>{a.num}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <h3 className="disp" style={{ margin: "0", fontSize: "24px", lineHeight: "1.2", fontWeight: "700", letterSpacing: "-0.015em" }}>{a.title}</h3>
            <span style={{ fontWeight: "600", fontSize: "15px", display: "flex", alignItems: "center", gap: "8px" }}>{t.insRead} <span className="arrow" aria-hidden="true">→</span></span>
          </div>
        </Link>
      </Fragment>
))}
    </div>
    <div style={{ marginTop: "28px" }}>
      <Link href={links.insights} style={{ fontWeight: "600", fontSize: "16px", textUnderlineOffset: "5px", display: "inline-flex", minHeight: "44px", alignItems: "center" }}>{t.insAll}</Link>
    </div>
  </section>

  {/* FINAL CTA */}
  <section aria-labelledby="cta-h" style={{ padding: "0 24px 112px" }}>
    <div style={{ maxWidth: "1240px", margin: "0 auto", background: "var(--band)", color: "#FFFFFF", borderRadius: "32px", overflow: "hidden", display: "flex", flexWrap: "wrap", border: "1px solid var(--border)" }}>
      <div className="pad-sm" style={{ flex: "999 1 520px", minWidth: "0", padding: "72px 56px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "26px", alignItems: "flex-start" }}>
        <span className="mono" style={{ fontSize: "13px", color: "#FF8A7D" }}>{t.ctaKicker}</span>
        <h2 id="cta-h" className="disp sec-h" style={{ margin: "0", fontSize: "60px", lineHeight: "1.02", fontWeight: "800", letterSpacing: "-0.035em" }}>{t.ctaTitle}</h2>
        <p style={{ margin: "0", fontSize: "20px", lineHeight: "1.5", color: "#C9CAE6", maxWidth: "520px" }}>{t.ctaText}</p>
        <Link className="btn-coral" href={links.form} style={{ fontSize: "17px", padding: "0 30px", minHeight: "56px" }}>{t.ctaBtn} <span aria-hidden="true">→</span></Link>
      </div>
      <div style={{ flex: "1 1 360px", minHeight: "340px", position: "relative" }}>
        <img src="/assets/photos/hoodies.jpg" alt={t.altHoodies} style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 45%", display: "block" }} />
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
