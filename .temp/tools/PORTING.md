# Porting brief (shared by all page subagents)

Repo: /Users/menda0/Projects/betacode/betacode-site-v2 (Next.js 16 App Router, React 19, next-intl 4, next-themes, TypeScript).
Goal: port one prototype page so it renders **identical** to the prototype HTML (same markup structure, inline styles, classes, copy, animations).

## Sources of truth (read these first)
- Rules: `.temp/betacode-website/AGENT_PROMPT.md` and `.temp/betacode-website/IMPLEMENTATION.md` (read your page section + §1–§4, §7, §10, §11).
- Prototype source (template + `class Component extends DCLogic` logic + `<style>`): `.temp/betacode-website/docs/source/<Page>.dc.html`.
- Built HTML (use for asset paths and final markup): `.temp/betacode-website/<page>.html`.
- Screenshots: `.temp/betacode-website/docs/screenshots/` (and `docs/calculadora-precos/*.png` for pricing).
- **JSX draft** auto-converted from the template: `.temp/tools/jsx/<page>.jsx`. `{x}` refer to `renderVals()` keys; `css(...)` means a style string you must turn into a style object; `{/* {{ false }} */}` blocks are hidden in the prototype. Start from this draft.
- **Extracted copy/values**: `.temp/tools/out/<page>.<pt|en>.<light|dark>.json` = the exact `renderVals()` output for each language/theme. Copy MUST be verbatim from here (no rewording, no em dashes, never "seniores").
- **Scoped CSS is already generated**: `app/styles/pages/<page>.css` (all prototype rules scoped under `.pg-<page>`, keyframes renamed `pg-<page>-*`). Import it in your page (`import '@/app/styles/pages/<page>.css'`). Do not edit other CSS files. If you need extra CSS, append to your own page CSS file, scoped with `:where(.pg-<page>)`.

## Already done (do NOT re-implement or edit)
- Layout `app/[locale]/layout.tsx` renders `SiteHeader` + `{children}` + `SiteFooter` inside `.bc-root`. **Drop the `<header>` / NAV and `<footer>` parts of the draft.** Theme tokens (`--bg`, `--text`, `--muted`, `--surface`, `--card`, `--border`, ...) are set on `:root` / `:root.dark` in `app/styles/site.css`, with per-page overrides via `:root:has(.pg-home)` / `:root:has(.pg-pricing)`. So drop the draft's `rootStyle` token inline vars unless they contain something not in site.css (compare with `.temp/tools/out/<page>.pt.light.json` vs dark).
- Fonts: CSS vars `--font-montserrat`, `--font-inter`, `--font-jetbrains` (already used by the page CSS).
- Page root must be: `<main className="site pg-<page>">…</main>` (pg-home, pg-pricing, pg-ventures, pg-insights, pg-article, pg-contact).
- Theme: prototype toggles light/dark visuals via `{dark && …}` / `{light && …}` or theme-dependent values. Do NOT read the theme in render (hydration mismatch). Use CSS instead: render both variants with classes and hide via `:root.dark` / `:root:not(.dark)` rules in your page CSS, or use CSS variables. Only read `useTheme()` inside effects if unavoidable.
- Copy access (copy contains literal braces, so NO ICU / `useTranslations` for page copy):
  - Put your copy in `messages/pt/<ns>.json` and `messages/en/<ns>.json` (currently `{}` stubs; you own these two files). Structure as you like, keep strings verbatim.
  - Server: `import { getCopy, fill } from '@/lib/copy'` → `await getCopy<T>(locale, '<ns>')`. Client: `import { useCopy } from '@/lib/use-copy'` → `useCopy<T>('<ns>')`. Type with `typeof import('@/messages/pt/<ns>.json')` style: `import type ptX from '@/messages/pt/<ns>.json'`.
  - `fill(text, {n: 3})` replaces `{n}` placeholders.
  - Namespaces: home, pricing, ventures, insights, article, contact (yours), plus shared read-only: chrome, metadata, forms, notFound.
- Routes/links: `import { Link } from '@/i18n/navigation'` (locale-aware). Paths in `lib/site-routes.ts`: `SITE_ROUTES.{home,pricing,ventures,insights,contact}`, `VENTURES_APPLY_HREF` (`/betacode-ventures#candidatura`), `VENTURES_CASE_HREF` (`/betacode-ventures#coachid`), `articleHref(slug)`, `CONTACT_EMAIL`, `CONTACT_PHONE_DISPLAY`, `CONTACT_PHONE_TEL`, `CONTACT_MAPS_URL`. Draft links like `links.pricing` / `base` map to these. Prototype `*.dc.html` hrefs map to routes.
- Assets are in `public/assets/{brand,avatars,clients,funding,photos,team}`; draft already rewrote them to `/assets/...`. Use plain `<img>` (keep prototype sizing/object-position) or `next/image` only if pixel-identical; plain `<img>` is fine (add `loading="lazy"` below the fold, `alt` from copy). eslint may warn on `<img>`; add `/* eslint-disable @next/next/no-img-element */` at file top.
- Metadata: `lib/metadata.ts` has `createPageMetadata({ locale, path, title, description, ... })` (read it). Titles/descriptions are in `messages/<locale>/metadata.json` (read via `getCopy(locale,'metadata')`). Call `setRequestLocale(locale)` in pages (from `next-intl/server`).
- Forms (contact, pricing, ventures): `import { useContactSubmit } from '@/lib/use-contact-submit'` → `{ submit, error, sending }`; `submit(payload)` returns boolean. Payload types in `lib/contact-validation.ts` (`ContactSubmission`, discriminated on `source`: 'general' | 'price-calculator' | 'betacode-ventures'; every payload has `hp` honeypot string and `locale`). Use `HoneypotField` and `SubmitErrorMessage` from `@/app/components/shared/form-status`, and `useFormsCopy().sending` for the button label while sending. Validation patterns `EMAIL_PATTERN`, `WEBSITE_PATTERN`, `MESSAGE_MIN`, `MESSAGE_MAX` exported from `lib/contact-validation.ts`. Analytics helper `trackEvent(name, params)` from `lib/use-contact-submit`.
- Articles: `lib/insights/articles.ts` (`getArticles(locale)` newest first, `getArticle(slug, locale)`, `getRelatedArticles`, `getArticleSlugs`, `formatArticleDate(date, locale)` → "28 out 2026" / "Oct 28, 2026"), `lib/insights/taxonomy.ts` (`CATEGORIES[id].label[locale]` and `.cover` colour, `AUTHORS`, `usesVenturesCta`), `lib/insights/mdx.ts` (`getToc(body)`, `renderArticleBody(body, components)`; `##` headings get `id="s1"` and `data-n="01"`). Content in `content/insights/<slug>.<pt|en>.mdx` (do not edit content files).

## Hard rules
- Interactivity must match the prototype logic (read the `class Component` methods): timers, animations, tabs, filters, state machines. Respect `prefers-reduced-motion` (the CSS already contains the prototype's reduced-motion rules; for JS animations, check `matchMedia('(prefers-reduced-motion: reduce)')` and show the final state).
- Accessibility: keep aria attributes from the draft, `aria-pressed` on toggle buttons, visible focus, targets >= 44px, labels on inputs, `role="alert"` / `aria-live` for errors/status.
- No horizontal scroll at 360px width.
- No Tailwind classes on public pages. No new dependencies.
- Open points from IMPLEMENTATION.md §10 that touch your page: add a code comment `// TODO(betacode): <what needs deciding>` at the relevant place; keep the prototype behaviour.
- Server components by default; split interactive parts into `'use client'` components under `app/components/<page>/`.
- You own ONLY: `app/[locale]/<route>/**` for your route, `app/components/<page>/**`, `messages/{pt,en}/<ns>.json`, `app/styles/pages/<page>.css`. Do not edit anything else (no layout, header, footer, site.css, lib/*, other pages, package.json). If something shared is missing, work around it locally and report it.
- Old components in `app/components/*` (hero.tsx, services.tsx, blog/, ventures/, price-calculator.tsx, contact-form.tsx, ...) are legacy: do not import them; they will be deleted later. Your page file should no longer import legacy modules (`lib/blog-*`, `lib/pricing-calculator`, `lib/ventures-content`, `useTranslations` for page copy).
- Do not run `npm run build` or `npm run dev` (other agents work in parallel). Verify with `npx tsc --noEmit -p . 2>&1 | grep -E "<your paths>"` (errors in other files are expected and not yours) and `npx eslint <your files>`.
- Do not commit.

## Report back
Files created/changed, anything that deviates from the prototype and why, TODO(betacode) comments added, and anything shared you needed but could not change.
