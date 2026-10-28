---
id: T-MM-2cdac4c1
type: task
title: Cabeçalho e rodapé do redesign
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
created: 2026-10-28
updated: 2026-10-28T19:53:17Z
started_at: 2026-10-28T17:29:23Z
completed_at: 2026-10-28T18:09:47Z
---

## Descrição

Reescrever o cabeçalho (sticky, fundo sólido, logo GIF animado, navegação, seletor PT | EN, botão de tema e CTA Contacto) e o rodapé (logo, tagline, navegação, social, faixa de apoios light/dark, texto de financiamento, copyright e `{ feito em Portugal }`) como no protótipo, mais peças partilhadas (capa de artigo, sucesso, campos de formulário, pills).

## Critérios de aceitação

- [x] Cabeçalho nunca transparente; logo GIF com `multiply` em light e filtro invertido em dark; logo estático com `prefers-reduced-motion`.
- [x] Link ativo coral e sublinhado com `aria-current`.
- [x] Seletor PT | EN e tema com `aria-pressed` e alvos de 44px.
- [x] Rodapé com logos de apoios na versão light e dark e sem fundo branco.
- [x] Mesmo cabeçalho e rodapé em todas as páginas públicas.

## Prompt & feedback

| When (UTC) | Kind | Author | Summary |
|------------|------|--------|---------|
| 2026-10-28T17:29:23Z | prompt | Marco Mendão | Tarefa criada a partir do plano Cursor "Betacode website redesign" para implementar o redesign do protótipo. |
| 2026-10-28T18:09:47Z | prompt | Marco Mendão | /tkmd-save-do do plano "Betacode website redesign": implementar todo o redesign com a interface igual ao protótipo HTML. |
| 2026-10-28T19:53:17Z | prompt | Marco Mendão | A versão mobile deve ter o menu de ecrã inteiro do mockup: logo, Contacto e hambúrguer; lista 01–05, idioma, tema, contactos e dois botões. |

## Commits

| SHA | Repo | Date (UTC) | Author | Message |
|-----|------|------------|--------|---------|

## Work log

| Actor | Started (UTC) | Ended (UTC) | Summary |
|-------|---------------|-------------|---------|
| Cursor agent | 2026-10-28T17:29:23Z | 2026-10-28T18:09:47Z | Novo `SiteHeader` e `SiteFooter` partilhados; CTA "Candidatar-se" na página Ventures; em mobile o cabeçalho passa a duas linhas sem sticky para não tapar conteúdo. |
| Cursor agent | 2026-10-28T19:47:00Z | 2026-10-28T19:53:17Z | Abaixo de 980px o cabeçalho fica numa linha com Contacto e hambúrguer; o menu ocupa o ecrã com as 5 entradas, PT/EN, tema, email, telefone e os dois botões. Verificado a 390px e no desktop. |
