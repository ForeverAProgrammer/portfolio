---
sidebar_position: 3
---

# Decorator Pattern

Attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.

## Problem

You need to add responsibilities to objects without modifying their code, and you want to add/remove these responsibilities at runtime.

**Common Scenarios:**
- Adding features to UI components (borders, scrollbars)
- Adding behaviors to I/O streams (buffering, compression, encryption)
- Adding toppings to food items (coffee condiments, pizza toppings)
- Adding middleware to web requests/responses

## Design Principles Applied

1. **Open/Closed Principle** - Open for extension, closed for modification
2. **Favor composition over inheritance** - Wrap objects instead of extending classes
3. **Single Responsibility** - Each decorator adds one responsibility

## UML Diagram

```
┌──────────────────┐
│  <<interface>>   │
│    Component     │
├──────────────────┤
│ + operation()    │
└──────────────────┘
         △
         │
         ├────────────────────────────────────┐
         │                                    │
┌──────────────────┐              ┌──────────────────┐
│ ConcreteComponent│              │    Decorator     │
├──────────────────┤              ├──────────────────┤
│ + operation()    │              │ - component      │◇───┐
└──────────────────┘              ├──────────────────┤    │
                                  │ + operation()    │    │
                                  └──────────────────┘    │
                                           △              │
                                           │              │
                   ┌───────────────────────┴─────────┐   │
                   │                                 │   │
          ┌────────────────┐               ┌────────────────┐
          │ConcreteDecoratorA│              │ConcreteDecoratorB│
          ├────────────────┤               ├────────────────┤
          │ + operation()  │               │ + operation()  │
          │ + addedBehavior()              │ + addedState   │
          └────────────────┘               └────────────────┘
```

## Implementation

### Example 1: Coffee Shop (Classic Head First Example)

```java
// Component interface
public abstract class Beverage {
    protected String description = "Unknown Beverage";

    public String getDescription() {
        return description;
    }

    public abstract double cost();
}

// Concrete Component - Base beverages
public class Espresso extends Beverage {
    public Espresso() {
        description = "Espresso";
    }

    @Override
    public double cost() {
        return 1.99;
    }
}

public class HouseBlend extends Beverage {
    public HouseBlend() {
        description = "House Blend Coffee";
    }

    @Override
    public double cost() {
        return 0.89;
    }
}

public class DarkRoast extends Beverage {
    public DarkRoast() {
        description = "Dark Roast Coffee";
    }

    @Override
    public double cost() {
        return 0.99;
    }
}

public class Decaf extends Beverage {
    public Decaf() {
        description = "Decaf Coffee";
    }

    @Override
    public double cost() {
        return 1.05;
    }
}
```

### Decorator Classes

```java
// Abstract Decorator
public abstract class CondimentDecorator extends Beverage {
    protected Beverage beverage;

    public abstract String getDescription();
}

// Concrete Decorators
public class Mocha extends CondimentDecorator {
    public Mocha(Beverage beverage) {
        this.beverage = beverage;
    }

    @Override
    public String getDescription() {
        return beverage.getDescription() + ", Mocha";
    }

    @Override
    public double cost() {
        return beverage.cost() + 0.20;
    }
}

public class Whip extends CondimentDecorator {
    public Whip(Beverage beverage) {
        this.beverage = beverage;
    }

    @Override
    public String getDescription() {
        return beverage.getDescription() + ", Whip";
    }

    @Override
    public double cost() {
        return beverage.cost() + 0.10;
    }
}

public class Soy extends CondimentDecorator {
    public Soy(Beverage beverage) {
        this.beverage = beverage;
    }

    @Override
    public String getDescription() {
        return beverage.getDescription() + ", Soy";
    }

    @Override
    public double cost() {
        return beverage.cost() + 0.15;
    }
}

public class SteamedMilk extends CondimentDecorator {
    public SteamedMilk(Beverage beverage) {
        this.beverage = beverage;
    }

    @Override
    public String getDescription() {
        return beverage.getDescription() + ", Steamed Milk";
    }

    @Override
    public double cost() {
        return beverage.cost() + 0.10;
    }
}
```

### Beverage Size Support

```java
// Enhanced version with sizes
public abstract class Beverage {
    public enum Size { TALL, GRANDE, VENTI }

    protected String description = "Unknown Beverage";
    protected Size size = Size.TALL;

    public String getDescription() {
        return description;
    }

    public void setSize(Size size) {
        this.size = size;
    }

    public Size getSize() {
        return size;
    }

    public abstract double cost();
}

// Enhanced decorator that considers size
public class Soy extends CondimentDecorator {
    public Soy(Beverage beverage) {
        this.beverage = beverage;
    }

    @Override
    public String getDescription() {
        return beverage.getDescription() + ", Soy";
    }

    @Override
    public double cost() {
        double cost = beverage.cost();
        switch (beverage.getSize()) {
            case TALL:
                cost += 0.10;
                break;
            case GRANDE:
                cost += 0.15;
                break;
            case VENTI:
                cost += 0.20;
                break;
        }
        return cost;
    }

    @Override
    public Size getSize() {
        return beverage.getSize();
    }
}
```

### Test Code

```java
public class StarbuzzCoffee {
    public static void main(String[] args) {
        // Simple espresso
        Beverage beverage = new Espresso();
        System.out.println(beverage.getDescription() +
            " $" + beverage.cost());

        // DarkRoast with double mocha and whip
        Beverage beverage2 = new DarkRoast();
        beverage2 = new Mocha(beverage2);
        beverage2 = new Mocha(beverage2);
        beverage2 = new Whip(beverage2);
        System.out.println(beverage2.getDescription() +
            " $" + beverage2.cost());

        // HouseBlend with soy, mocha, and whip
        Beverage beverage3 = new HouseBlend();
        beverage3 = new Soy(beverage3);
        beverage3 = new Mocha(beverage3);
        beverage3 = new Whip(beverage3);
        System.out.println(beverage3.getDescription() +
            " $" + beverage3.cost());

        // Venti-sized beverage with soy
        Beverage beverage4 = new Espresso();
        beverage4.setSize(Beverage.Size.VENTI);
        beverage4 = new Soy(beverage4);
        System.out.println(beverage4.getDescription() +
            " (" + beverage4.getSize() + ") $" + beverage4.cost());
    }
}
```

### Output

```
Espresso $1.99
Dark Roast Coffee, Mocha, Mocha, Whip $1.49
House Blend Coffee, Soy, Mocha, Whip $1.34
Espresso, Soy (VENTI) $2.19
```

## Example 2: Text Formatting

```java
// Component
public interface Text {
    String getContent();
}

// Concrete Component
public class PlainText implements Text {
    private String content;

    public PlainText(String content) {
        this.content = content;
    }

    @Override
    public String getContent() {
        return content;
    }
}

// Abstract Decorator
public abstract class TextDecorator implements Text {
    protected Text text;

    public TextDecorator(Text text) {
        this.text = text;
    }

    @Override
    public String getContent() {
        return text.getContent();
    }
}

// Concrete Decorators
public class BoldDecorator extends TextDecorator {
    public BoldDecorator(Text text) {
        super(text);
    }

    @Override
    public String getContent() {
        return "<b>" + super.getContent() + "</b>";
    }
}

public class ItalicDecorator extends TextDecorator {
    public ItalicDecorator(Text text) {
        super(text);
    }

    @Override
    public String getContent() {
        return "<i>" + super.getContent() + "</i>";
    }
}

public class UnderlineDecorator extends TextDecorator {
    public UnderlineDecorator(Text text) {
        super(text);
    }

    @Override
    public String getContent() {
        return "<u>" + super.getContent() + "</u>";
    }
}

public class UpperCaseDecorator extends TextDecorator {
    public UpperCaseDecorator(Text text) {
        super(text);
    }

    @Override
    public String getContent() {
        return super.getContent().toUpperCase();
    }
}

// Usage
public class TextFormattingDemo {
    public static void main(String[] args) {
        // Plain text
        Text text = new PlainText("Hello World");
        System.out.println(text.getContent());

        // Bold
        text = new BoldDecorator(text);
        System.out.println(text.getContent());

        // Bold and Italic
        text = new ItalicDecorator(text);
        System.out.println(text.getContent());

        // Bold, Italic, and Underlined
        text = new UnderlineDecorator(text);
        System.out.println(text.getContent());

        // Bold, Italic, Underlined, and Uppercase
        text = new UpperCaseDecorator(text);
        System.out.println(text.getContent());
    }
}
```

### Output

```
Hello World
<b>Hello World</b>
<i><b>Hello World</b></i>
<u><i><b>Hello World</b></i></u>
<U><I><B>HELLO WORLD</B></I></U>
```

## Real-World Examples

### Java I/O Streams (Classic Decorator Example)

```java
import java.io.*;

// The Java I/O classes use the Decorator pattern extensively
public class IODecoratorExample {
    public static void main(String[] args) throws IOException {
        // Create a stack of decorators
        FileInputStream fis = new FileInputStream("test.txt");     // Component
        BufferedInputStream bis = new BufferedInputStream(fis);     // Decorator 1
        DataInputStream dis = new DataInputStream(bis);             // Decorator 2

        // Each decorator adds functionality
        int data = dis.readInt();  // DataInputStream adds ability to read primitives

        dis.close();
    }
}

// Writing with decorators
public class OutputStreamExample {
    public static void main(String[] args) throws IOException {
        FileOutputStream fos = new FileOutputStream("output.txt");
        BufferedOutputStream bos = new BufferedOutputStream(fos);
        DataOutputStream dos = new DataOutputStream(bos);

        dos.writeInt(42);
        dos.writeUTF("Hello");

        dos.close();
    }
}
```

### Custom I/O Decorator

```java
// Custom decorator to convert text to lowercase
public class LowerCaseInputStream extends FilterInputStream {
    public LowerCaseInputStream(InputStream in) {
        super(in);
    }

    @Override
    public int read() throws IOException {
        int c = super.read();
        return (c == -1 ? c : Character.toLowerCase((char) c));
    }

    @Override
    public int read(byte[] b, int offset, int len) throws IOException {
        int result = super.read(b, offset, len);
        for (int i = offset; i < offset + result; i++) {
            b[i] = (byte) Character.toLowerCase((char) b[i]);
        }
        return result;
    }
}

// Usage
public class LowerCaseInputStreamTest {
    public static void main(String[] args) throws IOException {
        InputStream in = new LowerCaseInputStream(
            new BufferedInputStream(
                new FileInputStream("test.txt")
            )
        );

        int c;
        while ((c = in.read()) >= 0) {
            System.out.print((char) c);
        }

        in.close();
    }
}
```

### Collections

```java
import java.util.*;

// Unmodifiable and Synchronized decorators
public class CollectionDecorators {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("one");
        list.add("two");

        // Decorate with unmodifiable wrapper
        List<String> unmodifiableList =
            Collections.unmodifiableList(list);

        // Decorate with synchronized wrapper
        List<String> synchronizedList =
            Collections.synchronizedList(list);
    }
}
```

## Benefits

✅ **More flexible than inheritance**
- Add/remove responsibilities dynamically
- Mix and match decorators

✅ **Follows Open/Closed Principle**
- Add new decorators without modifying existing code
- Extend functionality without changing classes

✅ **Avoids feature-laden classes**
- Simple classes with single responsibilities
- Complex behavior through composition

✅ **Runtime configuration**
- Wrap objects at runtime
- Change behavior on the fly

## Drawbacks

❌ **Many small objects**
- Can result in many small classes
- Harder to understand system

❌ **Complexity**
- Decorators can be complex to instantiate
- Long chains of decorators

❌ **Identity problems**
- Decorated object ≠ original object
- Type checking becomes difficult

❌ **Order matters**
- Order of decorators can affect behavior
- Must document proper ordering

## When to Use

✅ **Use Decorator When:**
- Need to add responsibilities to objects dynamically
- Responsibilities should be removable
- Extension by subclassing is impractical
- Want to combine multiple behaviors

❌ **Don't Use When:**
- Simple inheritance suffices
- Only one combination of features needed
- Order of decoration causes confusion

## Decorator vs. Inheritance

### Inheritance Approach (Inflexible)
```java
// Explosion of classes!
class HouseBlend extends Beverage { }
class HouseBlendWithMocha extends HouseBlend { }
class HouseBlendWithMochaAndWhip extends HouseBlendWithMocha { }
class HouseBlendWithSoy extends HouseBlend { }
class HouseBlendWithSoyAndMocha extends HouseBlendWithSoy { }
// ... hundreds of combinations!
```

### Decorator Approach (Flexible)
```java
// Compose at runtime
Beverage beverage = new HouseBlend();
beverage = new Mocha(beverage);
beverage = new Whip(beverage);
beverage = new Soy(beverage);
```

## Common Pitfalls

### 1. Breaking Type Code

```java
// Problem: Decorator changes type
Beverage espresso = new Espresso();
Beverage decorated = new Mocha(espresso);

if (decorated instanceof Espresso) {  // FALSE!
    // This won't work
}
```

### 2. Over-decoration

```java
// Too many layers makes debugging hard
Beverage beverage = new Espresso();
beverage = new Mocha(beverage);
beverage = new Whip(beverage);
beverage = new Soy(beverage);
beverage = new Mocha(beverage);
beverage = new Whip(beverage);
// Lost track of what we're wrapping!
```

### 3. Incorrect Order

```java
// Order matters for some decorators
Text text = new PlainText("hello");
text = new UpperCaseDecorator(text);
text = new BoldDecorator(text);
// Result: <b>HELLO</b>

Text text2 = new PlainText("hello");
text2 = new BoldDecorator(text2);
text2 = new UpperCaseDecorator(text2);
// Result: <B>HELLO</B> (different!)
```

## Best Practices

1. **Use builder pattern** for complex decoration
```java
public class BeverageBuilder {
    private Beverage beverage;

    public BeverageBuilder(Beverage base) {
        this.beverage = base;
    }

    public BeverageBuilder withMocha() {
        beverage = new Mocha(beverage);
        return this;
    }

    public BeverageBuilder withWhip() {
        beverage = new Whip(beverage);
        return this;
    }

    public Beverage build() {
        return beverage;
    }
}

// Usage
Beverage beverage = new BeverageBuilder(new Espresso())
    .withMocha()
    .withWhip()
    .build();
```

2. **Document decorator order** when it matters

3. **Keep decorators simple** - one responsibility per decorator

4. **Consider Factory** for creating decorated objects

## Related Patterns

- **Adapter**: Changes interface, Decorator adds responsibility
- **Composite**: Decorator adds responsibilities to single object, Composite composes tree structures
- **Strategy**: Changes algorithm, Decorator adds behavior
- **Proxy**: Controls access, Decorator adds responsibilities

## Summary

The Decorator Pattern is essential for:
- Adding responsibilities without subclassing
- Runtime behavior modification
- Following Open/Closed Principle
- Composing flexible combinations of features

**Key Takeaway:** Decorators wrap objects to add new responsibilities dynamically, using composition instead of inheritance.
