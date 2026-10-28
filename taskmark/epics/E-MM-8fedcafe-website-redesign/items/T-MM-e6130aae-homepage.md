---
id: T-MM-e6130aae
type: task
title: Homepage do redesign
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
updated: 2026-10-28T23:14:21Z
started_at: 2026-10-28T17:29:23Z
completed_at: 2026-10-28T18:09:47Z
---

## Descrição

Reconstruir a homepage de `Main.dc.html`: hero com terminal animado, clientes, "O que fazemos" com 4 tabs animadas, banda Betacode Ventures, grelha da equipa com os `object-position` afinados, Insights e CTA final. O logo reconstruído em código (legacy) não é implementado.

## Critérios de aceitação

- [x] Secções na ordem e com o aspeto do protótipo em PT/EN e light/dark.
- [x] Terminal escreve as 4 sessões em ciclo e mostra uma sessão completa com `prefers-reduced-motion`.
- [x] Tabs "O que fazemos" com a animação própria de cada tab.
- [x] Fotos da equipa com os enquadramentos do ficheiro-fonte.
- [x] Sem promessa "MVP em 3 meses" na homepage.

## Prompt & feedback

| When (UTC) | Kind | Author | Summary |
|------------|------|--------|---------|
| 2026-10-28T17:29:23Z | prompt | Marco Mendão | Tarefa criada a partir do plano Cursor "Betacode website redesign" para implementar o redesign do protótipo. |
| 2026-10-28T18:09:47Z | prompt | Marco Mendão | /tkmd-save-do do plano "Betacode website redesign": implementar todo o redesign com a interface igual ao protótipo HTML. |
| 2026-10-28T19:46:24Z | prompt | Marco Mendão | O subtítulo do hero deve ser "Transformação digital e desenvolvimento de software à medida." |
| 2026-10-28T19:53:17Z | prompt | Marco Mendão | No mobile o hero empilha o título, os dois botões a largura total e o terminal por baixo, como no mockup. |
| 2026-10-28T20:10:31Z | prompt | Marco Mendão | Em todo o site, onde a Betacode Ventures mostrava 0 €, passar a "em troca de equity". |
| 2026-10-28T23:06:00Z | prompt | Marco Mendão | No mobile o hero segue a captura: três etiquetas, botões empilhados e "Estimar preço" só com contorno. O subtítulo fica só a primeira frase. |
| 2026-10-28T23:11:00Z | prompt | Marco Mendão | O título dos clientes deixa de referir a Europa. As etiquetas passam a incluir Co-fundador técnico e Formação. Onde a interface falava de engenheiros, passa a Software Developers. |

## Commits

| SHA | Repo | Date (UTC) | Author | Message |
|-----|------|------------|--------|---------|

## Work log

| Actor | Started (UTC) | Ended (UTC) | Summary |
|-------|---------------|-------------|---------|
| Cursor agent | 2026-10-28T17:29:23Z | 2026-10-28T18:09:47Z | Homepage portada do protótipo: terminal com as 4 sessões e tempos originais, tabs de serviços animadas, grelha da equipa com enquadramentos, cartões de insights ligados aos artigos. |
| Cursor agent | 2026-10-28T19:46:00Z | 2026-10-28T19:46:24Z | Subtítulo do hero encurtado para a primeira frase, em PT e no equivalente EN. |
| Cursor agent | 2026-10-28T19:47:00Z | 2026-10-28T19:53:17Z | Abaixo de 760px os botões do hero ficam empilhados, "Ver como ajudamos" desaparece e o terminal fica por baixo. O subtítulo curto mantém-se. |
| Cursor agent | 2026-10-28T20:00:00Z | 2026-10-28T20:10:31Z | O cartão da banda Ventures e o chip da tab deixam de mostrar 0 € e passam a "em troca de equity" (EN: "in exchange for equity"). |
| Cursor agent | 2026-10-28T22:59:00Z | 2026-10-28T23:08:41Z | Abaixo de 760px o hero passa a três etiquetas, o botão fantasma fica só com contorno no escuro e o menu ganha borda. O subtítulo mantém-se na primeira frase, em PT e EN. |
| Cursor agent | 2026-10-28T23:09:00Z | 2026-10-28T23:14:21Z | Título dos clientes sem Europa. Quatro etiquetas no mobile e a etiqueta única no desktop. Menções a engenheiros na homepage passam a Software Developers, também no texto PT. |
