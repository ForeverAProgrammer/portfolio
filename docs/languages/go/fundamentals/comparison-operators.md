---
sidebar_position: 3
---

# Comparison Operators

Learn how to compare values in Go using comparison operators. These operators return boolean values (`true` or `false`) and are essential for control flow in your programs.

## What are Comparison Operators?

Comparison operators compare two values and return a boolean result. They're used extensively in `if` statements, loops, and conditional logic.

### All Comparison Operators

| Operator | Name | Description | Example |
|----------|------|-------------|---------|
| `==` | Equal to | Checks if values are equal | `5 == 5` → `true` |
| `!=` | Not equal to | Checks if values are different | `5 != 3` → `true` |
| `>` | Greater than | Left value is greater than right | `10 > 5` → `true` |
| `<` | Less than | Left value is less than right | `5 < 10` → `true` |
| `>=` | Greater than or equal | Left ≥ right | `10 >= 10` → `true` |
| `<=` | Less than or equal | Left ≤ right | `5 <= 10` → `true` |

## Comparing Numbers

### Equal and Not Equal

```go
package main

import "fmt"

func main() {
    a := 10
    b := 5
    c := 10

    // Equal to (==)
    fmt.Println("10 == 5 is", a == b)  // false
    fmt.Println("10 == 10 is", a == c) // true

    // Not equal to (!=)
    fmt.Println("10 != 5 is", a != b)  // true
    fmt.Println("10 != 10 is", a != c) // false
}
```

**Output:**
```
10 == 5 is false
10 == 10 is true
10 != 5 is true
10 != 10 is false
```

### Greater Than and Less Than

```go
package main

import "fmt"

func main() {
    a := 10
    b := 5

    // Greater than (>)
    fmt.Println("10 > 5 is", a > b)   // true
    fmt.Println("5 > 10 is", b > a)   // false

    // Less than (<)
    fmt.Println("10 < 5 is", a < b)   // false
    fmt.Println("5 < 10 is", b < a)   // true
}
```

**Output:**
```
10 > 5 is true
5 > 10 is false
10 < 5 is false
5 < 10 is true
```

### Greater/Less Than or Equal

```go
package main

import "fmt"

func main() {
    a := 10
    b := 5
    c := 10

    // Greater than or equal to (>=)
    fmt.Println("10 >= 5 is", a >= b)   // true
    fmt.Println("10 >= 10 is", a >= c)  // true (equal counts!)
    fmt.Println("5 >= 10 is", b >= a)   // false

    // Less than or equal to (<=)
    fmt.Println("5 <= 10 is", b <= a)   // true
    fmt.Println("10 <= 10 is", a <= c)  // true (equal counts!)
    fmt.Println("10 <= 5 is", a <= b)   // false
}
```

**Output:**
```
10 >= 5 is true
10 >= 10 is true
5 >= 10 is false
5 <= 10 is true
10 <= 10 is true
10 <= 5 is false
```

## Comparing Strings

Strings are compared **lexicographically** (alphabetically), character by character.

### String Equality

```go
package main

import "fmt"

func main() {
    str1 := "apple"
    str2 := "banana"
    str3 := "apple"

    fmt.Println("apple == banana is", str1 == str2)  // false
    fmt.Println("apple == apple is", str1 == str3)   // true
}
```

**Output:**
```
apple == banana is false
apple == apple is true
```

### String Ordering

Strings are compared alphabetically (actually by Unicode code point):

```go
package main

import "fmt"

func main() {
    str1 := "apple"
    str2 := "banana"

    // 'a' comes before 'b' alphabetically
    fmt.Println("apple < banana is", str1 < str2)   // true
    fmt.Println("banana > apple is", str2 > str1)   // true
}
```

**Output:**
```
apple < banana is true
banana > apple is true
```

### Case Sensitivity

String comparisons are **case-sensitive**:

```go
package main

import "fmt"

func main() {
    fmt.Println("Apple == apple is", "Apple" == "apple")  // false
    fmt.Println("A < a is", "A" < "a")  // true (uppercase comes before lowercase)
}
```

**Output:**
```
Apple == apple is false
A < a is true
```

## Comparing Booleans

Boolean values can be compared for equality:

```go
package main

import "fmt"

func main() {
    bool1 := true
    bool2 := false
    bool3 := true

    fmt.Println("true == false is", bool1 == bool2)  // false
    fmt.Println("true == true is", bool1 == bool3)   // true
    fmt.Println("true != false is", bool1 != bool2)  // true
}
```

**Output:**
```
true == false is false
true == true is true
true != false is true
```

## Complete Example

Here's a comprehensive demonstration of all comparison operators:

```go
package main

import "fmt"

func main() {
    // Define numbers for comparison
    a := 10
    b := 5
    c := 10

    fmt.Println("Comparison Operators Demo")
    fmt.Println("Using a =", a, ", b =", b, ", c =", c)
    fmt.Println()

    // Equal to (==)
    fmt.Println("Equal to (==):")
    fmt.Println(a, "==", b, "is", a == b) // false
    fmt.Println(a, "==", c, "is", a == c) // true
    fmt.Println()

    // Not equal to (!=)
    fmt.Println("Not equal to (!=):")
    fmt.Println(a, "!=", b, "is", a != b) // true
    fmt.Println(a, "!=", c, "is", a != c) // false
    fmt.Println()

    // Greater than (>)
    fmt.Println("Greater than (>):")
    fmt.Println(a, ">", b, "is", a > b) // true
    fmt.Println(b, ">", a, "is", b > a) // false
    fmt.Println()

    // Less than (<)
    fmt.Println("Less than (<):")
    fmt.Println(a, "<", b, "is", a < b) // false
    fmt.Println(b, "<", a, "is", b < a) // true
    fmt.Println()

    // Greater than or equal to (>=)
    fmt.Println("Greater than or equal to (>=):")
    fmt.Println(a, ">=", b, "is", a >= b) // true
    fmt.Println(a, ">=", c, "is", a >= c) // true (equal values)
    fmt.Println(b, ">=", a, "is", b >= a) // false
    fmt.Println()

    // Less than or equal to (<=)
    fmt.Println("Less than or equal to (<=):")
    fmt.Println(b, "<=", a, "is", b <= a) // true
    fmt.Println(a, "<=", c, "is", a <= c) // true (equal values)
    fmt.Println(a, "<=", b, "is", a <= b) // false
    fmt.Println()

    // Comparing strings
    fmt.Println("Comparing Strings:")
    str1 := "apple"
    str2 := "banana"
    str3 := "apple"

    fmt.Println(str1, "==", str2, "is", str1 == str2) // false
    fmt.Println(str1, "==", str3, "is", str1 == str3) // true
    fmt.Println(str1, "<", str2, "is", str1 < str2)   // true
    fmt.Println()

    // Comparing booleans
    fmt.Println("Comparing Booleans:")
    bool1 := true
    bool2 := false
    bool3 := true

    fmt.Println(bool1, "==", bool2, "is", bool1 == bool2) // false
    fmt.Println(bool1, "==", bool3, "is", bool1 == bool3) // true
    fmt.Println(bool1, "!=", bool2, "is", bool1 != bool2) // true
}
```

## Using Comparisons in Control Flow

Comparison operators are most commonly used in `if` statements and loops:

### If Statements

```go
package main

import "fmt"

func main() {
    age := 18

    if age >= 18 {
        fmt.Println("You are an adult")
    } else {
        fmt.Println("You are a minor")
    }
}
```

### Multiple Conditions

```go
package main

import "fmt"

func main() {
    score := 85

    if score >= 90 {
        fmt.Println("Grade: A")
    } else if score >= 80 {
        fmt.Println("Grade: B")
    } else if score >= 70 {
        fmt.Println("Grade: C")
    } else {
        fmt.Println("Grade: F")
    }
}
```

**Output:**
```
Grade: B
```

### Checking Ranges

```go
package main

import "fmt"

func main() {
    temperature := 75

    if temperature >= 70 && temperature <= 80 {
        fmt.Println("Perfect weather!")
    } else if temperature > 80 {
        fmt.Println("It's hot!")
    } else {
        fmt.Println("It's cold!")
    }
}
```

**Output:**
```
Perfect weather!
```

## Common Patterns

### Check if Number is Positive

```go
if number > 0 {
    fmt.Println("Positive")
} else if number < 0 {
    fmt.Println("Negative")
} else {
    fmt.Println("Zero")
}
```

### Validate User Input

```go
password := "secret123"

if password == "secret123" {
    fmt.Println("Access granted")
} else {
    fmt.Println("Access denied")
}
```

### Check Age Range

```go
age := 25

if age >= 13 && age <= 19 {
    fmt.Println("Teenager")
} else if age >= 20 && age <= 64 {
    fmt.Println("Adult")
} else if age >= 65 {
    fmt.Println("Senior")
} else {
    fmt.Println("Child")
}
```

### Find Maximum Value

```go
a := 10
b := 25

if a > b {
    fmt.Println("Max:", a)
} else {
    fmt.Println("Max:", b)
}
```

## Type Safety

Go requires both operands to be of the **same type** when comparing:

```go
// This will cause a compile error
var a int = 10
var b float64 = 10.0
// result := a == b  // Error! Cannot compare int and float64

// Must convert to same type
result := float64(a) == b  // OK
```

## Important Notes

### Double Equals for Comparison

Remember to use `==` for comparison, not `=`:

```go
// Comparison (correct)
if x == 5 {
    fmt.Println("x is 5")
}

// Assignment (wrong in if statement)
// if x = 5 {  // Error! This is assignment, not comparison
```

### Comparison Returns Boolean

All comparison operators return `true` or `false`:

```go
result := 10 > 5  // result is true (a boolean)
fmt.Println(result)  // true
```

### String Comparison is Lexicographic

Strings are compared character by character using Unicode values:

```go
fmt.Println("10" < "9")  // true (comparing characters '1' and '9')
fmt.Println("abc" < "abd")  // true ('c' comes before 'd')
```

## Key Takeaways

- **All comparison operators return boolean** (`true` or `false`)
- **Use `==` for equality**, not `=` (which is assignment)
- **Strings are compared alphabetically** (lexicographically)
- **Comparisons are case-sensitive** for strings
- **Both operands must be the same type** (type safety)
- **Comparisons are typically used** in `if` statements and loops
- **`>=` and `<=` include equality** (10 >= 10 is `true`)

## Related Topics

- [Go Fundamentals](./index.md) - Core Go programming concepts
- [Math Operations](./math-operations.md) - Arithmetic operations in Go
