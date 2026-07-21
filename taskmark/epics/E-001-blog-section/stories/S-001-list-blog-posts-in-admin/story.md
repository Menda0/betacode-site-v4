---
id: S-001
type: story
title: List blog posts in admin
status: backlog
priority: high
size: L
size_source: suggested
size_basis: [T-001, T-002, T-003, T-004]
parent: E-001
epic: E-001
owner: ""
blocked: false
cancelled: false
tags: [blog, admin]
created: 2026-07-21
updated: 2026-07-21T15:01:28Z
started_at: null
completed_at: null
---

# S-001: List blog posts in admin

## User story

As an admin, I want to see all blog posts in the admin dashboard so that I can review and manage the Insights content in one place.

## Acceptance criteria

- [ ] Authenticated admin can open a Blog section in the admin dashboard
- [ ] All stored blog posts are listed (title, slug, locale, published date, author at minimum)
- [ ] Existing static Insights posts are available after seeding
- [ ] Unauthenticated users cannot access the blog admin list

## Tasks

- [T-001](items/T-001-blog-post-model.md) — BlogPost MongoDB model
- [T-002](items/T-002-seed-existing-posts.md) — Seed existing static posts
- [T-003](items/T-003-admin-blog-list-page.md) — Admin blog list page
- [T-004](items/T-004-admin-blog-nav.md) — Admin sidebar Blog nav

## Prompt & feedback log

| # | When (UTC) | Kind | Summary |
|---|------------|------|---------|

## Commits

| SHA | Repo | Date (UTC) | Message |
|-----|------|------------|---------|

## Work log

| Session | Actor | Started (UTC) | Ended (UTC) | Summary |
|---------|-------|---------------|-------------|---------|
