---
sidebar_position: 3
---

# Design Patterns

Master object-oriented design patterns from the classic "Head First Design Patterns" book. Learn proven solutions to common software design problems with practical Java examples.

## What's Covered

This section provides comprehensive guides to design patterns and principles that make code more flexible, maintainable, and reusable. Each pattern includes UML diagrams, real-world examples, and Java implementations.

## Design Principles

Before diving into patterns, understand the fundamental principles that guide good object-oriented design:

### 1. Encapsulate What Varies
Identify aspects of your application that vary and separate them from what stays the same.

**Benefit:** Code changes won't ripple through your system. You can alter or extend the parts that vary without affecting those that don't.

### 2. Program to an Interface, Not an Implementation
Depend on abstractions, not concrete classes.

**Benefit:** Flexibility to change implementations at runtime and easier testing with mock objects.

### 3. Favor Composition Over Inheritance
Has-a can be better than is-a.

**Benefit:** More flexibility - you can change behavior at runtime by composing different objects.

### 4. Strive for Loosely Coupled Designs
Objects should interact with minimal knowledge of each other.

**Benefit:** Flexible systems that can handle change with minimal impact.

### 5. Classes Should Be Open for Extension but Closed for Modification
Allow behavior to be extended without modifying existing code.

**Benefit:** Existing code remains stable while new features can be added.

### 6. Depend on Abstractions, Not Concrete Classes
High-level components shouldn't depend on low-level components; both should depend on abstractions.

**Benefit:** Reduces dependencies between layers of your application.

### 7. Principle of Least Knowledge (Law of Demeter)
Talk only to your immediate friends.

**Benefit:** Reduces coupling between classes and makes code more maintainable.

### 8. The Hollywood Principle
Don't call us, we'll call you.

**Benefit:** Prevents dependency rot - high-level components control when low-level components get involved.

### 9. Single Responsibility Principle
A class should have only one reason to change.

**Benefit:** Classes are more cohesive and easier to maintain.

## Pattern Scope: Class vs Object

GoF also groups patterns by **scope** — whether they work primarily through inheritance or composition:

| Scope | Mechanism | Set at | Examples |
|-------|-----------|--------|---------|
| **Class** | Inheritance | Compile time | Factory Method, Adapter, Template Method, Interpreter |
| **Object** | Composition | Runtime | Strategy, Observer, Composite, Decorator, and all others |

See **[Class and Object Patterns](./class-and-object-patterns)** for a full breakdown with code examples.

## Pattern Categories

### Creational Patterns
Deal with object creation mechanisms.

- **[Singleton](./creational/singleton)** - Ensure a class has only one instance
- **[Factory Method](./creational/factory-method)** - Define an interface for creating objects
- **[Abstract Factory](./creational/abstract-factory)** - Create families of related objects
- **[Builder](./creational/builder)** - Separate construction of a complex object from its representation

### Behavioral Patterns
Deal with object collaboration and delegation.

- **[Strategy](./behavioral/strategy)** - Define a family of algorithms and make them interchangeable
- **[Observer](./behavioral/observer)** - Define one-to-many dependency between objects
- **[Command](./behavioral/command)** - Encapsulate a request as an object
- **[Template Method](./behavioral/template-method)** - Define skeleton of algorithm in base class
- **[Iterator](./behavioral/iterator)** - Access elements of collection sequentially
- **[State](./behavioral/state)** - Allow object to alter behavior when internal state changes
- **[Chain of Responsibility](./behavioral/chain-of-responsibility)** - Pass request along a chain of handlers until one handles it

### Structural Patterns
Deal with object composition and structure.

- **[Decorator](./structural/decorator)** - Add responsibilities to objects dynamically
- **[Adapter](./structural/adapter)** - Convert interface of class into another interface
- **[Facade](./structural/facade)** - Provide unified interface to subsystem
- **[Composite](./structural/composite)** - Compose objects into tree structures
- **[Proxy](./structural/proxy)** - Provide surrogate or placeholder for another object
- **[Bridge](./structural/bridge)** - Decouple abstraction from implementation so both can vary independently
- **[Flyweight](./structural/flyweight)** - Share fine-grained objects to reduce memory usage

## Pattern Quick Reference

| Pattern | Purpose | When to Use |
|---------|---------|-------------|
| Strategy | Encapsulate interchangeable behaviors | Multiple algorithms/behaviors for a task |
| Observer | Notify dependents of state changes | One-to-many notifications needed |
| Decorator | Add responsibilities dynamically | Extend functionality without subclassing |
| Factory Method | Defer instantiation to subclasses | Don't know exact types needed |
| Abstract Factory | Create families of related objects | Multiple product families |
| Builder | Construct complex objects step by step | Complex object with many configuration options |
| Singleton | One instance only | Exactly one instance needed |
| Command | Encapsulate requests | Parameterize, queue, or log requests |
| Adapter | Convert interfaces | Make incompatible interfaces work together |
| Facade | Simplify complex subsystems | Simple interface to complex system |
| Template Method | Defer steps to subclasses | Algorithm with varying steps |
| Iterator | Access elements sequentially | Traverse collections uniformly |
| Composite | Tree structures of objects | Part-whole hierarchies |
| State | Behavior varies with state | Object behavior depends on state |
| Proxy | Control access to objects | Add wrapper to control access |
| Bridge | Decouple abstraction from implementation | Two independent dimensions of variation |
| Chain of Responsibility | Pass request along a chain | Multiple handlers may handle a request |
| Flyweight | Share objects to reduce memory | Large numbers of similar fine-grained objects |

## How to Use This Guide

### For Beginners
1. Start with **Design Principles** above
2. Learn **Strategy Pattern** - simplest behavioral pattern
3. Study **Observer Pattern** - fundamental to event-driven programming
4. Move to **Decorator Pattern** - shows power of composition
5. Practice implementing each pattern

### For Experienced Developers
1. Use as reference for pattern implementation details
2. Review UML diagrams for architectural planning
3. Compare different patterns for solving similar problems
4. Study when NOT to use each pattern

## Getting Started

### Understanding Pattern Structure

Each pattern guide includes:

**Intent**
- What problem does it solve?
- When should you use it?

**UML Diagram**
- Visual representation of class relationships
- Shows key participants

**Implementation**
- Step-by-step code example in Java
- Best practices and variations

**Real-World Examples**
- Where the pattern is used in Java libraries
- Practical applications

**Related Patterns**
- Patterns that work well together
- Alternative solutions

## Pattern Relationships

```
Design Principles
       ↓
┌──────────────────────────────────────┐
│   Fundamental Patterns                │
│   • Strategy                          │
│   • Observer                          │
│   • Decorator                         │
└──────────────────────────────────────┘
       ↓
┌──────────────────────────────────────┐
│   Creational Patterns                 │
│   • Factory Method                    │
│   • Abstract Factory                  │
│   • Singleton                         │
└──────────────────────────────────────┘
       ↓
┌──────────────────────────────────────┐
│   Advanced Patterns                   │
│   • Command, Template Method          │
│   • Composite, State, Proxy           │
│   • Iterator, Adapter, Facade         │
└──────────────────────────────────────┘
```

## Why Learn Design Patterns?

### Code Quality
- Write more maintainable code
- Create flexible, reusable designs
- Communicate with other developers using shared vocabulary
- 🛠️ Solve common problems with proven solutions

### Career Benefits
- Essential for senior developer roles
- Foundation for software architecture
- Common topic in technical interviews
- Improve design skills systematically

### Practical Impact
- Faster development with proven solutions
- Fewer bugs through better design
- Easier to modify and extend code
- Better collaboration through shared patterns

## Best Practices

### When to Use Patterns

✅ **Do Use Patterns When:**
- You recognize the problem they solve
- They simplify your design
- They make code more flexible
- The team understands the pattern

❌ **Don't Use Patterns When:**
- Forcing them into your design
- Adding unnecessary complexity
- You don't understand the pattern
- A simpler solution exists

### Pattern Anti-Patterns

**Pattern Overload**
- Don't use patterns just to use them
- Keep It Simple, Stupid (KISS)

**Wrong Pattern**
- Using a pattern that doesn't fit the problem
- Creates more complexity than it solves

**Pattern Obsession**
- Patterns are tools, not goals
- Focus on solving problems, not using patterns

## Common Misconceptions

### "I must use design patterns everywhere"
**Reality:** Use patterns when they solve a real problem. Simple code is often better than pattern-heavy code.

### "Patterns are only for large applications"
**Reality:** Patterns scale from small to large applications. Even simple apps benefit from good design.

### "Learning all patterns is required"
**Reality:** Start with common patterns (Strategy, Observer, Decorator, Factory). Learn others as needed.

### "Patterns are language-specific"
**Reality:** Patterns are concepts that apply across languages, though implementation varies.

## Next Steps

Start your journey with these fundamental patterns:

1. **[Strategy Pattern](./behavioral/strategy)** - Learn to encapsulate algorithms
2. **[Observer Pattern](./behavioral/observer)** - Master event-driven design
3. **[Decorator Pattern](./structural/decorator)** - Extend objects dynamically
4. **[Factory Patterns](./creational/factory-method)** - Control object creation
5. **[Singleton Pattern](./creational/singleton)** - Manage single instances

## Additional Resources

### Books
- **Head First Design Patterns** (2nd Edition) - Eric Freeman & Elisabeth Robson
- **Design Patterns: Elements of Reusable Object-Oriented Software** - Gang of Four
- **Refactoring to Patterns** - Joshua Kerievsky

### Online References

- [Hillside Patterns Catalog](https://hillside.net/patterns/patterns-catalog) - Comprehensive catalog of software patterns maintained by the Hillside Group, the community behind the original pattern conferences

### Practice
- Identify patterns in existing codebases
- Refactor code to use appropriate patterns
- Implement each pattern from scratch
- Discuss patterns with your team

### Java Examples
- Study Java Collections Framework (Iterator, Composite)
- Examine Swing/AWT (Observer, Composite, Decorator)
- Review Java I/O streams (Decorator)
- Analyze Servlet API (Template Method)
