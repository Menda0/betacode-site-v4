---
id: T-011
type: task
title: Read posts from Mongo in blog-content
status: backlog
priority: high
size: M
size_source: suggested
size_basis: []
parent: S-005
epic: E-001
owner: ""
blocked: false
cancelled: false
tags: [blog, public, mongodb]
created: 2026-07-21
updated: 2026-07-21T15:01:28Z
started_at: null
completed_at: null
---

# T-011: Read posts from Mongo in blog-content

## Description

Update `lib/blog-content.ts` (`getBlogPosts`, `getBlogPost`, `getNextBlogPost`, `getOtherBlogPosts`) to load from MongoDB while preserving the public `BlogPost` shape expected by Insights components.

## Acceptance criteria

- [ ] Public content helpers read from the BlogPost collection
- [ ] Returned shape remains compatible with existing blog components
- [ ] Locale filtering continues to work for `en` and `pt`
- [ ] Missing posts behave safely (empty list / not found)

## Notes

This is the main swap point from static `lib/blog-posts/*` to admin-managed data.

## Prompt & feedback log

| # | When (UTC) | Kind | Summary |
|---|------------|------|---------|

## Commits

| SHA | Repo | Date (UTC) | Message |
|-----|------|------------|---------|

## Work log

| Session | Actor | Started (UTC) | Ended (UTC) | Summary |
|---------|-------|---------------|-------------|---------|
