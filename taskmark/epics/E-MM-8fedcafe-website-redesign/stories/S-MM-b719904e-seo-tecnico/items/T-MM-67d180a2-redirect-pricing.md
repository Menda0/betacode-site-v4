---
id: T-MM-67d180a2
type: task
title: Redirect permanente de /pricing
status: done
priority: medium
size: XS
points: 1
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

`app/pricing/page.tsx` usa `redirect()` do Next, que responde 307. `/pricing` deve ir para `/en/pricing` com redirect permanente em `next.config.ts`, como os redirects de `/blog`.

## Critérios de aceitação

- [x] Um pedido a `/pricing` responde 308 para `/en/pricing`.
- [x] A rota deixa de depender de um redirect temporário no componente de página.

## Prompt & feedback

| When (UTC) | Kind | Author | Summary |
|------------|------|--------|---------|
| 2026-11-09T10:09:10Z | prompt | Marco Mendão | Plano "Melhorias de SEO técnico": tornar permanente o redirect de /pricing para /en/pricing. |

## Commits

| SHA | Repo | Date (UTC) | Author | Message |
|-----|------|------------|--------|---------|

## Work log

| Actor | Started (UTC) | Ended (UTC) | Summary |
|-------|---------------|-------------|---------|
| Cursor agent | 2026-11-09T10:10:00Z | 2026-11-09T10:14:35Z | /pricing passou a redirect 308 em next.config.ts. O componente temporário foi removido. Confirmado com e sem Accept-Language pt. |
