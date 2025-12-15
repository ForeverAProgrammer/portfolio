---
sidebar_position: 3
---

# Go (Golang)

Go is an open-source programming language created by Google in 2009. It's designed for simplicity, efficiency, and excellent support for concurrent programming.

## What is Go?

Go (also known as Golang) is a statically typed, compiled programming language known for its fast compilation times, simple syntax, and built-in concurrency features. It combines the efficiency of compiled languages with the ease of use typically found in interpreted languages.

## Key Features

- **Fast Compilation** - Compiles to native machine code quickly
- **Simple Syntax** - Clean, readable code with minimal keywords
- **Built-in Concurrency** - Goroutines and channels for concurrent programming
- **Strong Standard Library** - Rich set of packages for common tasks
- **Garbage Collection** - Automatic memory management
- **Cross-Platform** - Compile for multiple operating systems
- **Strong Typing** - Static type system catches errors at compile time
- **Fast Execution** - Performance comparable to C/C++

## What's Covered

This section covers Go fundamentals and core concepts for learning the language.

### [Fundamentals](./fundamentals/)
Learn the basics of Go programming.

**Topics covered:**
- Output with fmt.Println
- Importing and using packages
- Strings and formatting (escape characters, raw strings)
- Math operations and arithmetic operators
- Comparison operators and boolean logic

## Installation

### Ubuntu/Debian
```bash
sudo apt install golang-go

# Verify installation
go version
```

### macOS
Using Homebrew:
```bash
brew install go

# Verify installation
go version
```

### Windows
Download the installer from [golang.org/dl](https://golang.org/dl) and run it.

### Official Binary (All Platforms)
For the latest version:
1. Visit [golang.org/dl](https://golang.org/dl)
2. Download the appropriate package for your system
3. Follow the installation instructions for your platform
4. Verify with `go version`

## Quick Start

### Hello World

Create a file named `hello.go`:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

Run it:
```bash
# Run directly
go run hello.go

# Or compile and run
go build hello.go
./hello
```

## Learning Path

1. **Start with [Fundamentals](./fundamentals/)** - Learn Go syntax and basic output
2. **Practice with Examples** - Write small programs to understand concepts
3. **Explore Standard Library** - Learn common packages like `fmt`, `math`, `strings`
4. **Study Concurrency** - Master goroutines and channels (coming soon)
5. **Build Projects** - Apply your knowledge to real applications

## Why Learn Go?

### Performance
- Compiled to machine code for fast execution
- Efficient memory management
- Fast startup times

### Simplicity
- Minimalist language design (25 keywords)
- Easy to read and maintain
- Quick learning curve

### Concurrency
- Goroutines for lightweight concurrent execution
- Channels for safe communication between goroutines
- Built-in race condition detection

### Industry Adoption
- Used by Google, Uber, Docker, Kubernetes
- Popular for cloud services and microservices
- Strong in DevOps and infrastructure tools

## Common Use Cases

- **Web Services** - REST APIs and microservices
- **Cloud Infrastructure** - Docker, Kubernetes, Terraform
- **DevOps Tools** - CLI tools and automation
- **Network Programming** - Servers and distributed systems
- **Data Processing** - High-performance data pipelines
- **System Programming** - Low-level system tools

## Getting Started

Once Go is installed, you can:

1. **Run Go files directly**:
   ```bash
   go run filename.go
   ```

2. **Compile to executable**:
   ```bash
   go build filename.go
   ./filename
   ```

3. **Format your code**:
   ```bash
   go fmt filename.go
   ```

4. **Get package dependencies**:
   ```bash
   go get package-name
   ```

## Next Steps

After installing Go and learning the fundamentals:
- Write small programs to practice
- Explore the [Official Go Documentation](https://golang.org/doc)
- Try [A Tour of Go](https://tour.golang.org)
- Learn from [Go by Example](https://gobyexample.com)
- Build a simple CLI tool or web server

## Resources

- [Official Go Documentation](https://golang.org/doc)
- [Go by Example](https://gobyexample.com)
- [A Tour of Go](https://tour.golang.org)
- [Go Playground](https://play.golang.org) - Try Go in your browser
- [Effective Go](https://golang.org/doc/effective_go) - Writing good Go code

## Related Topics

- [Go Fundamentals](./fundamentals/) - Core Go programming concepts
