---
title: Package Names and Import Paths
sidebar_position: 6
description: How Go import paths and package names relate, and best practices for naming your own packages.
---

# Package Names and Import Paths

In Go, the **import path** and the **package name** are two distinct things that are easy to conflate when starting out.

- The **import path** is the string you write in the `import` block — it identifies where to find the package.
- The **package name** is what you use in your code to call the package's functions.

Most of the time they match, but not always.

## Import Path vs Package Name

| Import Path | Package Name | Usage |
|---|---|---|
| `fmt` | `fmt` | `fmt.Println(...)` |
| `math` | `math` | `math.Sqrt(16)` |
| `math/rand` | `rand` | `rand.Intn(100)` |
| `math/cmplx` | `cmplx` | `cmplx.Sqrt(-1)` |
| `archive/tar` | `tar` | `tar.NewReader(r)` |
| `archive/zip` | `zip` | `zip.OpenReader(f)` |
| `compress/gzip` | `gzip` | `gzip.NewWriter(w)` |
| `encoding/json` | `json` | `json.Marshal(v)` |
| `net/http` | `http` | `http.Get(url)` |
| `crypto/rand` | `rand` | `rand.Read(b)` |

The package name is always the **last segment** of the import path by convention — but the package itself declares its own name via `package <name>` at the top of its source files.

## How the Package Name is Determined

The package name comes from the `package` declaration inside the source files, **not** from the import path. For example, `math/rand` contains files that start with:

```go
package rand
```

So even though you import `"math/rand"`, you call it as `rand.Intn(100)`.

## Importing Packages with the Same Name

When two import paths share the same package name (e.g. `math/rand` and `crypto/rand` are both named `rand`), you must alias at least one:

```go
import (
    "fmt"
    mathrand "math/rand"
    cryptorand "crypto/rand"
)

func main() {
    fmt.Println(mathrand.Intn(100)) // pseudo-random int
    b := make([]byte, 8)
    cryptorand.Read(b)              // cryptographically secure random bytes
}
```

## Aliasing an Import

You can alias any import to a name of your choice:

```go
import (
    j "encoding/json"
)

// Use the alias instead of the package name
data, _ := j.Marshal(myStruct)
```

## Best Practices for Naming Your Own Packages

**Use short, lowercase, single-word names.**

```go
// Good
package parser
package config
package auth

// Avoid
package myParser
package my_config
package authUtilities
```

**The package name should not repeat the import path.**

```go
// Import path:  myapp/user
// Package name: user  (not userpackage, not myappuser)
package user

// Caller writes: user.Profile{}, user.Find(id)
// Not:           user.UserProfile{}, user.UserFind(id)
```

**Avoid generic names like `util`, `common`, or `helpers`** — they give callers no context about what the package does. Prefer names that describe the domain: `httputil`, `strutil`, `timeutil` if you must use a utility-style name.

**Match the directory name.** Go tooling expects the package name to match the directory it lives in. A mismatch compiles fine but confuses editors and readers.

```
myapp/
  auth/
    auth.go       ← package auth   ✓
  config/
    config.go     ← package config ✓
```

## The `package main` Special Case

Executable programs always use `package main`, regardless of the directory name. The `main` package is never imported by other packages — it is the entry point only.

```go
// File: cmd/server/main.go
package main   // always "main" for executables, even though the dir is "server"

func main() {
    // program starts here
}
```
