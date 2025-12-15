---
sidebar_position: 1
---

# Go Fundamentals

Learn the basics of Go programming, including output, strings, escape characters, and working with packages.

## What's Covered

This section covers fundamental Go concepts:
- Basic program structure
- Output with fmt.Println
- Importing and using multiple packages
- Standard library packages
- [Strings and formatting](./strings-and-formatting)
- [Math operations and arithmetic operators](./math-operations)
- [Comparison operators and boolean logic](./comparison-operators)

## Basic Program Structure

Every Go program starts with a package declaration and includes a `main` function:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}
```

**Key Components:**
- `package main` - Declares this as an executable program
- `import "fmt"` - Imports the fmt (format) package
- `func main()` - Entry point of the program
- `fmt.Println()` - Prints text to console with a newline

## Output with fmt.Println

The `fmt` package provides formatted I/O functions.

### Basic Output

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
    fmt.Println("Go is awesome!")

    // Print multiple values
    fmt.Println("Name:", "Alice", "Age:", 25)

    // Print numbers
    fmt.Println(42)
    fmt.Println(3.14159)
}
```

**Output:**
```
Hello, World!
Go is awesome!
Name: Alice Age: 25
42
3.14159
```

### fmt.Println vs fmt.Print

```go
// Println adds a newline after output
fmt.Println("Line 1")
fmt.Println("Line 2")

// Print does not add a newline
fmt.Print("Same ")
fmt.Print("line")
fmt.Println() // Add newline manually
```

**Output:**
```
Line 1
Line 2
Same line
```

## Importing Multiple Packages

Go allows you to import multiple packages using grouped import syntax.

### Import Syntax

```go
package main

// Single imports
import "fmt"
import "math"
import "strings"

// Grouped imports (preferred)
import (
    "fmt"
    "math"
    "strings"
)
```

### Using Multiple Packages

```go
package main

import (
    "fmt"
    "math"
    "strings"
)

func main() {
    // Using math package
    fmt.Println("Math Floor of 2.75 is:")
    fmt.Println(math.Floor(2.75)) // Returns 2

    fmt.Println()

    // Using strings package
    fmt.Println("Proper case of 'hello go' is:")
    fmt.Println(strings.Title("hello go")) // Returns "Hello Go"
}
```

**Output:**
```
Math Floor of 2.75 is:
2

Proper case of 'hello go' is:
Hello Go
```

## Common Standard Library Packages

### fmt - Formatted I/O
```go
import "fmt"

fmt.Println("Hello")           // Print with newline
fmt.Print("Hello")              // Print without newline
fmt.Printf("Number: %d\n", 42)  // Formatted print
```

### math - Mathematical Functions
```go
import "math"

math.Floor(2.75)    // Round down: 2
math.Ceil(2.25)     // Round up: 3
math.Sqrt(16)       // Square root: 4
math.Pow(2, 3)      // Power: 8
```

### strings - String Manipulation
```go
import "strings"

strings.Title("hello go")           // "Hello Go"
strings.ToUpper("hello")            // "HELLO"
strings.ToLower("HELLO")            // "hello"
strings.Contains("hello", "ll")     // true
strings.Replace("hello", "l", "L", -1) // "heLLo"
```

## Running Go Programs

### Run Directly
Execute without creating a binary:
```bash
go run filename.go
```

### Compile and Run
Create an executable:
```bash
# Build executable
go build filename.go

# Run the executable
./filename        # Linux/macOS
filename.exe      # Windows
```

### Format Code
Automatically format Go code:
```bash
go fmt filename.go
```

## Best Practices

### 1. Use Grouped Imports
```go
// Good
import (
    "fmt"
    "math"
    "strings"
)

// Avoid
import "fmt"
import "math"
import "strings"
```

### 2. Add Blank Lines for Readability
```go
fmt.Println("Section 1")
fmt.Println()  // Blank line for readability
fmt.Println("Section 2")
```

### 3. Use Package Prefixes
Always call functions with their package name:
```go
fmt.Println("Hello")     // Correct
math.Floor(2.75)         // Correct

// Don't import individual functions
```

## Complete Example

Here's a complete program demonstrating these concepts:

```go
package main

import (
    "fmt"
    "math"
    "strings"
)

func main() {
    // Basic output
    fmt.Println("=== Go Fundamentals Demo ===")
    fmt.Println()

    // Math package
    fmt.Println("Math operations:")
    fmt.Println("Floor of 2.75:", math.Floor(2.75))
    fmt.Println("Square root of 16:", math.Sqrt(16))
    fmt.Println()

    // Strings package
    fmt.Println("String operations:")
    fmt.Println("Title case:", strings.Title("hello go"))
    fmt.Println("Upper case:", strings.ToUpper("hello"))
}
```

## More Fundamentals

### [Strings and Formatting](./strings-and-formatting)
Learn escape characters, raw strings, and string formatting techniques.

**Topics covered:**
- Escape characters (\n, \t, \", \\)
- Raw strings with backticks
- Formatting with tabs
- Multi-line strings
- When to use raw vs regular strings

### [Math Operations](./math-operations)
Learn arithmetic operators, increment/decrement, and compound assignment operators.

**Topics covered:**
- Addition, subtraction, multiplication, division, modulus
- Integer vs float division
- Increment (++) and decrement (--)
- Compound assignment operators (+=, -=, *=, /=, %=)
- Operator precedence

### [Comparison Operators](./comparison-operators)
Learn how to compare values and use boolean logic.

**Topics covered:**
- Equal (==) and not equal (!=)
- Greater than (&gt;), less than (&lt;)
- Greater/less than or equal (&gt;=, &lt;=)
- Comparing strings and booleans
- Using comparisons in control flow

## Next Steps

After mastering these fundamentals, explore:
- **Variables and Types** - Declare and use variables
- **Functions** - Create reusable code blocks
- **Control Flow** - if/else, loops, switch statements
- **Data Structures** - Arrays, slices, maps, structs
- **Concurrency** - Goroutines and channels

## Related Topics

- [Go Overview](../) - Introduction to Go programming
