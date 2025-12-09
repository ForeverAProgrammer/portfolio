---
sidebar_position: 2
---

# Java Best Practices

Essential Java programming patterns and best practices for writing clean, maintainable code.

## Choosing the Right Variable Type

### Interfaces vs Concrete Types

**Always prefer interface types for variable declarations when possible.**

❌ **Don't:**
```java
ArrayList<String> names = new ArrayList<>();
HashMap<String, Integer> scores = new HashMap<>();
HashSet<Integer> numbers = new HashSet<>();
```

✅ **Do:**
```java
List<String> names = new ArrayList<>();
Map<String, Integer> scores = new HashMap<>();
Set<Integer> numbers = new HashSet<>();
```

**Why?**

1. **Flexibility**: Easy to change implementation without modifying code
2. **Abstraction**: Depend on behavior, not implementation
3. **Testing**: Easier to mock interfaces
4. **API Design**: Methods accept interfaces, allowing any implementation

**Example:**

```java
// Good - can easily switch implementations
public class UserService {
    private final List<User> users;

    public UserService() {
        // Can switch to LinkedList without changing declaration
        this.users = new ArrayList<>();
    }

    public void processUsers(List<User> userList) {
        // Accepts any List implementation
        for (User user : userList) {
            // process user
        }
    }
}
```

### When to Use Concrete Types

Use concrete types when you need specific functionality:

```java
// When you need LinkedList's specific methods
LinkedList<Task> taskQueue = new LinkedList<>();
taskQueue.addFirst(urgentTask);  // LinkedList-specific method
taskQueue.addLast(normalTask);   // LinkedList-specific method

// When you need ArrayList's ensureCapacity
ArrayList<Integer> largeList = new ArrayList<>(10000);
largeList.ensureCapacity(20000);  // ArrayList-specific method
```

## Primitives vs Wrapper Types

### int vs Integer

**Primitives** (`int`, `double`, `boolean`, etc.)
- Stored directly in memory
- Cannot be `null`
- More memory-efficient
- Faster performance
- Default value: `0` for numbers, `false` for boolean

**Wrappers** (`Integer`, `Double`, `Boolean`, etc.)
- Objects stored on heap
- Can be `null`
- Required for Collections
- Provide utility methods
- Default value: `null`

### Decision Guide

✅ **Use Primitives When:**

```java
// 1. Simple calculations and counters
for (int i = 0; i < 100; i++) {
    // primitives are faster
}

// 2. Method parameters that should never be null
public void calculateArea(int width, int height) {
    return width * height;
}

// 3. Class fields that always have a value
public class Circle {
    private double radius = 1.0;  // always has a value
}

// 4. Performance-critical code
public int sumArray(int[] numbers) {
    int sum = 0;  // primitive for speed
    for (int num : numbers) {
        sum += num;
    }
    return sum;
}
```

✅ **Use Wrappers When:**

```java
// 1. Collections (they require objects)
List<Integer> scores = new ArrayList<>();
Map<String, Double> prices = new HashMap<>();

// 2. When null is a meaningful value
public class OptionalConfiguration {
    private Integer maxRetries;  // null means "use default"

    public int getMaxRetries() {
        return maxRetries != null ? maxRetries : 3;
    }
}

// 3. Using with Generics
public class Cache<T> {
    private Map<String, T> cache = new HashMap<>();

    public T get(String key) {
        return cache.get(key);  // may return null
    }
}

// 4. API responses that may be absent
public class UserProfile {
    private String name;
    private Integer age;  // may be null if not provided

    public Optional<Integer> getAge() {
        return Optional.ofNullable(age);
    }
}
```

### Common Pitfalls

**Autoboxing Performance:**

```java
// ❌ Bad - creates 100,000 Integer objects
Integer sum = 0;
for (int i = 0; i < 100000; i++) {
    sum += i;  // autoboxing on every iteration!
}

// ✅ Good - uses primitive
int sum = 0;
for (int i = 0; i < 100000; i++) {
    sum += i;
}
```

**Null Pointer Exceptions:**

```java
// ❌ Dangerous - can throw NullPointerException
Integer count = getCount();  // might return null
int total = count + 10;  // NPE if count is null!

// ✅ Safe - check for null
Integer count = getCount();
int total = (count != null ? count : 0) + 10;

// ✅ Better - use primitive default
int count = getCountOrDefault();
int total = count + 10;
```

**Equality Comparison:**

```java
// ❌ Wrong - compares references, not values
Integer a = 1000;
Integer b = 1000;
if (a == b) {  // false! Different objects
    System.out.println("Equal");
}

// ✅ Correct - compares values
if (a.equals(b)) {  // true
    System.out.println("Equal");
}

// ⚠️ Tricky - cached values (-128 to 127)
Integer c = 100;
Integer d = 100;
if (c == d) {  // true due to Integer caching!
    System.out.println("Equal");
}
```

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

## Summary

| Scenario | Use | Example |
|----------|-----|---------|
| Variable declarations | Interface | `List<String> items` |
| Need specific functionality | Concrete class | `LinkedList<T> queue` |
| Simple counters/calculations | Primitive | `int count` |
| Collections | Wrapper | `List<Integer>` |
| Null is meaningful | Wrapper | `Integer age` |
| Performance critical | Primitive | `double price` |

## Next Steps

- Review [JUnit 5 Testing](../testing/junit5) for testing best practices
- Learn about [Gradle Build Tool](../build-tools/gradle) for project management
- Explore [Design Patterns](../../../design-patterns/) for advanced topics
