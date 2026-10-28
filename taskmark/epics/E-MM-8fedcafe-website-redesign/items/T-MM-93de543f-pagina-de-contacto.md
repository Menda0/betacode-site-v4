---
id: T-MM-93de543f
type: task
title: Página de contacto do redesign
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
  - contact
created: 2026-10-28
updated: 2026-10-28T20:19:44Z
started_at: 2026-10-28T17:29:23Z
completed_at: 2026-10-28T18:09:47Z
---

## Descrição

Reconstruir `Contact.dc.html`: cartão de email com copiar, telefone, mapa ilustrado em SVG que abre o Google Maps, barra tipo terminal que escreve o assunto, pills de assunto, formulário com erros inline depois da primeira tentativa, ecrã de sucesso com o primeiro nome e os cartões "Ainda não está pronto para escrever?".

## Critérios de aceitação

- [x] Botão copiar mostra o estado copiado e anuncia-o com `aria-live`.
- [x] O placeholder da mensagem e o terminal mudam com o assunto.
- [x] Validação de nome, email e mensagem com mínimo de 10 caracteres e contador /2000.
- [x] Ecrã de sucesso personalizado com o primeiro nome.

## Prompt & feedback

| When (UTC) | Kind | Author | Summary |
|------------|------|--------|---------|
| 2026-10-28T17:29:23Z | prompt | Marco Mendão | Tarefa criada a partir do plano Cursor "Betacode website redesign" para implementar o redesign do protótipo. |
| 2026-10-28T18:09:47Z | prompt | Marco Mendão | /tkmd-save-do do plano "Betacode website redesign": implementar todo o redesign com a interface igual ao protótipo HTML. |
| 2026-10-28T20:02:00Z | prompt | Marco Mendão | No telemóvel, o balão «Betacode / Madan Parque» e o rótulo da FCT NOVA ficam cortados nas bordas do mapa, e a barra do terminal cresce quando o comando parte para duas linhas. |

## Commits

| SHA | Repo | Date (UTC) | Author | Message |
|-----|------|------------|--------|---------|

## Work log

| Actor | Started (UTC) | Ended (UTC) | Summary |
|-------|---------------|-------------|---------|
| Cursor agent | 2026-10-28T17:29:23Z | 2026-10-28T18:09:47Z | Página de contacto portada: cartões, mapa SVG light/dark, terminal por assunto, validação com contador e ecrã de sucesso com o primeiro nome. |
| Cursor agent | 2026-10-28T20:02:00Z | 2026-10-28T20:19:44Z | No telemóvel, os rótulos do mapa passam para dentro da área visível e a barra do terminal reserva duas linhas para o cartão não saltar. |
