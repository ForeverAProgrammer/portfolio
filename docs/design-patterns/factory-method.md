---
sidebar_position: 5
---

# Factory Method Pattern

Define an interface for creating an object, but let subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses.

## Problem

You need to create objects without specifying their exact classes, and you want subclasses to decide which objects to create.

**Common Scenarios:**
- UI frameworks creating different platform-specific components
- Document readers creating different document types
- Game engines creating different character types
- Plugin architectures loading different plugins

## Design Principles Applied

1. **Depend on abstractions, not concrete classes** - Dependency Inversion Principle
2. **Program to an interface** - Use product interface
3. **Open/Closed Principle** - Add new products without modifying existing code

## UML Diagram

```
┌──────────────────┐                 ┌──────────────────┐
│     Creator      │                 │  <<interface>>   │
├──────────────────┤                 │     Product      │
│ + factoryMethod()│────creates────> ├──────────────────┤
│ + anOperation()  │                 │ + operation()    │
└──────────────────┘                 └──────────────────┘
         △                                     △
         │                                     │
         │                                     │
┌──────────────────┐                 ┌──────────────────┐
│ ConcreteCreatorA │                 │ ConcreteProductA │
├──────────────────┤                 ├──────────────────┤
│+ factoryMethod() │────creates────> │ + operation()    │
└──────────────────┘                 └──────────────────┘

┌──────────────────┐                 ┌──────────────────┐
│ ConcreteCreatorB │                 │ ConcreteProductB │
├──────────────────┤                 ├──────────────────┤
│+ factoryMethod() │────creates────> │ + operation()    │
└──────────────────┘                 └──────────────────┘
```

## Implementation

### Example 1: Pizza Store (Head First Design Patterns)

```java
// Product interface
public abstract class Pizza {
    protected String name;
    protected String dough;
    protected String sauce;
    protected List<String> toppings = new ArrayList<>();

    public void prepare() {
        System.out.println("Preparing " + name);
        System.out.println("Tossing dough: " + dough);
        System.out.println("Adding sauce: " + sauce);
        System.out.println("Adding toppings:");
        toppings.forEach(topping -> System.out.println("   " + topping));
    }

    public void bake() {
        System.out.println("Bake for 25 minutes at 350");
    }

    public void cut() {
        System.out.println("Cutting the pizza into diagonal slices");
    }

    public void box() {
        System.out.println("Place pizza in official PizzaStore box");
    }

    public String getName() {
        return name;
    }
}

// Concrete Products - NY Style
public class NYStyleCheesePizza extends Pizza {
    public NYStyleCheesePizza() {
        name = "NY Style Sauce and Cheese Pizza";
        dough = "Thin Crust Dough";
        sauce = "Marinara Sauce";
        toppings.add("Grated Reggiano Cheese");
    }
}

public class NYStylePepperoniPizza extends Pizza {
    public NYStylePepperoniPizza() {
        name = "NY Style Pepperoni Pizza";
        dough = "Thin Crust Dough";
        sauce = "Marinara Sauce";
        toppings.add("Grated Reggiano Cheese");
        toppings.add("Sliced Pepperoni");
        toppings.add("Garlic");
        toppings.add("Onion");
        toppings.add("Mushrooms");
    }
}

// Concrete Products - Chicago Style
public class ChicagoStyleCheesePizza extends Pizza {
    public ChicagoStyleCheesePizza() {
        name = "Chicago Style Deep Dish Cheese Pizza";
        dough = "Extra Thick Crust Dough";
        sauce = "Plum Tomato Sauce";
        toppings.add("Shredded Mozzarella Cheese");
    }

    @Override
    public void cut() {
        System.out.println("Cutting the pizza into square slices");
    }
}

public class ChicagoStylePepperoniPizza extends Pizza {
    public ChicagoStylePepperoniPizza() {
        name = "Chicago Style Pepperoni Pizza";
        dough = "Extra Thick Crust Dough";
        sauce = "Plum Tomato Sauce";
        toppings.add("Shredded Mozzarella Cheese");
        toppings.add("Black Olives");
        toppings.add("Spinach");
        toppings.add("Eggplant");
        toppings.add("Sliced Pepperoni");
    }

    @Override
    public void cut() {
        System.out.println("Cutting the pizza into square slices");
    }
}

// Creator (abstract)
public abstract class PizzaStore {
    // Factory method
    protected abstract Pizza createPizza(String type);

    // Template method that uses factory method
    public Pizza orderPizza(String type) {
        Pizza pizza = createPizza(type);  // Factory method call

        pizza.prepare();
        pizza.bake();
        pizza.cut();
        pizza.box();

        return pizza;
    }
}

// Concrete Creators
public class NYPizzaStore extends PizzaStore {
    @Override
    protected Pizza createPizza(String type) {
        switch (type) {
            case "cheese":
                return new NYStyleCheesePizza();
            case "pepperoni":
                return new NYStylePepperoniPizza();
            default:
                return null;
        }
    }
}

public class ChicagoPizzaStore extends PizzaStore {
    @Override
    protected Pizza createPizza(String type) {
        switch (type) {
            case "cheese":
                return new ChicagoStyleCheesePizza();
            case "pepperoni":
                return new ChicagoStylePepperoniPizza();
            default:
                return null;
        }
    }
}

// Test
public class PizzaTestDrive {
    public static void main(String[] args) {
        PizzaStore nyStore = new NYPizzaStore();
        PizzaStore chicagoStore = new ChicagoPizzaStore();

        Pizza pizza = nyStore.orderPizza("cheese");
        System.out.println("Ethan ordered a " + pizza.getName() + "\n");

        pizza = chicagoStore.orderPizza("cheese");
        System.out.println("Joel ordered a " + pizza.getName() + "\n");
    }
}
```

### Example 2: Document Creator

```java
// Product interface
public interface Document {
    void open();
    void save();
    void close();
}

// Concrete Products
public class PDFDocument implements Document {
    @Override
    public void open() {
        System.out.println("Opening PDF document");
    }

    @Override
    public void save() {
        System.out.println("Saving PDF document");
    }

    @Override
    public void close() {
        System.out.println("Closing PDF document");
    }
}

public class WordDocument implements Document {
    @Override
    public void open() {
        System.out.println("Opening Word document");
    }

    @Override
    public void save() {
        System.out.println("Saving Word document");
    }

    @Override
    public void close() {
        System.out.println("Closing Word document");
    }
}

public class ExcelDocument implements Document {
    @Override
    public void open() {
        System.out.println("Opening Excel document");
    }

    @Override
    public void save() {
        System.out.println("Saving Excel document");
    }

    @Override
    public void close() {
        System.out.println("Closing Excel document");
    }
}

// Creator
public abstract class Application {
    // Factory method
    public abstract Document createDocument();

    public void newDocument() {
        Document doc = createDocument();
        doc.open();
        // Do work with document
        doc.save();
        doc.close();
    }
}

// Concrete Creators
public class PDFApplication extends Application {
    @Override
    public Document createDocument() {
        return new PDFDocument();
    }
}

public class WordApplication extends Application {
    @Override
    public Document createDocument() {
        return new WordDocument();
    }
}

public class ExcelApplication extends Application {
    @Override
    public Document createDocument() {
        return new ExcelDocument();
    }
}
```

## Dependency Inversion Principle

**Bad Design (High-level depends on low-level):**
```java
public class PizzaStore {
    public Pizza orderPizza(String type) {
        Pizza pizza;

        // Depends on concrete classes!
        if (type.equals("cheese")) {
            pizza = new CheesePizza();
        } else if (type.equals("pepperoni")) {
            pizza = new PepperoniPizza();
        }

        return pizza;
    }
}
```

**Good Design (Both depend on abstraction):**
```java
// High-level module
public abstract class PizzaStore {
    protected abstract Pizza createPizza(String type);  // Abstraction
}

// Low-level modules
public class NYPizzaStore extends PizzaStore {
    protected Pizza createPizza(String type) {  // Implements abstraction
        // Create concrete pizzas
    }
}
```

## Benefits

✅ **Loose coupling**
- Creator and products are decoupled
- Easy to add new products

✅ **Single Responsibility**
- Product creation logic in one place
- Creator doesn't know concrete product classes

✅ **Open/Closed Principle**
- Add new products without modifying existing code

✅ **Dependency Inversion**
- Depend on abstractions, not concretions

## Drawbacks

❌ **Code complexity**
- Need to create subclass for each product type
- More classes to maintain

❌ **Parallel hierarchies**
- Product hierarchy and Creator hierarchy must be kept in sync

## When to Use

✅ **Use Factory Method When:**
- Class can't anticipate type of objects to create
- Class wants subclasses to specify objects created
- Parent class chooses creation of objects to subclasses

❌ **Don't Use When:**
- Simple object creation suffices
- No variation in product creation

## Related Patterns

- **Abstract Factory**: Creates families of related objects
- **Template Method**: Often uses Factory Method
- **Prototype**: Alternative to Factory Method for object creation

## Best Practices

1. **Use enums** for type-safe product selection
2. **Consider Simple Factory** for simpler cases
3. **Combine with Dependency Injection** for better testability
4. **Document creator responsibilities** clearly

## Summary

Factory Method delegates object creation to subclasses, promoting:
- Loose coupling between creator and products
- Adherence to Dependency Inversion Principle
- Easy extension with new product types

**Key Takeaway:** Let subclasses decide which concrete class to instantiate, keeping the creator independent of specific product implementations.
