---
name: code-review
description: Architecture-rule-based PR/code review. Detects violations of Result type, Zod Schema First, JSDoc conventions, and test coverage requirements.
user_invocable: true
---

# Trigger Conditions

- When the user requests a code review
- When reviewing PR diffs

# Review Checklist

## Code Conventions

1. No try-catch (Result type required — `Ok`, `Err`, `wrap`, `AppError` from `@vspo-lab/error`)
2. No direct interface definitions (Zod Schema First — use `z.infer<typeof schema>`)
3. Public functions have JSDoc with preconditions and postconditions

## Tests

4. Added or changed functions have accompanying tests

# Output Format

Report each finding in the following format:

- `Location`: file path + line number
- `Violated rule`: corresponding docs/ document + section name
- `Violation`: one-sentence description
- `Suggested fix`: minimal-change fix approach

If no rule source can be cited, separate the item as an "improvement suggestion" rather than asserting it as a violation.

# Reference Documents

- `docs/security/lint.md` — Lint / Quality Check
- `docs/testing/unit-testing.md` — Unit testing policy
