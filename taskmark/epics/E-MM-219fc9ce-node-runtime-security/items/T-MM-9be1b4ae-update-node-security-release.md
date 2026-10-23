---
id: T-MM-9be1b4ae
type: task
title: Atualizar para a versão de segurança do Node.js
status: done
priority: high
size: S
points: 3
parent: E-MM-219fc9ce
epic: E-MM-219fc9ce
reporters:
  - name: "Marco Mendão"
    email: "marco.mendao@betacode.tech"
    initials: "MM"
resolvers: []
blocked: false
cancelled: false
tags:
  - security
  - nodejs
created: 2026-10-23
updated: 2026-10-23T14:47:03Z
started_at: null
completed_at: 2026-10-23T14:47:03Z
---

## Descrição

Atualizar o Node.js local e fixar no projeto a versão LTS com as correções de segurança de outubro de 2026.

## Critérios de aceitação

- Node.js 24.22.1 ou superior está instalado e em uso.
- O projeto especifica Node.js 24.22.1 como versão mínima.
- A verificação de qualidade do projeto é concluída.

## Prompt & feedback

| When (UTC) | Kind | Author | Summary |
|------------|------|--------|---------|
| 2026-10-23T14:45:39Z | prompt | Marco Mendão | Verificar a vulnerabilidade descrita no aviso de segurança do Node.js de outubro de 2026 e corrigir a instalação e o projeto. |

## Commits

| SHA | Repo | Date (UTC) | Author | Message |
|-----|------|------------|--------|---------|

## Work log

| Actor | Started (UTC) | Ended (UTC) | Summary |
|-------|---------------|-------------|---------|
| Auto | 2026-10-23T14:45:39Z | 2026-10-23T14:47:03Z | Instalado Node.js 24.22.1 com nvm, definido como predefinido e fixado no projeto. A versão ativa foi validada; a verificação de lint revelou erros preexistentes fora deste âmbito. |
