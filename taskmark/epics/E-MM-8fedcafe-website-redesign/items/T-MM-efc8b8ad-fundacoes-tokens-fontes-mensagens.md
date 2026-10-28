---
id: T-MM-efc8b8ad
type: task
title: Fundações do redesign (assets, fontes, tokens de tema, mensagens)
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
created: 2026-10-28
updated: 2026-10-28T18:09:47Z
started_at: 2026-10-28T17:29:23Z
completed_at: 2026-10-28T18:09:47Z
---

## Descrição

Preparar a base partilhada do redesign: copiar os assets do protótipo para `public/images/`, carregar Montserrat, Inter e JetBrains Mono com `next/font`, criar os tokens de tema (light/dark) e as classes base do protótipo, e reestruturar `messages/pt.json` e `messages/en.json` com a copy do protótipo.

## Critérios de aceitação

- [ ] Assets de brand, avatares, clientes, apoios, fotos e equipa disponíveis em `public/images/`.
- [x] Fontes Montserrat, Inter e JetBrains Mono carregadas por `next/font/google`.
- [x] Tokens `--bg`, `--surface`, `--card`, `--text`, `--muted`, `--border`, `--border2`, `--band`, `--kicker` com valores light e dark do §4.
- [x] Tema segue `prefers-color-scheme` por defeito e a escolha persiste sem flash.
- [x] Copy PT/EN extraída para os ficheiros de mensagens sem alterações de texto.

## Prompt & feedback

| When (UTC) | Kind | Author | Summary |
|------------|------|--------|---------|
| 2026-10-28T17:29:23Z | prompt | Marco Mendão | Tarefa criada a partir do plano Cursor "Betacode website redesign" para implementar o redesign do protótipo. |
| 2026-10-28T18:09:47Z | prompt | Marco Mendão | /tkmd-save-do do plano "Betacode website redesign": implementar todo o redesign com a interface igual ao protótipo HTML. |

## Commits

| SHA | Repo | Date (UTC) | Author | Message |
|-----|------|------------|--------|---------|

## Work log

| Actor | Started (UTC) | Ended (UTC) | Summary |
|-------|---------------|-------------|---------|
| Cursor agent | 2026-10-28T17:29:23Z | 2026-10-28T18:09:47Z | Assets do protótipo em `public/assets/` (mesmos caminhos do protótipo, por isso não em `public/images/`), fontes via next/font, tokens em `app/styles/site.css` com overrides por página, tema `system` sem flash, mensagens divididas por namespace e lidas sem ICU. |
