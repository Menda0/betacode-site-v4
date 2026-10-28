---
id: T-MM-664d2250
type: task
title: Backend dos formulários do redesign
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
  - forms
created: 2026-10-28
updated: 2026-10-28T18:09:47Z
started_at: 2026-10-28T17:29:23Z
completed_at: 2026-10-28T18:09:47Z
---

## Descrição

Ligar os formulários de contacto, proposta e candidatura Ventures a `POST /api/contacts`: alargar os esquemas zod e o modelo com os novos campos, honeypot, rate limit por IP e email, email de confirmação ao utilizador, estados de envio e erro, e eventos de analytics.

## Critérios de aceitação

- [x] Validação no cliente e no servidor para os três formulários.
- [x] Honeypot e rate limit ativos.
- [x] Email para a equipa e email de confirmação para o utilizador.
- [x] Botão desativado durante o envio e mensagem amigável em caso de erro.
- [x] Novos campos visíveis na tabela de contactos do admin.

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
| Cursor agent | 2026-10-28T17:29:23Z | 2026-10-28T18:09:47Z | Esquemas zod alargados, honeypot, rate limit em Mongo por IP e email, email de confirmação, hook de envio com estados e campos novos no admin. |
