# Feature Plan (Spec-Driven Development)

Feature specifications live here.
The spec is the Single Source of Truth — verbal agreements are not specs.

## Principle: Update Spec First, Then Code

1. When requirements change, update `docs/plan/<feature>/` first
2. After the spec is updated, change the code
3. Chat or verbal agreements are not specifications. Written documents count

## Directory Structure

```
docs/plan/
├── README.md                    # This document
└── <feature-name>/              # Per-feature directory
    ├── 00_OVERVIEW.md           # Purpose, background, scope
    ├── 01_DESIGN.md             # Type design, public API, dependencies
    └── CHECKLIST.md             # Implementation checklist (phases + session notes)
```

Claude Code plan mode auto-generated files (`.md`) are also saved in this directory.
Feature directories and auto-generated files use different naming formats, so they do not conflict.

## Workflow

### Step 1: Spec Generation (`/plan-feature`)

Create structured spec documents from ambiguous requirements.

- Gather requirements and produce the file structure above
- Mark undecided items as `TBD` and record next actions

### Step 2: Checklist Generation (`/init-impl`)

Read the spec and generate a phased implementation checklist.

- Implementation order is bottom-up: type definitions -> core logic -> tests -> build verification
- Each phase includes a goal, checklist, test commands, and session notes
- Session notes record Done / Next / Risks & TODO

### Step 3: Phase Execution

Execute the checklist, phase by phase.

- Initialize session notes at the start of each phase
- Check off completed tasks
- If the spec needs changing, update the spec document first, then change code

## Spec File Overview

| File | Contents |
| --- | --- |
| `00_OVERVIEW.md` | Purpose, background, scope, success criteria |
| `01_DESIGN.md` | Zod schemas, public API (exports), dependent packages, type definitions |
| `CHECKLIST.md` | Phased implementation checklist, session notes |

## Checklist Structure

`CHECKLIST.md` follows this structure. Each phase has Goal / Checklist / Testing / Session Notes.

```markdown
# Implementation Checklist: <feature-name>

Spec: `docs/plan/<feature>/`

## Phase 1: Implementation
Document: `01_DESIGN.md`
Status: Not started

### Goal
Type definitions, core logic implementation, and unit tests

### Checklist
- [ ] Zod schema definitions
- [ ] Core logic implementation
- [ ] Unit tests
- [ ] Export configuration

### Testing
pnpm -r exec vitest run

### Session Notes
- Done:
- Next:
- Risks/TODO:

---

## Phase 2: Integration
Status: Not started

### Goal
Build verification and public API validation

### Checklist
- [ ] Build passes (`pnpm build`)
- [ ] Type check passes (`pnpm tsc`)
- [ ] Biome lint passes
- [ ] No unused exports detected by knip

### Testing
./scripts/post-edit-check.sh

### Session Notes
- Done:
- Next:
- Risks/TODO:
```

Phases not relevant to the spec may be omitted.

## Session Notes Format

Each phase's Session Notes must record these 3 items:

```markdown
### Session Notes
YYYY-MM-DD
- Done: What was completed
- Next: What to do next
- Risks/TODO: Unresolved issues
```

Use these 3 items to restore context when resuming across sessions or days.

## Claude Code Integration

- `.claude/settings.json` has `plansDirectory` set to `"./docs/plan"`
- Files created in Claude Code plan mode are saved to `docs/plan/`
- Plan files are version-controlled

## References

- `/plan-feature` - Spec generation skill
- `/init-impl` - Checklist generation skill
