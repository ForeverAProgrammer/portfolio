---
title: Type Conversions
sidebar_position: 5
description: Numeric and string type conversions in Go — explicit syntax, truncation behaviour, and the strconv package.
---

# Type Conversions

Go is strictly typed and **never converts types implicitly**. Every type change
must be written explicitly using the conversion syntax:

```go
targetType(value)
```

Mixing incompatible types without a conversion is a **compile-time error** — not
a runtime warning, not a silent coercion:

```go
x := 42
y := x + 2.5  // invalid operation: x + 2.5 (mismatched types int and float64)

// Correct — explicit conversion required
y := float64(x) + 2.5
```

---

## Numeric Conversions

### int → float64

Widening to a larger type is always safe — no data is lost:

```go
i := 42
f := float64(i)

fmt.Printf("i: %d  (type: %T)\n", i, i) // i: 42  (type: int)
fmt.Printf("f: %f  (type: %T)\n", f, f) // f: 42.000000  (type: float64)
```

### float64 → int (truncation)

`float64` can hold fractional values; `int` cannot. When converting, Go
**truncates toward zero** — the fractional part is dropped, not rounded:

```go
f2 := 9.99
i2 := int(f2)
fmt.Printf("%f → %d\n", f2, i2) // 9.990000 → 9  (0.99 dropped, not rounded to 10)

f3 := -9.99
i3 := int(f3)
fmt.Printf("%f → %d\n", f3, i3) // -9.990000 → -9  (toward zero, not -10)
```

If you need rounding, use `math.Round()` before converting:

```go
import "math"

rounded := int(math.Round(9.99)) // 10
```

| Input | `int()` result | Note |
| --- | --- | --- |
| `9.1` | `9` | truncated |
| `9.9` | `9` | truncated, **not** rounded |
| `-9.9` | `-9` | toward zero, not `-10` |

### Widening: int16 → int32

Converting a smaller integer type to a larger one is always safe — the value is
always preserved:

```go
var n16 int16 = 1000
n32 := int32(n16)

fmt.Printf("n16: %d  (type: %T)\n", n16, n16) // n16: 1000  (type: int16)
fmt.Printf("n32: %d  (type: %T)\n", n32, n32) // n32: 1000  (type: int32)
```

### Narrowing: int32 → int8 (silent overflow)

Converting a larger type to a smaller one can overflow. Go does **not** panic or
return an error — it simply truncates the bits:

```go
var big int32 = 2147483647 // max int32
small := int8(big)         // overflows silently

fmt.Printf("big:   %d  (type: %T)\n", big, big)     // big:   2147483647  (type: int32)
fmt.Printf("small: %d  (type: %T)\n", small, small) // small: -1  (type: int8)
```

It is your responsibility to ensure the value fits before narrowing.

### Key Concepts — Numeric Conversions

| Concept | Description |
| --- | --- |
| Explicit syntax | `targetType(value)` — e.g. `float64(x)`, `int(f)` |
| Truncation | `float64` → `int` drops the fraction, always toward zero |
| Widening | Small → large type: always safe, value preserved |
| Narrowing | Large → small type: can overflow silently, no panic |
| No implicit conversion | Every type change must be written explicitly |

---

## String Conversions

### The `string(n)` gotcha

`string(n)` on an integer does **not** produce the number as text. It produces
the UTF-8 character for that Unicode code point:

```go
fmt.Println(string(65))   // "A"  — Unicode code point 65 is the letter A
fmt.Println(string(9786)) // "☺"  — Unicode code point 9786 is a smiley face
```

To get the numeric digits as a string, use `strconv.Itoa` or `fmt.Sprintf`:

- **`strconv.Itoa(n)`** — converts an integer to its decimal string representation. "Itoa" stands for "Integer to ASCII".
- **`fmt.Sprintf("%d", n)`** — formats a value into a string using a format verb. `%d` means decimal integer.

```go
fmt.Println(strconv.Itoa(65))      // "65"
fmt.Println(fmt.Sprintf("%d", 65)) // "65"
```

### int → string

```go
n := 65

fmt.Println(strconv.Itoa(n))      // "65"  — Itoa = "Integer to ASCII"
fmt.Println(fmt.Sprintf("%d", n)) // "65"  — format verb %d for decimal integer
```

Both approaches produce identical output. `strconv.Itoa` is idiomatic when you
only need the conversion; `fmt.Sprintf` is more flexible for building larger
strings.

### string → int

`strconv.Atoi` returns two values: the parsed integer and an error. Always check
the error before using the result:

```go
s := "42"
n, err := strconv.Atoi(s)
if err != nil {
    fmt.Println("parse error:", err)
} else {
    fmt.Printf("parsed: %d  (type: %T)\n", n, n) // parsed: 42  (type: int)
}
```

When the string is not a valid integer, `Atoi` returns `0` (the zero value) and
a non-nil error:

```go
bad, err := strconv.Atoi("hello")
// err: strconv.Atoi: parsing "hello": invalid syntax
// bad: 0  — zero value returned on error
```

### float64 → string

Use `strconv.FormatFloat`. The arguments are: value, format (`'f'` for decimal),
precision (decimal places), and bit size (`64` for `float64`):

```go
f := 3.14159
fStr := strconv.FormatFloat(f, 'f', 2, 64)

fmt.Println(fStr) // "3.14"
```

### string → float64

`strconv.ParseFloat` also returns two values — the result and an error:

```go
fParsed, err := strconv.ParseFloat("3.14159", 64)
if err != nil {
    fmt.Println("parse error:", err)
} else {
    fmt.Printf("parsed: %f  (type: %T)\n", fParsed, fParsed)
    // parsed: 3.141590  (type: float64)
}
```

### Key Concepts — String Conversions

| Function | Direction | Notes |
| --- | --- | --- |
| `strconv.Itoa(n)` | `int` → `string` | "Integer to ASCII" |
| `strconv.Atoi(s)` | `string` → `int` | Returns `(int, error)`; zero value on failure |
| `strconv.FormatFloat(f, 'f', prec, 64)` | `float64` → `string` | Control precision with the `prec` argument |
| `strconv.ParseFloat(s, 64)` | `string` → `float64` | Returns `(float64, error)` |
| `fmt.Sprintf("%d", n)` | `int` → `string` | Alternative using format verbs |
| `string(n)` | `int` → `string` | ⚠️ Produces Unicode character, not digits |
