---
id: T-MM-6e0a19d7
type: task
title: Intro de primeira visita
status: done
priority: high
size: S
points: 3
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
  - intro
  - website
created: 2026-10-28
updated: 2026-10-28T19:59:30Z
started_at: 2026-10-28T17:54:00Z
completed_at: 2026-10-28T18:05:21Z
---

## Descrição

Integrar a intro de primeira visita do pacote `.temp/betacode-intro/` em todas as páginas públicas. CSS e script síncronos no layout partilhado, língua da página em `window.BetacodeIntroConfig.lang`, sem alterar animação, cores, tempos ou copy.

## Critérios de aceitação

- [x] Na primeira visita a intro aparece sem flash do site; ao recarregar não aparece.
- [x] "Saltar intro" e a tecla Esc fecham-na de imediato.
- [x] Com `prefers-reduced-motion: reduce` aparece só o logótipo cerca de 1 s.
- [x] Não aparece com user-agent de bot nem no Lighthouse, e o conteúdo da página continua no HTML.
- [x] Em `/en` a intro está em inglês.
- [x] A 390px fica bem enquadrada.
- [x] A consola não mostra erros nem avisos de hidratação.
- [x] `BetacodeIntro.reset()` fica documentado, sem botões visíveis em produção.

## Prompt & feedback

| When (UTC) | Kind | Author | Summary |
|------------|------|--------|---------|
| 2026-10-28T17:50:00Z | prompt | Marco Mendão | Implementar a intro de `.temp/betacode-intro/` no website atual, segundo o AGENT_PROMPT.md dessa pasta. |
| 2026-10-28T19:20:57Z | feedback | Marco Mendão | A intro não deve aparecer ao navegar entre páginas, mas deve aparecer sempre que o utilizador acede ao site ou faz refresh. |
| 2026-10-28T19:59:30Z | prompt | Marco Mendão | Aplicar a intro v1.1.0 de `.temp/betacode-intro 2`, com coreografia própria para mobile. |

## Commits

| SHA | Repo | Date (UTC) | Author | Message |
|-----|------|------------|--------|---------|

## Work log

| Actor | Started (UTC) | Ended (UTC) | Summary |
|-------|---------------|-------------|---------|
| Marco Mendão | 2026-10-28T17:54:00Z | 2026-10-28T18:05:21Z | CSS e script da intro no layout público, com verificação de primeira visita, saltar, Esc, movimento reduzido, bots, inglês e mobile. |
| Cursor agent | 2026-10-28T19:17:00Z | 2026-10-28T19:20:57Z | Modo da intro passou de `once` para `always`: aparece em cada carregamento completo (acesso direto ou refresh) e não aparece na navegação interna nem ao trocar PT/EN; verificado no browser. |
| Cursor agent | 2026-10-28T19:55:00Z | 2026-10-28T19:59:30Z | Publicada a intro v1.1.0. Abaixo de 600px as chavetas param dentro do ecrã, os fragmentos ficam na vertical, o log da direita desaparece e o slogan fica a 20px. O modo `always` mantém-se. |
