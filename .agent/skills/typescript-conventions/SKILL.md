---
name: typescript-conventions
description: Type definitions via Zod Schema First, satisfies operator, type-safe patterns. No direct interface definitions, no "as" assertions.
---

# Trigger Conditions

- When defining new types or schemas
- When about to write an interface or type alias directly
- When about to use a type assertion (`as`)

# Rules

## Zod Schema First

All types are derived from Zod schemas. Do not write `interface` or standalone `type` definitions.

```ts
import { z } from "zod";

const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
});

type User = z.infer<typeof UserSchema>;
```

## satisfies Operator

Use `satisfies` instead of `as` for type-safe narrowing without losing literal types.

```ts
const config = {
  port: 3000,
  host: "localhost",
} satisfies ServerConfig;
```

## Prohibited Patterns

- `as` type assertions — use type guards or `satisfies` instead
- Direct `interface` definitions — use Zod schema + `z.infer`
- `any` type — use `unknown` and narrow with type guards
