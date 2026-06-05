---
title: Integers
sidebar_position: 2
description: Integer types in Go — signed and unsigned variants, sizes, bounds, and when to use each.
---

# Integers

Go has distinct integer types of different sizes. Choosing the right size matters — they are not interchangeable without an explicit conversion.

## Signed Integers

Signed integers can hold negative, zero, and positive values.

```go
var i   int   = 42
var i8  int8  = 127
var i16 int16 = 32767
var i32 int32 = 2147483647
var i64 int64 = 9223372036854775807
```

**Output:**
```
int: 42    | type: int
int8: 127  | type: int8
int16: 32767 | type: int16
int32: 2147483647 | type: int32
int64: 9223372036854775807 | type: int64
```

## Unsigned Integers

Unsigned integers hold only zero and positive values, giving double the positive range.

```go
var u   uint   = 42
var u8  uint8  = 255
var u16 uint16 = 65535
var u32 uint32 = 4294967295
var u64 uint64 = 18446744073709551615 // largest unsigned 64-bit value
```

**Output:**
```
uint: 42   | type: uint
uint8: 255 | type: uint8
uint16: 65535 | type: uint16
uint32: 4294967295 | type: uint32
uint64: 18446744073709551615 | type: uint64
```

## Type Bounds

Use `math` package constants rather than hard-coding limits:

```go
import "math"

fmt.Println("Max int8:", math.MaxInt8)   // 127
fmt.Println("Min int8:", math.MinInt8)   // -128
fmt.Println("Max int16:", math.MaxInt16) // 32767
fmt.Println("Max int32:", math.MaxInt32) // 2147483647
fmt.Println("Max int64:", math.MaxInt64) // 9223372036854775807
fmt.Println("Max uint8:", math.MaxUint8)         // 255
fmt.Println("Max uint64:", uint64(math.MaxUint64)) // 18446744073709551615
```

## Quick Reference

| Type | Size | Range |
|---|---|---|
| `int` | 32 or 64 bit (platform) | platform-dependent |
| `int8` | 8 bit | −128 to 127 |
| `int16` | 16 bit | −32,768 to 32,767 |
| `int32` | 32 bit | −2,147,483,648 to 2,147,483,647 |
| `int64` | 64 bit | −9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 |
| `uint` | 32 or 64 bit (platform) | 0 to platform max |
| `uint8` | 8 bit | 0 to 255 |
| `uint16` | 16 bit | 0 to 65,535 |
| `uint32` | 32 bit | 0 to 4,294,967,295 |
| `uint64` | 64 bit | 0 to 18,446,744,073,709,551,615 |

## Static Typing with Integers

Integer types in Go are all distinct — you cannot mix them without an explicit conversion:

```go
var a int32 = 100
var b int64 = 200

// b = a        // compile error: cannot use a (type int32) as type int64
b = int64(a)    // correct: explicit conversion required
```

This prevents overflow bugs and unintended data loss at compile time.

## Key Takeaways

- **`int` is platform-dependent**: 32-bit on 32-bit systems, 64-bit on 64-bit systems — use it for general-purpose integers unless you need a specific size
- **Signed vs unsigned**: signed types (`int*`) hold negatives; unsigned types (`uint*`) double the positive range at the cost of no negatives
- **All integer types are distinct**: `int32` and `int64` are different types — mixing them requires an explicit conversion
- **Use `math` constants**: `math.MaxInt8`, `math.MinInt8`, etc. give exact bounds without memorising them

## Related Topics

- [Floats](./floats.md) — floating-point types for decimal numbers
- [Type Conversions](../../type-conversions.md) — converting between integer types
- [Go Types](./index.md) — other built-in types
