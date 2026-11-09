---
id: S-MM-b719904e
type: story
title: SEO técnico do site público
status: backlog
priority: medium
size: null
points: null
parent: E-MM-8fedcafe
epic: E-MM-8fedcafe
reporters:
  - name: "Marco Mendão"
    email: "marco.mendao@betacode.tech"
    initials: "MM"
resolvers: []
blocked: false
cancelled: false
tags:
  - seo
  - website
created: 2026-11-09
updated: 2026-11-09T10:09:10Z
started_at: null
completed_at: null
---

## Descrição

Fechar as lacunas de SEO técnico que ficaram depois da metadata, do sitemap e do JSON-LD iniciais. O sitemap passa a declarar os idiomas alternativos e datas estáveis, a listagem de Insights usa o schema de Blog partilhado, a homepage reserva espaço nas imagens e serve as fotografias grandes pelo otimizador do Next, e `/pricing` redireciona de forma permanente.

Fica de fora: apagar ficheiros antigos em `public/images` (podem voltar a ser usados); mudar a intro de `mode: 'always'` (decisão já feita na intro de primeira visita); pesquisa de palavras-chave e reescrita de títulos.

## User story

Como visitante que chega por um motor de busca, quero que o Google associe as versões em português e inglês, leia o sitemap com datas estáveis e veja a página a carregar sem saltos, para encontrar a página certa e uma página estável.

## Critérios de aceitação

- O sitemap em `/sitemap.xml` inclui `xhtml:link` de idioma em cada URL e `lastmod` que não muda só porque o site foi construído de novo.
- A listagem de Insights publica JSON-LD `Blog` através do helper partilhado, com nome, descrição e idioma da página.
- `.env.example` documenta `GOOGLE_SITE_VERIFICATION`.
- As imagens da homepage têm dimensões explícitas; as fotografias grandes passam por `next/image`.
- `/pricing` responde com redirect permanente para `/en/pricing`.
- Nenhuma imagem em `public/images` é apagada.
