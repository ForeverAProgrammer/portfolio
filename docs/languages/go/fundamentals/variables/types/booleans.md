---
title: Booleans
sidebar_position: 1
description: The bool type in Go — declaration, logical operators, and common uses in control flow.
---

# Booleans

The `bool` type has exactly two values: `true` and `false`. It is the type returned by comparison and logical operators, and is the required condition type for `if` statements and loops.

## Declaring Booleans

```go
var b1 bool = true
var b2 bool = false
b3 := true // short declaration — type inferred as bool
```

**Output:**
```
b1: true | type: bool
b2: false | type: bool
b3: true | type: bool
```

## Logical Operators

| Operator | Name | Example | Result |
|---|---|---|---|
| `&&` | AND | `true && false` | `false` |
| `\|\|` | OR | `true \|\| false` | `true` |
| `!` | NOT | `!true` | `false` |

```go
fmt.Println("true && false:", true && false) // false
fmt.Println("true || false:", true || false) // true
fmt.Println("!true:", !true)                 // false
```

**Output:**
```
true && false: false
true || false: true
!true: false
```

## Key Takeaways

- **Only two values**: a `bool` can only ever be `true` or `false` — Go has no truthy/falsy values
- **Type inference**: `:=` infers the type as `bool` when assigned `true` or `false`
- **Logical operators**: `&&`, `||`, and `!` all return `bool`
- **`if` conditions**: Go requires a `bool` expression — unlike Python or JavaScript, integers and other types are not implicitly boolean

## Related Topics

- [Conditionals](../../conditionals.md) — using booleans in `if` and `switch` statements
- [Comparison Operators](../../comparison-operators.md) — operators that produce `bool` values
- [Go Types](./index.md) — other built-in types
