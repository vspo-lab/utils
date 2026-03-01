---
name: plan-feature
description: Generate structured specification documents in docs/plan/<feature>/ from ambiguous requirements.
user_invocable: true
---

# Overview

A skill for drafting feature specifications.
Gathers ambiguous requirements through a structured interview and generates spec documents in `docs/plan/<feature>/`.

# Steps

## Step 1: Requirements Interview

Confirm the following in a single question:

1. Feature name (English kebab-case, e.g. `user-profile`)
2. Purpose and background (why build this)
3. Target users and usage scenarios
4. In Scope / Out of Scope
5. Affected entities (new or modified)
6. Key use cases (1-5)
7. Undecided items

## Step 2: Generate Spec Documents

Based on the answers, create the following files in `docs/plan/<feature>/`.
Refer to the spec file overview in `docs/plan/README.md` for what each file should contain.

- `00_OVERVIEW.md` — Purpose, background, scope, success criteria
- `01_DESIGN.md` — Zod schemas, public API (exports), dependent packages, type definitions

Omit files that are not relevant to the feature.
Mark undecided parts as `TBD`.

## Step 3: Spec Review Summary

After generation, present:

1. List of generated files
2. Summary of confirmed items
3. Undecided items and next decisions to make

# Rules

- Specs are consolidated in `docs/plan/<feature>/` (do not scatter elsewhere)
- Entity definitions follow Zod Schema First
- Important decisions should be recorded in the spec documents

# Reference Documents

- `docs/plan/README.md`
