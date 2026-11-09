---
id: T-MM-8849860d
type: task
title: Schema de Blog partilhado na listagem de Insights
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

A listagem de Insights já publica JSON-LD `Blog` inline, enquanto `createBlogSchema` não é usado. Passar a listagem a usar o helper, mantendo nome, descrição, identificador e idioma da página, e escapar `<` no componente `JsonLd`.

## Critérios de aceitação

- [x] `/insights` em PT e EN inclui um único bloco `application/ld+json` do tipo `Blog`, gerado por `createBlogSchema`.
- [x] O bloco mantém nome e descrição localizados, `@id`, idioma `pt-PT` ou `en-US`, e a lista de artigos.
- [x] `JsonLd` escapa `<` para o conteúdo não poder fechar a tag de script.

## Prompt & feedback

| When (UTC) | Kind | Author | Summary |
|------------|------|--------|---------|
| 2026-11-09T10:09:10Z | prompt | Marco Mendão | Plano "Melhorias de SEO técnico": ligar o schema de Blog que está por usar na listagem de Insights. |

## Commits

| SHA | Repo | Date (UTC) | Author | Message |
|-----|------|------------|--------|---------|

## Work log

| Actor | Started (UTC) | Ended (UTC) | Summary |
|-------|---------------|-------------|---------|
| Cursor agent | 2026-11-09T10:10:00Z | 2026-11-09T10:14:35Z | A listagem de Insights passou a usar createBlogSchema. Em /pt/insights há um único Blog em pt-PT com 7 artigos. JsonLd escapa <. |
