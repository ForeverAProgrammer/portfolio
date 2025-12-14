---
sidebar_position: 1
---

# Java

Java is a powerful, object-oriented programming language known for its "write once, run anywhere" capability. It's widely used for enterprise applications, Android development, and large-scale systems.

## What You'll Learn

Comprehensive Java development from fundamentals to testing and build tools.

### [Fundamentals](./fundamentals/)
Master Java best practices and modern language features.

**Topics covered:**
- Variable types and best practices
- Interface vs concrete types
- Primitives vs wrapper classes
- Modern Java features (records, pattern matching, text blocks)

### [Testing](./testing/)
Write reliable, maintainable tests for your Java applications.

**Topics covered:**
- JUnit 5 (Jupiter) testing framework
- Mocking with Mockito
- Test coverage with JaCoCo
- Parameterized and nested tests

### [Build Tools](./build-tools/)
Automate your Java build process with modern tools.

**Topics covered:**
- Gradle build automation
- Maven project management
- Dependency management
- Build optimization

## Quick Start

### Installation

```bash
# Install Java Development Kit (JDK)
# Download from: https://adoptium.net/ or https://www.oracle.com/java/

# Verify installation
java --version
javac --version
```

### Your First Java Program

```java
// Hello.java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}
```

```bash
# Compile
javac Hello.java

# Run
java Hello
```

## Why Java?

### Strengths
- **Platform Independent** - Write once, run anywhere (JVM)
- **Strongly Typed** - Catch errors at compile time
- **Robust** - Strong memory management and exception handling
- **Mature Ecosystem** - Vast libraries and frameworks
- **Enterprise Ready** - Proven in large-scale applications
- **Backward Compatible** - Old code runs on new JVMs
- **Great Tooling** - IntelliJ IDEA, Eclipse, VS Code

### Use Cases
- Enterprise applications (Spring Framework)
- Android mobile development
- Web applications (Jakarta EE, Spring Boot)
- Big data processing (Hadoop, Spark)
- Financial systems
- Scientific applications

## Learning Path

1. **Start with [Fundamentals](./fundamentals/)** - Learn Java best practices and modern features
2. **Learn [Testing](./testing/)** - Write tests with JUnit 5
3. **Master [Build Tools](./build-tools/)** - Automate with Gradle or Maven
4. **Explore Frameworks** - Spring Boot, Jakarta EE, Micronaut

## Related Topics

- [Testing Fundamentals](../../testing/fundamentals/) - Universal testing concepts
- [Design Patterns](../../design-patterns/) - Reusable software solutions
- [DevOps](../../devops/) - Build, deploy, and monitor Java applications

---

**Start your Java journey today!**
