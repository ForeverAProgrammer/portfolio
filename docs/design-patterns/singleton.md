---
sidebar_position: 4
---

# Singleton Pattern

Ensure a class has only one instance and provide a global point of access to it.

## Problem

You need to ensure that a class has exactly one instance and provide a single global access point to that instance.

**Common Scenarios:**
- Database connection pools
- Configuration managers
- Logger instances
- Thread pools
- Caches
- Device drivers (printer spooler)

## Design Principles Applied

1. **Single Responsibility** - Class manages its own single instance
2. **Encapsulation** - Private constructor prevents external instantiation

## UML Diagram

```
┌────────────────────────┐
│      Singleton         │
├────────────────────────┤
│ - uniqueInstance       │ ←─┐
│                        │   │ Self-reference
├────────────────────────┤   │
│ - Singleton()          │   │ Private constructor
│ + getInstance()        │───┘ Returns unique instance
│ + singletonOperation() │
└────────────────────────┘
```

## Implementation Approaches

### 1. Eager Initialization (Thread-Safe)

```java
public class Singleton {
    // Instance created at class loading time
    private static final Singleton instance = new Singleton();

    // Private constructor prevents instantiation
    private Singleton() {
        System.out.println("Singleton instance created");
    }

    public static Singleton getInstance() {
        return instance;
    }

    public void doSomething() {
        System.out.println("Singleton doing something");
    }
}

// Usage
public class EagerSingletonDemo {
    public static void main(String[] args) {
        Singleton s1 = Singleton.getInstance();
        Singleton s2 = Singleton.getInstance();

        System.out.println("Same instance? " + (s1 == s2)); // true

        s1.doSomething();
    }
}
```

**Pros:**
- Thread-safe without synchronization
- Simple and straightforward
- No lazy initialization issues

**Cons:**
- Instance created even if never used
- No control over instantiation timing

### 2. Lazy Initialization (Not Thread-Safe)

```java
public class LazySingleton {
    private static LazySingleton instance;

    private LazySingleton() {
        System.out.println("LazySingleton instance created");
    }

    // NOT thread-safe!
    public static LazySingleton getInstance() {
        if (instance == null) {
            instance = new LazySingleton();
        }
        return instance;
    }
}
```

**Problem:** Two threads can create multiple instances!

```java
Thread t1 = new Thread(() -> {
    LazySingleton s1 = LazySingleton.getInstance();
});

Thread t2 = new Thread(() -> {
    LazySingleton s2 = LazySingleton.getInstance();
});

// Both threads might create separate instances!
```

### 3. Thread-Safe Lazy Initialization (Synchronized)

```java
public class ThreadSafeSingleton {
    private static ThreadSafeSingleton instance;

    private ThreadSafeSingleton() {
    }

    // Thread-safe but slow
    public static synchronized ThreadSafeSingleton getInstance() {
        if (instance == null) {
            instance = new ThreadSafeSingleton();
        }
        return instance;
    }
}
```

**Pros:**
- Thread-safe
- Lazy initialization

**Cons:**
- Synchronization overhead on every call
- Performance bottleneck

### 4. Double-Checked Locking (Efficient)

```java
public class DoubleCheckedSingleton {
    // volatile ensures visibility across threads
    private static volatile DoubleCheckedSingleton instance;

    private DoubleCheckedSingleton() {
    }

    public static DoubleCheckedSingleton getInstance() {
        // First check (no locking)
        if (instance == null) {
            synchronized (DoubleCheckedSingleton.class) {
                // Second check (with locking)
                if (instance == null) {
                    instance = new DoubleCheckedSingleton();
                }
            }
        }
        return instance;
    }
}
```

**Why volatile is important:**
Without `volatile`, partially constructed objects could be visible to other threads.

**Pros:**
- Thread-safe
- Lazy initialization
- Good performance (minimal synchronization)

**Cons:**
- Complex to understand
- Requires Java 5+ for volatile to work correctly

### 5. Bill Pugh Solution (Best Practice)

```java
public class BillPughSingleton {
    private BillPughSingleton() {
    }

    // Inner static class - loaded only when getInstance() is called
    private static class SingletonHelper {
        private static final BillPughSingleton INSTANCE = new BillPughSingleton();
    }

    public static BillPughSingleton getInstance() {
        return SingletonHelper.INSTANCE;
    }
}
```

**Pros:**
- Thread-safe without synchronization
- Lazy initialization
- Simple and clean
- Best performance

**Cons:**
- None! This is the recommended approach

### 6. Enum Singleton (Joshua Bloch Recommendation)

```java
public enum EnumSingleton {
    INSTANCE;

    private int value;

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public void doSomething() {
        System.out.println("Enum singleton doing something");
    }
}

// Usage
public class EnumSingletonDemo {
    public static void main(String[] args) {
        EnumSingleton singleton = EnumSingleton.INSTANCE;
        singleton.setValue(42);
        System.out.println(singleton.getValue());

        EnumSingleton another = EnumSingleton.INSTANCE;
        System.out.println("Same instance? " + (singleton == another)); // true
    }
}
```

**Pros:**
- Thread-safe
- Serialization handled automatically
- Prevents reflection attacks
- Simplest implementation

**Cons:**
- No lazy initialization
- Enum-specific syntax

## Real-World Example: Logger

```java
public class Logger {
    private static volatile Logger instance;
    private final List<String> logs;

    private Logger() {
        logs = new ArrayList<>();
    }

    public static Logger getInstance() {
        if (instance == null) {
            synchronized (Logger.class) {
                if (instance == null) {
                    instance = new Logger();
                }
            }
        }
        return instance;
    }

    public void log(String message) {
        String timestamp = java.time.LocalDateTime.now().toString();
        String logEntry = "[" + timestamp + "] " + message;
        logs.add(logEntry);
        System.out.println(logEntry);
    }

    public void printLogs() {
        System.out.println("\n=== All Logs ===");
        logs.forEach(System.out::println);
    }

    public void clearLogs() {
        logs.clear();
        System.out.println("Logs cleared");
    }
}

// Usage
public class LoggerDemo {
    public static void main(String[] args) {
        Logger logger1 = Logger.getInstance();
        logger1.log("Application started");
        logger1.log("Processing data");

        // Same instance everywhere
        Logger logger2 = Logger.getInstance();
        logger2.log("Data processed successfully");

        System.out.println("\nSame logger? " + (logger1 == logger2));

        logger1.printLogs();
    }
}
```

## Real-World Example: Configuration Manager

```java
public class ConfigurationManager {
    private static ConfigurationManager instance;
    private Properties config;

    private ConfigurationManager() {
        config = new Properties();
        loadConfiguration();
    }

    private void loadConfiguration() {
        // Load from file or database
        config.setProperty("database.url", "jdbc:mysql://localhost:3306/mydb");
        config.setProperty("database.user", "admin");
        config.setProperty("max.connections", "100");
        config.setProperty("timeout", "30");
    }

    public static synchronized ConfigurationManager getInstance() {
        if (instance == null) {
            instance = new ConfigurationManager();
        }
        return instance;
    }

    public String getProperty(String key) {
        return config.getProperty(key);
    }

    public void setProperty(String key, String value) {
        config.setProperty(key, value);
    }

    public void printConfiguration() {
        System.out.println("\n=== Configuration ===");
        config.forEach((key, value) ->
            System.out.println(key + " = " + value));
    }
}

// Usage
public class ConfigDemo {
    public static void main(String[] args) {
        ConfigurationManager config = ConfigurationManager.getInstance();

        System.out.println("Database URL: " +
            config.getProperty("database.url"));
        System.out.println("Max Connections: " +
            config.getProperty("max.connections"));

        config.printConfiguration();
    }
}
```

## Breaking Singleton

### 1. Reflection Attack

```java
public class ReflectionAttack {
    public static void main(String[] args) throws Exception {
        Singleton instance1 = Singleton.getInstance();

        // Use reflection to create another instance
        Constructor<Singleton> constructor =
            Singleton.class.getDeclaredConstructor();
        constructor.setAccessible(true);
        Singleton instance2 = constructor.newInstance();

        System.out.println("Same instance? " + (instance1 == instance2)); // false!
    }
}
```

**Protection:**
```java
public class ProtectedSingleton {
    private static ProtectedSingleton instance;

    private ProtectedSingleton() {
        // Prevent reflection attacks
        if (instance != null) {
            throw new RuntimeException("Use getInstance() method");
        }
    }

    public static ProtectedSingleton getInstance() {
        if (instance == null) {
            instance = new ProtectedSingleton();
        }
        return instance;
    }
}
```

### 2. Serialization Breaking

```java
public class SerializableSingleton implements Serializable {
    private static SerializableSingleton instance;

    private SerializableSingleton() {
    }

    public static SerializableSingleton getInstance() {
        if (instance == null) {
            instance = new SerializableSingleton();
        }
        return instance;
    }

    // Fix serialization issue
    protected Object readResolve() {
        return getInstance();
    }
}
```

### 3. Cloning Breaking

```java
public class CloneProtectedSingleton implements Cloneable {
    private static CloneProtectedSingleton instance;

    private CloneProtectedSingleton() {
    }

    public static CloneProtectedSingleton getInstance() {
        if (instance == null) {
            instance = new CloneProtectedSingleton();
        }
        return instance;
    }

    // Prevent cloning
    @Override
    protected Object clone() throws CloneNotSupportedException {
        throw new CloneNotSupportedException();
    }
}
```

## Benefits

✅ **Controlled access to sole instance**
- Strict control over instantiation
- Single point of access

✅ **Reduced namespace pollution**
- Better than global variables
- No name conflicts

✅ **Permits refinement of operations and representation**
- Can be subclassed (carefully)
- Can change implementation

✅ **Lazy initialization**
- Create instance only when needed (with some approaches)
- Save resources

## Drawbacks

❌ **Global state**
- Hidden dependencies
- Hard to test

❌ **Violates Single Responsibility**
- Class controls its own creation
- Does its job AND manages instance

❌ **Difficult to unit test**
- Hard to mock or stub
- State persists between tests

❌ **Concurrency issues**
- Must handle thread safety
- Can become bottleneck

## When to Use

✅ **Use Singleton When:**
- Exactly one instance is needed system-wide
- Instance must be accessible from anywhere
- Instance should be created lazily
- Examples: logging, configuration, driver objects

❌ **Don't Use When:**
- You just need a namespace for utility methods (use static class)
- You might need multiple instances later
- Testing is difficult with global state
- Better alternatives exist (dependency injection)

## Alternatives to Singleton

### Dependency Injection

```java
// Instead of Singleton
public class UserService {
    private Logger logger = Logger.getInstance(); // Tight coupling

    public void createUser(String name) {
        logger.log("Creating user: " + name);
    }
}

// Better: Inject dependency
public class UserService {
    private final Logger logger;

    // Inject through constructor
    public UserService(Logger logger) {
        this.logger = logger;
    }

    public void createUser(String name) {
        logger.log("Creating user: " + name);
    }
}

// Usage with DI
Logger logger = new Logger();
UserService userService = new UserService(logger);
```

### Monostate Pattern (Alternative)

```java
// All instances share same state
public class Monostate {
    private static String sharedState;

    public String getState() {
        return sharedState;
    }

    public void setState(String state) {
        Monostate.sharedState = state;
    }
}

// Multiple instances, same state
Monostate m1 = new Monostate();
Monostate m2 = new Monostate();
m1.setState("shared");
System.out.println(m2.getState()); // "shared"
```

## Real-World Java Examples

### Runtime Class

```java
// Java's Runtime is a singleton
Runtime runtime = Runtime.getRuntime();
System.out.println("Available processors: " +
    runtime.availableProcessors());
System.out.println("Free memory: " + runtime.freeMemory());
```

### Desktop Class

```java
// Desktop class uses singleton pattern
Desktop desktop = Desktop.getDesktop();
desktop.browse(new URI("https://example.com"));
```

## Best Practices

1. **Use Enum for simple singletons**
```java
public enum Settings {
    INSTANCE;
    // Your singleton code
}
```

2. **Use Bill Pugh for complex singletons**
```java
public class ComplexSingleton {
    private ComplexSingleton() { }

    private static class Holder {
        private static final ComplexSingleton INSTANCE =
            new ComplexSingleton();
    }

    public static ComplexSingleton getInstance() {
        return Holder.INSTANCE;
    }
}
```

3. **Make it testable**
```java
// Use interface
public interface Logger {
    void log(String message);
}

public class FileLogger implements Logger {
    // Singleton implementation
}

// Easy to mock in tests
public class UserService {
    private final Logger logger;

    public UserService(Logger logger) {
        this.logger = logger;
    }
}
```

4. **Document thread safety**
```java
/**
 * Thread-safe singleton using double-checked locking.
 * Safe for concurrent access.
 */
public class ThreadSafeSingleton {
    // Implementation
}
```

## Summary

The Singleton Pattern ensures a class has only one instance with:
- Private constructor
- Static instance variable
- Static access method

**Recommended Approaches:**
1. **Enum Singleton** - For simple cases
2. **Bill Pugh Singleton** - For complex initialization
3. **Consider Dependency Injection** - For better testability

**Key Takeaway:** Use Singleton sparingly and consider if dependency injection might be a better solution for testability and flexibility.
