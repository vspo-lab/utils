# Utility Libraries (@vspo-lab/utils)

## Guiding Principles

- Error handling: Use the `Result` type (`import { wrap, Ok, Err, AppError } from "@vspo-lab/error"`). No try-catch.
- Type definitions: Zod Schema First (`z.infer<typeof schema>`). No explicit interface definitions.
- Simplicity: Delete unnecessary code, abstract after 3+ duplications, no premature optimization.
- Function documentation: Add JSDoc with preconditions, postconditions, and idempotency to public functions.
- After code changes, run `./scripts/post-edit-check.sh`.

## References

- Technical documentation: `docs/`
- AI agent skills: `.agent/skills/`

## Spec-Driven Development

- Develop features in order: spec drafting -> checklist generation -> phased implementation.
- Place spec documents in `docs/plan/<feature>/`.
- **Update spec first, then code**: when requirements change, update `docs/plan/` before modifying code. Verbal agreements are not specs.
- Skills: `/plan-feature` (spec drafting), `/init-impl` (checklist generation).

## Claude Code Operations

- Permission policies and hooks are managed in `.claude/settings.json`.
- Custom `/` commands are placed as skills in `.claude/skills/` (symlink to `.agent/skills/`).
- `PreToolUse` hook blocks dangerous Bash operations (`git push`, `git add -A`, `git reset --hard`).
- On code edits, a hook sets `.claude/.post_edit_check_pending`, and `./scripts/post-edit-check.sh` runs at response end.
