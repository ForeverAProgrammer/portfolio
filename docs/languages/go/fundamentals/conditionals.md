---
title: Conditionals
sidebar_position: 9
description: Conditional logic in Go — if, if-else, if-else if chains, short statements, switch on a value, and conditionless switch.
---

# Conditionals

Go uses `if` statements and `switch` statements for conditional logic. Both are straightforward, but Go has a few distinctive rules worth knowing — no parentheses around conditions, no automatic fall-through in `switch`, and the ability to declare a variable right inside an `if`.

## Basic `if`

An `if` block runs only when its condition is `true`.

```go
package main

import "fmt"

func main() {
    score := 75

    if score >= 60 {
        fmt.Println("Pass")
    }
}
```

**Output:**
```
Pass
```

Go does **not** require parentheses around the condition — `if score >= 60 {` is the correct style, not `if (score >= 60) {`.

## `if-else`

Use `else` to run a block when the condition is `false`.

```go
if score >= 90 {
    fmt.Println("Grade: A")
} else {
    fmt.Println("Grade: not A")
}
```

**Output:**
```
Grade: not A
```

## `if-else if-else` Chain

Chain multiple conditions to handle several ranges or cases.

```go
if score >= 90 {
    fmt.Println("Letter grade: A")
} else if score >= 80 {
    fmt.Println("Letter grade: B")
} else if score >= 70 {
    fmt.Println("Letter grade: C")
} else if score >= 60 {
    fmt.Println("Letter grade: D")
} else {
    fmt.Println("Letter grade: F")
}
```

**Output (with `score := 75`):**
```
Letter grade: C
```

The first branch whose condition is `true` wins; the rest are skipped.

## `if` with a Short Statement

Go lets you declare a variable as part of the `if` header, separated from the condition by a semicolon. The variable is scoped to the `if` and its `else` block — it disappears after.

```go
if bonus := 10; score+bonus >= 80 {
    fmt.Println("With bonus, this is at least a B")
} else {
    fmt.Println("With bonus, still below B")
}
```

**Output (with `score := 75`):**
```
With bonus, still below B
```

This pattern is commonly used with functions that return a value and an error:

```go
if err := doSomething(); err != nil {
    fmt.Println("error:", err)
}
```

## `switch` on a Value

`switch` matches a variable against specific values. Unlike C or Java, Go cases do **not** fall through by default — only the matching case runs.

```go
day := "Saturday"

switch day {
case "Saturday", "Sunday":
    fmt.Println("Weekend")
default:
    fmt.Println("Weekday")
}
```

**Output:**
```
Weekend
```

Key points:
- Multiple values can share one case: `case "Saturday", "Sunday":` matches either.
- `default` runs when no case matches (optional, but good practice).
- Add `fallthrough` explicitly if you need the next case to run.

## Conditionless `switch`

Omit the value after `switch` to write a clause-based form. Each case is a boolean expression, and the first `true` case wins — this is idiomatic Go for complex multi-branch logic.

```go
switch {
case score >= 90:
    fmt.Println("Switch grade: A")
case score >= 80:
    fmt.Println("Switch grade: B")
case score >= 70:
    fmt.Println("Switch grade: C")
case score >= 60:
    fmt.Println("Switch grade: D")
default:
    fmt.Println("Switch grade: F")
}
```

**Output (with `score := 75`):**
```
Switch grade: C
```

This is equivalent to the `if-else if-else` chain above, but many Go developers find `switch` cleaner for four or more branches.

## Complete Example

```go
package main

import "fmt"

func main() {
    score := 75

    // Basic if
    if score >= 60 {
        fmt.Println("Pass (basic if)")
    }

    // if-else
    if score >= 90 {
        fmt.Println("Grade: A")
    } else {
        fmt.Println("Grade: not A")
    }

    // if-else if-else chain
    if score >= 90 {
        fmt.Println("Letter grade: A")
    } else if score >= 80 {
        fmt.Println("Letter grade: B")
    } else if score >= 70 {
        fmt.Println("Letter grade: C")
    } else if score >= 60 {
        fmt.Println("Letter grade: D")
    } else {
        fmt.Println("Letter grade: F")
    }

    // if with a short statement
    if bonus := 10; score+bonus >= 80 {
        fmt.Println("With bonus, this is at least a B")
    } else {
        fmt.Println("With bonus, still below B")
    }

    // switch on a value
    day := "Saturday"
    switch day {
    case "Saturday", "Sunday":
        fmt.Println("Weekend")
    default:
        fmt.Println("Weekday")
    }

    // conditionless switch
    switch {
    case score >= 90:
        fmt.Println("Switch grade: A")
    case score >= 80:
        fmt.Println("Switch grade: B")
    case score >= 70:
        fmt.Println("Switch grade: C")
    case score >= 60:
        fmt.Println("Switch grade: D")
    default:
        fmt.Println("Switch grade: F")
    }
}
```

**Output:**
```
Pass (basic if)
Grade: not A
Letter grade: C
With bonus, still below B
Weekend
Switch grade: C
```

## Key Takeaways

- **No parentheses**: `if x > 10 {` not `if (x > 10) {`
- **Boolean conditions only**: `if` always evaluates a `bool` — there is no truthy/falsy like in Python or JavaScript
- **Short statement scope**: a variable declared in `if v := ...; condition` lives only inside that `if`/`else` block
- **No fall-through by default**: `switch` cases are independent; use `fallthrough` only when you explicitly need it
- **Multiple values per case**: `case "a", "b":` avoids repeating the same logic for two values
- **Conditionless switch** is idiomatic for multi-branch boolean logic; it's a valid alternative to long `if-else if` chains

## Related Topics

- [Comparison Operators](./comparison-operators.md) — the boolean expressions used inside `if` conditions
- [Go Fundamentals](./index.md) — core Go programming concepts
