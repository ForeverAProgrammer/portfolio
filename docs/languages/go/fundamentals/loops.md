---
title: Loops
sidebar_position: 10
description: All loop patterns in Go — the classic for loop, while-style, infinite loops, range over slices/maps/strings/integers, continue, break, and labeled break.
---

# Loops

Go has exactly one loop construct: `for`. There is no `while`, `do-while`, or `foreach`. Despite this, `for` covers every looping pattern through three forms — and the `range` keyword handles iteration over collections.

## Classic `for` Loop

The three-clause form mirrors C-style loops: `init; condition; post`.

```go
for i := 1; i <= 5; i++ {
    fmt.Printf("i = %d\n", i)
}
```

**Output:**
```
i = 1
i = 2
i = 3
i = 4
i = 5
```

The `init` statement runs once before the loop. The `condition` is checked before each iteration. The `post` statement runs after each iteration.

## `for` as `while`

Omit the init and post — only the condition remains. This is Go's equivalent of a `while` loop.

```go
n := 3
for n > 0 {
    fmt.Printf("n = %d\n", n)
    n--
}
```

**Output:**
```
n = 3
n = 2
n = 1
```

## Infinite Loop with `break`

`for {}` with no condition runs forever. Use `break` to exit.

```go
count := 0
for {
    count++
    if count > 3 {
        break
    }
    fmt.Printf("count = %d\n", count)
}
```

**Output:**
```
count = 1
count = 2
count = 3
```

## `range` over a Slice

`range` yields `(index, value)` for each element. Use `_` to discard the index when you don't need it — Go won't compile if a declared variable goes unused.

```go
fruits := []string{"apple", "banana", "cherry"}

// Index discarded
for _, fruit := range fruits {
    fmt.Println(fruit)
}
```

**Output:**
```
apple
banana
cherry
```

To capture both index and value:

```go
for i, fruit := range fruits {
    fmt.Printf("[%d] %s\n", i, fruit)
}
```

**Output:**
```
[0] apple
[1] banana
[2] cherry
```

The value yielded by `range` is a copy — modifying it does not change the original element.

## `range` over a Map

`range` over a map yields `(key, value)` pairs. **Map iteration order is not guaranteed** — never rely on it.

```go
ages := map[string]int{"Alice": 30, "Bob": 25, "Carol": 28}
for name, age := range ages {
    fmt.Printf("%s is %d years old\n", name, age)
}
```

**Output (order may vary):**
```
Alice is 30 years old
Bob is 25 years old
Carol is 28 years old
```

## `continue` — Skip an Iteration

`continue` skips the rest of the current iteration and moves to the next.

```go
for i := 1; i <= 6; i++ {
    if i%2 != 0 {
        continue
    }
    fmt.Println(i)
}
```

**Output:**
```
2
4
6
```

## `range` over a String

Ranging over a string yields `(byteIndex, rune)` pairs — it iterates **Unicode code points, not bytes**. For multi-byte characters, the index jumps by the rune's byte width.

```go
for i, r := range "héllo" {
    fmt.Printf("index %d: %c (U+%04X)\n", i, r, r)
}
```

**Output:**
```
index 0: h (U+0068)
index 1: é (U+00E9)
index 3: l (U+006C)
index 4: l (U+006C)
index 5: o (U+006F)
```

`é` is 2 bytes in UTF-8, so the index jumps from 1 to 3. Use a plain index loop if you need raw bytes.

## `range` over an Integer (Go 1.22+)

Since Go 1.22, you can range directly over an integer to get values `0` through `n-1`.

```go
for i := range 5 {
    fmt.Printf("i = %d\n", i)
}
```

**Output:**
```
i = 0
i = 1
i = 2
i = 3
i = 4
```

This is shorthand for `for i := 0; i < n; i++`.

## Labeled `break`

Labels let you `break` out of an outer loop directly from inside a nested one, without extra boolean flags.

```go
outer:
    for i := 0; i < 3; i++ {
        for j := 0; j < 3; j++ {
            if i == 1 && j == 1 {
                break outer
            }
            fmt.Printf("i=%d j=%d\n", i, j)
        }
    }
fmt.Println("Done.")
```

**Output:**
```
i=0 j=0
i=0 j=1
i=0 j=2
i=1 j=0
Done.
```

`continue label` works the same way — it skips to the next iteration of the named outer loop.

## Key Takeaways

- **One loop keyword**: `for` covers classic, while-style, and infinite loops — there is no `while` or `foreach`
- **Blank identifier `_`**: Use `_` to discard any `range` value you don't need; Go won't compile with an unused variable
- **Range returns a copy**: Modifying the `range` value variable does not affect the original collection
- **Map order is random**: Never rely on the iteration order of a `range` over a map
- **String range yields runes**: Use `range` for Unicode-safe iteration; use a byte index loop for raw bytes
- **Labeled break/continue**: Target an outer loop by name to avoid complex boolean escape flags
- **Range over int (Go 1.22+)**: `for i := range n` is idiomatic shorthand for a zero-based counter loop

## Related Topics

- [Conditionals](./conditionals.md) — `if`, `switch`, and control flow that often pairs with loops
- [Go Fundamentals](./index.md) — core Go programming concepts
