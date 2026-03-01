# textlint Usage Guide

## Purpose

`textlint` mechanically detects inconsistent wording and hard-to-read prose in documentation.
This project uses it to keep `docs/` readable and maintainable.

## Policy

1. Writing quality is ensured by both `textlint` and human review
2. `textlint` is limited to items that are easy to detect mechanically
3. Domain-specific phrasing is judged during review

## Targets

- `docs/**/*.md`
- `README.md`
- `CLAUDE.md`
- `AGENTS.md`

## Rule Design Philosophy

Overly strict rules from day one increase correction cost.
Strengthen rules incrementally in this order:

1. Typo and wording inconsistency detection (initial)
2. Readability (sentence length, redundant expressions)
3. Project-specific dictionary (terminology unification)

## Current Configuration

Dependencies:

```json
"textlint": "^15.x",
"textlint-rule-write-good": "^2.x"
```

Configuration files:

- `.textlintrc.json`
- `.textlintignore`

`package.json` scripts:

```json
{
  "scripts": {
    "textlint": "textlint \"{README.md,CLAUDE.md,AGENTS.md,docs/**/*.md}\"",
    "textlint:fix": "textlint --fix \"{README.md,CLAUDE.md,AGENTS.md,docs/**/*.md}\""
  }
}
```

## Running

```bash
pnpm textlint
pnpm textlint:fix
```

## Initial Rollout

To avoid bulk-fixing existing documents, some rules may be disabled in the initial configuration.
Disabled rules are documented in `.textlintrc.json` and should be enabled incrementally as existing docs are cleaned up.

## PR Review Checklist

1. The same kind of warning does not repeat in new text
2. Rule disables (`textlint-disable`) include a reason
3. Fixes do not change the intended meaning
