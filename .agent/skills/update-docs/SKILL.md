---
name: update-docs
description: Update docs/ to reflect code changes. Keep docs/ as the always-current Single Source of Truth.
---

# Trigger Conditions

- After implementing new features or architectural changes
- After modifying existing specs or conventions
- When the user requests docs updates

# Rules

- `docs/` is the Single Source of Truth for all technical documentation
- When code changes, update the related docs/ files
- When introducing new concepts or patterns, create a corresponding docs/ file
- Skills' SKILL.md files are pointers to docs/ only. Do not write details in skills

# docs/ Structure

- `docs/plan/` — Feature specifications (Spec-Driven Development, per-feature specs and checklists)
- `docs/testing/` — Testing policies (unit testing)
- `docs/security/` — Security and quality (lint, textlint)
