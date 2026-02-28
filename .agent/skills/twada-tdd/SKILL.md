---
name: twada-tdd
description: Test-driven development strategy based on t_wada. Progress safely in small steps using Red-Green-Refactor. Use when implementing new features, fixing bugs, or refactoring with a test-first approach.
---

# Trigger Conditions

- When implementing a new feature
- When starting a bug fix with a regression-prevention test
- When safely refactoring existing code

# Execution Checklist

1. Review `docs/testing/unit-testing.md` and narrow the target to one behavior.
2. Write a failing test first (Red).
3. Add only the minimal implementation to make the test pass (Green).
4. Refactor: remove duplication and improve naming.
5. Re-run tests after each cycle and move to the next behavior.

# Reference Documents

- `docs/testing/unit-testing.md` — Vitest usage, table-driven tests
