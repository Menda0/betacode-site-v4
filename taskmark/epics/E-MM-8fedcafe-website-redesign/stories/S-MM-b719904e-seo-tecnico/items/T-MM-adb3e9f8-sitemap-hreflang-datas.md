---
id: T-MM-adb3e9f8
type: task
title: Sitemap com idiomas alternativos e datas estáveis
status: done
priority: medium
size: S
points: 3
parent: S-MM-b719904e
epic: E-MM-8fedcafe
reporters:
  - name: "Marco Mendão"
    email: "marco.mendao@betacode.tech"
    initials: "MM"
resolvers:
  - name: "Marco Mendão"
    email: "marco.mendao@betacode.tech"
    initials: "MM"
blocked: false
cancelled: false
tags:
  - seo
created: 2026-11-09
updated: 2026-11-09T10:14:35Z
started_at: 2026-11-09T10:10:00Z
completed_at: 2026-11-09T10:14:35Z
---

## Descrição

Cada URL de `app/sitemap.ts` deve declarar as alternativas `en`, `pt` e `x-default`. As páginas estáticas deixam de usar a data da build; os artigos mantêm a data do frontmatter.

## Critérios de aceitação

- [x] Cada entrada do sitemap tem `alternates.languages` para `en`, `pt` e `x-default`.
- [x] `lastModified` das páginas estáticas é uma data fixa, igual entre builds sem alteração de conteúdo.
- [x] Os artigos continuam a entrar no sitemap com a data de publicação e o mesmo slug nos dois idiomas.

## Prompt & feedback

| When (UTC) | Kind | Author | Summary |
|------------|------|--------|---------|
| 2026-11-09T10:09:10Z | prompt | Marco Mendão | Plano "Melhorias de SEO técnico": hreflang e datas reais no sitemap. Não apagar imagens não usadas em public/images. |

## Commits

| SHA | Repo | Date (UTC) | Author | Message |
|-----|------|------------|--------|---------|

## Work log

| Actor | Started (UTC) | Ended (UTC) | Summary |
|-------|---------------|-------------|---------|
| Cursor agent | 2026-11-09T10:10:00Z | 2026-11-09T10:14:35Z | Sitemap com hreflang en, pt e x-default. Páginas estáticas com lastmod 2026-10-29; artigos com a data de publicação. Build gerou 24 URLs e 72 xhtml:link. |
