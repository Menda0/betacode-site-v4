---
id: S-005
type: story
title: Public Insights reads managed posts
status: backlog
priority: high
size: M
size_source: suggested
size_basis: [T-011, T-012]
parent: E-001
epic: E-001
owner: ""
blocked: false
cancelled: false
tags: [blog, public]
created: 2026-07-21
updated: 2026-07-21T15:01:28Z
started_at: null
completed_at: null
---

# S-005: Public Insights reads managed posts

## User story

As a site visitor, I want the existing Insights section to show posts managed from the admin dashboard so that published changes appear on the public site without redeploying static post files.

## Acceptance criteria

- [ ] Public Insights index and article pages load posts from the admin-managed store
- [ ] Create/update/delete in admin is reflected on the public Insights section (after refresh/revalidation)
- [ ] Existing public blog UI components continue to work without a visual redesign
- [ ] Locale-aware routes (`en` / `pt`) still resolve the correct posts

## Tasks

- [T-011](items/T-011-blog-content-from-db.md) — Read posts from Mongo in blog-content
- [T-012](items/T-012-insights-dynamic-routing.md) — Insights pages and sitemap use managed posts

## Prompt & feedback log

| # | When (UTC) | Kind | Summary |
|---|------------|------|---------|

## Commits

| SHA | Repo | Date (UTC) | Message |
|-----|------|------------|---------|

## Work log

| Session | Actor | Started (UTC) | Ended (UTC) | Summary |
|---------|-------|---------------|-------------|---------|
