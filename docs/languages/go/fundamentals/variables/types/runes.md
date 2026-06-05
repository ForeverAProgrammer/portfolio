---
title: Runes
sidebar_position: 6
description: The rune type in Go — an alias for int32, Unicode code points, single quotes, and how runes differ from bytes.
---

# Runes

`rune` is an alias for `int32` — they are the same type. A rune represents a single Unicode code point, which covers the full Unicode range of ~1.1 million characters. This includes ASCII characters, accented letters, emoji, CJK characters, and everything else Unicode defines.

## Declaring Runes

```go
var r1 rune = 'A'  // ASCII character — code point 65
var r2 rune = '😊' // Unicode emoji — code point 128522
```

**Output:**
```
Rune r1: 65     | type: int32
Rune r2: 128522 | type: int32
```

`reflect.TypeOf()` reports `int32`, not `rune` — because they are the same underlying type.

## Printing as a Character

Use the `%c` format verb to display the character a rune represents:

```go
fmt.Printf("r1 as character: %c\n", r1) // A
fmt.Printf("r2 as character: %c\n", r2) // 😊
```

## Rune vs Byte

| | `byte` (`uint8`) | `rune` (`int32`) |
|---|---|---|
| Size | 8 bit | 32 bit |
| Range | 0–255 | 0–1,114,111 |
| Covers | ASCII (128 chars) + extended ASCII | Full Unicode (~1.1M code points) |
| Literal syntax | `'A'` | `'A'`, `'😊'` |
| Use case | Raw binary data, ASCII text | Unicode text, string iteration |

## Rune Literals Use Single Quotes

Rune literals (and byte literals) use single quotes. String literals use double quotes — these are different types:

```go
r := 'A'   // rune (int32) — value 65
s := "A"   // string — a one-character UTF-8 string
```

## Key Takeaways

- **`rune` is `int32`**: they are interchangeable — `reflect.TypeOf()` always shows `int32`
- **Unicode code point**: a rune holds one Unicode code point, not one byte
- **Single quotes**: rune literals use single quotes (`'A'`); string literals use double quotes (`"A"`)
- **`%c` format verb**: prints the character represented by the rune's numeric value
- **Prefer runes for Unicode text**: when iterating over a string character by character, `range` yields `(byteIndex, rune)` pairs — see [Loops](../../loops.md#range-over-a-string)

## Related Topics

- [Bytes](./bytes.md) — `byte` (`uint8`) for ASCII and raw binary data
- [Strings](./strings.md) — strings are sequences of UTF-8 bytes; `range` over a string yields runes
- [Loops](../../loops.md#range-over-a-string) — `range` over a string iterates runes, not bytes
- [Go Types](./index.md) — other built-in types
