---
id: T-003
type: task
title: Admin blog list page
status: backlog
priority: high
size: M
size_source: suggested
size_basis: []
parent: S-001
epic: E-001
owner: ""
blocked: false
cancelled: false
tags: [blog, admin, ui]
created: 2026-07-21
updated: 2026-07-21T15:01:28Z
started_at: null
completed_at: null
---

# T-003: Admin blog list page

## Description

Add an authenticated admin page (e.g. `/admin/blog`) that lists all blog posts in a table, following the contacts dashboard pattern (`contacts-data-table`, server-loaded Mongo data).

## Acceptance criteria

- [ ] Protected route under `app/admin/(dashboard)/` lists all posts
- [ ] Table shows key columns (title, slug, locale, publishedAt, author)
- [ ] Empty state is clear when no posts exist
- [ ] Page is unreachable without an admin session

## Notes

Reuse TanStack table / admin shell patterns from contacts.

## Prompt & feedback log

| # | When (UTC) | Kind | Summary |
|---|------------|------|---------|

## Commits

| SHA | Repo | Date (UTC) | Message |
|-----|------|------------|---------|

## Work log

| Session | Actor | Started (UTC) | Ended (UTC) | Summary |
|---------|-------|---------------|-------------|---------|
