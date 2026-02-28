# Testing Strategy Overview

This directory is the Single Source of Truth for testing policies by test type.

## Core Principles

- Follow t_wada-based `Red-Green-Refactor` in short cycles
- Use table-driven tests (`it.each` / `test.each`) as the default form
- Default: do not mock. Pass real implementations for internal dependencies
- Exception: mock non-deterministic boundaries you do not control (external SaaS, network calls)
- Verify behavior visible to the caller, not implementation details

## Test Types and Responsibilities

| Type | Purpose | Primary Tool | Policy |
| --- | --- | --- | --- |
| Unit | Verify local behavior of functions and utilities | Vitest | Fast, pure, minimal side effects |

## Coverage Policy

| Package | Minimum Coverage | CI Enforced |
| --- | --- | --- |
| `api/**` | 60% | Yes |
| `dayjs/**` | 60% | Yes |
| `errors/**` | 60% | Yes |
| `logging/**` | 60% | Yes |

- PRs that fall below the threshold fail CI
- Thresholds are raised incrementally (initial settings are conservative)
- Do not write meaningless tests for coverage. Reach coverage naturally through behavior-verifying tests

## Documents

- [unit-testing.md](./unit-testing.md)
