import { CONTACT_MAPS_URL } from '@/lib/site-routes'

type MapCopy = {
  mapAlt: string
  mapFct: string
  mapLib: string
  mapWalk: string
  office: string
  addressLine1: string
  addressLine2: string
  directions: string
}

const MONO = 'var(--font-jetbrains), monospace'
const DISP = 'var(--font-montserrat), sans-serif'
const BODY = 'var(--font-inter), sans-serif'

/** Illustrated SVG map of Madan Parque; colours come from the `--map-*` vars in contact.css. */
export function ContactMap({ t }: { t: MapCopy }) {
  return (
    <a href={CONTACT_MAPS_URL} className="ccard" style={{ flexDirection: 'column', gap: 0, padding: 0, overflow: 'hidden' }}>
      <div className="map-frame" style={{ position: 'relative', height: 320, width: '100%', background: 'var(--map-ground)' }} role="img" aria-label={t.mapAlt}>
        <svg width="100%" height="100%" viewBox="110 10 720 430" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }} aria-hidden="true">
          {/* green areas */}
          <g style={{ fill: 'var(--map-green)' }}>
            <path d="M690 40 L836 30 L836 210 L760 240 L700 170 Z"></path>
            <path d="M560 250 L640 240 L660 300 L590 330 Z"></path>
            <path d="M400 120 L440 120 L470 200 L420 210 Z"></path>
            <circle cx="517" cy="517" r="18"></circle><circle cx="370" cy="88" r="14"></circle>
          </g>
          {/* FCT campus */}
          <path d="M130 108 L360 104 C400 140 450 190 500 250 C520 300 525 360 515 440 L500 500 L380 597 L130 597 Z" style={{ fill: 'var(--map-campus)' }}></path>
          <g style={{ fill: 'var(--map-bld)' }}>
            <rect x="150" y="120" width="40" height="90" rx="3"></rect><rect x="200" y="130" width="34" height="60" rx="3"></rect>
            <rect x="258" y="150" width="70" height="44" rx="3"></rect><rect x="300" y="200" width="44" height="30" rx="3"></rect>
            <rect x="150" y="240" width="60" height="26" rx="3"></rect><rect x="160" y="290" width="70" height="22" rx="3"></rect><rect x="230" y="250" width="60" height="22" rx="3"></rect>
            <rect x="310" y="310" width="80" height="28" rx="3"></rect><rect x="320" y="345" width="40" height="24" rx="3"></rect>
            <rect x="150" y="410" width="40" height="120" rx="3"></rect><rect x="210" y="430" width="34" height="100" rx="3"></rect><rect x="290" y="410" width="60" height="70" rx="3"></rect>
            <rect x="410" y="300" width="70" height="26" rx="3" transform="rotate(35 445 313)"></rect><rect x="420" y="360" width="60" height="24" rx="3" transform="rotate(35 450 372)"></rect><rect x="400" y="420" width="50" height="22" rx="3" transform="rotate(35 425 431)"></rect>
            <rect x="420" y="200" width="44" height="60" rx="3" transform="rotate(-20 442 230)"></rect>
          </g>
          {/* houses bottom-right */}
          <g style={{ fill: 'var(--map-house)' }}>
            <rect x="590" y="380" width="120" height="18" rx="3" transform="rotate(-32 650 389)"></rect><rect x="600" y="420" width="130" height="18" rx="3" transform="rotate(-32 665 429)"></rect>
            <rect x="620" y="470" width="140" height="18" rx="3" transform="rotate(-32 690 479)"></rect><rect x="560" y="520" width="140" height="18" rx="3" transform="rotate(-32 630 529)"></rect>
            <rect x="720" y="330" width="120" height="16" rx="3" transform="rotate(-32 780 338)"></rect><rect x="740" y="390" width="110" height="16" rx="3" transform="rotate(-32 795 398)"></rect>
            <rect x="470" y="110" width="150" height="18" rx="3" transform="rotate(12 545 119)"></rect><rect x="500" y="140" width="110" height="16" rx="3" transform="rotate(12 555 148)"></rect>
            <rect x="760" y="460" width="80" height="16" rx="3" transform="rotate(-32 800 468)"></rect><rect x="690" y="540" width="120" height="16" rx="3" transform="rotate(-32 750 548)"></rect>
          </g>
          {/* streets */}
          <g style={{ stroke: 'var(--map-street)' }} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M120 100 L120 597"></path>
            <path d="M548 232 L600 196 L690 232 L760 250"></path>
            <path d="M570 470 L700 300 L836 230"></path>
            <path d="M650 597 L836 310"></path>
            <path d="M540 597 L640 470"></path>
            <path d="M650 95 L700 170 L836 140"></path>
          </g>
          {/* main roads */}
          <g style={{ stroke: 'var(--map-road)' }} strokeWidth="13" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M0 95 L354 89"></path>
            <path d="M386 89 C440 92 560 96 836 92"></path>
            <path d="M384 80 C460 64 560 40 700 10"></path>
            <path d="M382 100 C440 150 520 210 545 300 C560 360 545 440 520 499 M517 535 L517 597"></path>
          </g>
          <g style={{ fill: 'none', stroke: 'var(--map-road)' }} strokeWidth="9">
            <circle cx="370" cy="88" r="16"></circle><circle cx="517" cy="517" r="20"></circle>
          </g>
          <circle cx="370" cy="88" r="11.5" style={{ fill: 'var(--map-green)' }}></circle><circle cx="517" cy="517" r="15.5" style={{ fill: 'var(--map-green)' }}></circle>
          {/* road labels */}
          <g fontSize="12" style={{ fontFamily: MONO, fill: 'var(--map-label)', paintOrder: 'stroke', stroke: 'var(--map-halo)', strokeWidth: '4px' }}>
            <text x="520" y="52" transform="rotate(-12 520 52)">Al. Timor Lorosae</text>
            <text x="500" y="250" transform="rotate(62 500 250)">N377-1</text>
            <text x="612" y="380" transform="rotate(-50 612 380)">R. Lino Lima</text>
          </g>
          {/* FCT label. Narrow maps crop the viewBox sides, so a second pair sits further inside. */}
          <g style={{ fontFamily: DISP, fill: 'var(--map-place)', paintOrder: 'stroke', stroke: 'var(--map-halo)', strokeWidth: '5px' }}>
            <g className="map-fct-lg">
              <text x="190" y="322" fontSize="20" fontWeight="800">FCT NOVA</text>
              <text x="190" y="341" fontSize="12" fontWeight="600" style={{ fontFamily: BODY }}>{t.mapFct}</text>
            </g>
            <g className="map-fct-sm">
              <text x="278" y="322" fontSize="20" fontWeight="800">FCT NOVA</text>
              <text x="278" y="341" fontSize="12" fontWeight="600" style={{ fontFamily: BODY }}>{t.mapFct}</text>
            </g>
            <text className="map-lib-lg" x="250" y="140" fontSize="12" fontWeight="600" style={{ fontFamily: BODY }}>{t.mapLib}</text>
            <text className="map-lib-sm" x="300" y="140" fontSize="12" fontWeight="600" style={{ fontFamily: BODY }}>{t.mapLib}</text>
          </g>
          {/* Madan Parque */}
          <rect x="568" y="196" width="74" height="56" rx="8" transform="rotate(-18 605 224)" fill="#EB5648" opacity="0.18"></rect>
          <rect x="582" y="207" width="46" height="34" rx="4" transform="rotate(-18 605 224)" style={{ fill: 'var(--map-madan)' }}></rect>
          <ellipse className="pulse" cx="605" cy="222" rx="12" ry="6" fill="#EB5648"></ellipse>
          <ellipse cx="605" cy="222" rx="7" ry="3" fill="#000" opacity="0.25"></ellipse>
          <g style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,.35))' }}>
            <path d="M605 221 C605 221 577 192 577 170 A28 28 0 0 1 633 170 C633 192 605 221 605 221 Z" fill="#D8402F" stroke="#fff" strokeWidth="3" strokeLinejoin="round"></path>
            <circle cx="605" cy="170" r="10" fill="#fff"></circle>
          </g>
          <g className="map-callout-lg" transform="translate(646 132)">
            <path d="M0 18 L-8 24 L0 30 Z" fill="#1B1C51"></path>
            <rect x="0" y="0" width="168" height="48" rx="12" fill="#1B1C51"></rect>
            <text x="14" y="21" fontSize="14" fontWeight="800" fill="#fff" style={{ fontFamily: DISP }}>Betacode</text>
            <text x="14" y="38" fontSize="11" fill="#FF8A7D" style={{ fontFamily: MONO }}>Madan Parque</text>
          </g>
          <g className="map-callout-sm" transform="translate(388 132)">
            <path d="M168 18 L176 24 L168 30 Z" fill="#1B1C51"></path>
            <rect x="0" y="0" width="168" height="48" rx="12" fill="#1B1C51"></rect>
            <text x="14" y="21" fontSize="14" fontWeight="800" fill="#fff" style={{ fontFamily: DISP }}>Betacode</text>
            <text x="14" y="38" fontSize="11" fill="#FF8A7D" style={{ fontFamily: MONO }}>Madan Parque</text>
          </g>
        </svg>
        <div style={{ position: 'absolute', left: 14, bottom: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span className="chip" style={{ background: 'var(--card)', boxShadow: '0 2px 8px rgba(0,0,0,.12)' }}>{t.mapWalk}</span>
        </div>
      </div>
      <div style={{ padding: 20, display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>{t.office}</span>
          <span style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.4 }}>{t.addressLine1}<br />{t.addressLine2}</span>
        </span>
        <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--kicker)', whiteSpace: 'nowrap' }}>{t.directions} →</span>
      </div>
    </a>
  )
}
