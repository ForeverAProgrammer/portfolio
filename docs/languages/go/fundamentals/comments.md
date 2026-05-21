---
title: Comments
sidebar_position: 8
description: Go comment styles, documentation comments, and best practices for writing useful comments.
---

# Comments

Go has two comment syntaxes and a strong convention around how comments are written. Getting this right matters because Go's tooling (`go doc`, `godoc`) reads your comments to generate documentation automatically.

## Single-Line Comments

The `//` style is the standard for almost all Go comments — inside functions, above declarations, and for documentation.

```go
// This is a single-line comment describing the next statement.
// Use inline comments like this only when the intent is not obvious
// from the code or when you need to call out important behavior.
fmt.Println(Greet("world"))
```

## Block Comments

`/* ... */` is valid Go syntax and can span multiple lines, but the `//` style is strongly preferred today.

```go
/* This is a block comment. It can span multiple lines.
   Block comments are most common as package-level doc comments
   in older Go code, but the // style is preferred today. */
```

Block comments are still occasionally seen in older codebases or for temporarily commenting out a large section of code.

## Documentation Comments

A **documentation comment** is a `//` comment placed immediately above an exported symbol (package, function, type, method, or variable). It must begin with the name of the thing it describes.

```go
// Greet returns a greeting string for the given name.
//
// This is a documentation comment. It starts with the function name and is
// picked up by go doc and godoc. Run `go doc Greet` in this directory to see it.
func Greet(name string) string {
    return "Hello, " + name + "!"
}
```

`go doc` and `godoc` use these comments to generate documentation. Run `go doc Greet` in the package directory to see the output.

### Package-Level Doc Comments

A package comment goes above the `package` declaration:

```go
// comments-demo is a tiny program that prints a message.
// It exists to demonstrate Go comment styles and best practices.
//
// In Go, comments fall into two main categories:
//   - Documentation comments (beginning with the name being described)
//   - Inline comments (used sparingly to explain non-obvious code)
package main
```

Use a blank `//` line to add a paragraph break inside a doc comment.

## TODO and NOTE Conventions

`// TODO:` and `// NOTE:` are informal but widely understood conventions in Go codebases.

```go
// TODO: add more comment style examples as the demo grows

// NOTE: block comments are also valid Go syntax (shown below).
// They are rarely used inside functions — prefer // for inline comments.
```

| Marker | Purpose |
|---|---|
| `// TODO:` | Marks work that still needs to be done |
| `// NOTE:` | Calls out something non-obvious the reader should pay attention to |

These are not enforced by the compiler — they are conventions respected by editors and code review tools.

## Best Practices

### Prefer clear code over comments

Make the code self-explanatory first with good names and small functions. Add comments for *why* something is done, not to repeat *what* the code already says.

```go
// Good — explains why, not what
// Start at 1 to skip the CSV header row.
for i := 1; i < len(rows); i++ {
    process(rows[i])
}

// Avoid — just restates what the code already says
for i := 1; i < len(rows); i++ { // loop over rows
    process(rows[i]) // process each row
}
```

### Use documentation comments for all exported symbols

```go
// Good
// Greet returns a greeting string for the given name.
func Greet(name string) string { ... }

// Avoid — exported function with no doc comment
func Greet(name string) string { ... }
```

### Keep comments close to the code they describe

Place a comment immediately above the declaration it documents. For short local clarifications, put it on the line just above the statement — not several lines away.

### Explain intent, invariants, and edge cases

Document assumptions, preconditions, and non-obvious choices — not the mechanics:

```go
// Use a power of two so the compiler can replace the modulo with a bitwise AND.
const bucketCount = 256
```

### Keep comments up to date

Out-of-date comments are worse than no comments. When changing behaviour, update or remove nearby comments in the same change.

## Key Takeaways

- **`//`** is the standard comment style for everything — inline, above declarations, and for doc comments
- **`/* ... */`** is valid but rarely used; prefer `//` in modern Go
- **Documentation comments** start with the name of the symbol and are read by `go doc` / `godoc`
- **Package doc comments** go immediately above the `package` declaration
- **`// TODO:`** marks incomplete work; **`// NOTE:`** highlights non-obvious behaviour
- Comment the *why*, not the *what* — if the code needs a comment to explain what it does, consider renaming or restructuring first

## Related Topics

- [Go Fundamentals](./index.md) - Core Go programming concepts
- [Package Names and Import Paths](./packages.md) - How import paths and package names relate
