---
name: error-handling
description: Result-type-based error handling without try-catch. Type-safe error flow using wrap/Ok/Err/AppError from @vspo-lab/error.
---

# Trigger Conditions

- When writing error handling code
- When adding a new error code
- When about to write try-catch (prohibited)

# Core Rules

- Use `Ok()`, `Err()`, `wrap()`, and `AppError` from `@vspo-lab/error`
- Never use try-catch — always return Result types
- Define domain error codes as AppError variants

# Reference Documents

- `errors/` package source — Result type implementation, domain error code system
