---
id: T-012
type: task
title: Insights pages and sitemap use managed posts
status: backlog
priority: medium
size: S
size_source: suggested
size_basis: []
parent: S-005
epic: E-001
owner: ""
blocked: false
cancelled: false
tags: [blog, public, nextjs]
created: 2026-07-21
updated: 2026-07-21T15:01:28Z
started_at: null
completed_at: null
---

# T-012: Insights pages and sitemap use managed posts

## Description

Update Insights routes, `generateStaticParams` (if any), homepage preview, and `app/sitemap.ts` so they correctly consume async/DB-backed blog helpers and revalidate when posts change.

## Acceptance criteria

- [ ] `/[locale]/insights` and `/[locale]/insights/[slug]` render DB-backed posts
- [ ] Sitemap includes managed post URLs
- [ ] Homepage Insights preview uses the same content source
- [ ] Create/update/delete becomes visible on the public site after refresh/revalidation

## Notes

May need dynamic rendering or `revalidate` / `revalidatePath` hooks from admin mutations.

## Prompt & feedback log

| # | When (UTC) | Kind | Summary |
|---|------------|------|---------|

## Commits

| SHA | Repo | Date (UTC) | Message |
|-----|------|------------|---------|

## Work log

| Session | Actor | Started (UTC) | Ended (UTC) | Summary |
|---------|-------|---------------|-------------|---------|
