---
id: T-001
type: task
title: BlogPost MongoDB model
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
tags: [blog, mongodb]
created: 2026-07-21
updated: 2026-07-21T15:01:28Z
started_at: null
completed_at: null
---

# T-001: BlogPost MongoDB model

## Description

Add a Mongoose `BlogPost` model that mirrors `lib/blog-types.ts` (`slug`, `title`, `excerpt`, `publishedAt`, `author`, `category`, `readingTimeMinutes`, `content` blocks, optional `ogImage`) plus locale support for `en` / `pt`.

## Acceptance criteria

- [ ] Model exists under `lib/models/` and connects via existing mongoose helper
- [ ] Content blocks support paragraph, heading, and list shapes used by the public blog
- [ ] Unique constraint covers slug + locale (or equivalent documented rule)
- [ ] TypeScript types align with public `BlogPost` usage

## Notes

Follow patterns in `lib/models/contact.ts` and `lib/models/user.ts`.

## Prompt & feedback log

| # | When (UTC) | Kind | Summary |
|---|------------|------|---------|

## Commits

| SHA | Repo | Date (UTC) | Message |
|-----|------|------------|---------|

## Work log

| Session | Actor | Started (UTC) | Ended (UTC) | Summary |
|---------|-------|---------------|-------------|---------|
