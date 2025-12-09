---
sidebar_position: 2
---

# Observer Pattern

Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

## Problem

You need to notify multiple objects when another object's state changes, without coupling them tightly together.

**Common Scenarios:**
- Event handling systems (GUI components)
- Model-View-Controller (MVC) architecture
- Real-time data feeds (stock prices, weather)
- Notification systems (social media, email)

## Design Principles Applied

1. **Strive for loosely coupled designs** - Subject and observers are loosely coupled
2. **Program to an interface** - Use Observer and Subject interfaces
3. **Open/Closed Principle** - Add new observers without modifying subject

## UML Diagram

```
┌──────────────────┐                    ┌──────────────────┐
│  <<interface>>   │                    │  <<interface>>   │
│     Subject      │                    │     Observer     │
├──────────────────┤                    ├──────────────────┤
│ + attach()       │                    │ + update()       │
│ + detach()       │                    └──────────────────┘
│ + notify()       │                             △
└──────────────────┘                             │
         △                                       │
         │                                       │
         │                                       │
┌──────────────────┐                             │
│ ConcreteSubject  │                             │
├──────────────────┤        observers            │
│ - state          │─────────────────────────────┤
│ - observers      │   1                      0..*│
├──────────────────┤                             │
│ + getState()     │                             │
│ + setState()     │                             │
│ + attach()       │              ┌──────────────┴──────────────┐
│ + detach()       │              │                             │
│ + notify()       │     ┌────────────────┐           ┌────────────────┐
└──────────────────┘     │ConcreteObserver│           │ConcreteObserver│
                         │       A        │           │       B        │
                         ├────────────────┤           ├────────────────┤
                         │ + update()     │           │ + update()     │
                         └────────────────┘           └────────────────┘
```

## Implementation

### Example 1: Weather Station

A classic example from Head First Design Patterns.

```java
// Observer interface - all observers must implement this
public interface Observer {
    void update(float temperature, float humidity, float pressure);
}

// Subject interface - manages observers
public interface Subject {
    void registerObserver(Observer o);
    void removeObserver(Observer o);
    void notifyObservers();
}

// Display interface for our weather displays
public interface DisplayElement {
    void display();
}
```

### Concrete Subject

```java
// WeatherData is the Subject that observers register with
public class WeatherData implements Subject {
    private List<Observer> observers;
    private float temperature;
    private float humidity;
    private float pressure;

    public WeatherData() {
        observers = new ArrayList<>();
    }

    @Override
    public void registerObserver(Observer o) {
        observers.add(o);
        System.out.println("Observer registered: " + o.getClass().getSimpleName());
    }

    @Override
    public void removeObserver(Observer o) {
        observers.remove(o);
        System.out.println("Observer removed: " + o.getClass().getSimpleName());
    }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(temperature, humidity, pressure);
        }
    }

    // Called when weather measurements have been updated
    public void measurementsChanged() {
        notifyObservers();
    }

    // For testing - set new measurements
    public void setMeasurements(float temperature, float humidity, float pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        measurementsChanged();
    }

    // Getters for observers that want to pull data
    public float getTemperature() { return temperature; }
    public float getHumidity() { return humidity; }
    public float getPressure() { return pressure; }
}
```

### Concrete Observers

```java
// Current Conditions Display
public class CurrentConditionsDisplay implements Observer, DisplayElement {
    private float temperature;
    private float humidity;
    private Subject weatherData;

    public CurrentConditionsDisplay(Subject weatherData) {
        this.weatherData = weatherData;
        weatherData.registerObserver(this);
    }

    @Override
    public void update(float temperature, float humidity, float pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        display();
    }

    @Override
    public void display() {
        System.out.println("Current conditions: " + temperature +
            "°F and " + humidity + "% humidity");
    }
}

// Statistics Display
public class StatisticsDisplay implements Observer, DisplayElement {
    private float maxTemp = Float.MIN_VALUE;
    private float minTemp = Float.MAX_VALUE;
    private float tempSum = 0.0f;
    private int numReadings = 0;
    private Subject weatherData;

    public StatisticsDisplay(Subject weatherData) {
        this.weatherData = weatherData;
        weatherData.registerObserver(this);
    }

    @Override
    public void update(float temperature, float humidity, float pressure) {
        tempSum += temperature;
        numReadings++;

        if (temperature > maxTemp) {
            maxTemp = temperature;
        }

        if (temperature < minTemp) {
            minTemp = temperature;
        }

        display();
    }

    @Override
    public void display() {
        System.out.println("Avg/Max/Min temperature = " +
            (tempSum / numReadings) + "/" + maxTemp + "/" + minTemp);
    }
}

// Forecast Display
public class ForecastDisplay implements Observer, DisplayElement {
    private float currentPressure = 29.92f;
    private float lastPressure;
    private Subject weatherData;

    public ForecastDisplay(Subject weatherData) {
        this.weatherData = weatherData;
        weatherData.registerObserver(this);
    }

    @Override
    public void update(float temperature, float humidity, float pressure) {
        lastPressure = currentPressure;
        currentPressure = pressure;
        display();
    }

    @Override
    public void display() {
        System.out.print("Forecast: ");
        if (currentPressure > lastPressure) {
            System.out.println("Improving weather on the way!");
        } else if (currentPressure == lastPressure) {
            System.out.println("More of the same");
        } else {
            System.out.println("Watch out for cooler, rainy weather");
        }
    }
}

// Heat Index Display
public class HeatIndexDisplay implements Observer, DisplayElement {
    private float heatIndex = 0.0f;
    private Subject weatherData;

    public HeatIndexDisplay(Subject weatherData) {
        this.weatherData = weatherData;
        weatherData.registerObserver(this);
    }

    @Override
    public void update(float t, float rh, float pressure) {
        heatIndex = computeHeatIndex(t, rh);
        display();
    }

    private float computeHeatIndex(float t, float rh) {
        return (float) ((16.923 + (0.185212 * t) + (5.37941 * rh) -
            (0.100254 * t * rh) + (0.00941695 * (t * t)) +
            (0.00728898 * (rh * rh)) + (0.000345372 * (t * t * rh)) -
            (0.000814971 * (t * rh * rh)) +
            (0.0000102102 * (t * t * rh * rh)) -
            (0.000038646 * (t * t * t)) + (0.0000291583 * (rh * rh * rh)) +
            (0.00000142721 * (t * t * t * rh)) +
            (0.000000197483 * (t * rh * rh * rh)) -
            (0.0000000218429 * (t * t * t * rh * rh)) +
            0.000000000843296 * (t * t * rh * rh * rh)) -
            (0.0000000000481975 * (t * t * t * rh * rh * rh)));
    }

    @Override
    public void display() {
        System.out.println("Heat index is " + heatIndex);
    }
}
```

### Test Code

```java
public class WeatherStation {
    public static void main(String[] args) {
        WeatherData weatherData = new WeatherData();

        // Create displays (they auto-register with weatherData)
        CurrentConditionsDisplay currentDisplay =
            new CurrentConditionsDisplay(weatherData);
        StatisticsDisplay statisticsDisplay =
            new StatisticsDisplay(weatherData);
        ForecastDisplay forecastDisplay =
            new ForecastDisplay(weatherData);
        HeatIndexDisplay heatIndexDisplay =
            new HeatIndexDisplay(weatherData);

        // Simulate new weather measurements
        System.out.println("\n=== First Reading ===");
        weatherData.setMeasurements(80, 65, 30.4f);

        System.out.println("\n=== Second Reading ===");
        weatherData.setMeasurements(82, 70, 29.2f);

        System.out.println("\n=== Third Reading ===");
        weatherData.setMeasurements(78, 90, 29.2f);
    }
}
```

### Output

```
Observer registered: CurrentConditionsDisplay
Observer registered: StatisticsDisplay
Observer registered: ForecastDisplay
Observer registered: HeatIndexDisplay

=== First Reading ===
Current conditions: 80.0°F and 65.0% humidity
Avg/Max/Min temperature = 80.0/80.0/80.0
Forecast: Improving weather on the way!
Heat index is 82.95535

=== Second Reading ===
Current conditions: 82.0°F and 70.0% humidity
Avg/Max/Min temperature = 81.0/82.0/80.0
Forecast: Watch out for cooler, rainy weather
Heat index is 86.90124

=== Third Reading ===
Current conditions: 78.0°F and 90.0% humidity
Avg/Max/Min temperature = 80.0/82.0/78.0
Forecast: More of the same
Heat index is 83.64967
```

## Example 2: Stock Market Ticker

```java
// Stock data (Subject)
public class Stock implements Subject {
    private List<Observer> observers;
    private String symbol;
    private double price;
    private double change;

    public Stock(String symbol, double initialPrice) {
        this.symbol = symbol;
        this.price = initialPrice;
        this.change = 0.0;
        this.observers = new ArrayList<>();
    }

    public void setPrice(double newPrice) {
        double oldPrice = this.price;
        this.price = newPrice;
        this.change = newPrice - oldPrice;
        notifyObservers();
    }

    public String getSymbol() { return symbol; }
    public double getPrice() { return price; }
    public double getChange() { return change; }

    @Override
    public void registerObserver(Observer o) {
        observers.add(o);
    }

    @Override
    public void removeObserver(Observer o) {
        observers.remove(o);
    }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            if (observer instanceof StockObserver) {
                ((StockObserver) observer).update(symbol, price, change);
            }
        }
    }
}

// Stock Observer interface
public interface StockObserver {
    void update(String symbol, double price, double change);
}

// Investor (Observer)
public class Investor implements StockObserver {
    private String name;
    private Map<String, Double> portfolio;

    public Investor(String name) {
        this.name = name;
        this.portfolio = new HashMap<>();
    }

    public void buyStock(Stock stock, double shares) {
        portfolio.put(stock.getSymbol(), shares);
        stock.registerObserver(this);
        System.out.println(name + " bought " + shares +
            " shares of " + stock.getSymbol());
    }

    @Override
    public void update(String symbol, double price, double change) {
        if (portfolio.containsKey(symbol)) {
            double shares = portfolio.get(symbol);
            double value = shares * price;
            double changeValue = shares * change;

            String direction = change > 0 ? "↑" : change < 0 ? "↓" : "→";

            System.out.printf("%s: %s %s $%.2f (%.2f%%) | Portfolio value: $%.2f (%+.2f)%n",
                name, symbol, direction, price,
                (change / (price - change)) * 100,
                value, changeValue);
        }
    }
}

// Stock Market Simulator
public class StockMarketSimulator {
    public static void main(String[] args) {
        // Create stocks
        Stock apple = new Stock("AAPL", 150.00);
        Stock tesla = new Stock("TSLA", 700.00);

        // Create investors
        Investor alice = new Investor("Alice");
        Investor bob = new Investor("Bob");

        // Investors buy stocks (auto-registers them as observers)
        alice.buyStock(apple, 10);
        alice.buyStock(tesla, 5);
        bob.buyStock(apple, 20);

        System.out.println("\n=== Market Update 1 ===");
        apple.setPrice(155.50);  // +3.67%

        System.out.println("\n=== Market Update 2 ===");
        tesla.setPrice(685.00);  // -2.14%

        System.out.println("\n=== Market Update 3 ===");
        apple.setPrice(152.25);  // -2.09%
    }
}
```

## Push vs. Pull

### Push Model (Used Above)
Subject pushes data to observers in the `update()` method.

```java
// Observer gets all data pushed to it
public interface Observer {
    void update(float temp, float humidity, float pressure);
}
```

**Pros:** Simple, observers get exactly what they need
**Cons:** Less flexible, must change interface if data changes

### Pull Model
Subject notifies observers, they pull data they need.

```java
// Observer pulls data from subject
public interface Observer {
    void update(Subject subject);
}

public class CurrentConditionsDisplay implements Observer {
    @Override
    public void update(Subject subject) {
        if (subject instanceof WeatherData) {
            WeatherData weatherData = (WeatherData) subject;
            this.temperature = weatherData.getTemperature();
            this.humidity = weatherData.getHumidity();
            display();
        }
    }
}
```

**Pros:** More flexible, observers choose what data to pull
**Cons:** Observers coupled to concrete Subject type

## Benefits

✅ **Loose coupling**
- Subject and observers are loosely coupled
- Subject only knows observers implement an interface

✅ **Dynamic relationships**
- Add/remove observers at runtime
- Subject doesn't need to know number of observers

✅ **Broadcast communication**
- Subject doesn't need to know who or how many observers
- All registered observers get notified

✅ **Reusability**
- Subjects and observers can be reused independently

## Drawbacks

❌ **Unexpected updates**
- Observers don't know about each other
- Can cause cascading updates

❌ **Memory leaks**
- Observers must be explicitly removed
- Forgotten observers keep references alive

❌ **Update order**
- No guarantee of notification order
- Can be problematic for dependent observers

## When to Use

✅ **Use Observer When:**
- One object changes and others need to be notified
- You want loose coupling between objects
- Number of dependents is unknown or dynamic
- Objects need to be notified without knowing who they are

❌ **Don't Use When:**
- There's only one dependent object
- Updates happen very frequently (performance concern)
- Order of notification matters critically

## Real-World Examples

### Java Built-in Observer (Deprecated in Java 9)

```java
import java.util.Observable;
import java.util.Observer;

// Using Java's built-in classes (legacy - don't use in new code)
public class WeatherData extends Observable {
    private float temperature;
    private float humidity;
    private float pressure;

    public void measurementsChanged() {
        setChanged();           // Mark as changed
        notifyObservers();      // Notify observers
    }

    public void setMeasurements(float temp, float humidity, float pressure) {
        this.temperature = temp;
        this.humidity = humidity;
        this.pressure = pressure;
        measurementsChanged();
    }

    // Getters...
}

public class CurrentConditionsDisplay implements Observer {
    @Override
    public void update(Observable obs, Object arg) {
        if (obs instanceof WeatherData) {
            WeatherData weatherData = (WeatherData) obs;
            // Pull data and display
        }
    }
}
```

### JavaBeans PropertyChangeListener

```java
import java.beans.PropertyChangeListener;
import java.beans.PropertyChangeSupport;

public class Person {
    private String name;
    private PropertyChangeSupport support;

    public Person() {
        support = new PropertyChangeSupport(this);
    }

    public void addPropertyChangeListener(PropertyChangeListener listener) {
        support.addPropertyChangeListener(listener);
    }

    public void removePropertyChangeListener(PropertyChangeListener listener) {
        support.removePropertyChangeListener(listener);
    }

    public void setName(String name) {
        String oldName = this.name;
        this.name = name;
        support.firePropertyChange("name", oldName, name);
    }
}
```

### Swing Event Listeners

```java
JButton button = new JButton("Click me");

// Observer pattern - ActionListener is the observer
button.addActionListener(new ActionListener() {
    public void actionPerformed(ActionEvent e) {
        System.out.println("Button clicked!");
    }
});

// Modern Java with lambda
button.addActionListener(e -> System.out.println("Clicked!"));
```

## Related Patterns

- **Mediator**: Centralizes communication, Observer distributes it
- **Singleton**: Often used for Subject in observer pattern
- **MVC Architecture**: Observer is fundamental to Model-View separation

## Best Practices

1. **Always remove observers** when they're no longer needed
```java
// Good - cleanup in dispose/close method
public void dispose() {
    weatherData.removeObserver(this);
}
```

2. **Use weak references** to prevent memory leaks
```java
private List<WeakReference<Observer>> observers = new ArrayList<>();
```

3. **Consider thread safety** for multi-threaded applications
```java
private final List<Observer> observers =
    Collections.synchronizedList(new ArrayList<>());
```

4. **Use Java 9+ alternatives** to deprecated Observable
```java
// Use PropertyChangeSupport, Flow API, or reactive libraries
import java.util.concurrent.Flow.*;
```

## Summary

The Observer Pattern is essential for:
- Event-driven programming
- MVC architecture
- Real-time data updates
- Loosely coupled designs

**Key Takeaway:** One-to-many dependency where subjects notify observers of state changes without tight coupling.
