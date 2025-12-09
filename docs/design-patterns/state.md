---
sidebar_position: 11
---

# State Pattern

Allow an object to alter its behavior when its internal state changes. The object will appear to change its class.

## Problem

An object needs to change its behavior based on its internal state, and the state-specific behavior is complex enough that using conditional statements becomes unwieldy.

**Common Scenarios:**
- Vending machines with different states (ready, sold out, has money)
- TCP connections (established, listening, closed)
- Document workflows (draft, moderation, published)
- Game character states (running, jumping, falling)
- Order processing (pending, paid, shipped, delivered)

## Design Principles Applied

1. **Open/Closed Principle** - Add new states without modifying existing code
2. **Single Responsibility** - Each state class handles one state's behavior
3. **Encapsulate what varies** - State-specific behavior varies

## UML Diagram

```
┌──────────────────┐         ┌──────────────────────┐
│    Context       │────────>│       State          │
├──────────────────┤         │    <<interface>>     │
│ - state          │         ├──────────────────────┤
├──────────────────┤         │ + handleRequest()    │
│ + request()      │         └──────────────────────┘
│ + setState()     │                   △
└──────────────────┘                   │
                              ┌────────┴────────┐
                              │                 │
                     ┌────────────────┐  ┌────────────────┐
                     │  ConcreteStateA│  │  ConcreteStateB│
                     ├────────────────┤  ├────────────────┤
                     │+ handleRequest()│ │+ handleRequest()│
                     └────────────────┘  └────────────────┘
```

## Implementation

### Example: Gumball Machine

### Step 1: State Interface

```java
// State interface
public interface State {
    void insertQuarter();
    void ejectQuarter();
    void turnCrank();
    void dispense();
}
```

### Step 2: Context Class

```java
// Context - Gumball Machine
public class GumballMachine {
    private State soldOutState;
    private State noQuarterState;
    private State hasQuarterState;
    private State soldState;
    private State winnerState;

    private State state;
    private int count = 0;

    public GumballMachine(int numberGumballs) {
        soldOutState = new SoldOutState(this);
        noQuarterState = new NoQuarterState(this);
        hasQuarterState = new HasQuarterState(this);
        soldState = new SoldState(this);
        winnerState = new WinnerState(this);

        this.count = numberGumballs;
        if (numberGumballs > 0) {
            state = noQuarterState;
        } else {
            state = soldOutState;
        }
    }

    public void insertQuarter() {
        state.insertQuarter();
    }

    public void ejectQuarter() {
        state.ejectQuarter();
    }

    public void turnCrank() {
        state.turnCrank();
        state.dispense();
    }

    void setState(State state) {
        this.state = state;
    }

    void releaseBall() {
        System.out.println("A gumball comes rolling out the slot...");
        if (count > 0) {
            count--;
        }
    }

    int getCount() {
        return count;
    }

    public State getState() {
        return state;
    }

    public State getSoldOutState() { return soldOutState; }
    public State getNoQuarterState() { return noQuarterState; }
    public State getHasQuarterState() { return hasQuarterState; }
    public State getSoldState() { return soldState; }
    public State getWinnerState() { return winnerState; }

    @Override
    public String toString() {
        return "\nMighty Gumball, Inc.\n" +
               "Java-enabled Standing Gumball Model #2004\n" +
               "Inventory: " + count + " gumball" +
               (count != 1 ? "s" : "") + "\n" +
               "Machine is " + state.getClass().getSimpleName() + "\n";
    }
}
```

### Step 3: Concrete State Classes

```java
// State: No Quarter
public class NoQuarterState implements State {
    private GumballMachine gumballMachine;

    public NoQuarterState(GumballMachine gumballMachine) {
        this.gumballMachine = gumballMachine;
    }

    @Override
    public void insertQuarter() {
        System.out.println("You inserted a quarter");
        gumballMachine.setState(gumballMachine.getHasQuarterState());
    }

    @Override
    public void ejectQuarter() {
        System.out.println("You haven't inserted a quarter");
    }

    @Override
    public void turnCrank() {
        System.out.println("You turned, but there's no quarter");
    }

    @Override
    public void dispense() {
        System.out.println("You need to pay first");
    }
}

// State: Has Quarter
public class HasQuarterState implements State {
    private Random randomWinner = new Random(System.currentTimeMillis());
    private GumballMachine gumballMachine;

    public HasQuarterState(GumballMachine gumballMachine) {
        this.gumballMachine = gumballMachine;
    }

    @Override
    public void insertQuarter() {
        System.out.println("You can't insert another quarter");
    }

    @Override
    public void ejectQuarter() {
        System.out.println("Quarter returned");
        gumballMachine.setState(gumballMachine.getNoQuarterState());
    }

    @Override
    public void turnCrank() {
        System.out.println("You turned...");
        int winner = randomWinner.nextInt(10);
        if ((winner == 0) && (gumballMachine.getCount() > 1)) {
            gumballMachine.setState(gumballMachine.getWinnerState());
        } else {
            gumballMachine.setState(gumballMachine.getSoldState());
        }
    }

    @Override
    public void dispense() {
        System.out.println("No gumball dispensed");
    }
}

// State: Sold
public class SoldState implements State {
    private GumballMachine gumballMachine;

    public SoldState(GumballMachine gumballMachine) {
        this.gumballMachine = gumballMachine;
    }

    @Override
    public void insertQuarter() {
        System.out.println("Please wait, we're already giving you a gumball");
    }

    @Override
    public void ejectQuarter() {
        System.out.println("Sorry, you already turned the crank");
    }

    @Override
    public void turnCrank() {
        System.out.println("Turning twice doesn't get you another gumball!");
    }

    @Override
    public void dispense() {
        gumballMachine.releaseBall();
        if (gumballMachine.getCount() > 0) {
            gumballMachine.setState(gumballMachine.getNoQuarterState());
        } else {
            System.out.println("Oops, out of gumballs!");
            gumballMachine.setState(gumballMachine.getSoldOutState());
        }
    }
}

// State: Winner (gets 2 gumballs)
public class WinnerState implements State {
    private GumballMachine gumballMachine;

    public WinnerState(GumballMachine gumballMachine) {
        this.gumballMachine = gumballMachine;
    }

    @Override
    public void insertQuarter() {
        System.out.println("Please wait, we're already giving you a gumball");
    }

    @Override
    public void ejectQuarter() {
        System.out.println("Sorry, you already turned the crank");
    }

    @Override
    public void turnCrank() {
        System.out.println("Turning twice doesn't get you another gumball!");
    }

    @Override
    public void dispense() {
        System.out.println("YOU'RE A WINNER! You get two gumballs for your quarter");
        gumballMachine.releaseBall();
        if (gumballMachine.getCount() == 0) {
            gumballMachine.setState(gumballMachine.getSoldOutState());
        } else {
            gumballMachine.releaseBall();
            if (gumballMachine.getCount() > 0) {
                gumballMachine.setState(gumballMachine.getNoQuarterState());
            } else {
                System.out.println("Oops, out of gumballs!");
                gumballMachine.setState(gumballMachine.getSoldOutState());
            }
        }
    }
}

// State: Sold Out
public class SoldOutState implements State {
    private GumballMachine gumballMachine;

    public SoldOutState(GumballMachine gumballMachine) {
        this.gumballMachine = gumballMachine;
    }

    @Override
    public void insertQuarter() {
        System.out.println("You can't insert a quarter, the machine is sold out");
    }

    @Override
    public void ejectQuarter() {
        System.out.println("You can't eject, you haven't inserted a quarter yet");
    }

    @Override
    public void turnCrank() {
        System.out.println("You turned, but there are no gumballs");
    }

    @Override
    public void dispense() {
        System.out.println("No gumball dispensed");
    }
}
```

### Step 4: Client Code

```java
public class GumballMachineTestDrive {
    public static void main(String[] args) {
        GumballMachine gumballMachine = new GumballMachine(5);

        System.out.println(gumballMachine);

        gumballMachine.insertQuarter();
        gumballMachine.turnCrank();

        System.out.println(gumballMachine);

        gumballMachine.insertQuarter();
        gumballMachine.turnCrank();
        gumballMachine.insertQuarter();
        gumballMachine.turnCrank();

        System.out.println(gumballMachine);
    }
}
```

**Output:**
```
Mighty Gumball, Inc.
Java-enabled Standing Gumball Model #2004
Inventory: 5 gumballs
Machine is NoQuarterState

You inserted a quarter
You turned...
A gumball comes rolling out the slot...

Mighty Gumball, Inc.
Java-enabled Standing Gumball Model #2004
Inventory: 4 gumballs
Machine is NoQuarterState

You inserted a quarter
You turned...
A gumball comes rolling out the slot...
You inserted a quarter
You turned...
YOU'RE A WINNER! You get two gumballs for your quarter
A gumball comes rolling out the slot...
A gumball comes rolling out the slot...

Mighty Gumball, Inc.
Java-enabled Standing Gumball Model #2004
Inventory: 1 gumball
Machine is NoQuarterState
```

## Real-World Examples

### Example 2: TCP Connection

```java
// State interface
public interface TCPState {
    void open(TCPConnection connection);
    void close(TCPConnection connection);
    void acknowledge(TCPConnection connection);
}

// Context
public class TCPConnection {
    private TCPState state;
    private TCPState closedState;
    private TCPState listenState;
    private TCPState establishedState;

    public TCPConnection() {
        closedState = new TCPClosed();
        listenState = new TCPListen();
        establishedState = new TCPEstablished();

        state = closedState;
    }

    public void open() {
        state.open(this);
    }

    public void close() {
        state.close(this);
    }

    public void acknowledge() {
        state.acknowledge(this);
    }

    public void setState(TCPState state) {
        System.out.println("State changed to: " + state.getClass().getSimpleName());
        this.state = state;
    }

    public TCPState getClosedState() { return closedState; }
    public TCPState getListenState() { return listenState; }
    public TCPState getEstablishedState() { return establishedState; }
}

// States
public class TCPClosed implements TCPState {
    @Override
    public void open(TCPConnection connection) {
        System.out.println("Opening connection...");
        connection.setState(connection.getListenState());
    }

    @Override
    public void close(TCPConnection connection) {
        System.out.println("Connection already closed");
    }

    @Override
    public void acknowledge(TCPConnection connection) {
        System.out.println("Cannot acknowledge - connection closed");
    }
}

public class TCPListen implements TCPState {
    @Override
    public void open(TCPConnection connection) {
        System.out.println("Connection already opening");
    }

    @Override
    public void close(TCPConnection connection) {
        System.out.println("Closing connection...");
        connection.setState(connection.getClosedState());
    }

    @Override
    public void acknowledge(TCPConnection connection) {
        System.out.println("Connection established!");
        connection.setState(connection.getEstablishedState());
    }
}

public class TCPEstablished implements TCPState {
    @Override
    public void open(TCPConnection connection) {
        System.out.println("Connection already established");
    }

    @Override
    public void close(TCPConnection connection) {
        System.out.println("Closing established connection...");
        connection.setState(connection.getClosedState());
    }

    @Override
    public void acknowledge(TCPConnection connection) {
        System.out.println("Data acknowledged");
    }
}
```

### Example 3: Document Workflow

```java
public interface DocumentState {
    void publish(Document doc);
    void moderate(Document doc);
    void reject(Document doc);
}

public class Document {
    private DocumentState state;
    private String content;

    public Document(String content) {
        this.content = content;
        this.state = new DraftState();
    }

    public void setState(DocumentState state) {
        this.state = state;
    }

    public void publish() {
        state.publish(this);
    }

    public void moderate() {
        state.moderate(this);
    }

    public void reject() {
        state.reject(this);
    }
}

class DraftState implements DocumentState {
    @Override
    public void publish(Document doc) {
        System.out.println("Draft submitted for moderation");
        doc.setState(new ModerationState());
    }

    @Override
    public void moderate(Document doc) {
        System.out.println("Cannot moderate draft directly");
    }

    @Override
    public void reject(Document doc) {
        System.out.println("Deleting draft");
    }
}

class ModerationState implements DocumentState {
    @Override
    public void publish(Document doc) {
        System.out.println("Document published!");
        doc.setState(new PublishedState());
    }

    @Override
    public void moderate(Document doc) {
        System.out.println("Already in moderation");
    }

    @Override
    public void reject(Document doc) {
        System.out.println("Sending back to draft");
        doc.setState(new DraftState());
    }
}

class PublishedState implements DocumentState {
    @Override
    public void publish(Document doc) {
        System.out.println("Already published");
    }

    @Override
    public void moderate(Document doc) {
        System.out.println("Cannot moderate published document");
    }

    @Override
    public void reject(Document doc) {
        System.out.println("Unpublishing document");
        doc.setState(new DraftState());
    }
}
```

## State vs Strategy Pattern

| Aspect | State | Strategy |
|--------|-------|----------|
| **Intent** | Alter behavior based on state | Select algorithm |
| **State Changes** | State changes itself | Client changes strategy |
| **Awareness** | States know about each other | Strategies independent |
| **Focus** | State transitions | Algorithm selection |

## Advantages

1. **Organize Code** - State-specific behavior in separate classes
2. **Single Responsibility** - Each state class has one job
3. **Open/Closed** - Add new states without changing existing code
4. **Eliminate Conditionals** - No complex if/switch statements
5. **State Transitions** - Explicit state transition logic

## Disadvantages

1. **Many Classes** - Each state requires a class
2. **State Dependencies** - States may need to know about each other
3. **Overhead** - Simple state machines may not need this pattern

## When to Use

✅ **Use State Pattern When:**
- Object behavior changes based on state
- State-specific code is complex
- State transitions are well-defined
- Many conditional statements based on state

❌ **Don't Use State Pattern When:**
- Few simple states
- State logic is trivial
- States don't change at runtime

## Related Patterns

- **Strategy** - Similar structure, different intent
- **Flyweight** - Share state objects
- **Singleton** - State objects often singletons

## Key Takeaways

1. Encapsulates state-specific behavior
2. State transitions are explicit
3. Eliminates complex conditionals
4. Each state is a separate class
5. States can trigger transitions
6. Context delegates to state objects
7. Localizes state-specific behavior

---

**The State Pattern allows an object to alter its behavior when its internal state changes, appearing to change its class!**
