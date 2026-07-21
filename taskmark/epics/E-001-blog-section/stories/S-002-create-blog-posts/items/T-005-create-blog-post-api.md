---
id: T-005
type: task
title: Create blog post API
status: backlog
priority: high
size: M
size_source: suggested
size_basis: []
parent: S-002
epic: E-001
owner: ""
blocked: false
cancelled: false
tags: [blog, api, crud]
created: 2026-07-21
updated: 2026-07-21T15:01:28Z
started_at: null
completed_at: null
---

# T-005: Create blog post API

## Description

Add an authenticated API route to create blog posts in MongoDB with zod (or equivalent) validation matching the public post shape.

## Acceptance criteria

- [ ] Authenticated POST creates a new BlogPost document
- [ ] Unauthenticated requests are rejected
- [ ] Validation errors return actionable responses
- [ ] Duplicate slug+locale is rejected

## Notes

Admin APIs do not exist yet for contacts; establish the auth-guard pattern for blog CRUD here.

## Prompt & feedback log

| # | When (UTC) | Kind | Summary |
|---|------------|------|---------|

## Commits

| SHA | Repo | Date (UTC) | Message |
|-----|------|------------|---------|

## Work log

| Session | Actor | Started (UTC) | Ended (UTC) | Summary |
|---------|-------|---------------|-------------|---------|
