---
id: T-MM-f256870c
type: task
title: Artigos em MDX e página de artigo do redesign
status: done
priority: high
size: L
points: 8
parent: E-MM-8fedcafe
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
  - redesign
  - insights
created: 2026-10-28
updated: 2026-10-28T23:32:00Z
started_at: 2026-10-28T17:29:23Z
completed_at: 2026-10-28T18:09:47Z
---

## Descrição

Migrar os 7 artigos do objeto `ART` de `Article.dc.html` para MDX (um ficheiro por artigo e por língua) e reconstruir a página de artigo: breadcrumb, categoria, H1, lead, autor, capa gerada, índice sticky com âncoras `#s1`…, "Em resumo", cartão do autor, CTA por categoria e "Continue a ler" com 2 relacionados.

## Critérios de aceitação

- [x] 14 ficheiros MDX com o frontmatter do §6 e a copy idêntica ao protótipo.
- [x] Índice gerado a partir dos H2 com âncoras `#s1`, `#s2`….
- [x] CTA para Ventures nas categorias Ventures e Startups e para contacto nas restantes.
- [x] Metadata com lead como descrição, Open Graph, hreflang e JSON-LD `Article`.

## Prompt & feedback

| When (UTC) | Kind | Author | Summary |
|------------|------|--------|---------|
| 2026-10-28T17:29:23Z | prompt | Marco Mendão | Tarefa criada a partir do plano Cursor "Betacode website redesign" para implementar o redesign do protótipo. |
| 2026-10-28T18:09:47Z | prompt | Marco Mendão | /tkmd-save-do do plano "Betacode website redesign": implementar todo o redesign com a interface igual ao protótipo HTML. |
| 2026-10-28T23:32:00Z | prompt | Marco Mendão | No artigo sobre software legacy, trocar o callout de exemplo da Coach ID pelo caso da Evolve RH: o software já existia, a gestão dos envios de recibos de vencimento tinha lacunas, e um módulo claro foi isolado e reescrito. |

## Commits

| SHA | Repo | Date (UTC) | Author | Message |
|-----|------|------------|--------|---------|

## Work log

| Actor | Started (UTC) | Ended (UTC) | Summary |
|-------|---------------|-------------|---------|
| Cursor agent | 2026-10-28T17:29:23Z | 2026-10-28T18:09:47Z | 14 ficheiros MDX gerados da copy do protótipo, biblioteca `lib/insights`, H2 numerados com índice e scroll spy, CTA por categoria, artigos relacionados, imagem OG e JSON-LD BlogPosting. |
