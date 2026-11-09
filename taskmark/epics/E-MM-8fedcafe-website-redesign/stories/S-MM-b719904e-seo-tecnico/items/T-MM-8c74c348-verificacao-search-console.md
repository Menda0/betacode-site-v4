---
id: T-MM-8c74c348
type: task
title: Documentar a verificação da Google Search Console
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

`lib/metadata.ts` já emite a meta tag de verificação quando `GOOGLE_SITE_VERIFICATION` está definida. A variável não aparece em `.env.example`. A criação da propriedade na Search Console e a submissão do sitemap ficam do lado de quem gere a conta.

## Critérios de aceitação

- [x] `.env.example` inclui `GOOGLE_SITE_VERIFICATION` vazia, com uma nota de que é opcional e vem da Search Console.
- [x] Sem a variável, o site não emite a meta tag de verificação.

## Prompt & feedback

| When (UTC) | Kind | Author | Summary |
|------------|------|--------|---------|
| 2026-11-09T10:09:10Z | prompt | Marco Mendão | Plano "Melhorias de SEO técnico": documentar a variável de verificação da Google e indicar o que configurar em produção. |

## Commits

| SHA | Repo | Date (UTC) | Author | Message |
|-----|------|------------|--------|---------|

## Work log

| Actor | Started (UTC) | Ended (UTC) | Summary |
|-------|---------------|-------------|---------|
| Cursor agent | 2026-11-09T10:10:00Z | 2026-11-09T10:14:35Z | GOOGLE_SITE_VERIFICATION documentada em .env.example. Sem o valor, /en não emite a meta tag. |
