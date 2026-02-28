---
name: unit-testing
description: Implement unit tests with Vitest table-driven tests, verifying domain/utility behavior with minimal mocking.
---

# Trigger Conditions

- When adding or updating unit tests in `*.test.ts`
- When implementing domain models or pure functions with TDD

# Execution Checklist

1. Review `docs/testing/unit-testing.md`
2. Write a failing test for one behavior first (Red)
3. Expand cases with `it.each` / `test.each`
4. Re-run all cases after refactoring

# Reference Documents

- `docs/testing/unit-testing.md`
