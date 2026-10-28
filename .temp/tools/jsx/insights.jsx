
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
        <Link className="navlink on" href={links.insights} aria-current="page">Insights</Link>
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

  {/* HERO */}
  <section style={{ maxWidth: "1240px", margin: "0 auto", padding: "72px 24px 40px", display: "flex", flexWrap: "wrap", gap: "28px 56px", alignItems: "flex-end", justifyContent: "space-between" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "720px" }}>
      <span className="mono" style={{ fontSize: "13px", color: "var(--kicker)" }}>// insights</span>
      <h1 className="disp hero-h" style={{ margin: "0", fontSize: "60px", lineHeight: "1.04", fontWeight: "800", letterSpacing: "-0.035em" }}>{t.title}</h1>
      <p style={{ margin: "0", fontSize: "19px", lineHeight: "1.6", color: "var(--muted)" }}>{t.sub}</p>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
      <div style={{ display: "flex" }} aria-hidden="true">
        <img src="/assets/avatars/pedro-gorrao.jpg" alt="" style={{ width: "52px", height: "52px", borderRadius: "50%", objectFit: "cover", objectPosition: "60% 20%", border: "3px solid var(--bg)", display: "block" }} />
        <img src="/assets/avatars/marco-mendao.jpg" alt="" style={{ width: "52px", height: "52px", borderRadius: "50%", objectFit: "cover", border: "3px solid var(--bg)", marginLeft: "-14px", display: "block" }} />
      </div>
      <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--muted)" }}>{t.byLine1}<br />{t.byLine2}</span>
    </div>
  </section>

  {/* FILTERS */}
  <section aria-label={t.filterLabel} style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 24px 28px", display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", justifyContent: "space-between" }}>
    <div role="group" aria-label={t.filterLabel} style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {cats.map((c, cI) => (
<Fragment key={cI}>
        <button className="filter" aria-pressed={c.on} onClick={c.pick}>{c.label} <span className="n">{c.count}</span></button>
      </Fragment>
))}
    </div>
    <label className="search">
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: "var(--muted)", flex: "none" }}><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-3.5-3.5"></path></svg>
      <span style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}>{t.searchLabel}</span>
      <input type="search" value={q} onInput={onQ} placeholder={t.searchPh} />
    </label>
  </section>

  {/* ARTICLES */}
  <section aria-live="polite" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 24px 96px", display: "flex", flexDirection: "column", gap: "18px" }}>

    {hasFeat && (
<>
      <a className="card" href={feat.href} style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <div className="cover" style={{ flex: "1 1 420px", minHeight: "320px" }}>
          <span aria-hidden="true" className="mono" style={{ position: "absolute", right: "-10px", top: "-40px", fontSize: "260px", lineHeight: "1", fontWeight: "700", color: "rgba(255,255,255,0.07)" }}>{feat.glyph}</span>
          <span className="cover-code" aria-hidden="true" style={{ fontSize: "18px" }}>{feat.code}</span>
        </div>
        <div style={{ flex: "1 1 420px", minWidth: "0", padding: "36px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "16px", justifyContent: "center" }}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
            <span className="chip" style={{ background: "#EB5648", color: "#13143A", fontWeight: "700" }}>{t.featured}</span>
            <span className="chip">{feat.cat}</span>
            <span className="mono" style={{ fontSize: "12px", color: "var(--muted)" }}>{feat.mins}</span>
          </div>
          <h2 className="disp sec-h" style={{ margin: "0", fontSize: "36px", lineHeight: "1.12", fontWeight: "800", letterSpacing: "-0.02em" }}>{feat.title}</h2>
          <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "var(--muted)" }}>{feat.ex}</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap", paddingTop: "6px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img src={feat.av} alt="" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", objectPosition: `${feat.avPos}`, display: "block" }} />
              <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ fontSize: "14px", fontWeight: "600" }}>{feat.author}</span><span style={{ fontSize: "12px", color: "var(--muted)" }}>{feat.role}</span></span>
            </span>
            <span className="go" style={{ fontWeight: "700", fontSize: "15px", transition: "color .2s" }}>{t.read} →</span>
          </div>
        </div>
      </a>
    </>
)}

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "18px" }}>
      {rest.map((a, aI) => (
<Fragment key={aI}>
        <a className="card" href={a.href}>
          <div className="cover" style={{ height: "170px" }}>
            <span aria-hidden="true" className="mono" style={{ position: "absolute", right: "-6px", top: "-30px", fontSize: "160px", lineHeight: "1", fontWeight: "700", color: "rgba(255,255,255,0.07)" }}>{a.glyph}</span>
            <span className="cover-code" aria-hidden="true">{a.code}</span>
          </div>
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px", flex: "1" }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", justifyContent: "space-between" }}>
              <span className="chip">{a.cat}</span>
              <span className="mono" style={{ fontSize: "12px", color: "var(--muted)" }}>{a.mins}</span>
            </div>
            <h3 className="disp" style={{ margin: "0", fontSize: "21px", lineHeight: "1.22", fontWeight: "800", letterSpacing: "-0.01em" }}>{a.title}</h3>
            <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.55", color: "var(--muted)", flex: "1" }}>{a.ex}</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", borderTop: "1px solid var(--border)", paddingTop: "14px", marginTop: "4px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img src={a.av} alt="" style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover", objectPosition: `${a.avPos}`, display: "block" }} />
                <span style={{ fontSize: "13px", fontWeight: "600" }}>{a.author}</span>
              </span>
              <span className="go" style={{ fontWeight: "700", fontSize: "14px", transition: "color .2s" }}>{t.read} →</span>
            </div>
          </div>
        </a>
      </Fragment>
))}
    </div>

    {empty && (
<>
      <div style={{ border: "1.5px dashed var(--border2)", borderRadius: "22px", padding: "48px 24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "12px" }}>
        <span className="mono" aria-hidden="true" style={{ fontSize: "28px", color: "#EB5648", fontWeight: "700" }}>{'{'} {'}'}</span>
        <span className="disp" style={{ fontSize: "20px", fontWeight: "800" }}>{t.emptyTitle}</span>
        <span style={{ fontSize: "15px", color: "var(--muted)" }}>{t.emptyText}</span>
        <button className="filter" onClick={clear}>{t.clear}</button>
      </div>
    </>
)}
  </section>

  {/* CTAs */}
  <section style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 24px 104px", display: "flex", flexWrap: "wrap", gap: "18px" }}>
    <div style={{ flex: "1 1 440px", minWidth: "0", background: "var(--band)", color: "#fff", borderRadius: "26px", padding: "40px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>
      <span className="mono" style={{ fontSize: "13px", color: "#FF8A7D" }}>// betacode ventures</span>
      <h2 className="disp" style={{ margin: "0", fontSize: "30px", lineHeight: "1.12", fontWeight: "800", letterSpacing: "-0.02em" }}>{t.venTitle}</h2>
      <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#C9CAE6" }}>{t.venText}</p>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", paddingTop: "4px" }}>
        <Link className="btn-coral" href={links.ventures}>{t.venCta} <span aria-hidden="true">→</span></Link>
        <Link className="btn-line" href={links.ventures} style={{ color: "#fff" }}>{t.venCase}</Link>
      </div>
    </div>
    <div style={{ flex: "1 1 440px", minWidth: "0", background: "#EB5648", color: "#13143A", borderRadius: "26px", padding: "40px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>
      <span className="mono" style={{ fontSize: "13px", fontWeight: "500" }}>// {t.nextStep}</span>
      <h2 className="disp" style={{ margin: "0", fontSize: "30px", lineHeight: "1.12", fontWeight: "800", letterSpacing: "-0.02em" }}>{t.ctaTitle}</h2>
      <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", fontWeight: "500" }}>{t.ctaText}</p>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", paddingTop: "4px" }}>
        <Link href={links.contact} style={{ background: "#1B1C51", color: "#fff", textDecoration: "none", fontWeight: "600", fontSize: "15px", borderRadius: "12px", minHeight: "52px", padding: "0 24px", display: "inline-flex", alignItems: "center", gap: "10px" }}>{t.navContact} <span aria-hidden="true">→</span></Link>
        <Link href={links.pricing} style={{ border: "1.5px solid #13143A", color: "#13143A", textDecoration: "none", fontWeight: "600", fontSize: "15px", borderRadius: "12px", minHeight: "52px", padding: "0 22px", display: "inline-flex", alignItems: "center" }}>{t.ctaPrice}</Link>
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
