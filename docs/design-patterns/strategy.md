---
sidebar_position: 1
---

# Strategy Pattern

Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it.

## Problem

You need different variations of an algorithm, and you want to be able to switch between them at runtime without using conditional statements.

**Common Scenarios:**
- Different payment methods (credit card, PayPal, cryptocurrency)
- Multiple sorting algorithms (quicksort, mergesort, bubblesort)
- Various compression strategies (ZIP, RAR, TAR)
- Different validation rules based on context

## Design Principles Applied

1. **Encapsulate what varies** - The algorithm implementation varies
2. **Program to an interface, not implementation** - Use strategy interface
3. **Favor composition over inheritance** - Compose with strategy objects

## UML Diagram

```
┌─────────────────┐
│    Context      │
├─────────────────┤              ┌──────────────────┐
│ - strategy      │───────────>  │   <<interface>>  │
├─────────────────┤              │    Strategy      │
│ + setStrategy() │              ├──────────────────┤
│ + execute()     │              │ + algorithm()    │
└─────────────────┘              └──────────────────┘
                                          △
                   ┌──────────────────────┼──────────────────────┐
                   │                      │                      │
          ┌────────────────┐    ┌────────────────┐    ┌────────────────┐
          │ ConcreteStrategyA│   │ ConcreteStrategyB│   │ ConcreteStrategyC│
          ├────────────────┤    ├────────────────┤    ├────────────────┤
          │ + algorithm()  │    │ + algorithm()  │    │ + algorithm()  │
          └────────────────┘    └────────────────┘    └────────────────┘
```

## Implementation

### Step 1: Define the Strategy Interface

```java
// Strategy interface - defines the contract for all algorithms
public interface PaymentStrategy {
    void pay(double amount);
    boolean validate();
}
```

### Step 2: Create Concrete Strategy Classes

```java
// Concrete Strategy 1: Credit Card Payment
public class CreditCardPayment implements PaymentStrategy {
    private String cardNumber;
    private String cvv;
    private String expiryDate;

    public CreditCardPayment(String cardNumber, String cvv, String expiryDate) {
        this.cardNumber = cardNumber;
        this.cvv = cvv;
        this.expiryDate = expiryDate;
    }

    @Override
    public boolean validate() {
        // Validate credit card details
        System.out.println("Validating credit card: " +
            cardNumber.substring(cardNumber.length() - 4));
        return cardNumber.length() == 16 && cvv.length() == 3;
    }

    @Override
    public void pay(double amount) {
        if (validate()) {
            System.out.println("Paid $" + amount + " using Credit Card");
            System.out.println("Card ending in: " +
                cardNumber.substring(cardNumber.length() - 4));
        } else {
            System.out.println("Invalid credit card details");
        }
    }
}

// Concrete Strategy 2: PayPal Payment
public class PayPalPayment implements PaymentStrategy {
    private String email;
    private String password;

    public PayPalPayment(String email, String password) {
        this.email = email;
        this.password = password;
    }

    @Override
    public boolean validate() {
        // Validate PayPal credentials
        System.out.println("Validating PayPal account: " + email);
        return email.contains("@") && password.length() >= 6;
    }

    @Override
    public void pay(double amount) {
        if (validate()) {
            System.out.println("Paid $" + amount + " using PayPal");
            System.out.println("PayPal account: " + email);
        } else {
            System.out.println("Invalid PayPal credentials");
        }
    }
}

// Concrete Strategy 3: Cryptocurrency Payment
public class CryptoPayment implements PaymentStrategy {
    private String walletAddress;
    private String cryptoType;

    public CryptoPayment(String walletAddress, String cryptoType) {
        this.walletAddress = walletAddress;
        this.cryptoType = cryptoType;
    }

    @Override
    public boolean validate() {
        // Validate crypto wallet
        System.out.println("Validating " + cryptoType + " wallet");
        return walletAddress.length() >= 26;
    }

    @Override
    public void pay(double amount) {
        if (validate()) {
            System.out.println("Paid $" + amount + " using " + cryptoType);
            System.out.println("Wallet: " +
                walletAddress.substring(0, 8) + "...");
        } else {
            System.out.println("Invalid crypto wallet");
        }
    }
}
```

### Step 3: Create Context Class

```java
// Context class that uses a PaymentStrategy
public class ShoppingCart {
    private List<Item> items;
    private PaymentStrategy paymentStrategy;

    public ShoppingCart() {
        this.items = new ArrayList<>();
    }

    public void addItem(Item item) {
        items.add(item);
    }

    public void removeItem(Item item) {
        items.remove(item);
    }

    public double calculateTotal() {
        return items.stream()
                   .mapToDouble(Item::getPrice)
                   .sum();
    }

    // Set the payment strategy at runtime
    public void setPaymentStrategy(PaymentStrategy strategy) {
        this.paymentStrategy = strategy;
    }

    // Execute the payment using current strategy
    public void checkout() {
        double amount = calculateTotal();
        if (paymentStrategy == null) {
            System.out.println("Please select a payment method");
            return;
        }
        paymentStrategy.pay(amount);
    }

    public void displayItems() {
        System.out.println("\nShopping Cart:");
        items.forEach(item ->
            System.out.println("- " + item.getName() + ": $" + item.getPrice())
        );
        System.out.println("Total: $" + calculateTotal());
    }
}

// Simple Item class
class Item {
    private String name;
    private double price;

    public Item(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public String getName() { return name; }
    public double getPrice() { return price; }
}
```

### Step 4: Client Code

```java
public class StrategyPatternDemo {
    public static void main(String[] args) {
        // Create shopping cart
        ShoppingCart cart = new ShoppingCart();

        // Add items
        cart.addItem(new Item("Laptop", 999.99));
        cart.addItem(new Item("Mouse", 29.99));
        cart.addItem(new Item("Keyboard", 79.99));

        cart.displayItems();

        // Pay with Credit Card
        System.out.println("\n=== Paying with Credit Card ===");
        cart.setPaymentStrategy(
            new CreditCardPayment("1234567890123456", "123", "12/25")
        );
        cart.checkout();

        // Pay with PayPal
        System.out.println("\n=== Paying with PayPal ===");
        cart.setPaymentStrategy(
            new PayPalPayment("user@example.com", "securepass")
        );
        cart.checkout();

        // Pay with Cryptocurrency
        System.out.println("\n=== Paying with Bitcoin ===");
        cart.setPaymentStrategy(
            new CryptoPayment("1A2B3C4D5E6F7G8H9I0J1K2L3M4N", "Bitcoin")
        );
        cart.checkout();
    }
}
```

### Output

```
Shopping Cart:
- Laptop: $999.99
- Mouse: $29.99
- Keyboard: $79.99
Total: $1109.97

=== Paying with Credit Card ===
Validating credit card: 3456
Paid $1109.97 using Credit Card
Card ending in: 3456

=== Paying with PayPal ===
Validating PayPal account: user@example.com
Paid $1109.97 using PayPal
PayPal account: user@example.com

=== Paying with Bitcoin ===
Validating Bitcoin wallet
Paid $1109.97 using Bitcoin
Wallet: 1A2B3C4D...
```

## Another Example: Duck Simulator

The classic example from Head First Design Patterns:

```java
// Strategy interfaces
public interface FlyBehavior {
    void fly();
}

public interface QuackBehavior {
    void quack();
}

// Concrete fly behaviors
public class FlyWithWings implements FlyBehavior {
    @Override
    public void fly() {
        System.out.println("I'm flying with wings!");
    }
}

public class FlyNoWay implements FlyBehavior {
    @Override
    public void fly() {
        System.out.println("I can't fly");
    }
}

public class FlyRocketPowered implements FlyBehavior {
    @Override
    public void fly() {
        System.out.println("I'm flying with a rocket!");
    }
}

// Concrete quack behaviors
public class Quack implements QuackBehavior {
    @Override
    public void quack() {
        System.out.println("Quack quack!");
    }
}

public class Squeak implements QuackBehavior {
    @Override
    public void quack() {
        System.out.println("Squeak!");
    }
}

public class MuteQuack implements QuackBehavior {
    @Override
    public void quack() {
        System.out.println("<< Silence >>");
    }
}

// Context class
public abstract class Duck {
    protected FlyBehavior flyBehavior;
    protected QuackBehavior quackBehavior;

    public Duck() {
    }

    public void performFly() {
        flyBehavior.fly();
    }

    public void performQuack() {
        quackBehavior.quack();
    }

    public void swim() {
        System.out.println("All ducks float, even decoys!");
    }

    // Allow behavior to be changed at runtime
    public void setFlyBehavior(FlyBehavior fb) {
        flyBehavior = fb;
    }

    public void setQuackBehavior(QuackBehavior qb) {
        quackBehavior = qb;
    }

    public abstract void display();
}

// Concrete Duck types
public class MallardDuck extends Duck {
    public MallardDuck() {
        flyBehavior = new FlyWithWings();
        quackBehavior = new Quack();
    }

    @Override
    public void display() {
        System.out.println("I'm a real Mallard duck");
    }
}

public class ModelDuck extends Duck {
    public ModelDuck() {
        flyBehavior = new FlyNoWay();
        quackBehavior = new Quack();
    }

    @Override
    public void display() {
        System.out.println("I'm a model duck");
    }
}

// Test the duck simulator
public class DuckSimulator {
    public static void main(String[] args) {
        Duck mallard = new MallardDuck();
        mallard.display();
        mallard.performQuack();
        mallard.performFly();

        System.out.println();

        Duck model = new ModelDuck();
        model.display();
        model.performFly();

        // Change behavior at runtime!
        model.setFlyBehavior(new FlyRocketPowered());
        model.performFly();
    }
}
```

## Benefits

✅ **Eliminates conditional statements**
- No need for long if-else or switch statements
- Each algorithm is in its own class

✅ **Open/Closed Principle**
- Open for extension (add new strategies)
- Closed for modification (existing code unchanged)

✅ **Runtime flexibility**
- Change algorithm/behavior at runtime
- Different objects can use different strategies

✅ **Easy testing**
- Each strategy can be tested independently
- Easy to mock strategies for unit tests

## Drawbacks

❌ **Increased number of classes**
- Each algorithm becomes a separate class
- Can clutter codebase if overused

❌ **Client must be aware of strategies**
- Client needs to know about different strategies
- Must understand which strategy to use when

❌ **Communication overhead**
- Context and strategy may need to exchange data
- Strategy interface might need to expose Context

## When to Use

✅ **Use Strategy When:**
- You have multiple algorithms for a specific task
- You need to switch algorithms at runtime
- You want to eliminate conditional statements
- Algorithms use different data structures

❌ **Don't Use When:**
- You only have one algorithm
- Algorithms never change
- Simple conditional logic suffices

## Real-World Examples

### Java Libraries
```java
// Comparator in Java Collections (Strategy Pattern)
List<String> names = Arrays.asList("John", "Alice", "Bob");

// Different sorting strategies
Collections.sort(names, new Comparator<String>() {
    public int compare(String s1, String s2) {
        return s1.compareTo(s2); // Alphabetical
    }
});

Collections.sort(names, (s1, s2) -> s2.compareTo(s1)); // Reverse

Collections.sort(names, Comparator.comparing(String::length)); // By length
```

### Layout Managers in Swing
```java
// Different layout strategies
JPanel panel = new JPanel();
panel.setLayout(new FlowLayout());    // Strategy 1
panel.setLayout(new BorderLayout());  // Strategy 2
panel.setLayout(new GridLayout());    // Strategy 3
```

## Related Patterns

- **State Pattern**: Similar structure but different intent - State changes behavior based on internal state
- **Template Method**: Defines algorithm structure in superclass, Strategy uses composition instead of inheritance
- **Command Pattern**: Encapsulates requests, Strategy encapsulates algorithms

## Best Practices

1. **Use functional interfaces** (Java 8+) for simple strategies
```java
// Traditional way
public interface ValidationStrategy {
    boolean validate(String input);
}

// Using functional interface
@FunctionalInterface
public interface ValidationStrategy {
    boolean validate(String input);
}

// Usage with lambda
validator.setStrategy(input -> input.length() > 5);
```

2. **Provide default strategies** in the Context constructor
```java
public class ShoppingCart {
    private PaymentStrategy paymentStrategy = new CreditCardPayment();
    // ...
}
```

3. **Consider using enums** for a fixed set of strategies
```java
public enum CompressionStrategy {
    ZIP(new ZipCompression()),
    RAR(new RarCompression()),
    TAR(new TarCompression());

    private final Compression compression;

    CompressionStrategy(Compression compression) {
        this.compression = compression;
    }

    public void compress(File file) {
        compression.compress(file);
    }
}
```

## Summary

The Strategy Pattern is one of the most useful patterns for:
- Replacing conditional logic with polymorphism
- Making algorithms interchangeable
- Allowing runtime behavior changes
- Following the Open/Closed Principle

**Key Takeaway:** Encapsulate what varies (the algorithm) and program to an interface, not an implementation.
