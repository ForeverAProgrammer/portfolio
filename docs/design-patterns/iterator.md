---
sidebar_position: 9
---

# Iterator Pattern

Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation.

## Problem

You need to traverse a collection of objects without exposing the internal structure of the collection. Different collections may need different traversal algorithms.

**Common Scenarios:**
- Iterating through different data structures (lists, trees, graphs)
- Multiple traversal algorithms for same collection
- Providing uniform interface for different collections
- Implementing custom collection classes

## Design Principles Applied

1. **Single Responsibility Principle** - Collection and iteration are separate
2. **Encapsulation** - Hides internal structure of collection
3. **Program to an interface** - Iterator interface, not concrete implementation

## UML Diagram

```
┌───────────────────┐         ┌──────────────────────┐
│    Client         │────────>│   <<interface>>      │
└───────────────────┘         │   Aggregate          │
                              ├──────────────────────┤
                              │ + createIterator()   │
                              └──────────────────────┘
                                        △
                                        │
                              ┌──────────────────────┐
                              │  ConcreteAggregate   │
                              ├──────────────────────┤
                              │ - items[]            │
                              ├──────────────────────┤
                              │ + createIterator()   │◄───┐
                              └──────────────────────┘    │
                                                          │
       ┌──────────────────────┐                          │
       │   <<interface>>      │                          │
       │   Iterator           │                          │
       ├──────────────────────┤                          │
       │ + hasNext()          │                          │
       │ + next()             │                          │
       │ + remove()           │                          │
       └──────────────────────┘                          │
                 △                                        │
                 │                                        │
       ┌──────────────────────┐                         │
       │  ConcreteIterator    │─────────────────────────┘
       ├──────────────────────┤
       │ - aggregate          │
       │ - current            │
       ├──────────────────────┤
       │ + hasNext()          │
       │ + next()             │
       │ + remove()           │
       └──────────────────────┘
```

## Implementation

### Example: Restaurant Menu Iterator

### Step 1: Iterator Interface

```java
// Iterator interface
public interface Iterator<T> {
    boolean hasNext();
    T next();
}
```

### Step 2: Aggregate Interface

```java
// Aggregate interface
public interface Menu {
    Iterator<MenuItem> createIterator();
}
```

### Step 3: Item Class

```java
public class MenuItem {
    private String name;
    private String description;
    private boolean vegetarian;
    private double price;

    public MenuItem(String name, String description,
                    boolean vegetarian, double price) {
        this.name = name;
        this.description = description;
        this.vegetarian = vegetarian;
        this.price = price;
    }

    public String getName() { return name; }
    public String getDescription() { return description; }
    public double getPrice() { return price; }
    public boolean isVegetarian() { return vegetarian; }

    @Override
    public String toString() {
        return name + ", $" + price + "\n   " + description;
    }
}
```

### Step 4: Concrete Aggregate with Array

```java
// Pancake House Menu uses Array
public class PancakeHouseMenu implements Menu {
    private static final int MAX_ITEMS = 6;
    private int numberOfItems = 0;
    private MenuItem[] menuItems;

    public PancakeHouseMenu() {
        menuItems = new MenuItem[MAX_ITEMS];

        addItem("K&B's Pancake Breakfast",
            "Pancakes with scrambled eggs and toast", true, 2.99);
        addItem("Regular Pancake Breakfast",
            "Pancakes with fried eggs, sausage", false, 2.99);
        addItem("Blueberry Pancakes",
            "Pancakes made with fresh blueberries", true, 3.49);
        addItem("Waffles",
            "Waffles with your choice of blueberries or strawberries", true, 3.59);
    }

    public void addItem(String name, String description,
                       boolean vegetarian, double price) {
        MenuItem menuItem = new MenuItem(name, description, vegetarian, price);
        if (numberOfItems >= MAX_ITEMS) {
            System.err.println("Sorry, menu is full!");
        } else {
            menuItems[numberOfItems] = menuItem;
            numberOfItems++;
        }
    }

    @Override
    public Iterator<MenuItem> createIterator() {
        return new PancakeHouseMenuIterator(menuItems);
    }
}

// Array iterator
public class PancakeHouseMenuIterator implements Iterator<MenuItem> {
    private MenuItem[] items;
    private int position = 0;

    public PancakeHouseMenuIterator(MenuItem[] items) {
        this.items = items;
    }

    @Override
    public MenuItem next() {
        MenuItem menuItem = items[position];
        position++;
        return menuItem;
    }

    @Override
    public boolean hasNext() {
        return position < items.length && items[position] != null;
    }
}
```

### Step 5: Concrete Aggregate with ArrayList

```java
// Diner Menu uses ArrayList
public class DinerMenu implements Menu {
    private List<MenuItem> menuItems;

    public DinerMenu() {
        menuItems = new ArrayList<>();

        addItem("Vegetarian BLT",
            "(Fakin') Bacon with lettuce & tomato on whole wheat", true, 2.99);
        addItem("BLT",
            "Bacon with lettuce & tomato on whole wheat", false, 2.99);
        addItem("Soup of the day",
            "Soup of the day, with a side of potato salad", false, 3.29);
        addItem("Hotdog",
            "A hot dog, with sauerkraut, relish, onions", false, 3.05);
    }

    public void addItem(String name, String description,
                       boolean vegetarian, double price) {
        MenuItem menuItem = new MenuItem(name, description, vegetarian, price);
        menuItems.add(menuItem);
    }

    @Override
    public Iterator<MenuItem> createIterator() {
        return new DinerMenuIterator(menuItems);
    }
}

// ArrayList iterator
public class DinerMenuIterator implements Iterator<MenuItem> {
    private List<MenuItem> items;
    private int position = 0;

    public DinerMenuIterator(List<MenuItem> items) {
        this.items = items;
    }

    @Override
    public MenuItem next() {
        MenuItem menuItem = items.get(position);
        position++;
        return menuItem;
    }

    @Override
    public boolean hasNext() {
        return position < items.size();
    }
}
```

### Step 6: Client (Waitress)

```java
public class Waitress {
    private Menu pancakeHouseMenu;
    private Menu dinerMenu;

    public Waitress(Menu pancakeHouseMenu, Menu dinerMenu) {
        this.pancakeHouseMenu = pancakeHouseMenu;
        this.dinerMenu = dinerMenu;
    }

    public void printMenu() {
        Iterator<MenuItem> pancakeIterator = pancakeHouseMenu.createIterator();
        Iterator<MenuItem> dinerIterator = dinerMenu.createIterator();

        System.out.println("MENU\n----\nBREAKFAST");
        printMenu(pancakeIterator);
        System.out.println("\nLUNCH");
        printMenu(dinerIterator);
    }

    private void printMenu(Iterator<MenuItem> iterator) {
        while (iterator.hasNext()) {
            MenuItem menuItem = iterator.next();
            System.out.print(menuItem.getName() + ", ");
            System.out.print(menuItem.getPrice() + " -- ");
            System.out.println(menuItem.getDescription());
        }
    }

    public void printVegetarianMenu() {
        System.out.println("\nVEGETARIAN MENU\n---------------");
        printVegetarianMenu(pancakeHouseMenu.createIterator());
        printVegetarianMenu(dinerMenu.createIterator());
    }

    private void printVegetarianMenu(Iterator<MenuItem> iterator) {
        while (iterator.hasNext()) {
            MenuItem menuItem = iterator.next();
            if (menuItem.isVegetarian()) {
                System.out.print(menuItem.getName() + ", ");
                System.out.println(menuItem.getPrice());
            }
        }
    }
}
```

### Step 7: Test Client

```java
public class MenuTestDrive {
    public static void main(String[] args) {
        Menu pancakeHouseMenu = new PancakeHouseMenu();
        Menu dinerMenu = new DinerMenu();

        Waitress waitress = new Waitress(pancakeHouseMenu, dinerMenu);

        waitress.printMenu();
        waitress.printVegetarianMenu();
    }
}
```

## Java Iterator Interface

Java provides built-in iterator support:

```java
import java.util.Iterator;

public class DinerMenu implements Menu {
    private List<MenuItem> menuItems;

    @Override
    public Iterator<MenuItem> createIterator() {
        return menuItems.iterator(); // Use built-in iterator
    }
}
```

### Enhanced For Loop

```java
// Using Java's Iterable interface
public class DinerMenu implements Menu, Iterable<MenuItem> {
    private List<MenuItem> menuItems;

    @Override
    public Iterator<MenuItem> iterator() {
        return menuItems.iterator();
    }
}

// Client can now use enhanced for loop
DinerMenu menu = new DinerMenu();
for (MenuItem item : menu) {
    System.out.println(item);
}
```

## Real-World Examples

### Example 2: Binary Tree Iterator

```java
class TreeNode {
    int value;
    TreeNode left, right;

    TreeNode(int value) {
        this.value = value;
    }
}

public class BinaryTreeIterator implements Iterator<Integer> {
    private Stack<TreeNode> stack;

    public BinaryTreeIterator(TreeNode root) {
        stack = new Stack<>();
        pushLeft(root);
    }

    @Override
    public boolean hasNext() {
        return !stack.isEmpty();
    }

    @Override
    public Integer next() {
        TreeNode node = stack.pop();
        pushLeft(node.right);
        return node.value;
    }

    private void pushLeft(TreeNode node) {
        while (node != null) {
            stack.push(node);
            node = node.left;
        }
    }
}

// Usage
TreeNode root = new TreeNode(4);
root.left = new TreeNode(2);
root.right = new TreeNode(6);
root.left.left = new TreeNode(1);
root.left.right = new TreeNode(3);

BinaryTreeIterator iterator = new BinaryTreeIterator(root);
while (iterator.hasNext()) {
    System.out.print(iterator.next() + " ");
}
// Output: 1 2 3 4 6
```

### Example 3: Filtered Iterator

```java
public class FilterIterator<T> implements Iterator<T> {
    private Iterator<T> iterator;
    private Predicate<T> predicate;
    private T next;
    private boolean hasNext;

    public FilterIterator(Iterator<T> iterator, Predicate<T> predicate) {
        this.iterator = iterator;
        this.predicate = predicate;
        findNext();
    }

    @Override
    public boolean hasNext() {
        return hasNext;
    }

    @Override
    public T next() {
        T result = next;
        findNext();
        return result;
    }

    private void findNext() {
        hasNext = false;
        while (iterator.hasNext()) {
            next = iterator.next();
            if (predicate.test(next)) {
                hasNext = true;
                return;
            }
        }
    }
}

// Usage
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);
Iterator<Integer> evenIterator = new FilterIterator<>(
    numbers.iterator(),
    n -> n % 2 == 0
);

while (evenIterator.hasNext()) {
    System.out.println(evenIterator.next());
}
// Output: 2 4 6
```

## Internal vs External Iterators

### External Iterator (Active)
Client controls iteration:

```java
Iterator<String> iterator = list.iterator();
while (iterator.hasNext()) {
    String item = iterator.next();
    System.out.println(item);
}
```

### Internal Iterator (Passive)
Collection controls iteration:

```java
list.forEach(item -> System.out.println(item));
```

## Java Collections Framework

The Iterator pattern is fundamental to Java Collections:

```java
List<String> list = new ArrayList<>();
list.add("A");
list.add("B");
list.add("C");

// Iterator
Iterator<String> iterator = list.iterator();
while (iterator.hasNext()) {
    String item = iterator.next();
    System.out.println(item);
}

// Enhanced for loop (uses iterator internally)
for (String item : list) {
    System.out.println(item);
}

// Stream API (internal iterator)
list.stream().forEach(System.out::println);
```

## Advantages

1. **Encapsulation** - Hide internal structure of collection
2. **Single Responsibility** - Separate traversal from collection
3. **Multiple Iterators** - Multiple simultaneous traversals
4. **Uniform Interface** - Same interface for different collections
5. **Flexibility** - Different traversal algorithms

## Disadvantages

1. **Overhead** - Extra classes for simple collections
2. **Complexity** - More code than direct access
3. **Performance** - Slight overhead compared to direct iteration

## When to Use

✅ **Use Iterator Pattern When:**
- You need to access collection elements without exposing internals
- You need multiple traversal algorithms
- You want uniform interface for different collections
- You need concurrent iteration

❌ **Don't Use Iterator Pattern When:**
- Simple array with known structure
- Single traversal method is sufficient
- Performance is critical and overhead matters

## Iterator with Remove

```java
public interface Iterator<T> {
    boolean hasNext();
    T next();
    void remove(); // Optional operation
}

public class ArrayIterator<T> implements Iterator<T> {
    private T[] array;
    private int position = 0;
    private boolean canRemove = false;

    @Override
    public void remove() {
        if (!canRemove) {
            throw new IllegalStateException("next() must be called before remove()");
        }
        // Remove logic here
        canRemove = false;
    }

    @Override
    public T next() {
        T item = array[position++];
        canRemove = true;
        return item;
    }
}
```

## Related Patterns

- **Composite** - Iterators often used with Composite
- **Factory Method** - Create iterator instances
- **Memento** - Store iteration state
- **Visitor** - Iterate to apply operations

## Key Takeaways

1. Separate iteration from collection
2. Hide internal structure
3. Provide uniform traversal interface
4. Support multiple simultaneous iterations
5. Foundation of Java Collections Framework
6. External iterator = client controls
7. Internal iterator = collection controls

---

**The Iterator Pattern provides a way to access elements of a collection sequentially without exposing its underlying representation!**
