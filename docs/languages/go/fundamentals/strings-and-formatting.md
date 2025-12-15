---
sidebar_position: 4
---

# Strings and Formatting

Learn how to work with strings in Go, including escape characters, raw strings, and string formatting techniques.

## Escape Characters

Escape characters are special character sequences starting with `\` that represent non-printable or special characters in strings.

### Common Escape Characters

| Escape | Description | Example |
|--------|-------------|---------|
| `\n` | Newline | `"Line1\nLine2"` |
| `\t` | Tab | `"Name\tAge"` |
| `\"` | Double quote | `"She said \"Hi\""` |
| `\'` | Single quote | `'It\'s'` |
| `\\` | Backslash | `"C:\\path"` |
| `\r` | Carriage return | `"Text\r"` |
| `\b` | Backspace | `"Text\b"` |

### Newline Character (\n)

The newline character moves output to the next line:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello,\nGo!")
}
```

**Output:**
```
Hello,
Go!
```

### Tab Character (\t)

The tab character adds horizontal spacing (typically 8 spaces):

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello,\tGo!")
}
```

**Output:**
```
Hello,	Go!
```

### Formatting with Tabs

Tabs are particularly useful for creating columnar output:

```go
package main

import "fmt"

func main() {
    fmt.Println("Name\tAge\tCity")
    fmt.Println("Alice\t25\tNew York")
    fmt.Println("Bob\t30\tSan Francisco")
    fmt.Println("Charlie\t28\tBoston")
}
```

**Output:**
```
Name	Age	City
Alice	25	New York
Bob	30	San Francisco
Charlie	28	Boston
```

### Double Quote Character (\")

Escape double quotes to include them within a string:

```go
package main

import "fmt"

func main() {
    fmt.Println("She said \"Hello\"")
    fmt.Println("Quotation Marks Demo: \"\"")
}
```

**Output:**
```
She said "Hello"
Quotation Marks Demo: ""
```

### Single Quote Character

Single quotes don't need escaping in double-quoted strings:

```go
package main

import "fmt"

func main() {
    fmt.Println("It's a nice day")
    fmt.Println("Single Quote Demo: '")
}
```

**Output:**
```
It's a nice day
Single Quote Demo: '
```

### Backslash Character (\\)

Escape backslashes to display them literally:

```go
package main

import "fmt"

func main() {
    fmt.Println("C:\\Users\\Documents")
    fmt.Println("Backslash Demo: \\")
}
```

**Output:**
```
C:\Users\Documents
Backslash Demo: \
```

## Complete Escape Characters Example

Here's a comprehensive demonstration of all escape characters:

```go
package main

import "fmt"

func main() {
    // \n - New line character (moves to next line)
    fmt.Println("New Line Character Demo:")
    fmt.Println("Hello,\nGo!")
    fmt.Println()

    // \t - Tab character (horizontal tab, typically 8 spaces)
    fmt.Println("Tab Character Demo:")
    fmt.Println("Hello,\tGo!")
    fmt.Println()

    // Practical example: Using tabs to format output in columns
    fmt.Println("Formatting with Tabs:")
    fmt.Println("Name\tAge\tCity")
    fmt.Println("Alice\t25\tNew York")
    fmt.Println("Bob\t30\tSan Francisco")
    fmt.Println()

    // \" - Double quote character (escaped to include in string)
    fmt.Println("Quotation Marks Demo: \"\"")
    fmt.Println()

    // Single quote character (doesn't need escaping in double-quoted strings)
    fmt.Println("Single Quote Demo: '")
    fmt.Println()

    // \\ - Backslash character (escaped to show literal backslash)
    fmt.Println("Backslash Demo: \\")
    fmt.Println()
}
```

**Output:**
```
New Line Character Demo:
Hello,
Go!

Tab Character Demo:
Hello,	Go!

Formatting with Tabs:
Name	Age	City
Alice	25	New York
Bob	30	San Francisco

Quotation Marks Demo: ""

Single Quote Demo: '

Backslash Demo: \
```

## Raw Strings

Raw strings are enclosed in backticks (`` ` ``) and treat all characters literally - backslashes don't need escaping and the strings can span multiple lines.

### Basic Raw Strings

```go
package main

import "fmt"

func main() {
    // Regular string - backslashes need escaping
    fmt.Println("C:\\Users\\name\\Documents\\file.txt")

    // Raw string - backslashes are literal
    fmt.Println(`C:\Users\name\Documents\file.txt`)
}
```

**Output:**
```
C:\Users\name\Documents\file.txt
C:\Users\name\Documents\file.txt
```

### Multi-Line Raw Strings

Raw strings can span multiple lines without using `\n`:

```go
package main

import "fmt"

func main() {
    message := `Line 1
Line 2
Line 3`

    fmt.Println(message)
}
```

**Output:**
```
Line 1
Line 2
Line 3
```

### Raw String Demo

```go
package main

import "fmt"

func main() {
    // Raw strings with backticks - no escape processing
    fmt.Println("Raw String Demo (using backticks):")
    fmt.Println(`C:\Users\name\Documents\file.txt`)  // Backslashes don't need escaping
    fmt.Println(`Line 1
Line 2
Line 3`)  // Can span multiple lines without \n
}
```

**Output:**
```
Raw String Demo (using backticks):
C:\Users\name\Documents\file.txt
Line 1
Line 2
Line 3
```

## When to Use Raw Strings

Raw strings are particularly useful for:

### File Paths

Windows paths with backslashes are cleaner with raw strings:

```go
// Regular string - needs escaping
path := "C:\\Program Files\\MyApp\\config.ini"

// Raw string - cleaner
path := `C:\Program Files\MyApp\config.ini`
```

### Regular Expressions

Regular expressions often contain many backslashes:

```go
// Regular string - hard to read
pattern := "\\d{3}-\\d{2}-\\d{4}"

// Raw string - easier to read
pattern := `\d{3}-\d{2}-\d{4}`
```

### Multi-Line Text

JSON, SQL queries, templates are easier with raw strings:

```go
// Multi-line JSON
json := `{
    "name": "Alice",
    "age": 25,
    "city": "New York"
}`

// SQL query
query := `SELECT id, name, email
FROM users
WHERE active = true
ORDER BY name`

// HTML template
html := `<html>
    <body>
        <h1>Hello, World!</h1>
    </body>
</html>`
```

### Configuration Files

```go
config := `
[server]
host = localhost
port = 8080

[database]
url = postgres://localhost/mydb
`
```

## Comparing Regular vs Raw Strings

### File Paths

```go
package main

import "fmt"

func main() {
    // Regular string - must escape backslashes
    regularPath := "C:\\Users\\Documents\\projects\\go\\main.go"

    // Raw string - backslashes are literal
    rawPath := `C:\Users\Documents\projects\go\main.go`

    fmt.Println("Regular:", regularPath)
    fmt.Println("Raw:    ", rawPath)
    // Both produce the same output
}
```

### Multi-Line Content

```go
package main

import "fmt"

func main() {
    // Regular string - must use \n
    regularText := "Line 1\nLine 2\nLine 3"

    // Raw string - natural line breaks
    rawText := `Line 1
Line 2
Line 3`

    fmt.Println("Regular string:")
    fmt.Println(regularText)
    fmt.Println()
    fmt.Println("Raw string:")
    fmt.Println(rawText)
    // Both produce the same output
}
```

## String Formatting Tips

### Creating Tables

Use tabs for aligned columns:

```go
package main

import "fmt"

func main() {
    fmt.Println("Product\t\tPrice\tQty")
    fmt.Println("--------\t-----\t---")
    fmt.Println("Laptop\t\t$999\t5")
    fmt.Println("Mouse\t\t$25\t20")
    fmt.Println("Keyboard\t$75\t15")
}
```

**Output:**
```
Product		Price	Qty
--------	-----	---
Laptop		$999	5
Mouse		$25	20
Keyboard	$75	15
```

### Displaying File Paths

Use raw strings for file paths:

```go
package main

import "fmt"

func main() {
    configPath := `C:\Program Files\MyApp\config.ini`
    dataPath := `/home/user/data/input.txt`

    fmt.Println("Config:", configPath)
    fmt.Println("Data:  ", dataPath)
}
```

### Multi-Line Messages

Use raw strings for multi-line content:

```go
package main

import "fmt"

func main() {
    welcome := `
========================================
    Welcome to the Application!
========================================
Please select an option:
  1. Start
  2. Settings
  3. Exit
========================================
`
    fmt.Println(welcome)
}
```

## Common Patterns

### Error Messages

```go
fmt.Println("Error: File not found\n\tPath: C:\\data\\input.txt")
```

### Logging

```go
fmt.Println("[INFO]\tApplication started")
fmt.Println("[WARN]\tLow memory detected")
fmt.Println("[ERROR]\tConnection failed")
```

### ASCII Art

```go
logo := `
  ____
 / ___| ___
| |  _ / _ \
| |_| | (_) |
 \____|\___/
`
fmt.Println(logo)
```

## Best Practices

### 1. Use Raw Strings for File Paths

```go
// Good - raw string
path := `C:\Users\Documents\file.txt`

// Avoid - escaped string
path := "C:\\Users\\Documents\\file.txt"
```

### 2. Use Tabs for Columnar Data

```go
// Good - tabs align columns
fmt.Println("Name\tAge\tCity")

// Avoid - spaces don't align well
fmt.Println("Name  Age  City")
```

### 3. Use Raw Strings for Multi-Line Content

```go
// Good - raw string
query := `SELECT id, name
FROM users
WHERE active = true`

// Avoid - escape sequences
query := "SELECT id, name\nFROM users\nWHERE active = true"
```

### 4. Add Blank Lines for Readability

```go
fmt.Println("Section 1")
fmt.Println()  // Blank line
fmt.Println("Section 2")
```

## Key Takeaways

- **Escape characters** start with `\` and represent special characters
- **Common escapes**: `\n` (newline), `\t` (tab), `\"` (quote), `\\` (backslash)
- **Raw strings** use backticks and treat backslashes literally
- **Raw strings can span multiple lines** without `\n`
- **Use raw strings** for file paths, regex, multi-line text
- **Use tabs** for formatting columnar output
- **Escape sequences are processed** in double-quoted strings only

## Related Topics

- [Go Fundamentals](./index.md) - Core Go programming concepts
- [Math Operations](./math-operations.md) - Arithmetic operations in Go
- [Comparison Operators](./comparison-operators.md) - Comparing values in Go
