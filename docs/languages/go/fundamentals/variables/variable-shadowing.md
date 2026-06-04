---
title: Variable Shadowing
sidebar_position: 1
description: What variable shadowing is in Go, why it causes bugs, how to avoid it, and why you should never shadow built-in identifiers like error.
---

# Variable Shadowing

Shadowing happens when a variable declared in an inner scope has the same name as one in an outer scope. The inner variable hides the outer one for the duration of that block. Go will not warn you — the code compiles and runs, which makes shadowing bugs hard to spot.

## What Shadowing Looks Like

Any block creates a new scope: `if`, `for`, `switch`, and bare `{ }` blocks. Using `:=` inside one of these blocks always declares a **new** variable, even if the name already exists in the outer scope.

```go
count := 10
fmt.Println("Outer count:", count) // 10

{
    count := 5 // new variable — shadows outer count
    fmt.Println("Inner count:", count) // 5
}

fmt.Println("Outer count (unchanged):", count) // 10
```

**Output:**
```
Outer count: 10
Inner count: 5
Outer count (unchanged): 10
```

The outer `count` is never modified. If you intended to update it, this is a bug.

## Why It's a Problem

- **Confusing** — readers may assume the outer variable is being updated
- **Silent** — the code compiles cleanly; there's no compiler warning
- **Easy to miss** — `:=` and `=` look almost identical at a glance

## How to Avoid It

### Use `=` to update an outer variable

`:=` declares a new variable. `=` assigns to an existing one. When you want to update a variable from an outer scope, use `=`.

```go
value := 0
{
    value = 42 // updates outer value — no new variable created
}
fmt.Println("value:", value) // 42
```

### Use a distinct name when the inner value is logically different

If the inner value is genuinely separate from the outer one, give it a different name — this makes the intent clear.

```go
total := 100
{
    discounted := total - 10 // different name; total is clearly unchanged
    fmt.Println("Discounted:", discounted) // 90
}
fmt.Println("Original total:", total) // 100
```

## Never Shadow Built-in Identifiers

Go's built-in identifiers (`error`, `len`, `make`, `true`, `false`, `nil`, etc.) live in the universe block — the outermost scope. They can be shadowed just like any other name, but doing so breaks the rest of that scope.

The most common trap is shadowing the `error` type:

```go
// Bad — shadows the error type
error := strconv.ParseBool("true")

var x error = nil // compile error: error is not a type
```

Once `error` is declared as a variable, you can no longer use it as a type anywhere in the same scope. The fix is to use `err`, which is the standard Go convention:

```go
// Good — err is the Go convention for error values
parsed, err := strconv.ParseBool("true")
fmt.Println(parsed, err)
```

## Key Takeaways

- **Shadowing is not a compile error** — Go compiles and runs shadowed code silently
- **`:=` always declares a new variable** — use `=` when you want to update an existing outer variable
- **Any block creates a new scope** — `if`, `for`, `switch`, and bare `{ }` blocks all enable shadowing
- **Never shadow built-in identifiers** — shadowing `error`, `len`, `make`, `true`, etc. causes confusing compile errors later in the same scope
- **Use `err`, not `error`** — the Go convention for error values; short, clear, and never conflicts with the `error` type

## Related Topics

- [Go Variables](./index.md) — other variable topics
- [Conditionals](../conditionals.md) — `if` and `switch` blocks where shadowing commonly occurs
- [Loops](../loops.md) — `for` blocks are another common shadowing site
