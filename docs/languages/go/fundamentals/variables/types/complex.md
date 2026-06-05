---
title: Complex Numbers
sidebar_position: 7
description: Complex number types in Go — complex64 and complex128, constructing values, extracting parts with real() and imag(), and arithmetic.
---

# Complex Numbers

Go has two built-in complex number types: `complex64` and `complex128`. Both store a real and an imaginary part — they differ only in the precision of each part.

## Declaring Complex Numbers

Use the `complex()` built-in to construct a complex value from its real and imaginary parts:

```go
var c64 complex64 = complex(1.5, 2.5) // float32 real and imaginary parts

c128 := complex(3.0, -4.0) // float64 parts — complex128 inferred by :=
```

**Output:**
```
complex64: (1.5+2.5i)  | type: complex64
complex128: (3-4i)     | type: complex128
```

| Type | Parts | Notes |
|---|---|---|
| `complex64` | two `float32` | less precision, smaller memory footprint |
| `complex128` | two `float64` | default type inferred by `:=` |

## Extracting Real and Imaginary Parts

`real()` and `imag()` return the individual parts of a complex value:

```go
fmt.Printf("real(c128): %g\n", real(c128)) // 3
fmt.Printf("imag(c128): %g\n", imag(c128)) // -4
```

## Arithmetic

Standard arithmetic operators work directly on complex values:

```go
sum := c128 + complex(1.0, 1.0)
fmt.Println("c128 + (1+1i):", sum) // (4-3i)
```

## Key Takeaways

- **Two types**: `complex64` (float32 parts) and `complex128` (float64 parts) — `:=` infers `complex128`
- **`complex()` built-in**: constructs a complex number from real and imaginary parts
- **`real()` and `imag()`**: extract the two parts from any complex value
- **Arithmetic works directly**: `+`, `-`, `*`, `/` all operate on complex values without conversion

## Related Topics

- [Floats](./floats.md) — `float64` is the underlying type of `complex128` parts
- [Go Types](./index.md) — other built-in types
