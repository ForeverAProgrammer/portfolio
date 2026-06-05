---
title: Strings
sidebar_position: 4
description: The string type in Go — UTF-8 encoding, length, concatenation, raw literals, and byte indexing.
---

# Strings

A Go `string` is an immutable sequence of UTF-8 encoded bytes. Once created, a string cannot be modified — operations that appear to change a string always produce a new one.

## Declaring Strings

```go
var s1 string = "Hello, World!"
s2 := "Go is awesome" // type inferred as string
```

**Output:**
```
s1: Hello, World! | type: string
s2: Go is awesome | type: string
```

## String Length

`len()` returns the number of **bytes**, not characters. For ASCII strings these are the same, but a multi-byte Unicode character counts as more than one byte.

```go
fmt.Println("Length of s1:", len("Hello, World!")) // 13
```

## Concatenation

Use `+` to join strings:

```go
s3 := "Hello, World!" + " " + "Go is awesome"
fmt.Println(s3) // Hello, World! Go is awesome
```

## Raw String Literals

Backtick strings are raw — backslash sequences are not processed, and the string can span multiple lines:

```go
s4 := `This is a
multi-line
string`
fmt.Println(s4)
```

**Output:**
```
This is a
multi-line
string
```

## Byte Indexing

`s[i]` returns the byte at index `i` as a `uint8` value:

```go
fmt.Println("First byte of s1:", "Hello, World!"[0])      // 72
fmt.Printf("First character of s1: %c\n", "Hello, World!"[0]) // H
```

For Unicode-safe character iteration, use `range` — see [Loops](../../loops.md#range-over-a-string).

## Key Takeaways

- **Immutable**: strings cannot be modified after creation — operations produce new strings
- **UTF-8 encoded**: Go source files and strings are UTF-8 by default
- **`len()` counts bytes**: not characters — a multi-byte Unicode character counts as more than 1
- **Raw literals**: backtick strings preserve backslashes literally and support multiple lines
- **Byte indexing**: `s[i]` returns a `uint8` — use `range` for Unicode-safe character access

## Related Topics

- [Bytes](./bytes.md) — `byte` (`uint8`), the unit that strings are made of
- [Runes](./runes.md) — Unicode-aware character type for iterating strings
- [Strings and Formatting](../../strings-and-formatting.md) — escape characters, `fmt.Printf` verbs, and more
- [Go Types](./index.md) — other built-in types
