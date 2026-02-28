# Utility Libraries (@vspo-lab/utils)

## Guiding Principles

- Error handling: Use the `Result` type (`import { wrap, Ok, Err, AppError } from "@vspo-lab/error"`). No try-catch.
- Type definitions: Zod Schema First (`z.infer<typeof schema>`). No explicit interface definitions.
- Simplicity: Delete unnecessary code, abstract after 3+ duplications, no premature optimization.
- Function documentation: Add JSDoc with preconditions, postconditions, and idempotency to public functions.
- After code changes, run `./scripts/post-edit-check.sh`.

## Copilot Review Output Rules

- Every finding must state what rule is violated and where.
- Findings must use this format:
  - `Location`: `path/to/file:line` (location in PR diff)
  - `Violated rule`: `source file` + `heading/item name`
  - `Violation`: one sentence describing what breaks the rule
  - `Suggested fix`: minimal-change fix approach
- `Violated rule` must cite these primary sources:
  - `.github/copilot-instructions.md`
  - `AGENTS.md`
  - Documents under `docs/`
- If no rule source can be cited, separate the item as an "improvement suggestion" rather than asserting it as a violation.

## Reference Documents

- `docs/security/` — lint and textlint configuration
- `docs/testing/` — testing strategy
- `docs/plan/` — feature planning
- `.agent/skills/` — AI agent skill definitions
