---
id: T-MM-90791903
type: task
title: Página Betacode Ventures do redesign
status: done
priority: high
size: M
points: 5
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
  - ventures
created: 2026-10-28
updated: 2026-10-28T20:10:31Z
started_at: 2026-10-28T17:29:23Z
completed_at: 2026-10-28T18:09:47Z
---

## Descrição

Reconstruir `Ventures.dc.html`: hero navy com anel animado de 0 a 100%, 3 passos, parceria em duas colunas com a animação de handshake, caso Coach ID (`#coachid`) e formulário de candidatura (`#candidatura`) com fase da startup e ecrã de sucesso.

## Critérios de aceitação

- [x] Anel e handshake animados e estáticos com `prefers-reduced-motion`.
- [x] Caso Coach ID com kicker `// resultados`, 100+ clientes na primeira semana e 60+ clientes pagantes.
- [x] Formulário valida nome, email, site opcional e descrição com mínimo de 10 caracteres.

## Prompt & feedback

| When (UTC) | Kind | Author | Summary |
|------------|------|--------|---------|
| 2026-10-28T17:29:23Z | prompt | Marco Mendão | Tarefa criada a partir do plano Cursor "Betacode website redesign" para implementar o redesign do protótipo. |
| 2026-10-28T18:09:47Z | prompt | Marco Mendão | /tkmd-save-do do plano "Betacode website redesign": implementar todo o redesign com a interface igual ao protótipo HTML. |
| 2026-10-28T20:10:31Z | prompt | Marco Mendão | Em todo o site, onde a Betacode Ventures mostrava 0 €, passar a "em troca de equity". |
| 2026-10-28T23:49:05Z | prompt | Marco Mendão | No hero de Ventures, o bloco "em troca de equity" passa a "Em troca de Equity" (EN: "In exchange for Equity") e o bloco "Equity / incentivos alinhados" sai da linha de estatísticas. |

## Commits

| SHA | Repo | Date (UTC) | Author | Message |
|-----|------|------------|--------|---------|

## Work log

| Actor | Started (UTC) | Ended (UTC) | Summary |
|-------|---------------|-------------|---------|
| Cursor agent | 2026-10-28T17:29:23Z | 2026-10-28T18:09:47Z | Página Ventures portada: anel, passos, handshake, caso Coach ID em `#coachid` e formulário em `#candidatura` ligado à API. |
| Cursor agent | 2026-10-28T20:00:00Z | 2026-10-28T20:10:31Z | O facto do hero que era "0 € de desenvolvimento" passa a "em troca de equity" (EN: "in exchange for equity"). "de 0 a 100%" mantém-se. |
