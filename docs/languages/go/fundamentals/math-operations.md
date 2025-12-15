---
sidebar_position: 2
---

# Math Operations

Learn how to perform mathematical operations in Go, including basic arithmetic, increment/decrement operations, and compound assignment operators.

## Arithmetic Operators

Go supports all standard arithmetic operators for mathematical calculations.

### Basic Operations

```go
package main

import "fmt"

func main() {
    a := 10
    b := 3

    // Addition (+)
    fmt.Println("10 + 3 =", a + b)  // 13

    // Subtraction (-)
    fmt.Println("10 - 3 =", a - b)  // 7

    // Multiplication (*)
    fmt.Println("10 * 3 =", a * b)  // 30

    // Division (/)
    fmt.Println("10 / 3 =", a / b)  // 3 (integer division)

    // Modulus (%) - remainder
    fmt.Println("10 % 3 =", a % b)  // 1
}
```

## Integer vs Float Division

An important distinction in Go is how division works with integers versus floats.

### Integer Division

When dividing two integers, Go performs **integer division** - the result is truncated (no decimal part):

```go
package main

import "fmt"

func main() {
    a := 10
    b := 3

    result := a / b
    fmt.Println("10 / 3 =", result)  // 3 (not 3.333...)
}
```

**Output:**
```
10 / 3 = 3
```

### Float Division

To get decimal results, convert integers to `float64`:

```go
package main

import "fmt"

func main() {
    a := 10
    b := 3

    // Convert to float64 for decimal division
    result := float64(a) / float64(b)
    fmt.Println("10 / 3 =", result)  // 3.3333333333333335
}
```

**Output:**
```
10 / 3 = 3.3333333333333335
```

### Working with Floats

```go
package main

import "fmt"

func main() {
    x := 10.5
    y := 2.5

    fmt.Println("Addition:", x + y)        // 13.0
    fmt.Println("Subtraction:", x - y)     // 8.0
    fmt.Println("Multiplication:", x * y)  // 26.25
    fmt.Println("Division:", x / y)        // 4.2
}
```

## Modulus Operator

The modulus operator (`%`) returns the **remainder** after division. It only works with integers.

### Basic Modulus

```go
package main

import "fmt"

func main() {
    fmt.Println("10 % 3 =", 10 % 3)   // 1 (10 ÷ 3 = 3 remainder 1)
    fmt.Println("15 % 4 =", 15 % 4)   // 3 (15 ÷ 4 = 3 remainder 3)
    fmt.Println("20 % 5 =", 20 % 5)   // 0 (20 ÷ 5 = 4 remainder 0)
}
```

### Common Use: Check Even/Odd

```go
package main

import "fmt"

func main() {
    number := 7

    if number % 2 == 0 {
        fmt.Println(number, "is even")
    } else {
        fmt.Println(number, "is odd")
    }
}
```

**Output:**
```
7 is odd
```

### Check Divisibility

```go
if number % 5 == 0 {
    fmt.Println(number, "is divisible by 5")
}
```

## Increment and Decrement

Go provides `++` and `--` operators to increase or decrease values by 1.

### Basic Increment/Decrement

```go
package main

import "fmt"

func main() {
    x := 5
    fmt.Println("x starts at:", x)  // 5

    x++  // Increment by 1
    fmt.Println("After x++:", x)    // 6

    x--  // Decrement by 1
    fmt.Println("After x--:", x)    // 5
}
```

### Important: Statements, Not Expressions

In Go, `++` and `--` are **statements**, not expressions. They must be on their own line:

```go
// Valid
x++
y--

// Invalid - will cause compile error
z = x++     // Error!
if x++ > 5  // Error!
```

### Counter Example

```go
package main

import "fmt"

func main() {
    counter := 0

    counter++
    fmt.Println("Counter:", counter)  // 1

    counter++
    fmt.Println("Counter:", counter)  // 2

    counter++
    fmt.Println("Counter:", counter)  // 3
}
```

## Compound Assignment Operators

Compound operators combine arithmetic with assignment for shorter, cleaner code.

### All Compound Operators

```go
package main

import "fmt"

func main() {
    y := 10
    fmt.Println("y starts at:", y)  // 10

    y += 5  // Same as: y = y + 5
    fmt.Println("After y += 5:", y)  // 15

    y -= 3  // Same as: y = y - 3
    fmt.Println("After y -= 3:", y)  // 12

    y *= 2  // Same as: y = y * 2
    fmt.Println("After y *= 2:", y)  // 24

    y /= 4  // Same as: y = y / 4
    fmt.Println("After y /= 4:", y)  // 6

    y %= 3  // Same as: y = y % 3
    fmt.Println("After y %= 3:", y)  // 0
}
```

**Output:**
```
y starts at: 10
After y += 5: 15
After y -= 3: 12
After y *= 2: 24
After y /= 4: 6
After y %= 3: 0
```

### Compound Operator Reference

| Operator | Long Form | Description |
|----------|-----------|-------------|
| `+=` | `x = x + y` | Add and assign |
| `-=` | `x = x - y` | Subtract and assign |
| `*=` | `x = x * y` | Multiply and assign |
| `/=` | `x = x / y` | Divide and assign |
| `%=` | `x = x % y` | Modulus and assign |

### Practical Example

```go
package main

import "fmt"

func main() {
    score := 0

    score += 10  // Player scores 10 points
    fmt.Println("Score:", score)  // 10

    score += 25  // Player scores 25 more points
    fmt.Println("Score:", score)  // 35

    score -= 5   // Player loses 5 points
    fmt.Println("Score:", score)  // 30

    score *= 2   // Double points bonus
    fmt.Println("Score:", score)  // 60
}
```

## Complete Example

Here's a comprehensive example demonstrating all math operations:

```go
package main

import "fmt"

func main() {
    // Define two numbers for our operations
    a := 10
    b := 3

    fmt.Println("Math Operations Demo")
    fmt.Println("Using a =", a, "and b =", b)
    fmt.Println()

    // Addition (+)
    fmt.Println("Addition:")
    fmt.Println(a, "+", b, "=", a+b)
    fmt.Println()

    // Subtraction (-)
    fmt.Println("Subtraction:")
    fmt.Println(a, "-", b, "=", a-b)
    fmt.Println()

    // Multiplication (*)
    fmt.Println("Multiplication:")
    fmt.Println(a, "*", b, "=", a*b)
    fmt.Println()

    // Division (/)
    fmt.Println("Division:")
    fmt.Println(a, "/", b, "=", a/b) // Integer division
    fmt.Println()

    // Division with floats for decimal result
    fmt.Println("Division with floats:")
    fmt.Println(float64(a), "/", float64(b), "=", float64(a)/float64(b))
    fmt.Println()

    // Modulus (%) - remainder after division
    fmt.Println("Modulus (Remainder):")
    fmt.Println(a, "%", b, "=", a%b)
    fmt.Println()

    // Increment and Decrement
    fmt.Println("Increment and Decrement:")
    x := 5
    fmt.Println("x starts at:", x)
    x++
    fmt.Println("After x++:", x)
    x--
    fmt.Println("After x--:", x)
    fmt.Println()

    // Compound assignment operators
    fmt.Println("Compound Assignment Operators:")
    y := 10
    fmt.Println("y starts at:", y)

    y += 5
    fmt.Println("After y += 5:", y)

    y -= 3
    fmt.Println("After y -= 3:", y)

    y *= 2
    fmt.Println("After y *= 2:", y)

    y /= 4
    fmt.Println("After y /= 4:", y)

    y %= 3
    fmt.Println("After y %= 3:", y)
}
```

**Output:**
```
Math Operations Demo
Using a = 10 and b = 3

Addition:
10 + 3 = 13

Subtraction:
10 - 3 = 7

Multiplication:
10 * 3 = 30

Division:
10 / 3 = 3

Division with floats:
10 / 3 = 3.3333333333333335

Modulus (Remainder):
10 % 3 = 1

Increment and Decrement:
x starts at: 5
After x++: 6
After x--: 5

Compound Assignment Operators:
y starts at: 10
After y += 5: 15
After y -= 3: 12
After y *= 2: 24
After y /= 4: 6
After y %= 3: 0
```

## Operator Precedence

Go follows standard mathematical operator precedence:

1. **Highest**: `*`, `/`, `%` (multiplication, division, modulus)
2. **Lower**: `+`, `-` (addition, subtraction)

### Precedence Examples

```go
result := 10 + 5 * 2   // 20 (not 30, because * is evaluated first)
result := (10 + 5) * 2  // 30 (parentheses force addition first)

result := 10 - 3 + 2   // 9 (left to right for same precedence)
result := 10 / 2 * 3   // 15 (left to right: 10/2=5, then 5*3=15)
```

## Common Patterns

### Calculate Average

```go
total := 85 + 92 + 78 + 95
count := 4
average := total / count
fmt.Println("Average:", average)  // 87
```

### Convert Celsius to Fahrenheit

```go
celsius := 25.0
fahrenheit := (celsius * 9.0 / 5.0) + 32.0
fmt.Println(celsius, "°C =", fahrenheit, "°F")  // 25°C = 77°F
```

### Calculate Tax

```go
price := 100.0
taxRate := 0.08
tax := price * taxRate
total := price + tax
fmt.Println("Total with tax:", total)  // 108
```

## Key Takeaways

- **Integer division** truncates the decimal part
- **Float division** requires converting to `float64`
- **Modulus** (`%`) returns the remainder (integers only)
- **Increment/Decrement** (`++`, `--`) must be standalone statements
- **Compound operators** (`+=`, `-=`, etc.) make code more concise
- **Operator precedence** follows mathematical rules (use parentheses for clarity)

## Related Topics

- [Go Fundamentals](./index.md) - Core Go programming concepts
- [Comparison Operators](./comparison-operators.md) - Comparing values in Go
