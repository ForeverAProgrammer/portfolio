---
sidebar_position: 7
---

# Abstract Factory Pattern

Provide an interface for creating families of related or dependent objects without specifying their concrete classes.

## Problem

You need to create families of related objects that must be used together, and you want to ensure that clients use products from the same family.

**Common Scenarios:**
- UI toolkit that supports multiple look-and-feels (Windows, Mac, Linux)
- Database abstraction layer supporting multiple databases
- Document creation supporting multiple formats
- Cross-platform application development

## Design Principles Applied

1. **Program to an interface, not an implementation**
2. **Favor composition over inheritance**
3. **Depend on abstractions, not concrete classes**

## UML Diagram

```
┌────────────────────┐
│AbstractFactory     │
├────────────────────┤
│+createProductA()   │
│+createProductB()   │
└──────────┬─────────┘
           △
           │
    ┌──────┴────────┐
    │               │
┌────────────────┐ ┌────────────────┐
│ConcreteFactory1│ │ConcreteFactory2│
├────────────────┤ ├────────────────┤
│+createProductA()│ │+createProductA()│
│+createProductB()│ │+createProductB()│
└────────────────┘ └────────────────┘
```

## Implementation

### Example: UI Toolkit (Cross-Platform)

```java
// Abstract Products
public interface Button {
    void paint();
    void click();
}

public interface Checkbox {
    void paint();
    void check();
}

// Concrete Products - Windows
public class WindowsButton implements Button {
    @Override
    public void paint() {
        System.out.println("Rendering Windows button");
    }

    @Override
    public void click() {
        System.out.println("Windows button clicked");
    }
}

public class WindowsCheckbox implements Checkbox {
    @Override
    public void paint() {
        System.out.println("Rendering Windows checkbox");
    }

    @Override
    public void check() {
        System.out.println("Windows checkbox checked");
    }
}

// Concrete Products - Mac
public class MacButton implements Button {
    @Override
    public void paint() {
        System.out.println("Rendering Mac button");
    }

    @Override
    public void click() {
        System.out.println("Mac button clicked");
    }
}

public class MacCheckbox implements Checkbox {
    @Override
    public void paint() {
        System.out.println("Rendering Mac checkbox");
    }

    @Override
    public void check() {
        System.out.println("Mac checkbox checked");
    }
}

// Abstract Factory
public interface GUIFactory {
    Button createButton();
    Checkbox createCheckbox();
}

// Concrete Factories
public class WindowsFactory implements GUIFactory {
    @Override
    public Button createButton() {
        return new WindowsButton();
    }

    @Override
    public Checkbox createCheckbox() {
        return new WindowsCheckbox();
    }
}

public class MacFactory implements GUIFactory {
    @Override
    public Button createButton() {
        return new MacButton();
    }

    @Override
    public Checkbox createCheckbox() {
        return new MacCheckbox();
    }
}

// Client Code
public class Application {
    private Button button;
    private Checkbox checkbox;

    public Application(GUIFactory factory) {
        button = factory.createButton();
        checkbox = factory.createCheckbox();
    }

    public void paint() {
        button.paint();
        checkbox.paint();
    }
}

// Demo
public class Demo {
    public static void main(String[] args) {
        GUIFactory factory;
        String osName = System.getProperty("os.name").toLowerCase();

        if (osName.contains("mac")) {
            factory = new MacFactory();
        } else {
            factory = new WindowsFactory();
        }

        Application app = new Application(factory);
        app.paint();
    }
}
```

## Benefits

✅ **Consistency** - Ensures products from same family are used together
✅ **Isolation** - Separates concrete classes from client code
✅ **Easy to exchange** - Switch entire product families easily
✅ **Promotes consistency** - Products designed to work together

## Drawbacks

❌ **Complexity** - Requires many interfaces and classes
❌ **Difficult to extend** - Adding new products requires changing all factories
❌ **Overhead** - More code to maintain

## When to Use

✅ **Use Abstract Factory When:**
- System should be independent of how products are created
- System should be configured with multiple families of products
- Family of related products must be used together
- You want to provide a library of products without exposing implementations

❌ **Don't Use When:**
- You have only one product family
- Adding new products is frequent (consider other patterns)

## Summary

Abstract Factory creates families of related objects without specifying their concrete classes, ensuring products work together.

**Key Takeaway:** Use Abstract Factory when you need to create families of related objects that must be used together.
