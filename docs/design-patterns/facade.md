---
sidebar_position: 8
---

# Facade Pattern

Provide a unified interface to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use.

## Problem

Complex subsystems with multiple interdependent classes are difficult to use. Clients need a simpler way to interact with the subsystem without understanding all its complexity.

**Common Scenarios:**
- Simplifying complex libraries or frameworks
- Providing a clean API to legacy code
- Wrapping third-party libraries
- Creating a simplified interface to complex systems

## Design Principles Applied

1. **Principle of Least Knowledge** - Talk only to your immediate friends
2. **Encapsulation** - Hide complex subsystem implementation
3. **Single Responsibility** - Facade provides one simplified interface

## UML Diagram

```
┌───────────┐
│  Client   │
└─────┬─────┘
      │
      ▼
┌───────────┐
│  Facade   │────────────┐
└─────┬─────┘            │
      │                  │
      ▼                  ▼
┌──────────────┐   ┌──────────────┐
│ SubsystemA   │   │ SubsystemB   │
└──────────────┘   └──────────────┘
```

## Implementation

### Example 1: Home Theater System

```java
// Complex subsystem classes
public class Amplifier {
    public void on() {
        System.out.println("Amplifier on");
    }

    public void off() {
        System.out.println("Amplifier off");
    }

    public void setVolume(int level) {
        System.out.println("Amplifier volume set to " + level);
    }
}

public class DvdPlayer {
    public void on() {
        System.out.println("DVD Player on");
    }

    public void off() {
        System.out.println("DVD Player off");
    }

    public void play(String movie) {
        System.out.println("Playing '" + movie + "'");
    }

    public void stop() {
        System.out.println("DVD Player stopped");
    }
}

public class Projector {
    public void on() {
        System.out.println("Projector on");
    }

    public void off() {
        System.out.println("Projector off");
    }

    public void wideScreenMode() {
        System.out.println("Projector in widescreen mode");
    }
}

public class Lights {
    public void dim(int level) {
        System.out.println("Lights dimmed to " + level + "%");
    }

    public void on() {
        System.out.println("Lights on");
    }
}

// Facade - Simplifies the subsystem
public class HomeTheaterFacade {
    private Amplifier amp;
    private DvdPlayer dvd;
    private Projector projector;
    private Lights lights;

    public HomeTheaterFacade(Amplifier amp, DvdPlayer dvd,
                             Projector projector, Lights lights) {
        this.amp = amp;
        this.dvd = dvd;
        this.projector = projector;
        this.lights = lights;
    }

    public void watchMovie(String movie) {
        System.out.println("Get ready to watch a movie...");
        lights.dim(10);
        projector.on();
        projector.wideScreenMode();
        amp.on();
        amp.setVolume(5);
        dvd.on();
        dvd.play(movie);
    }

    public void endMovie() {
        System.out.println("Shutting movie theater down...");
        dvd.stop();
        dvd.off();
        amp.off();
        projector.off();
        lights.on();
    }
}

// Client code - Much simpler!
public class HomeTheaterTest {
    public static void main(String[] args) {
        // Create subsystem components
        Amplifier amp = new Amplifier();
        DvdPlayer dvd = new DvdPlayer();
        Projector projector = new Projector();
        Lights lights = new Lights();

        // Create facade
        HomeTheaterFacade homeTheater =
            new HomeTheaterFacade(amp, dvd, projector, lights);

        // Simple interface
        homeTheater.watchMovie("Raiders of the Lost Ark");
        System.out.println();
        homeTheater.endMovie();
    }
}
```

## Benefits

✅ **Simplified interface** - Hide complex subsystem complexity
✅ **Decoupling** - Client code doesn't depend on subsystem classes
✅ **Easier to use** - One method call instead of many
✅ **Flexibility** - Can change subsystem without affecting clients

## Drawbacks

❌ **God object risk** - Facade can become too large
❌ **Limited functionality** - May not expose all subsystem features
❌ **Additional layer** - Adds another abstraction

## When to Use

✅ **Use Facade When:**
- You want to provide a simple interface to a complex subsystem
- There are many dependencies between clients and implementation classes
- You want to layer your subsystems

❌ **Don't Use When:**
- The subsystem is already simple
- You need access to all low-level functionality

## Summary

The Facade Pattern simplifies complex subsystems by providing a unified, easy-to-use interface.

**Key Takeaway:** Use Facade to make complex systems easier to use, not to restrict functionality.
