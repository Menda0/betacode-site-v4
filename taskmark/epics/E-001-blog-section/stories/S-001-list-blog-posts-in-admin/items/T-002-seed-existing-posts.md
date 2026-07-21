---
id: T-002
type: task
title: Seed existing static posts
status: backlog
priority: medium
size: S
size_source: suggested
size_basis: []
parent: S-001
epic: E-001
owner: ""
blocked: false
cancelled: false
tags: [blog, mongodb, migration]
created: 2026-07-21
updated: 2026-07-21T15:01:28Z
started_at: null
completed_at: null
---

# T-002: Seed existing static posts

## Description

Import current posts from `lib/blog-posts/en.ts` and `lib/blog-posts/pt*.ts` into MongoDB so the admin list starts with the live Insights content.

## Acceptance criteria

- [ ] All existing EN and PT posts can be seeded into Mongo
- [ ] Seeding is idempotent (re-run does not duplicate slug+locale)
- [ ] Seeded documents match fields needed by the public blog UI

## Notes

Static files can remain as seed source until public reads switch to DB.

## Prompt & feedback log

| # | When (UTC) | Kind | Summary |
|---|------------|------|---------|

## Commits

| SHA | Repo | Date (UTC) | Message |
|-----|------|------------|---------|

## Work log

| Session | Actor | Started (UTC) | Ended (UTC) | Summary |
|---------|-------|---------------|-------------|---------|
