# Unit Testing Policy

## Purpose

- Guarantee behavior of pure functions and utilities at high speed
- Keep specification granularity small and run the shortest TDD feedback loop

## Scope

- `api/src/**` — API utilities
- `dayjs/**` — date/time utilities
- `errors/**` — error handling
- `logging/**` — logging utilities

## Implementation Rules

1. One test, one behavior
2. Use `it.each` / `test.each` table-driven tests as the standard form
3. Progress `Red -> Green -> Refactor` one case at a time
4. Verify input/output contracts, not implementation details (private functions, internal state)

## Mocking Policy

- Default: do not mock
- Allowed: fix non-deterministic factors such as time, randomness, and external communication
- Prohibited: excessive mocking of internal modules that couples tests to implementation details

## Table-Driven Test Template

```ts
import { describe, expect, it } from "vitest";

describe("normalizeText", () => {
  const cases = [
    { name: "trim only", input: "  foo  ", expected: "foo" },
    { name: "collapse spaces", input: "foo   bar", expected: "foo bar" },
  ];

  it.each(cases)("$name", ({ input, expected }) => {
    expect(normalizeText(input)).toBe(expected);
  });
});
```

## Commands

- All packages: `pnpm -r exec vitest run`
- Specific package: `pnpm --filter @vspo-lab/error exec vitest run`

## References

- Vitest `test.each`: https://vitest.dev/api/#test-each
- Vitest Mocking (avoid over-mocking): https://vitest.dev/guide/mocking.html
