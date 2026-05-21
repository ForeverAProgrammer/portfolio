---
title: The log Package
sidebar_position: 7
description: Logging in Go using the standard library log package — the default logger, flags, custom loggers, and Fatal/Panic.
---

# The log Package

The `log` package provides simple logging for Go programs. It writes messages with a timestamp prefix to `stderr` by default and requires no configuration to get started.

## Default Logger

The default logger writes to `stderr` and prepends a date and time to each message.

```go
package main

import "log"

func main() {
    log.Println("Default logger: this is an info-style message")
    log.Printf("Formatted number: %d", 42)
}
```

**Output (stderr):**

```
2009/11/10 23:00:00 Default logger: this is an info-style message
2009/11/10 23:00:00 Formatted number: 42
```

The three core print functions mirror the `fmt` package:

| Function | Behaviour |
|---|---|
| `log.Print(...)` | Logs values, no trailing newline added |
| `log.Println(...)` | Logs values, appends a newline |
| `log.Printf(format, ...)` | Logs a formatted string |

## Customising the Default Logger

### SetPrefix

`log.SetPrefix` prepends a string to every message from the default logger. A trailing space is conventional so the prefix is visually separated from the timestamp.

```go
log.SetPrefix("INFO  ")
log.Println("With prefix")
```

**Output:**

```
INFO  2009/11/10 23:00:00 With prefix
```

### SetFlags

`log.SetFlags` controls which fields appear in the prefix. Combine flags with `|`.

```go
log.SetFlags(log.LstdFlags | log.Lshortfile)
log.Println("With prefix and short file flag")
```

**Output:**

```
INFO  2009/11/10 23:00:00 main.go:7: With prefix and short file flag
```

### Flag Reference

| Flag | Description | Example output |
|---|---|---|
| `log.Ldate` | Date in the local timezone | `2009/11/10` |
| `log.Ltime` | Time in the local timezone | `23:00:00` |
| `log.Lmicroseconds` | Microsecond resolution for `Ltime` | `23:00:00.000000` |
| `log.Llongfile` | Full file path and line number | `/src/main.go:7` |
| `log.Lshortfile` | File name and line number | `main.go:7` |
| `log.LUTC` | Use UTC instead of local time | — |
| `log.Lmsgprefix` | Move prefix to just before the message (see below) | — |
| `log.LstdFlags` | Shorthand for `Ldate \| Ltime` | `2009/11/10 23:00:00` |

### Lmsgprefix

By default the prefix appears at the very start of each line, before the timestamp. `Lmsgprefix` moves it to just before the message text instead.

```go
// Without Lmsgprefix (default):  INFO  2009/11/10 23:00:00 message
// With    Lmsgprefix:             2009/11/10 23:00:00 INFO  message

msgPrefixLogger := log.New(os.Stdout, "INFO  ", log.LstdFlags|log.Lmsgprefix)
msgPrefixLogger.Println("Lmsgprefix: prefix appears just before the message")
```

This is useful when you want the timestamp to sort first in log aggregators.

Pass `0` to suppress all prefix fields:

```go
log.SetFlags(0)
log.SetPrefix("")
log.Println("No timestamp or file info")
```

## Custom Loggers with log.New

`log.New` creates an independent logger with its own output destination, prefix, and flags. This is the standard way to create separate `INFO`, `WARN`, and `ERROR` loggers.

```go
package main

import (
    "log"
    "os"
)

func main() {
    infoLogger  := log.New(os.Stdout, "INFO  ", log.LstdFlags)
    warnLogger  := log.New(os.Stdout, "WARN  ", log.LstdFlags)
    errorLogger := log.New(os.Stderr, "ERROR ", log.LstdFlags)

    infoLogger.Println("Application started")
    warnLogger.Println("This is a warning example")
    errorLogger.Println("This is an error example")
}
```

**Output:**

```
INFO  2009/11/10 23:00:00 Application started
WARN  2009/11/10 23:00:00 This is a warning example
ERROR 2009/11/10 23:00:00 This is an error example
```

`log.New` signature:

```go
func New(out io.Writer, prefix string, flag int) *Logger
```

Any `io.Writer` works as the output destination — `os.Stdout`, `os.Stderr`, a file, a buffer, etc.

## Fatal and Panic

`log.Fatal` and `log.Panic` log the message and then stop the program. Use them when the program genuinely cannot continue.

| Function | What it does after logging |
|---|---|
| `log.Fatal(...)` | Calls `os.Exit(1)` |
| `log.Fatalf(format, ...)` | Calls `os.Exit(1)` |
| `log.Fatalln(...)` | Calls `os.Exit(1)` |
| `log.Panic(...)` | Calls `panic()` with the logged string |
| `log.Panicf(format, ...)` | Calls `panic()` with the logged string |
| `log.Panicln(...)` | Calls `panic()` with the logged string |

```go
// Exits immediately after logging — deferred functions do NOT run
log.Fatal("could not open config file")

// Panics — deferred functions DO run, and it can be recovered
log.Panic("unexpected nil pointer")
```

:::caution
`log.Fatal` calls `os.Exit(1)` directly, so deferred functions are skipped. Prefer returning errors up the call stack whenever possible and reserve `Fatal` for truly unrecoverable startup failures.
:::

## Writing to a File

Pass an `*os.File` to `log.New` (or `log.SetOutput`) to write log output to a file.

```go
package main

import (
    "log"
    "os"
)

func main() {
    f, err := os.OpenFile("app.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0644)
    if err != nil {
        log.Fatal(err)
    }
    defer f.Close()

    logger := log.New(f, "APP ", log.LstdFlags|log.Lshortfile)
    logger.Println("Writing to a log file")
}
```

## Mirroring Output with io.MultiWriter

`io.MultiWriter` fans a single write out to multiple `io.Writer` destinations at once. Pass it to `log.New` to mirror log output to both a file and the console simultaneously.

```go
package main

import (
    "io"
    "log"
    "os"
)

func main() {
    f, err := os.OpenFile("app.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0644)
    if err != nil {
        log.Fatalf("failed to open log file: %v", err)
    }
    defer f.Close()

    multi := io.MultiWriter(f, os.Stderr)
    logger := log.New(multi, "MULTI ", log.LstdFlags)
    logger.Println("This line goes to both app.log and stderr")
}
```

Every call to `logger.Println` writes to `f` and `os.Stderr` in one shot. You can pass as many writers as needed to `io.MultiWriter`.

## Best Practices

### Use prefixes to distinguish severity levels

```go
// Good — distinct loggers make level filtering easy
infoLogger  := log.New(os.Stdout, "INFO  ", log.LstdFlags)
errorLogger := log.New(os.Stderr, "ERROR ", log.LstdFlags)

// Avoid — mixing severity into the message string
log.Println("ERROR: something went wrong")
```

### Reserve Fatal for startup failures

```go
// Good — program cannot start without a valid config
cfg, err := loadConfig()
if err != nil {
    log.Fatal(err)
}

// Avoid — use Fatal inside request handlers or business logic
```

## Key Takeaways

- The **default logger** writes to `stderr` with a `date + time` prefix — no setup required
- `log.SetPrefix` and `log.SetFlags` customise the default logger globally
- `log.New(out, prefix, flags)` creates an independent logger for any `io.Writer`
- `log.Lmsgprefix` moves the prefix to just before the message, after the timestamp
- `io.MultiWriter` fans writes to multiple destinations — use it to log to a file and the console at the same time
- `log.Fatal` logs then calls `os.Exit(1)` — deferred functions are skipped
- `log.Panic` logs then panics — deferred functions run and the panic can be recovered
- For structured or levelled logging in production, consider the standard library `log/slog` package (Go 1.21+)

## Related Topics

- [Go Fundamentals](./index.md) - Core Go programming concepts
- [Package Names and Import Paths](./packages.md) - How import paths and package names relate
- [Strings and Formatting](./strings-and-formatting.md) - String formatting with the fmt package
