---
title: Floats
sidebar_position: 3
description: Floating-point types in Go — float32 vs float64, precision differences, and the math package constants.
---

# Floats

Go has two floating-point types: `float32` and `float64`. They differ in precision and memory usage. Floating-point literals default to `float64` when using `:=`.

## Declaring Floats

```go
var f32 float32 = 3.14159265358979
var f64 float64 = 3.14159265358979

fmt.Println("float32:", f32) // 3.1415927
fmt.Println("float64:", f64) // 3.14159265358979
```

**Output:**
```
float32: 3.1415927  | type: float32
float64: 3.14159265358979 | type: float64
```

Both variables are assigned the same literal, but `float32` rounds it — the precision loss is visible in the output.

## Default Type with `:=`

```go
pi := 3.14159265358979323846
// pi is float64 — floating-point literals always infer float64
```

## Precision

| Type | Precision | Typical use |
|---|---|---|
| `float32` | ~6–7 significant decimal digits | Graphics, game engines, memory-constrained systems |
| `float64` | ~15–17 significant decimal digits | General use — the default choice |

`float64` is preferred in most Go code. Use `float32` only when you need to reduce memory usage or are working with an API that requires it.

## Type Bounds

```go
import "math"

fmt.Println("Max float32:", math.MaxFloat32)               // 3.4028234663852886e+38
fmt.Println("Max float64:", math.MaxFloat64)               // 1.7976931348623157e+308
fmt.Println("Smallest nonzero float32:", math.SmallestNonzeroFloat32) // 1.401298464324817e-45
fmt.Println("Smallest nonzero float64:", math.SmallestNonzeroFloat64) // 5e-324
```

## Key Takeaways

- **Default type**: floating-point literals infer `float64` with `:=`
- **`float64` preferred**: higher precision and the standard choice for most Go code
- **Precision loss is real**: assigning the same literal to `float32` and `float64` produces visibly different values
- **Use `math` constants**: `math.MaxFloat32`, `math.MaxFloat64`, etc. give exact bounds

## Related Topics

- [Integers](./integers.md) — whole-number types
- [Type Conversions](../../type-conversions.md) — converting between float types and to/from integers
- [Go Types](./index.md) — other built-in types
