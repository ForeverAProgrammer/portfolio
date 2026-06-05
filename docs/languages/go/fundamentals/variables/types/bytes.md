---
title: Bytes
sidebar_position: 5
description: The byte type in Go — an alias for uint8, character literals, and byte slices for raw data.
---

# Bytes

`byte` is an alias for `uint8` — they are the same type. A single byte holds values from 0 to 255, which covers the full ASCII character set. Byte slices (`[]byte`) are the primary way to work with raw binary data and to manipulate strings at the byte level.

## Declaring Bytes

```go
var b1 byte = 65  // numeric value — ASCII code for 'A'
var b2 byte = 'B' // character literal — assigns the ASCII value 66
```

**Output:**
```
b1: 65  | type: uint8
b2: 66  | type: uint8
```

`reflect.TypeOf()` reports `uint8`, not `byte` — because they are the same underlying type.

## Printing as a Character

Use the `%c` format verb to display the character a byte represents:

```go
fmt.Printf("b1 as character: %c\n", b1) // A
fmt.Printf("b2 as character: %c\n", b2) // B
```

## Byte Slices

A `[]byte` holds a sequence of bytes. This is the common form for raw data and for building or modifying strings:

```go
data := []byte{72, 101, 108, 108, 111} // ASCII values for "Hello"
fmt.Println("Byte slice:", data)        // [72 101 108 108 111]
fmt.Println("As string:", string(data)) // Hello
```

Converting a `[]byte` to `string` and back is a zero-copy-optimised operation in Go.

## Key Takeaways

- **`byte` is `uint8`**: they are interchangeable — `reflect.TypeOf()` always shows `uint8`
- **Range 0–255**: one byte covers the full ASCII character set
- **Character literals**: `'B'` is shorthand for the numeric ASCII value `66`
- **Byte slices**: the standard way to handle raw binary data or perform low-level string manipulation
- **Byte vs rune**: use `byte` for ASCII and raw binary data; use `rune` when working with full Unicode characters

## Related Topics

- [Runes](./runes.md) — `rune` (`int32`) for Unicode code points beyond ASCII
- [Strings](./strings.md) — strings are sequences of UTF-8 encoded bytes
- [Go Types](./index.md) — other built-in types
