---
id: T-MM-82660c8b
type: task
title: Imagens da homepage com tamanho reservado
status: done
priority: medium
size: M
points: 5
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
  - performance
created: 2026-11-09
updated: 2026-11-09T10:14:35Z
started_at: 2026-11-09T10:10:00Z
completed_at: 2026-11-09T10:14:35Z
---

## Descrição

As fotografias e logótipos da homepage usam `<img>` sem largura e altura intrínsecas. As fotografias grandes (equipa e bloco final) passam a `next/image`; logótipos e avatares ganham largura e altura. Não apagar ficheiros em `public/images`.

## Critérios de aceitação

- [x] Cada imagem visível da homepage tem `width` e `height`, ou `fill` dentro de um contentor com tamanho.
- [x] As fotografias da equipa e a fotografia do bloco final são servidas por `next/image`.
- [x] A grelha da equipa, os logótipos e o bloco final mantêm o enquadramento atual (object-fit e object-position).
- [x] Nenhum ficheiro em `public/images` é removido.

## Prompt & feedback

| When (UTC) | Kind | Author | Summary |
|------------|------|--------|---------|
| 2026-11-09T10:09:10Z | prompt | Marco Mendão | Plano "Melhorias de SEO técnico": reservar espaço nas imagens da homepage. Não apagar imagens de public/images que não estão a ser usadas. |

## Commits

| SHA | Repo | Date (UTC) | Author | Message |
|-----|------|------------|--------|---------|

## Work log

| Actor | Started (UTC) | Ended (UTC) | Summary |
|-------|---------------|-------------|---------|
| Cursor agent | 2026-11-09T10:10:00Z | 2026-11-09T10:14:35Z | Homepage passou a next/image com dimensões. Logótipos, grelha da equipa e foto final verificados no browser. public/images intacto. |
