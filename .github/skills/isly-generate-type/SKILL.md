---
name: isly-generate-type
description: Generate an isly model namespace with type, is, and flawed for interfaces or type aliases.
---

# isly Generate Type

Use this skill when you need to create a reusable isly model for a domain type, exposing:
- `type` (the `isly.Type<T>` instance)
- `is` (type guard)
- `flawed` (validation failure details)

## Standard pattern

Use a type declaration (`interface` or `type`) and a matching namespace using `bind()`.

```typescript
import { isly } from "isly"

export interface Event {
	name: string
	description?: string
}

export namespace Event {
	export const { is, flawed, type } = isly
		.object<Event>(
			{
				name: isly.string(),
				description: isly.string().optional(),
			},
			"Event"
		)
		.bind()
}
```

## Type alias pattern

Use the same namespace pattern for type aliases.

```typescript
import { isly } from "isly"

export type Currency = "SEK" | "EUR"

export namespace Currency {
	export const { is, flawed, type } = isly.string<Currency>("value", ["SEK", "EUR"]).rename("Currency").bind()
}
```

## Rules

1. Keep the namespace name identical to the declared type name.
2. Always pass a stable type name string (`"Event"`, `"Currency"`) to improve validation output.
3. Build object members with explicit validators and use `.optional()` for optional fields.
4. Favor `export const { is, flawed, type } = ...bind()` over manual aliasing.
5. Prefer colocating declaration + namespace in the same file for discoverability.

## Usage

```typescript
if (!Event.is(value))
	return Event.flawed(value)
```
