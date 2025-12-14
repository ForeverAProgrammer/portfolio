---
sidebar_position: 1
---

# Java Variable Types and Best Practices

Understanding when to use interfaces vs. concrete types, and primitives vs. wrapper classes is crucial for writing maintainable Java code.

## Interfaces vs. Concrete Types

### The Principle

**Program to an interface, not an implementation.**

This is one of the fundamental principles of object-oriented design and leads to more flexible, maintainable code.

### Why Use Interfaces?

```java
// ❌ BAD: Programming to implementation
ArrayList<String> names = new ArrayList<>();
LinkedList<Integer> numbers = new LinkedList<>();
HashMap<String, Integer> scores = new HashMap<>();

// ✅ GOOD: Programming to interface
List<String> names = new ArrayList<>();
List<Integer> numbers = new LinkedList<>();
Map<String, Integer> scores = new HashMap<>();
```

**Benefits:**
1. **Flexibility** - Easy to change implementation without affecting client code
2. **Testability** - Easy to mock interfaces in tests
3. **Loose coupling** - Code depends on abstraction, not concrete implementation
4. **Maintainability** - Changes to implementation don't break consumers

### Real-World Example

```java
// ❌ BAD: Tightly coupled to ArrayList
public class UserService {
    private ArrayList<User> users = new ArrayList<>();

    public ArrayList<User> getUsers() {
        return users;
    }
}

// If you later want to change to LinkedList, all client code breaks!
```

```java
// ✅ GOOD: Loosely coupled to interface
public class UserService {
    private List<User> users = new ArrayList<>();

    public List<User> getUsers() {
        return users;
    }
}

// Can change implementation without breaking client code
// private List<User> users = new LinkedList<>();  // Easy change!
```

### Common Interface Types

#### Collections

```java
// List interface
List<String> arrayList = new ArrayList<>();        // Fast random access
List<String> linkedList = new LinkedList<>();      // Fast insertion/deletion
List<String> vector = new Vector<>();              // Thread-safe (legacy)

// Set interface
Set<String> hashSet = new HashSet<>();             // Fast, no order
Set<String> linkedHashSet = new LinkedHashSet<>(); // Insertion order
Set<String> treeSet = new TreeSet<>();             // Sorted

// Map interface
Map<String, Integer> hashMap = new HashMap<>();
Map<String, Integer> linkedHashMap = new LinkedHashMap<>();
Map<String, Integer> treeMap = new TreeMap<>();

// Queue interface
Queue<String> linkedListQueue = new LinkedList<>();
Queue<String> priorityQueue = new PriorityQueue<>();
```

### When to Use Concrete Types

Use concrete types when:

1. **You need implementation-specific methods**

```java
// LinkedList has methods not in List interface
LinkedList<String> list = new LinkedList<>();
list.addFirst("first");    // LinkedList-specific method
list.addLast("last");      // LinkedList-specific method
list.getFirst();           // Not in List interface
```

2. **Performance-critical code with specific requirements**

```java
// When you specifically need ArrayList's performance characteristics
ArrayList<Integer> numbers = new ArrayList<>(1000); // Pre-sized
numbers.ensureCapacity(2000); // ArrayList-specific
```

3. **Working with APIs that require concrete types** (rare and usually poor design)

### Method Parameters and Return Types

```java
// ✅ GOOD: Accept interfaces
public void processUsers(List<User> users) {
    // Works with any List implementation
}

// ❌ BAD: Require concrete type
public void processUsers(ArrayList<User> users) {
    // Unnecessarily restrictive
}

// ✅ GOOD: Return interfaces
public List<User> getUsers() {
    return new ArrayList<>(userDatabase);
}

// ❌ BAD: Return concrete type (unless necessary)
public ArrayList<User> getUsers() {
    return new ArrayList<>(userDatabase);
}
```

## Primitives vs. Wrapper Classes

Java has 8 primitive types and their corresponding wrapper classes.

### Primitive Types and Their Wrappers

| Primitive | Wrapper | Size | Range |
|-----------|---------|------|-------|
| `byte` | `Byte` | 8-bit | -128 to 127 |
| `short` | `Short` | 16-bit | -32,768 to 32,767 |
| `int` | `Integer` | 32-bit | -2^31 to 2^31-1 |
| `long` | `Long` | 64-bit | -2^63 to 2^63-1 |
| `float` | `Float` | 32-bit | IEEE 754 |
| `double` | `Double` | 64-bit | IEEE 754 |
| `char` | `Character` | 16-bit | 0 to 65,535 |
| `boolean` | `Boolean` | 1-bit | true/false |

### When to Use Primitives

**Use primitives when:**

1. **Performance is important**

```java
// ✅ GOOD: Primitive (faster, less memory)
public int calculateSum(int a, int b) {
    return a + b;
}

// ❌ BAD: Wrapper (slower, more memory)
public Integer calculateSum(Integer a, Integer b) {
    return a + b;  // Boxing/unboxing overhead
}
```

2. **Working with large arrays or loops**

```java
// ✅ GOOD: Primitive array (uses 400 bytes)
int[] numbers = new int[100];

// ❌ BAD: Wrapper array (uses 1600+ bytes)
Integer[] numbers = new Integer[100];
```

3. **Variable always has a value (no null needed)**

```java
// ✅ GOOD: Primitive for counter
public class Counter {
    private int count = 0;  // Always has value

    public void increment() {
        count++;
    }
}
```

### When to Use Wrappers

**Use wrapper classes when:**

1. **Null is a meaningful value (tri-state: positive, negative, unknown)**

```java
// ✅ GOOD: Wrapper allows null to mean "unknown"
public class Product {
    private Integer stock;  // null = unknown, 0 = out of stock

    public boolean isStockKnown() {
        return stock != null;
    }
}

// ❌ BAD: Primitive can't distinguish "unknown" from "zero"
public class Product {
    private int stock;  // 0 could mean "zero items" or "unknown"
}
```

2. **Collections (generics require objects)**

```java
// ✅ GOOD: Collections need wrapper types
List<Integer> numbers = new ArrayList<>();
Map<String, Boolean> flags = new HashMap<>();

// ❌ ERROR: Can't use primitives with generics
// List<int> numbers = new ArrayList<>();  // Compilation error!
```

3. **APIs that require objects**

```java
// Many APIs require Object types
Optional<Integer> optionalNumber = Optional.of(42);
Stream<Integer> numberStream = numbers.stream();
```

### Autoboxing and Unboxing

Java automatically converts between primitives and wrappers:

```java
// Autoboxing: primitive → wrapper
int primitive = 42;
Integer wrapper = primitive;  // Automatic boxing

// Unboxing: wrapper → primitive
Integer wrapper = 42;
int primitive = wrapper;  // Automatic unboxing

// In collections
List<Integer> numbers = new ArrayList<>();
numbers.add(42);  // Autoboxing: int → Integer
int first = numbers.get(0);  // Unboxing: Integer → int
```

### Pitfalls of Autoboxing

#### 1. Performance Overhead

```java
// ❌ BAD: Creates 100,000 Integer objects!
Integer sum = 0;
for (int i = 0; i < 100000; i++) {
    sum += i;  // Boxing and unboxing on every iteration
}

// ✅ GOOD: No boxing/unboxing
int sum = 0;
for (int i = 0; i < 100000; i++) {
    sum += i;
}
```

#### 2. NullPointerException

```java
// ❌ DANGEROUS: NullPointerException at runtime
Integer count = null;
int total = count + 5;  // Unboxing null → NullPointerException!

// ✅ SAFE: Check for null
Integer count = null;
int total = (count != null ? count : 0) + 5;
```

#### 3. Identity vs. Equality

```java
// ⚠️ SURPRISING: Integer caching
Integer a = 127;
Integer b = 127;
System.out.println(a == b);  // true (cached)

Integer c = 128;
Integer d = 128;
System.out.println(c == d);  // false (not cached)

// ✅ CORRECT: Use equals() for wrappers
System.out.println(c.equals(d));  // true
```

**Integer caching:** Java caches Integer values from -128 to 127.

### Best Practices Summary

#### Variables and Fields

```java
public class BestPractices {
    // ✅ Use primitive for always-present values
    private int count = 0;
    private double price = 0.0;
    private boolean active = false;

    // ✅ Use wrapper for optional/nullable values
    private Integer maxLimit;  // null = no limit
    private Double discount;   // null = no discount
    private Boolean verified;  // null = unknown

    // ✅ Use interface for collections
    private List<String> names = new ArrayList<>();
    private Set<Integer> ids = new HashSet<>();
    private Map<String, Object> properties = new HashMap<>();
}
```

#### Method Signatures

```java
// ✅ GOOD: Primitive parameters and return
public int add(int a, int b) {
    return a + b;
}

// ✅ GOOD: Wrapper when null is meaningful
public Integer findUserId(String username) {
    // Returns null if user not found
    return userDatabase.get(username);
}

// ✅ GOOD: Interface parameters
public void processItems(List<Item> items) {
    // Accepts any List implementation
}

// ✅ GOOD: Interface return types
public List<User> getActiveUsers() {
    return new ArrayList<>(activeUsers);
}
```

#### Comparison Operations

```java
// ✅ Primitives: Use operators
int a = 5, b = 5;
if (a == b) { }
if (a < b) { }

// ✅ Wrappers: Use equals() and compareTo()
Integer x = 5, y = 5;
if (x.equals(y)) { }
if (x.compareTo(y) < 0) { }

// ❌ BAD: Using == with wrappers
if (x == y) { }  // Unreliable due to caching!
```

## Real-World Examples

### Example 1: DAO Pattern

```java
// ✅ GOOD: Interface for flexibility
public interface UserRepository {
    Optional<User> findById(Integer id);  // Integer: null ID invalid
    List<User> findAll();                  // List interface
    void save(User user);
}

// Implementation can change without affecting clients
public class JpaUserRepository implements UserRepository {
    private Map<Integer, User> users = new HashMap<>();  // Map interface

    @Override
    public Optional<User> findById(Integer id) {
        return Optional.ofNullable(users.get(id));
    }

    @Override
    public List<User> findAll() {
        return new ArrayList<>(users.values());
    }

    @Override
    public void save(User user) {
        users.put(user.getId(), user);
    }
}
```

### Example 2: Configuration Class

```java
public class ServerConfig {
    // Primitives for required values
    private int port = 8080;
    private boolean sslEnabled = false;
    private long timeout = 30000;

    // Wrappers for optional values
    private Integer maxConnections;      // null = unlimited
    private Integer threadPoolSize;      // null = default
    private Double requestRateLimit;     // null = no limit

    // Interface for collections
    private List<String> allowedHosts = new ArrayList<>();
    private Set<String> blockedIPs = new HashSet<>();
    private Map<String, String> headers = new HashMap<>();
}
```

## Quick Decision Guide

### Choosing Variable Type

```
Is it a collection?
  ├─ YES → Use interface (List, Set, Map)
  └─ NO → Is null a meaningful state?
            ├─ YES → Use wrapper (Integer, Boolean)
            └─ NO → Use primitive (int, boolean)
```

### Choosing Method Parameter Type

```
Is it a collection?
  ├─ YES → Use interface (List, Set, Map)
  └─ NO → Will null cause issues?
            ├─ YES → Use primitive (int)
            └─ NO → Use wrapper (Integer)
```

## Common Mistakes to Avoid

1. **Don't use ArrayList when List will do**
2. **Don't use Integer for counters and loops**
3. **Don't use == to compare wrapper objects**
4. **Don't autobox in performance-critical loops**
5. **Don't forget to check for null with wrappers**
6. **Don't use primitives when null is meaningful**

## Modern Java Best Practices

### Use var for Local Variables (Java 10+)

```java
// Improves readability
var names = new ArrayList<String>();
var config = ConfigurationBuilder.newBuilder()
    .withTimeout(30)
    .build();

// Still type-safe - compiler infers type
```

### Use Records for Data Classes (Java 14+)

```java
// ❌ Old way
public class Person {
    private final String name;
    private final int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() { return name; }
    public int getAge() { return age; }

    @Override
    public boolean equals(Object o) { /* boilerplate */ }
    @Override
    public int hashCode() { /* boilerplate */ }
}

// ✅ New way
public record Person(String name, int age) {
    // Automatically generates constructor, getters, equals, hashCode, toString
}
```

### Use Text Blocks for Multi-line Strings (Java 15+)

```java
// ❌ Old way
String json = "{\n" +
              "  \"name\": \"John\",\n" +
              "  \"age\": 30\n" +
              "}";

// ✅ New way
String json = """
    {
      "name": "John",
      "age": 30
    }
    """;
```

### Use Pattern Matching (Java 16+)

```java
// ❌ Old way
if (obj instanceof String) {
    String str = (String) obj;
    System.out.println(str.length());
}

// ✅ New way
if (obj instanceof String str) {
    System.out.println(str.length());
}
```

### Use Switch Expressions (Java 14+)

```java
// ❌ Old way
String result;
switch (day) {
    case MONDAY:
    case FRIDAY:
        result = "Work day";
        break;
    case SATURDAY:
    case SUNDAY:
        result = "Weekend";
        break;
    default:
        result = "Unknown";
}

// ✅ New way
String result = switch (day) {
    case MONDAY, FRIDAY -> "Work day";
    case SATURDAY, SUNDAY -> "Weekend";
    default -> "Unknown";
};
```

## Summary Table

| Scenario | Use | Example |
|----------|-----|---------|
| Variable declarations | Interface | `List<String> items` |
| Need specific functionality | Concrete class | `LinkedList<T> queue` |
| Simple counters/calculations | Primitive | `int count` |
| Collections | Wrapper | `List<Integer>` |
| Null is meaningful | Wrapper | `Integer age` |
| Performance critical | Primitive | `double price` |

## Resources

- [Java Collections Framework](https://docs.oracle.com/javase/8/docs/technotes/guides/collections/)
- [Autoboxing and Unboxing](https://docs.oracle.com/javase/tutorial/java/data/autoboxing.html)
