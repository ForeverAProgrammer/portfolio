---
sidebar_position: 2
---

# Class and Object Patterns

The GoF book organizes patterns by two dimensions: **purpose** (creational, structural, behavioral) and **scope** (class or object). Understanding scope helps you choose between patterns and explains why some patterns feel similar but behave differently.

## Scope: Class vs Object

| Scope | Relationship type | Set at |
|-------|------------------|--------|
| **Class** | Inheritance (static) | Compile time |
| **Object** | Composition / delegation (dynamic) | Runtime |

### Class Patterns

Class patterns use **inheritance** as their primary mechanism. The relationship between the base class and subclasses is fixed at compile time — you can't swap in a different behavior without changing the class hierarchy.

| Pattern | Category | What the subclass does |
|---------|----------|----------------------|
| **Factory Method** | Creational | Decides which concrete object to instantiate |
| **Adapter** *(class variant)* | Structural | Adapts an incompatible interface via multiple inheritance |
| **Template Method** | Behavioral | Fills in specific steps of an algorithm defined by the parent |
| **Interpreter** | Behavioral | Implements interpretation of one grammar rule |

**Example — Template Method (class pattern):**

```java
// The algorithm skeleton lives in the abstract parent class
public abstract class DataExporter {

    // Template method: fixed structure, defined once
    public final void export(String destination) {
        fetchData();        // concrete — same for all
        formatData();       // abstract — subclass fills this in
        writeToFile(destination); // concrete — same for all
    }

    protected abstract void formatData();

    private void fetchData() { System.out.println("Fetching data..."); }
    private void writeToFile(String dest) { System.out.println("Writing to " + dest); }
}

// The relationship is fixed: CsvExporter always formats as CSV
public class CsvExporter extends DataExporter {
    @Override
    protected void formatData() {
        System.out.println("Formatting as CSV");
    }
}
```

The formatting behavior can't be changed at runtime — `CsvExporter` will always be a CSV exporter.

---

### Object Patterns

Object patterns use **composition and delegation**. Objects hold references to other objects and forward work to them. You can swap those references at runtime, making object patterns far more flexible than class patterns.

All other GoF patterns fall into this category:

| Pattern | Category |
|---------|----------|
| Singleton | Creational |
| Abstract Factory | Creational |
| Builder | Creational |
| Prototype | Creational |
| Adapter *(object variant)* | Structural |
| Bridge | Structural |
| Composite | Structural |
| Decorator | Structural |
| Facade | Structural |
| Flyweight | Structural |
| Proxy | Structural |
| Chain of Responsibility | Behavioral |
| Command | Behavioral |
| Iterator | Behavioral |
| Mediator | Behavioral |
| Memento | Behavioral |
| Observer | Behavioral |
| State | Behavioral |
| Strategy | Behavioral |
| Visitor | Behavioral |

**Example — Composite (object pattern):**

```java
// The "object" relationship: a component holds references to other components
public interface FileSystemComponent {
    void display(String indent);
}

public class File implements FileSystemComponent {
    private String name;

    public File(String name) { this.name = name; }

    @Override
    public void display(String indent) {
        System.out.println(indent + name);
    }
}

public class Folder implements FileSystemComponent {
    private String name;
    // Holds a list of child components — set and changed at runtime
    private List<FileSystemComponent> children = new ArrayList<>();

    public Folder(String name) { this.name = name; }

    public void add(FileSystemComponent component) {
        children.add(component);
    }

    @Override
    public void display(String indent) {
        System.out.println(indent + name + "/");
        for (FileSystemComponent child : children) {
            child.display(indent + "  ");
        }
    }
}

// Usage — tree is assembled at runtime, not fixed at compile time
Folder root = new Folder("root");
root.add(new File("readme.txt"));
Folder src = new Folder("src");
src.add(new File("Main.java"));
root.add(src);
root.display("");
```

The tree structure is built at runtime. You can add, remove, or reorganize nodes without touching any class definitions.

---

## Class vs Object: Side-by-Side Comparison

| Aspect | Class Pattern | Object Pattern |
|--------|--------------|----------------|
| **Mechanism** | Inheritance | Composition / delegation |
| **Flexibility** | Lower — fixed at compile time | Higher — configurable at runtime |
| **Coupling** | Tighter — subclass depends on parent | Looser — objects interact through interfaces |
| **Number of classes** | Fewer (subclassing reuses code) | Potentially more (one per role) |
| **Behavior change** | Requires a new subclass | Swap the referenced object |
| **Examples** | Template Method, Factory Method | Strategy, Composite, Observer |

## Template Method vs Strategy: Class vs Object

These two patterns solve the same problem — varying part of an algorithm — but from opposite ends of the class/object axis.

```java
// CLASS PATTERN — Template Method (inheritance)
// The variation is baked in at compile time via subclassing
public abstract class Sorter {
    public final void sort(int[] data) {
        prepare(data);
        doSort(data);     // subclass decides how to sort
    }
    protected abstract void doSort(int[] data);
}

public class QuickSorter extends Sorter {
    @Override
    protected void doSort(int[] data) { /* quicksort implementation */ }
}


// OBJECT PATTERN — Strategy (composition)
// The variation is plugged in at runtime via a reference
public class Sorter {
    private SortStrategy strategy;  // can be changed at any time

    public Sorter(SortStrategy strategy) {
        this.strategy = strategy;
    }

    public void setStrategy(SortStrategy strategy) {
        this.strategy = strategy;
    }

    public void sort(int[] data) {
        strategy.sort(data);
    }
}

public interface SortStrategy {
    void sort(int[] data);
}

public class QuickSort implements SortStrategy {
    @Override
    public void sort(int[] data) { /* quicksort implementation */ }
}
```

**Use Template Method when** the algorithm's structure is stable and you control the class hierarchy.
**Use Strategy when** you need to switch algorithms at runtime or keep the context class decoupled from sorting logic.

## Factory Method vs Abstract Factory: Class vs Object

| | Factory Method (class) | Abstract Factory (object) |
|---|---|---|
| **Creates** | One product | Families of related products |
| **How** | Subclassing | Object composition |
| **Example** | `createButton()` in subclass | `GUIFactory` held as a field |

## When Scope Matters in Practice

**Prefer class patterns when:**
- The variation is known at compile time and won't change
- You want the compiler to enforce correct behavior
- Simplicity matters more than runtime flexibility

**Prefer object patterns when:**
- Behavior needs to vary at runtime (user configuration, feature flags)
- You want to follow *Favor Composition Over Inheritance*
- You need to unit test components independently with mocks

## Key Takeaways

1. GoF patterns have two axes: **purpose** (creational/structural/behavioral) and **scope** (class/object)
2. **Class patterns** use inheritance — relationships are fixed at compile time
3. **Object patterns** use composition — relationships are configured at runtime
4. The four class patterns are: Factory Method, Adapter (class), Template Method, Interpreter
5. Object patterns are generally preferred in modern OOP because they support the *Favor Composition Over Inheritance* principle
6. Template Method (class) and Strategy (object) are the clearest illustration of the trade-off between the two scopes

---

**Understanding scope helps you choose the right pattern — and understand why your design feels rigid or flexible.**
