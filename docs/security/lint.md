# Lint / Quality Check

## Overview

This document defines the required quality checks for the repository.
Run these steps before every PR for both code and documentation changes.

## Required Checks (All Changes)

After any change, run:

```bash
./scripts/post-edit-check.sh
```

`post-edit-check.sh` runs the following in order:

```bash
pnpm build
pnpm biome:check
pnpm knip
pnpm tsc
```

## Additional Checks for Documentation Changes

When updating `docs/`, also verify:

1. Heading hierarchy (`#` -> `##` -> `###`) is not broken
2. Terminology is consistent (use the same word for the same concept)
3. Reference links exist and relative paths are correct
4. `pnpm textlint` passes

See [docs/security/textlint.md](./textlint.md) for textlint usage and configuration.

## Architecture Lint Rules (AI Review)

The following rules cannot be fully detected by automated linting but are checked during code review.
The `/code-review` skill checks these rules.

| Rule | Scope | Detection |
| --- | --- | --- |
| JSDoc required on public functions (preconditions, postconditions) | All packages | AI review |
| No try-catch (Result type required) | All code | AI review |
| No direct interface definitions (Zod Schema First) | All code | AI review |
