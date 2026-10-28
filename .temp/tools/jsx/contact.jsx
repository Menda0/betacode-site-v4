
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
        <Link className="btn-coral" href={links.contact} aria-current="page" style={{ minHeight: "44px", padding: "0 20px" }}>{t.navContact}</Link>
      </div>
    </nav>
  </header>

    {/* HERO + FORM */}
  <section style={{ maxWidth: "1240px", margin: "0 auto", padding: "72px 24px 88px", display: "flex", flexWrap: "wrap", gap: "48px 56px", alignItems: "flex-start" }}>

    {/* LEFT: intro + direct contacts */}
    <div style={{ flex: "1 1 400px", minWidth: "0", display: "flex", flexDirection: "column", gap: "28px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <span className="mono" style={{ fontSize: "13px", color: "var(--kicker)" }}>// {t.kicker}</span>
        <h1 className="disp hero-h" style={{ margin: "0", fontSize: "58px", lineHeight: "1.04", fontWeight: "800", letterSpacing: "-0.035em" }}>{t.title}</h1>
        <p style={{ margin: "0", fontSize: "19px", lineHeight: "1.6", color: "var(--muted)" }}>{t.sub}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div className="ccard">
          <span className="cic" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M3 7l9 6 9-6"></path></svg></span>
          <span style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1", minWidth: "0" }}>
            <span className="mono" style={{ fontSize: "12px", color: "var(--muted)" }}>email</span>
            <a href="mailto:info@betacode.tech" style={{ fontSize: "18px", fontWeight: "600", textDecoration: "none" }}>info@betacode.tech</a>
          </span>
          <button className="copy" onClick={copyEmail} aria-live="polite">{copyLabel}</button>
        </div>
        <a className="ccard" href="tel:+351919245764">
          <span className="cic" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"></path></svg></span>
          <span style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span className="mono" style={{ fontSize: "12px", color: "var(--muted)" }}>{t.phone}</span>
            <span style={{ fontSize: "18px", fontWeight: "600" }}>+351 919 245 764</span>
          </span>
        </a>
      </div>

      {/* MAP */}
      <a href="https://maps.google.com/?q=Madan+Parque,+Rua+dos+Inventores,+2825-182+Caparica" className="ccard" style={{ flexDirection: "column", gap: "0", padding: "0", overflow: "hidden" }}>
        <div style={{ position: "relative", height: "320px", width: "100%", background: `${map.ground}` }} role="img" aria-label={t.mapAlt}>
          <svg width="100%" height="100%" viewBox="110 10 720 430" preserveAspectRatio="xMidYMid slice" style={{ display: "block" }} aria-hidden="true">
            {/* green areas */}
            <g style={{ fill: `${map.green}` }}>
              <path d="M690 40 L836 30 L836 210 L760 240 L700 170 Z"></path>
              <path d="M560 250 L640 240 L660 300 L590 330 Z"></path>
              <path d="M400 120 L440 120 L470 200 L420 210 Z"></path>
              <circle cx="517" cy="517" r="18"></circle><circle cx="370" cy="88" r="14"></circle>
            </g>
            {/* FCT campus */}
            <path d="M130 108 L360 104 C400 140 450 190 500 250 C520 300 525 360 515 440 L500 500 L380 597 L130 597 Z" style={{ fill: `${map.campus}` }}></path>
            <g style={{ fill: `${map.bld}` }}>
              <rect x="150" y="120" width="40" height="90" rx="3"></rect><rect x="200" y="130" width="34" height="60" rx="3"></rect>
              <rect x="258" y="150" width="70" height="44" rx="3"></rect><rect x="300" y="200" width="44" height="30" rx="3"></rect>
              <rect x="150" y="240" width="60" height="26" rx="3"></rect><rect x="160" y="290" width="70" height="22" rx="3"></rect><rect x="230" y="250" width="60" height="22" rx="3"></rect>
              <rect x="310" y="310" width="80" height="28" rx="3"></rect><rect x="320" y="345" width="40" height="24" rx="3"></rect>
              <rect x="150" y="410" width="40" height="120" rx="3"></rect><rect x="210" y="430" width="34" height="100" rx="3"></rect><rect x="290" y="410" width="60" height="70" rx="3"></rect>
              <rect x="410" y="300" width="70" height="26" rx="3" transform="rotate(35 445 313)"></rect><rect x="420" y="360" width="60" height="24" rx="3" transform="rotate(35 450 372)"></rect><rect x="400" y="420" width="50" height="22" rx="3" transform="rotate(35 425 431)"></rect>
              <rect x="420" y="200" width="44" height="60" rx="3" transform="rotate(-20 442 230)"></rect>
            </g>
            {/* houses bottom-right */}
            <g style={{ fill: `${map.house}` }}>
              <rect x="590" y="380" width="120" height="18" rx="3" transform="rotate(-32 650 389)"></rect><rect x="600" y="420" width="130" height="18" rx="3" transform="rotate(-32 665 429)"></rect>
              <rect x="620" y="470" width="140" height="18" rx="3" transform="rotate(-32 690 479)"></rect><rect x="560" y="520" width="140" height="18" rx="3" transform="rotate(-32 630 529)"></rect>
              <rect x="720" y="330" width="120" height="16" rx="3" transform="rotate(-32 780 338)"></rect><rect x="740" y="390" width="110" height="16" rx="3" transform="rotate(-32 795 398)"></rect>
              <rect x="470" y="110" width="150" height="18" rx="3" transform="rotate(12 545 119)"></rect><rect x="500" y="140" width="110" height="16" rx="3" transform="rotate(12 555 148)"></rect>
              <rect x="760" y="460" width="80" height="16" rx="3" transform="rotate(-32 800 468)"></rect><rect x="690" y="540" width="120" height="16" rx="3" transform="rotate(-32 750 548)"></rect>
            </g>
            {/* streets */}
            <g style={{ stroke: `${map.street}` }} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M120 100 L120 597"></path>
              <path d="M548 232 L600 196 L690 232 L760 250"></path>
              <path d="M570 470 L700 300 L836 230"></path>
              <path d="M650 597 L836 310"></path>
              <path d="M540 597 L640 470"></path>
              <path d="M650 95 L700 170 L836 140"></path>
            </g>
            {/* main roads */}
            <g style={{ stroke: `${map.road}` }} strokeWidth="13" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M0 95 L354 89"></path>
              <path d="M386 89 C440 92 560 96 836 92"></path>
              <path d="M384 80 C460 64 560 40 700 10"></path>
              <path d="M382 100 C440 150 520 210 545 300 C560 360 545 440 520 499 M517 535 L517 597"></path>
            </g>
            <g style={{ fill: "none", stroke: `${map.road}` }} strokeWidth="9">
              <circle cx="370" cy="88" r="16"></circle><circle cx="517" cy="517" r="20"></circle>
            </g>
            <circle cx="370" cy="88" r="11.5" style={{ fill: `${map.green}` }}></circle><circle cx="517" cy="517" r="15.5" style={{ fill: `${map.green}` }}></circle>
            {/* road labels */}
            <g fontFamily="JetBrains Mono, monospace" fontSize="12" style={{ fill: `${map.label}`, paintOrder: "stroke", stroke: `${map.halo}`, strokeWidth: "4px" }}>
              <text x="520" y="52" transform="rotate(-12 520 52)">Al. Timor Lorosae</text>
              <text x="500" y="250" transform="rotate(62 500 250)">N377-1</text>
              <text x="612" y="380" transform="rotate(-50 612 380)">R. Lino Lima</text>
            </g>
            {/* FCT label */}
            <g fontFamily="Montserrat, sans-serif" style={{ fill: `${map.place}`, paintOrder: "stroke", stroke: `${map.halo}`, strokeWidth: "5px" }}>
              <text x="190" y="322" fontSize="20" fontWeight="800">FCT NOVA</text>
              <text x="190" y="341" fontSize="12" fontWeight="600" fontFamily="Inter, sans-serif">{t.mapFct}</text>
              <text x="250" y="140" fontSize="12" fontWeight="600" fontFamily="Inter, sans-serif">{t.mapLib}</text>
            </g>
            {/* Madan Parque */}
            <rect x="568" y="196" width="74" height="56" rx="8" transform="rotate(-18 605 224)" fill="#EB5648" opacity="0.18"></rect>
            <rect x="582" y="207" width="46" height="34" rx="4" transform="rotate(-18 605 224)" style={{ fill: `${map.madan}` }}></rect>
            <ellipse className="pulse" cx="605" cy="222" rx="12" ry="6" fill="#EB5648"></ellipse>
            <ellipse cx="605" cy="222" rx="7" ry="3" fill="#000" opacity="0.25"></ellipse>
            <g style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,.35))" }}>
              <path d="M605 221 C605 221 577 192 577 170 A28 28 0 0 1 633 170 C633 192 605 221 605 221 Z" fill="#D8402F" stroke="#fff" strokeWidth="3" strokeLinejoin="round"></path>
              <circle cx="605" cy="170" r="10" fill="#fff"></circle>
            </g>
            <g transform="translate(646 132)">
              <path d="M0 18 L-8 24 L0 30 Z" fill="#1B1C51"></path>
              <rect x="0" y="0" width="168" height="48" rx="12" fill="#1B1C51"></rect>
              <text x="14" y="21" fontFamily="Montserrat, sans-serif" fontSize="14" fontWeight="800" fill="#fff">Betacode</text>
              <text x="14" y="38" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#FF8A7D">Madan Parque</text>
            </g>
          </svg>
          <div style={{ position: "absolute", left: "14px", bottom: "14px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <span className="chip" style={{ background: "var(--card)", boxShadow: "0 2px 8px rgba(0,0,0,.12)" }}>{t.mapWalk}</span>
          </div>
        </div>
        <div style={{ padding: "20px", display: "flex", gap: "16px", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          <span style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span className="mono" style={{ fontSize: "12px", color: "var(--muted)" }}>{t.office}</span>
            <span style={{ fontSize: "16px", fontWeight: "600", lineHeight: "1.4" }}>Madan Parque, Rua dos Inventores<br />2825-182 Caparica, Portugal</span>
          </span>
          <span style={{ fontWeight: "700", fontSize: "14px", color: "var(--kicker)", whiteSpace: "nowrap" }}>{t.directions} →</span>
        </div>
      </a>
    </div>

    {/* RIGHT: form / success */}
    <div style={{ flex: "1 1 520px", minWidth: "0", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "28px", boxShadow: "0 30px 70px rgba(27,28,81,.10)", overflow: "hidden" }}>
      <div style={{ background: "#1B1C51", color: "#fff", padding: "16px 24px", display: "flex", alignItems: "center", gap: "12px" }}>
        <span aria-hidden="true" style={{ display: "flex", gap: "6px" }}><span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#EB5648" }}></span><span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FFC24B" }}></span><span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#3DDC97" }}></span></span>
        <span className="mono" style={{ fontSize: "13px", color: "#C9CAE6" }}>{termLine}<span className="caret" aria-hidden="true"></span></span>
      </div>

      {editing && (
<>
        <form onSubmit={submit} noValidate style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "22px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <h2 className="disp" style={{ margin: "0", fontSize: "28px", lineHeight: "1.15", fontWeight: "800", letterSpacing: "-0.02em" }}>{t.formTitle}</h2>
            <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.55", color: "var(--muted)" }}>{t.formSub}</p>
          </div>

          <fieldset style={{ border: "0", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "10px" }}>
            <legend className="lbl" style={{ padding: "0", marginBottom: "10px" }}>{t.topicLabel}</legend>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {topics.map((tp, tpI) => (
<Fragment key={tpI}>
                <button type="button" className="topic" aria-pressed={tp.on} onClick={tp.pick}><span className="ic" aria-hidden="true">{tp.ic}</span>{tp.label}</button>
              </Fragment>
))}
            </div>
          </fieldset>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            <div className="field" style={{ flex: "1 1 220px" }}>
              <label htmlFor="c-name">{t.name}</label>
              <input id="c-name" className="inp" autoComplete="name" value={f.name} onInput={on.name} placeholder={t.namePh} aria-invalid={inv.name} />
              {er.name && (
<><span className="err" role="alert">{t.errName}</span></>
)}
            </div>
            <div className="field" style={{ flex: "1 1 220px" }}>
              <label htmlFor="c-email">Email</label>
              <input id="c-email" className="inp" type="email" autoComplete="email" value={f.email} onInput={on.email} placeholder={t.emailPh} aria-invalid={inv.email} />
              {er.email && (
<><span className="err" role="alert">{t.errEmail}</span></>
)}
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            <div className="field" style={{ flex: "1 1 220px" }}>
              <label htmlFor="c-phone">{t.phoneL}<span className="opt">{t.optional}</span></label>
              <input id="c-phone" className="inp" type="tel" autoComplete="tel" value={f.phone} onInput={on.phone} placeholder="+351 9XX XXX XXX" />
            </div>
            <div className="field" style={{ flex: "1 1 220px" }}>
              <label htmlFor="c-company">{t.company}<span className="opt">{t.optional}</span></label>
              <input id="c-company" className="inp" autoComplete="organization" value={f.company} onInput={on.company} placeholder={t.companyPh} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="c-msg">{t.msg}</label>
            <textarea id="c-msg" className="inp" onInput={on.msg} value={f.msg} placeholder={msgPh} aria-invalid={inv.msg}></textarea>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
              {er.msg && (
<><span className="err" role="alert">{t.errMsg}</span></>
)}
              <span className="mono" style={{ fontSize: "12px", color: "var(--muted)", marginLeft: "auto" }}>{msgCount}</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", paddingTop: "4px" }}>
            <span style={{ fontSize: "13px", lineHeight: "1.5", color: "var(--muted)", flex: "1 1 240px" }}>{t.privacy}</span>
            <button type="submit" className="btn-coral" style={{ minWidth: "200px" }}>{t.send} <span aria-hidden="true">→</span></button>
          </div>
        </form>
      </>
)}

      {sent && (
<>
        <div role="status" style={{ padding: "44px 32px", display: "flex", flexDirection: "column", gap: "22px", alignItems: "flex-start" }}>
          <span className="pop" aria-hidden="true" style={{ width: "64px", height: "64px", borderRadius: "20px", background: "#EB5648", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg></span>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <h2 className="disp" style={{ margin: "0", fontSize: "30px", lineHeight: "1.15", fontWeight: "800", letterSpacing: "-0.02em" }}>{okTitle}</h2>
            <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "var(--muted)" }}>{okText}</p>
          </div>
          <ol style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "0", width: "100%" }}>
            {steps.map((st, stI) => (
<Fragment key={stI}>
              <li style={{ display: "flex", gap: "16px", padding: "16px 0", borderTop: "1px solid var(--border)" }}>
                <span className="mono" style={{ fontSize: "13px", fontWeight: "700", color: "var(--kicker)", whiteSpace: "nowrap", paddingTop: "2px" }}>{st.n}</span>
                <span style={{ display: "flex", flexDirection: "column", gap: "4px" }}><span style={{ fontWeight: "600", fontSize: "15px" }}>{st.h}</span><span style={{ fontSize: "14px", lineHeight: "1.5", color: "var(--muted)" }}>{st.x}</span></span>
              </li>
            </Fragment>
))}
          </ol>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <a className="btn-coral" href="Insights.dc.html">{t.okRead} <span aria-hidden="true">→</span></a>
            <button className="btn-line" onClick={reset} style={{ color: "var(--text)" }}>{t.okAgain}</button>
          </div>
        </div>
      </>
)}
    </div>
  </section>

  {/* OTHER WAYS */}
  <section style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 24px 104px", display: "flex", flexDirection: "column", gap: "24px" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <span className="mono" style={{ fontSize: "13px", color: "var(--kicker)" }}>// {t.otherK}</span>
      <h2 className="disp sec-h" style={{ margin: "0", fontSize: "38px", lineHeight: "1.1", fontWeight: "800", letterSpacing: "-0.025em" }}>{t.otherTitle}</h2>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "18px" }}>
      <a href="Ventures.dc.html" style={{ flex: "1 1 440px", minWidth: "0", background: "var(--band)", color: "#fff", borderRadius: "26px", padding: "36px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "14px", textDecoration: "none" }}>
        <span className="mono" style={{ fontSize: "13px", color: "#FF8A7D" }}>// betacode ventures</span>
        <span className="disp" style={{ fontSize: "26px", lineHeight: "1.15", fontWeight: "800", letterSpacing: "-0.02em", color: "#fff" }}>{t.venTitle}</span>
        <span style={{ fontSize: "16px", lineHeight: "1.6", color: "#C9CAE6" }}>{t.venText}</span>
        <span style={{ fontWeight: "700", fontSize: "15px", color: "#FF8A7D", paddingTop: "4px" }}>{t.venCta} →</span>
      </a>
      <a href="Pricing.dc.html" style={{ flex: "1 1 440px", minWidth: "0", background: "#EB5648", color: "#13143A", borderRadius: "26px", padding: "36px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "14px", textDecoration: "none" }}>
        <span className="mono" style={{ fontSize: "13px", fontWeight: "500", color: "#13143A" }}>// {t.calcK}</span>
        <span className="disp" style={{ fontSize: "26px", lineHeight: "1.15", fontWeight: "800", letterSpacing: "-0.02em", color: "#13143A" }}>{t.calcTitle}</span>
        <span style={{ fontSize: "16px", lineHeight: "1.6", fontWeight: "500", color: "#13143A" }}>{t.calcText}</span>
        <span style={{ fontWeight: "700", fontSize: "15px", color: "#13143A", paddingTop: "4px" }}>{t.calcCta} →</span>
      </a>
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
