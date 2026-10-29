---
id: T-MM-a0b86356
type: task
title: Calculadora de preços do redesign
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
  - pricing
created: 2026-10-28
updated: 2026-10-29T00:24:17Z
started_at: 2026-10-28T17:29:23Z
completed_at: 2026-10-28T18:09:47Z
---

## Descrição

Reconstruir o wizard de `Pricing.dc.html` com 5 passos (O seu negócio, Contexto, Objetivo, Estimativa, Proposta), as regras de recomendação de `docs/calculadora-precos.md`, a estimativa com tabs fixas e animação por serviço, o formulário de proposta e o ecrã de sucesso. Segue a UI do protótipo (sem pergunta de dimensão); voltar a uma pergunta apaga essa resposta e mudar o tipo de negócio limpa o ramo.

## Critérios de aceitação

- [x] Todas as ramificações produzem os serviços do documento de regras, pela ordem V, E, R, F, S.
- [x] Nenhum preço aparece antes do passo de estimativa.
- [x] Tabs fixas e cartões de altura uniforme na estimativa.
- [x] Voltar a uma pergunta apaga a resposta; mudar o tipo de negócio limpa o ramo.
- [x] Formulário de proposta valida nome, email e site opcional e mostra o ecrã de sucesso.

## Prompt & feedback

| When (UTC) | Kind | Author | Summary |
|------------|------|--------|---------|
| 2026-10-28T17:29:23Z | prompt | Marco Mendão | Tarefa criada a partir do plano Cursor "Betacode website redesign" para implementar o redesign do protótipo. |
| 2026-10-28T18:09:47Z | prompt | Marco Mendão | /tkmd-save-do do plano "Betacode website redesign": implementar todo o redesign com a interface igual ao protótipo HTML. |
| 2026-10-28T20:10:31Z | prompt | Marco Mendão | Em todo o site, onde a Betacode Ventures mostrava 0 €, passar a "em troca de equity". |
| 2026-10-28T20:26:38Z | prompt | Marco Mendão | No telemóvel, os preços da estimativa partiam o € para a linha seguinte e a animação de equipas cortava planear e lançar. |
| 2026-10-28T23:05:00Z | prompt | Marco Mendão | Implementar a versão mobile da calculadora, abaixo de 760px, como no pacote betacode-pricing-mobile, na mesma página e sem alterar o desktop. |
| 2026-10-28T23:11:00Z | prompt | Marco Mendão | Na pergunta da equipa interna, a menção a engenheiros passa a Software Developers. |
| 2026-10-28T23:43:22Z | prompt | Marco Mendão | No telemóvel, a linha fechada da estimativa na proposta ultrapassa o cartão. As palavras devem partir para caber na largura, sem scroll horizontal. |
| 2026-10-28T23:50:00Z | prompt | Marco Mendão | No telemóvel, o intervalo de dois euros empilha montante, «a» e montante, e as tabs mostram todas as opções sem scroll. Nos cartões da Ventures, o custo passa a «sem custo de desenvolvimento» e o pagamento a «troca de equity». Na tab, «em troca de equity» fica do mesmo tamanho que os montantes em euro. |
| 2026-10-29T00:24:17Z | prompt | Marco Mendão | No cartão da estimativa da Ventures, «sem custo de desenvolvimento» sai da caixa no telemóvel. A frase tem de caber por inteiro, em PT e em EN, sem cortar. A etiqueta «Custo de desenvolvimento» mantém-se legível. |

## Commits

| SHA | Repo | Date (UTC) | Author | Message |
|-----|------|------------|--------|---------|

## Work log

| Actor | Started (UTC) | Ended (UTC) | Summary |
|-------|---------------|-------------|---------|
| Cursor agent | 2026-10-28T17:29:23Z | 2026-10-28T18:09:47Z | Assistente de 5 passos com RULES do protótipo, voltar apaga a resposta e as seguintes, estimativa com tabs fixas, proposta via API com mapeamento V/E/R/F/S e eventos `wizard_step`/`wizard_result`. |
| Cursor agent | 2026-10-28T20:00:00Z | 2026-10-28T20:10:31Z | O preço e a figura da Ventures deixam de ser 0 € e passam a "em troca de equity", com quebra de linha para a frase caber no cartão e na proposta. |
| Cursor agent | 2026-10-28T20:11:00Z | 2026-10-28T20:26:38Z | Nos cartões da estimativa cada montante fica com o seu € e o intervalo pode partir antes do travessão; a animação encaixa no painel estreito sem cortar legendas nem avatares. |
| Cursor agent | 2026-10-28T23:05:00Z | 2026-10-28T23:40:00Z | Abaixo de 760px a mesma calculadora passa a barra de progresso segmentada, tabs com scroll, barra fixa na estimativa, resumo recolhível na proposta e Voltar do browser a recuar um passo. O desktop fica igual. |
| Cursor agent | 2026-10-28T23:11:00Z | 2026-10-28T23:14:21Z | A descrição de quem já tem equipa interna deixa de dizer engenheiros e passa a Software Developers, em PT e EN. |
| Cursor agent | 2026-10-29T00:13:00Z | 2026-10-29T00:24:17Z | O valor textual dos cartões da estimativa encolhe com a largura do cartão, para «desenvolvimento» e «development» caberem inteiros no telemóvel e no desktop, sem cortar e sem mexer nos intervalos em euro. |
