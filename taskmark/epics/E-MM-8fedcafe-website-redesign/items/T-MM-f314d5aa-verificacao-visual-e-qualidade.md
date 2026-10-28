---
id: T-MM-f314d5aa
type: task
title: Verificação visual e de qualidade do redesign
status: done
priority: medium
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
  - qa
created: 2026-10-28
updated: 2026-10-28T18:09:47Z
started_at: 2026-10-28T17:29:23Z
completed_at: 2026-10-28T18:09:47Z
---

## Descrição

Comparar cada página com `docs/screenshots/` a 1440px (PT/light e EN/dark) e em mobile (360 a 430px), confirmar as ramificações da calculadora, e correr lint e build.

## Critérios de aceitação

- [x] Páginas comparadas com os screenshots de referência.
- [x] Sem scroll horizontal a 360px.
- [x] `npm run lint` e `npm run build` sem erros novos.

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
| Cursor agent | 2026-10-28T17:29:23Z | 2026-10-28T18:09:47Z | Comparação com os screenshots a 1440px e 360px em PT light e EN dark; corrigidos cabeçalho mobile, email, estatística e chip em dark. tsc e build sem erros; lint só com o script síncrono da intro e um erro antigo em `components/ui/sidebar.tsx`. |
