---
sidebar_position: 10
---

# Composite Pattern

Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly.

## Problem

You need to represent hierarchical tree structures where individual objects and groups of objects should be treated the same way.

**Common Scenarios:**
- File system hierarchies (files and folders)
- GUI component trees (containers and widgets)
- Organization structures (employees and departments)
- Menu systems (menu items and submenus)

## Design Principles Applied

1. **Single Responsibility Principle** - Components manage children
2. **Open/Closed Principle** - Add new components without changing existing code
3. **Uniform Treatment** - Client treats primitives and composites uniformly

## UML Diagram

```
┌──────────────────┐
│     Client       │
└──────────────────┘
         │
         v
┌──────────────────────┐
│     Component        │
│   <<abstract>>       │
├──────────────────────┤
│ + operation()        │
│ + add(Component)     │
│ + remove(Component)  │
│ + getChild(int)      │
└──────────────────────┘
         △
         │
    ┌────┴────┐
    │         │
┌───────────┐ ┌───────────────────┐
│   Leaf    │ │    Composite      │
├───────────┤ ├───────────────────┤
│+operation│ │ - children        │
└───────────┘ │ + operation()     │
              │ + add()           │
              │ + remove()        │
              │ + getChild()      │
              └───────────────────┘
```

## Implementation

### Example: Graphic Drawing System

### Step 1: Component Interface

```java
// Component - abstract base class
public abstract class MenuComponent {

    // Composite methods
    public void add(MenuComponent menuComponent) {
        throw new UnsupportedOperationException();
    }

    public void remove(MenuComponent menuComponent) {
        throw new UnsupportedOperationException();
    }

    public MenuComponent getChild(int i) {
        throw new UnsupportedOperationException();
    }

    // Leaf methods
    public String getName() {
        throw new UnsupportedOperationException();
    }

    public String getDescription() {
        throw new UnsupportedOperationException();
    }

    public double getPrice() {
        throw new UnsupportedOperationException();
    }

    public boolean isVegetarian() {
        throw new UnsupportedOperationException();
    }

    // Both composite and leaf
    public abstract void print();
}
```

### Step 2: Leaf Classes

```java
// Leaf - MenuItem
public class MenuItem extends MenuComponent {
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

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getDescription() {
        return description;
    }

    @Override
    public double getPrice() {
        return price;
    }

    @Override
    public boolean isVegetarian() {
        return vegetarian;
    }

    @Override
    public void print() {
        System.out.print("  " + getName());
        if (isVegetarian()) {
            System.out.print("(v)");
        }
        System.out.println(", " + getPrice());
        System.out.println("     -- " + getDescription());
    }
}
```

### Step 3: Composite Class

```java
// Composite - Menu
public class Menu extends MenuComponent {
    private List<MenuComponent> menuComponents = new ArrayList<>();
    private String name;
    private String description;

    public Menu(String name, String description) {
        this.name = name;
        this.description = description;
    }

    @Override
    public void add(MenuComponent menuComponent) {
        menuComponents.add(menuComponent);
    }

    @Override
    public void remove(MenuComponent menuComponent) {
        menuComponents.remove(menuComponent);
    }

    @Override
    public MenuComponent getChild(int i) {
        return menuComponents.get(i);
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getDescription() {
        return description;
    }

    @Override
    public void print() {
        System.out.print("\n" + getName());
        System.out.println(", " + getDescription());
        System.out.println("---------------------");

        // Iterate through menu components (recursive)
        for (MenuComponent menuComponent : menuComponents) {
            menuComponent.print();
        }
    }
}
```

### Step 4: Client Code

```java
public class Waitress {
    private MenuComponent allMenus;

    public Waitress(MenuComponent allMenus) {
        this.allMenus = allMenus;
    }

    public void printMenu() {
        allMenus.print();
    }

    public void printVegetarianMenu() {
        System.out.println("\nVEGETARIAN MENU\n----");
        printVegetarianMenu(allMenus);
    }

    private void printVegetarianMenu(MenuComponent menuComponent) {
        try {
            if (menuComponent.isVegetarian()) {
                menuComponent.print();
            }
        } catch (UnsupportedOperationException e) {
            // It's a composite, check children
        }

        try {
            for (int i = 0; i < Integer.MAX_VALUE; i++) {
                MenuComponent child = menuComponent.getChild(i);
                printVegetarianMenu(child);
            }
        } catch (UnsupportedOperationException | IndexOutOfBoundsException e) {
            // No children or end of children
        }
    }
}

public class MenuTestDrive {
    public static void main(String[] args) {
        // Create menu components
        MenuComponent pancakeHouseMenu =
            new Menu("PANCAKE HOUSE MENU", "Breakfast");
        MenuComponent dinerMenu =
            new Menu("DINER MENU", "Lunch");
        MenuComponent cafeMenu =
            new Menu("CAFE MENU", "Dinner");
        MenuComponent dessertMenu =
            new Menu("DESSERT MENU", "Dessert of course!");

        // Create top-level menu
        MenuComponent allMenus = new Menu("ALL MENUS", "All menus combined");

        // Add menus to top-level
        allMenus.add(pancakeHouseMenu);
        allMenus.add(dinerMenu);
        allMenus.add(cafeMenu);

        // Add menu items to Pancake House
        pancakeHouseMenu.add(new MenuItem(
            "K&B's Pancake Breakfast",
            "Pancakes with scrambled eggs and toast",
            true, 2.99));
        pancakeHouseMenu.add(new MenuItem(
            "Regular Pancake Breakfast",
            "Pancakes with fried eggs, sausage",
            false, 2.99));

        // Add menu items to Diner Menu
        dinerMenu.add(new MenuItem(
            "Vegetarian BLT",
            "(Fakin') Bacon with lettuce & tomato",
            true, 2.99));
        dinerMenu.add(new MenuItem(
            "BLT",
            "Bacon with lettuce & tomato",
            false, 2.99));

        // Add submenu to Diner Menu
        dinerMenu.add(dessertMenu);

        // Add menu items to Dessert Menu
        dessertMenu.add(new MenuItem(
            "Apple Pie",
            "Apple pie with a flakey crust, topped with vanilla ice cream",
            true, 1.59));

        // Add menu items to Cafe Menu
        cafeMenu.add(new MenuItem(
            "Veggie Burger and Air Fries",
            "Veggie burger on a whole wheat bun, lettuce, tomato, and fries",
            true, 3.99));
        cafeMenu.add(new MenuItem(
            "Soup of the day",
            "A cup of the soup of the day, with a side salad",
            false, 3.69));

        // Print all menus
        Waitress waitress = new Waitress(allMenus);
        waitress.printMenu();
        waitress.printVegetarianMenu();
    }
}
```

## Real-World Examples

### Example 2: File System

```java
// Component
public abstract class FileSystemComponent {
    protected String name;

    public FileSystemComponent(String name) {
        this.name = name;
    }

    public abstract void print(String indent);
    public abstract long getSize();

    public void add(FileSystemComponent component) {
        throw new UnsupportedOperationException();
    }

    public void remove(FileSystemComponent component) {
        throw new UnsupportedOperationException();
    }
}

// Leaf - File
public class File extends FileSystemComponent {
    private long size;

    public File(String name, long size) {
        super(name);
        this.size = size;
    }

    @Override
    public void print(String indent) {
        System.out.println(indent + "- " + name + " (" + size + " bytes)");
    }

    @Override
    public long getSize() {
        return size;
    }
}

// Composite - Directory
public class Directory extends FileSystemComponent {
    private List<FileSystemComponent> children = new ArrayList<>();

    public Directory(String name) {
        super(name);
    }

    @Override
    public void add(FileSystemComponent component) {
        children.add(component);
    }

    @Override
    public void remove(FileSystemComponent component) {
        children.remove(component);
    }

    @Override
    public void print(String indent) {
        System.out.println(indent + "+ " + name + "/");
        for (FileSystemComponent child : children) {
            child.print(indent + "  ");
        }
    }

    @Override
    public long getSize() {
        long totalSize = 0;
        for (FileSystemComponent child : children) {
            totalSize += child.getSize();
        }
        return totalSize;
    }
}

// Usage
Directory root = new Directory("root");
Directory home = new Directory("home");
Directory user = new Directory("user");

File file1 = new File("document.txt", 1024);
File file2 = new File("photo.jpg", 2048);
File file3 = new File("video.mp4", 10240);

root.add(home);
home.add(user);
user.add(file1);
user.add(file2);
root.add(file3);

root.print("");
System.out.println("Total size: " + root.getSize() + " bytes");

/* Output:
+ root/
  + home/
    + user/
      - document.txt (1024 bytes)
      - photo.jpg (2048 bytes)
  - video.mp4 (10240 bytes)
Total size: 13312 bytes
*/
```

### Example 3: GUI Components

```java
// Component
public abstract class UIComponent {
    protected String name;

    public UIComponent(String name) {
        this.name = name;
    }

    public abstract void render();

    public void add(UIComponent component) {
        throw new UnsupportedOperationException();
    }

    public void remove(UIComponent component) {
        throw new UnsupportedOperationException();
    }
}

// Leaf - Button
public class Button extends UIComponent {
    public Button(String name) {
        super(name);
    }

    @Override
    public void render() {
        System.out.println("Rendering button: " + name);
    }
}

// Leaf - TextBox
public class TextBox extends UIComponent {
    public TextBox(String name) {
        super(name);
    }

    @Override
    public void render() {
        System.out.println("Rendering textbox: " + name);
    }
}

// Composite - Panel
public class Panel extends UIComponent {
    private List<UIComponent> components = new ArrayList<>();

    public Panel(String name) {
        super(name);
    }

    @Override
    public void add(UIComponent component) {
        components.add(component);
    }

    @Override
    public void remove(UIComponent component) {
        components.remove(component);
    }

    @Override
    public void render() {
        System.out.println("Rendering panel: " + name);
        for (UIComponent component : components) {
            component.render();
        }
    }
}

// Usage
Panel mainPanel = new Panel("Main Panel");
Panel loginPanel = new Panel("Login Panel");

loginPanel.add(new TextBox("Username"));
loginPanel.add(new TextBox("Password"));
loginPanel.add(new Button("Login"));

mainPanel.add(loginPanel);
mainPanel.add(new Button("Exit"));

mainPanel.render();
```

## Java API Examples

### Swing/AWT

```java
// JComponent is the base component
JFrame frame = new JFrame("Composite Example");
JPanel panel = new JPanel(); // Composite

panel.add(new JButton("Button 1")); // Leaf
panel.add(new JButton("Button 2")); // Leaf
panel.add(new JTextField()); // Leaf

frame.add(panel);
```

### XML DOM

```java
Document doc = ...; // Composite
Element root = doc.createElement("root"); // Composite
Element child = doc.createElement("child"); // Composite
Text text = doc.createTextNode("Hello"); // Leaf

root.appendChild(child);
child.appendChild(text);
```

## Type Safety vs Transparency Tradeoff

### Transparent Approach (Used Above)
All methods in Component interface:

**Advantages:**
- Client treats all objects uniformly
- Transparent to client

**Disadvantages:**
- Type unsafe - leaf objects have meaningless methods
- Runtime errors possible

```java
public abstract class Component {
    public void add(Component c) {}      // Leaf throws exception
    public void remove(Component c) {}   // Leaf throws exception
    public abstract void operation();    // Both implement
}
```

### Type-Safe Approach
Only common methods in Component:

**Advantages:**
- Type safe - compile-time checking
- No UnsupportedOperationException

**Disadvantages:**
- Client must check types
- Less transparent

```java
public abstract class Component {
    public abstract void operation();
    // No add/remove in base class
}

public class Composite extends Component {
    public void add(Component c) { ... }
    public void remove(Component c) { ... }
}

// Client must check type
if (component instanceof Composite) {
    ((Composite) component).add(newComponent);
}
```

## Advantages

1. **Uniformity** - Treat primitives and composites uniformly
2. **Extensibility** - Easy to add new component types
3. **Simplicity** - Client code is simpler
4. **Flexibility** - Easy to add new operations
5. **Recursive Composition** - Build complex structures

## Disadvantages

1. **Overgeneralization** - Can make design too general
2. **Type Safety** - Difficult to restrict component types
3. **Complexity** - Can be overkill for simple hierarchies

## When to Use

✅ **Use Composite Pattern When:**
- You need to represent part-whole hierarchies
- You want clients to ignore difference between objects and compositions
- You need to work with tree structures
- Operations should work uniformly on individual and composite objects

❌ **Don't Use Composite Pattern When:**
- Hierarchy is simple and flat
- Operations differ significantly between leaf and composite
- Type safety is critical

## Related Patterns

- **Iterator** - Traverse composite structures
- **Visitor** - Perform operations on composite elements
- **Decorator** - Often used with Composite
- **Flyweight** - Share components to reduce memory
- **Chain of Responsibility** - Component hierarchy can be the chain

## Key Takeaways

1. Treat individual and composite objects uniformly
2. Organizes objects into tree structures
3. Client doesn't distinguish between leaf and composite
4. Recursive composition for complex structures
5. Trade-off between type safety and transparency
6. Common in file systems, UI frameworks, organization charts
7. Makes client code simpler but design more general

---

**The Composite Pattern allows you to compose objects into tree structures and lets clients treat individual objects and compositions uniformly!**
