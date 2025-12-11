---
sidebar_position: 4
---

# Template Method Pattern

Define the skeleton of an algorithm in a method, deferring some steps to subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure.

## Problem

You have several classes that implement similar algorithms with only minor differences in certain steps. You want to eliminate code duplication while allowing subclasses to customize specific steps.

**Common Scenarios:**
- Data processing workflows with common structure
- Game initialization sequences
- Document generation with different formats
- Testing frameworks with setup/teardown steps
- Database connection patterns

## Design Principles Applied

1. **Hollywood Principle** - Don't call us, we'll call you (parent calls subclass)
2. **Encapsulate what varies** - Variable steps are in subclass methods
3. **Open/Closed Principle** - Open for extension, closed for modification
4. **Code Reuse** - Common algorithm in one place

## UML Diagram

```
┌────────────────────────────┐
│    AbstractClass           │
├────────────────────────────┤
│ + templateMethod()         │◄────┐ final
│ # primitiveOperation1()    │     │ (can't override)
│ # primitiveOperation2()    │     │
│ # hook()                   │     │
└────────────────────────────┘     │
            △                       │
            │                       │
    ┌───────┴────────┐             │
    │                │             │
┌───────────┐  ┌───────────┐      │
│ConcreteA  │  │ConcreteB  │      │
├───────────┤  ├───────────┤      │
│+ primOp1()│  │+ primOp1()│      │
│+ primOp2()│  │+ primOp2()│      │
│+ hook()   │  │+ hook()   │      │
└───────────┘  └───────────┘      │
                                  │
Template Method calls:            │
1. primitiveOperation1() ─────────┘
2. primitiveOperation2()
3. hook()
```

## Implementation

### Example: Beverage Preparation

### Step 1: Abstract Template Class

```java
// Abstract class with template method
public abstract class CaffeineBeverage {

    // Template method - defines the algorithm skeleton
    // final prevents subclasses from overriding the sequence
    public final void prepareRecipe() {
        boilWater();
        brew();
        pourInCup();
        if (customerWantsCondiments()) { // Hook method
            addCondiments();
        }
    }

    // Abstract methods - must be implemented by subclasses
    protected abstract void brew();
    protected abstract void addCondiments();

    // Concrete methods - same for all subclasses
    private void boilWater() {
        System.out.println("Boiling water");
    }

    private void pourInCup() {
        System.out.println("Pouring into cup");
    }

    // Hook method - subclass can override but doesn't have to
    protected boolean customerWantsCondiments() {
        return true; // Default behavior
    }
}
```

### Step 2: Concrete Implementations

```java
// Concrete class - Coffee
public class Coffee extends CaffeineBeverage {

    @Override
    protected void brew() {
        System.out.println("Dripping coffee through filter");
    }

    @Override
    protected void addCondiments() {
        System.out.println("Adding sugar and milk");
    }

    @Override
    protected boolean customerWantsCondiments() {
        String answer = getUserInput();
        return answer.toLowerCase().startsWith("y");
    }

    private String getUserInput() {
        System.out.print("Would you like milk and sugar with your coffee (y/n)? ");
        String answer = "n"; // Simulated input
        System.out.println(answer);
        return answer;
    }
}

// Concrete class - Tea
public class Tea extends CaffeineBeverage {

    @Override
    protected void brew() {
        System.out.println("Steeping the tea");
    }

    @Override
    protected void addCondiments() {
        System.out.println("Adding lemon");
    }

    @Override
    protected boolean customerWantsCondiments() {
        String answer = getUserInput();
        return answer.toLowerCase().startsWith("y");
    }

    private String getUserInput() {
        System.out.print("Would you like lemon with your tea (y/n)? ");
        String answer = "y"; // Simulated input
        System.out.println(answer);
        return answer;
    }
}
```

### Step 3: Client Code

```java
public class BeverageTest {
    public static void main(String[] args) {
        System.out.println("Making tea...");
        CaffeineBeverage tea = new Tea();
        tea.prepareRecipe();

        System.out.println("\nMaking coffee...");
        CaffeineBeverage coffee = new Coffee();
        coffee.prepareRecipe();
    }
}
```

**Output:**
```
Making tea...
Boiling water
Steeping the tea
Pouring into cup
Would you like lemon with your tea (y/n)? y
Adding lemon

Making coffee...
Boiling water
Dripping coffee through filter
Pouring into cup
Would you like milk and sugar with your coffee (y/n)? n
```

## Real-World Examples

### Example 2: Data Mining Application

```java
// Abstract class for data mining
public abstract class DataMiner {

    // Template method
    public final void mine(String path) {
        openFile(path);
        extractData();
        parseData();
        analyzeData();
        sendReport();
        closeFile();
    }

    // Concrete methods
    private void openFile(String path) {
        System.out.println("Opening file: " + path);
    }

    private void closeFile() {
        System.out.println("Closing file");
    }

    // Abstract methods - vary by file type
    protected abstract void extractData();
    protected abstract void parseData();

    // Hook method - can be overridden
    protected void analyzeData() {
        System.out.println("Performing standard analysis");
    }

    // Concrete method
    private void sendReport() {
        System.out.println("Sending report to management");
    }
}

// Concrete implementation for PDF
public class PDFDataMiner extends DataMiner {

    @Override
    protected void extractData() {
        System.out.println("Extracting data from PDF");
    }

    @Override
    protected void parseData() {
        System.out.println("Parsing PDF data into tables");
    }

    @Override
    protected void analyzeData() {
        System.out.println("Performing PDF-specific analysis");
    }
}

// Concrete implementation for CSV
public class CSVDataMiner extends DataMiner {

    @Override
    protected void extractData() {
        System.out.println("Extracting data from CSV");
    }

    @Override
    protected void parseData() {
        System.out.println("Parsing CSV data");
    }

    // Uses default analyzeData() hook
}
```

### Example 3: Game Template

```java
public abstract class Game {

    // Template method
    public final void play() {
        initialize();
        startPlay();
        endPlay();
        printWinner();
    }

    // Abstract methods
    protected abstract void initialize();
    protected abstract void startPlay();
    protected abstract void endPlay();

    // Concrete method
    private void printWinner() {
        System.out.println("Winner announced!");
    }
}

public class Cricket extends Game {

    @Override
    protected void initialize() {
        System.out.println("Cricket Game Initialized");
    }

    @Override
    protected void startPlay() {
        System.out.println("Cricket Game Started");
    }

    @Override
    protected void endPlay() {
        System.out.println("Cricket Game Finished");
    }
}

public class Football extends Game {

    @Override
    protected void initialize() {
        System.out.println("Football Game Initialized");
    }

    @Override
    protected void startPlay() {
        System.out.println("Football Game Started");
    }

    @Override
    protected void endPlay() {
        System.out.println("Football Game Finished");
    }
}
```

## Hook Methods

Hooks provide points where subclasses can hook into the algorithm but aren't required to.

```java
public abstract class AbstractClass {

    public final void templateMethod() {
        step1();
        step2();
        if (hook()) {  // Optional behavior
            step3();
        }
        step4();
    }

    protected abstract void step1();
    protected abstract void step2();
    protected abstract void step4();

    // Hook - subclass can override
    protected boolean hook() {
        return true; // Default behavior
    }
}
```

**Types of Hooks:**
1. **Boolean hooks** - Control flow (if/else)
2. **Empty hooks** - Optional operations (do-nothing default)
3. **Return value hooks** - Provide data to algorithm

## Java API Examples

### Collections.sort()

```java
public class Person implements Comparable<Person> {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Template method calls compareTo()
    @Override
    public int compareTo(Person other) {
        return Integer.compare(this.age, other.age);
    }
}

List<Person> people = Arrays.asList(
    new Person("Alice", 30),
    new Person("Bob", 25)
);
Collections.sort(people); // Uses template method
```

### InputStream.read()

```java
public abstract class InputStream {
    // Template method
    public int read(byte[] b, int off, int len) throws IOException {
        // ... validation and loop logic ...
        for (int i = 0; i < len; i++) {
            int c = read(); // Calls abstract method
            if (c == -1) break;
            b[off + i] = (byte) c;
        }
    }

    // Abstract method implemented by subclasses
    public abstract int read() throws IOException;
}
```

### HttpServlet

```java
public abstract class HttpServlet extends GenericServlet {

    // Template method
    protected void service(HttpServletRequest req, HttpServletResponse resp) {
        String method = req.getMethod();

        if (method.equals("GET")) {
            doGet(req, resp);
        } else if (method.equals("POST")) {
            doPost(req, resp);
        }
        // ... other methods
    }

    // Hook methods
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
        // Default implementation
    }

    protected void doPost(HttpServletRequest req, HttpServletResponse resp) {
        // Default implementation
    }
}
```

## Template Method vs Strategy

| Aspect | Template Method | Strategy |
|--------|-----------------|----------|
| **Intent** | Define algorithm skeleton | Define family of algorithms |
| **When varies** | Compile time (inheritance) | Runtime (composition) |
| **Flexibility** | Less flexible | More flexible |
| **Coupling** | Tightly coupled | Loosely coupled |
| **Code reuse** | Inherits common code | Delegates to strategy |
| **Use case** | Stable algorithm structure | Swappable algorithms |

## Advantages

1. **Code Reuse** - Common algorithm in parent class
2. **Inversion of Control** - Parent calls subclass methods
3. **Enforces Structure** - Algorithm sequence can't be changed
4. **Easy to Extend** - Add new variants by subclassing
5. **Single Place** - Algorithm logic centralized

## Disadvantages

1. **Inheritance Required** - Subclasses must inherit
2. **Tight Coupling** - Subclasses coupled to parent
3. **Limited Flexibility** - Can't change algorithm structure at runtime
4. **Liskov Substitution** - Subclasses must follow parent contract
5. **Proliferation** - Many subclasses for variations

## When to Use

✅ **Use Template Method Pattern When:**
- Multiple classes implement similar algorithms with minor differences
- You want to control which parts of algorithm subclasses can change
- Common behavior should be in one place
- You want to avoid code duplication

❌ **Don't Use Template Method Pattern When:**
- Algorithm needs to change at runtime (use Strategy)
- Variations are too different (no common structure)
- You want loose coupling (prefer composition)

## Best Practices

### 1. Make Template Method Final

```java
public final void templateMethod() {
    // Prevents subclasses from changing algorithm
}
```

### 2. Minimize Abstract Methods

```java
// Too many abstract methods
abstract void step1();
abstract void step2();
abstract void step3();
abstract void step4();

// Better - only vary what's needed
void step1() { /* default */ }
abstract void step2(); // Only this varies
void step3() { /* default */ }
```

### 3. Document Hook Points

```java
/**
 * Hook method called before processing.
 * Override to add pre-processing logic.
 * Default implementation does nothing.
 */
protected void beforeProcess() {
    // Default: do nothing
}
```

### 4. Use Meaningful Names

```java
// Bad
protected abstract void doIt();

// Good
protected abstract void extractDataFromSource();
```

## Related Patterns

- **Strategy** - Alternative to template method (uses composition)
- **Factory Method** - Often called by template methods
- **Command** - Can parameterize template method steps

## Key Takeaways

1. Defines skeleton of algorithm in base class
2. Subclasses override specific steps
3. Template method should be final
4. Implements "Hollywood Principle"
5. Hooks provide optional customization points
6. Common in frameworks (testing, servlets, etc.)
7. Use when algorithm structure is stable

---

**The Template Method Pattern defines the steps of an algorithm and allows subclasses to provide the implementation for one or more steps!**
