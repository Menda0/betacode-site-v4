---
id: E-MM-8fedcafe
type: epic
title: Redesign do website
status: backlog
priority: high
size: null
points: null
parent: null
epic: null
reporters:
  - name: "Marco Mendão"
    email: "marco.mendao@betacode.tech"
    initials: "MM"
resolvers: []
blocked: false
cancelled: false
tags:
  - redesign
  - website
created: 2026-10-28
updated: 2026-10-28T17:29:23Z
started_at: null
completed_at: null
---

## Descrição

Implementar no site real o redesign aprovado em protótipo (`.temp/betacode-website/`): homepage, calculadora de preços, Betacode Ventures, Insights, 7 artigos e contacto, em PT/EN e light/dark, com a interface igual ao HTML do protótipo. Segue `IMPLEMENTATION.md` e `AGENT_PROMPT.md` do pacote.

Decisões: manter a stack atual (Next.js App Router, next-intl, next-themes, MongoDB, Resend); calculadora igual ao protótipo (5 passos, sem pergunta de dimensão) com "voltar apaga a resposta"; artigos em MDX; anti-spam com honeypot e rate limit.

## Objetivo

Publicar as 12 páginas do redesign com o mesmo design, copy, comportamento e estados do protótipo, com os três formulários ligados ao backend.

## Critérios de aceitação

- As 12 páginas existem em `/pt` e `/en` com copy idêntica ao protótipo.
- Light e dark em todas as páginas, sem flash ao carregar.
- Cabeçalho e rodapé idênticos em todas as páginas.
- Os três formulários gravam o contacto, notificam a equipa e enviam confirmação ao utilizador.
- Pontos em aberto do §10 assinalados com `TODO(betacode):`.

## Arquitetura

```mermaid
flowchart LR
  subgraph content [Content]
    MDX["content/insights/*.{pt,en}.mdx"]
    MSG["messages/pt.json / en.json"]
    PR["lib/pricing/rules.ts + services.ts"]
  end
  subgraph ui [UI]
    CHROME["SiteHeader / SiteFooter / tokens"]
    PAGES["Home, Pricing, Ventures, Insights, Article, Contact"]
  end
  subgraph backend [Backend]
    API["POST /api/contacts"]
    ZOD["lib/contact-validation.ts"]
    RL["rate limit + honeypot"]
    DB[(MongoDB contacts)]
    MAIL["Resend: admin notification + user confirmation"]
  end
  MDX --> PAGES
  MSG --> CHROME
  MSG --> PAGES
  PR --> PAGES
  CHROME --> PAGES
  PAGES -->|"3 forms"| API
  API --> ZOD --> RL --> DB
  RL --> MAIL
```
