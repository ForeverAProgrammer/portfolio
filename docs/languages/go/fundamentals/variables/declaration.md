---
title: Variable Declaration
sidebar_position: 1
description: All the ways to declare variables in Go — var, short assignment, grouped blocks, zero values, multiple return values, and the blank identifier.
---

# Variable Declaration

Go has several ways to declare a variable, each suited to different situations. All variables have a fixed type set at compile time — there is no runtime type switching.

## Zero Values

Variables declared without a value are automatically initialised to their type's **zero value**. Go never leaves memory uninitialised.

```go
var i int
var f float64
var s string
var b bool

fmt.Printf("int:     %d\n", i) // 0
fmt.Printf("float64: %f\n", f) // 0.000000
fmt.Printf("string:  %q\n", s) // ""
fmt.Printf("bool:    %t\n", b) // false
```

| Type | Zero value |
|---|---|
| `int`, `int8`, `int64`, etc. | `0` |
| `float32`, `float64` | `0.0` |
| `string` | `""` |
| `bool` | `false` |
| pointers, slices, maps, channels, functions, interfaces | `nil` |

## `var` with Explicit Type

The long form — useful when you want to be explicit about the type, or when declaring a variable without assigning a value yet.

```go
var age int = 30
var username string = "Alice"
```

## `var` with Inferred Type

When a value is assigned at declaration, the type can be omitted — Go infers it from the value.

```go
var score = 100      // inferred as int
var label = "beginner" // inferred as string
```

This is equivalent to writing the type explicitly but shorter.

## Grouped `var` Block

Declare several related variables together using `var (...)`. This is the idiomatic form for multiple package-level or logically related declarations.

```go
var (
    city    string = "London"
    country string = "UK"
    pop     int    = 9_000_000
)
```

Grouped blocks keep related variables visually together and avoid repeating `var` on every line.

## Short Assignment `:=`

The most common form inside functions. The type is always inferred — you cannot specify it explicitly with `:=`.

```go
x := 42
y := 3.14
name := "Go"
isActive := true
```

`:=` can only be used **inside a function** — it is not valid at package level. Use `var` for package-level variables.

## Multiple Variables in One Line

Declare multiple variables of different types in a single statement:

```go
lang, year, active := "Go", 2024, false
```

This also works with `var`:

```go
var length, width float64 = 1.2, 2.4
```

And for reassignment of already-declared variables, use `=`:

```go
length, width = 5.0, 8.5
```

## Multiple Return Values

Go functions often return a value and an error together. Multi-variable assignment is the standard way to capture both:

```go
parsed, err := strconv.ParseBool("true")
fmt.Println(parsed, err) // true <nil>
```

This is the most common real-world use of multiple return values. Always check `err` before using the value.

### Reusing `err` with `:=`

`:=` requires at least one **new** variable on the left side. When that condition is met, existing names like `err` are treated as assignments rather than new declarations — so you can reuse `err` across multiple calls:

```go
parsed, err := strconv.ParseBool("true")  // parsed and err are new
parsedInt, err := strconv.ParseInt("42", 10, 64) // parsedInt is new; err is reassigned
```

If no new variable appears on the left, `:=` is a compile error:

```go
// compile error: no new variables on left side of :=
parsed, err := strconv.ParseBool("false")
```

## Blank Identifier `_`

Use `_` to intentionally discard a returned value. Go requires every declared variable to be used — `_` satisfies the compiler without creating a named variable.

```go
parsed, _ := strconv.ParseBool("true") // error discarded
```

In production code, prefer handling errors explicitly rather than discarding them.

## Static Typing — Wrong Type Assignment

Go is statically typed. Type mismatches are compile-time errors — the program won't build, so there is no runtime exception to catch.

```go
var n int = "42"  // compile error: cannot use "42" as int value
var n int = 3.14  // compile error: cannot use 3.14 as int value
x = "hello"       // compile error: cannot use "hello" as int value
```

This differs from dynamically typed languages where the same variable can hold different types at runtime:

```python
# Python — no fixed type, no compiler
x = 42
x = "hello"  # valid
```

In Go, the compiler enforces types across the entire codebase before a single line runs.

## Naming Rules

### Exported vs Unexported

The first letter of a name controls its visibility outside the package:

```go
// Exported — capital letter, accessible from other packages
var MaxRetries int = 3

// Unexported — lowercase letter, accessible only within this package
var maxRetries int = 3
```

This applies to variables, functions, types, and struct fields.

### Community Conventions

| Rule | Do | Avoid | Source |
|---|---|---|---|
| camelCase | `firstName` | `first_name` | [Effective Go](https://go.dev/doc/effective_go#names) |
| Acronyms stay uppercase | `userID`, `HTTPServer` | `userId`, `HttpServer` | [Code Review Comments](https://go.dev/wiki/CodeReviewComments#initialisms) |
| Short names for short scopes | `i`, `n`, `err`, `ok` | `index`, `number`, `error` | [Effective Go](https://go.dev/doc/effective_go#names) |
| Booleans read as statements | `isActive`, `hasError` | `active`, `error` | Community practice |
| Avoid package name stutter | `user.Name` | `user.UserName` | [Effective Go](https://go.dev/doc/effective_go#names) |
| Exported errors prefixed `Err` | `ErrNotFound` | `NotFoundError` | stdlib convention |

## Key Takeaways

- **Zero values**: every variable is initialised — `int` → `0`, `string` → `""`, `bool` → `false`, pointers/slices/maps → `nil`
- **`var` vs `:=`**: both declare variables; `var` works at package level and inside functions, `:=` only works inside functions
- **Type inference**: the type can be omitted when a value is assigned at declaration
- **Grouped `var (...)`**: idiomatic for related declarations — avoids repeating `var` on every line
- **`:=` needs one new variable**: existing names on the left are assignments, not redeclarations — this lets you reuse `err` across calls
- **`_` discards values**: use when the compiler requires you to handle a return value you genuinely don't need
- **Static typing**: mismatched types are compile errors, not runtime exceptions

## Related Topics

- [Variable Shadowing](./variable-shadowing.md) — how inner-scope `:=` can accidentally hide an outer variable
- [Type Conversions](../type-conversions.md) — converting between types explicitly
- [Go Variables](./index.md) — other variable topics
