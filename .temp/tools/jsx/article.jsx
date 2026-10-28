
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
        <a className="navlink on" href="/Insights.dc.html">Insights</a>
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

  {/* ARTICLE HEADER */}
  <article>
    <header style={{ maxWidth: "1040px", margin: "0 auto", padding: "48px 24px 0", display: "flex", flexDirection: "column", gap: "22px" }}>
      <nav aria-label={t.crumbs} style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "14px", color: "var(--muted)" }}>
        <a href="/Insights.dc.html" style={{ color: "var(--muted) !important", textDecoration: "none", minHeight: "32px", display: "inline-flex", alignItems: "center" }}>← Insights</a>
        <span aria-hidden="true">/</span>
        <span>{a.cat}</span>
      </nav>
      <h1 className="disp hero-h" style={{ margin: "0", fontSize: "52px", lineHeight: "1.08", fontWeight: "800", letterSpacing: "-0.03em", maxWidth: "900px" }}>{a.title}</h1>
      <p style={{ margin: "0", fontSize: "21px", lineHeight: "1.55", color: "var(--muted)", maxWidth: "820px" }}>{a.lead}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "14px 24px", alignItems: "center", paddingTop: "4px" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src={au.av} alt="" style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", objectPosition: `${au.pos}`, display: "block" }} />
          <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ fontSize: "15px", fontWeight: "700" }}>{au.name}</span><span style={{ fontSize: "13px", color: "var(--muted)" }}>{au.role}</span></span>
        </span>
        <span className="mono" style={{ fontSize: "13px", color: "var(--muted)" }}>{a.date} · {a.mins}</span>
      </div>
      <div className="cover" aria-hidden="true" style={{ height: "320px", borderRadius: "26px", marginTop: "10px" }}>
        <span className="mono" style={{ position: "absolute", right: "-10px", top: "-50px", fontSize: "300px", lineHeight: "1", fontWeight: "700", color: "rgba(255,255,255,0.07)" }}>{a.glyph}</span>
        <span className="cover-code">{a.code}</span>
      </div>
    </header>

    {/* BODY */}
    <div style={{ maxWidth: "1040px", margin: "0 auto", padding: "48px 24px 72px", display: "flex", flexWrap: "wrap", gap: "40px", alignItems: "flex-start" }}>
      <aside style={{ flex: "1 1 220px", minWidth: "0", maxWidth: "100%", display: "flex", flexDirection: "column", gap: "20px" }}>
        <nav className="toc" aria-label={t.toc} style={{ display: "flex", flexDirection: "column" }}>
          <span className="mono" style={{ fontSize: "12px", color: "var(--kicker)", paddingBottom: "6px" }}>{t.toc}</span>
          {toc.map((s, sI) => (
<Fragment key={sI}>
            <a href={s.href}><span className="mono" style={{ color: "#EB5648", fontSize: "12px", paddingTop: "2px" }}>{s.n}</span>{s.x}</a>
          </Fragment>
))}
        </nav>
        <div style={{ background: "var(--surface)", borderRadius: "18px", padding: "18px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <span className="mono" style={{ fontSize: "12px", color: "var(--kicker)" }}>{t.keyTake}</span>
          {a.take.map((k, kI) => (
<Fragment key={kI}>
            <span style={{ display: "flex", gap: "8px", fontSize: "14px", lineHeight: "1.5" }}><span className="mono" aria-hidden="true" style={{ color: "#EB5648", fontWeight: "700" }}>{'{'} {'}'}</span>{k}</span>
          </Fragment>
))}
        </div>
      </aside>

      <div className="prose" style={{ flex: "999 1 560px", minWidth: "0", display: "flex", flexDirection: "column", gap: "20px" }}>
        {blocks.map((b, bI) => (
<Fragment key={bI}>
          {b.isH && (
<><h2 id={b.id}><span className="mono" aria-hidden="true" style={{ color: "#EB5648", fontSize: "18px", fontWeight: "700", marginRight: "10px" }}>{b.n}</span>{b.x}</h2></>
)}
          {b.isP && (
<><p>{b.x}</p></>
)}
          {b.isUl && (
<><ul>{b.items.map((i, iI) => (
<Fragment key={iI}><li>{i}</li></Fragment>
))}</ul></>
)}
          {b.isOl && (
<><ol>{b.items.map((i, iI) => (
<Fragment key={iI}><li>{i}</li></Fragment>
))}</ol></>
)}
          {b.isQ && (
<>
            <blockquote style={{ margin: "8px 0", padding: "4px 0 4px 24px", borderLeft: "4px solid #EB5648", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "24px", lineHeight: "1.35", fontWeight: "700", letterSpacing: "-0.01em" }}>{b.x}</blockquote>
          </>
)}
          {b.isNote && (
<>
            <div style={{ background: "var(--surface)", borderRadius: "18px", padding: "20px 22px", display: "flex", gap: "14px", fontSize: "16px", lineHeight: "1.6" }}>
              <span className="mono" aria-hidden="true" style={{ color: "#EB5648", fontWeight: "700", fontSize: "16px" }}>//</span>
              <span style={{ display: "flex", flexDirection: "column", gap: "4px" }}><strong style={{ fontSize: "15px" }}>{b.h}</strong><span style={{ color: "var(--muted)" }}>{b.x}</span></span>
            </div>
          </>
)}
        </Fragment>
))}

        {/* author card */}
        <div style={{ marginTop: "24px", border: "1px solid var(--border)", borderRadius: "22px", padding: "24px", display: "flex", gap: "18px", alignItems: "center", flexWrap: "wrap" }}>
          <img src={au.av} alt={au.name} style={{ width: "72px", height: "72px", borderRadius: "50%", objectFit: "cover", objectPosition: `${au.pos}`, display: "block" }} />
          <div style={{ flex: "1 1 260px", display: "flex", flexDirection: "column", gap: "4px" }}>
            <span className="mono" style={{ fontSize: "12px", color: "var(--kicker)" }}>{t.writtenBy}</span>
            <span className="disp" style={{ fontSize: "19px", fontWeight: "800" }}>{au.name}</span>
            <span style={{ fontSize: "15px", lineHeight: "1.5", color: "var(--muted)" }}>{au.bio}</span>
          </div>
        </div>
      </div>
    </div>
  </article>

  {/* CTA */}
  <section style={{ maxWidth: "1040px", margin: "0 auto", padding: "0 24px 72px" }}>
    <div style={{ background: "var(--band)", color: "#fff", borderRadius: "26px", padding: "40px", display: "flex", flexWrap: "wrap", gap: "20px 32px", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ flex: "1 1 380px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <span className="mono" style={{ fontSize: "13px", color: "#FF8A7D" }}>{cta.k}</span>
        <h2 className="disp" style={{ margin: "0", fontSize: "30px", lineHeight: "1.12", fontWeight: "800", letterSpacing: "-0.02em" }}>{cta.h}</h2>
        <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#C9CAE6" }}>{cta.p}</p>
      </div>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <a className="btn-coral" href={cta.href}>{cta.btn} <span aria-hidden="true">→</span></a>
        <Link className="btn-line" href={links.pricing} style={{ color: "#fff" }}>{t.estimate}</Link>
      </div>
    </div>
  </section>

  {/* RELATED */}
  <section aria-labelledby="rel-h" style={{ background: "var(--surface)" }}>
    <div style={{ maxWidth: "1040px", margin: "0 auto", padding: "72px 24px", display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "16px", flexWrap: "wrap" }}>
        <h2 id="rel-h" className="disp" style={{ margin: "0", fontSize: "32px", fontWeight: "800", letterSpacing: "-0.02em" }}>{t.related}</h2>
        <a href="/Insights.dc.html" style={{ fontWeight: "600", fontSize: "15px", textUnderlineOffset: "4px", minHeight: "44px", display: "inline-flex", alignItems: "center" }}>{t.all} →</a>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
        {related.map((r, rI) => (
<Fragment key={rI}>
          <a className="rel" href={r.href}>
            <div className="cover" aria-hidden="true" style={{ height: "130px", padding: "20px" }}><span className="cover-code" style={{ fontSize: "14px" }}>{r.code}</span></div>
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}><span className="chip">{r.cat}</span><span className="mono" style={{ fontSize: "12px", color: "var(--muted)" }}>{r.mins}</span></div>
              <span className="disp" style={{ fontSize: "19px", lineHeight: "1.25", fontWeight: "800" }}>{r.title}</span>
              <span style={{ fontSize: "14px", fontWeight: "700" }}>{t.read} →</span>
            </div>
          </a>
        </Fragment>
))}
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
            <a className="flink" href="/Insights.dc.html">Insights</a>
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
