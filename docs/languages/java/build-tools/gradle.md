---
sidebar_position: 1
---

# Gradle Build Tool Guide

Gradle is a powerful and flexible build automation tool used primarily for Java projects. This guide covers essential concepts including multi-project builds.

## What is Gradle?

**Gradle** is a build automation tool that:

- Compiles source code
- Manages dependencies
- Runs tests
- Packages applications
- Publishes artifacts

**Key Features:**

- Flexible and powerful
- Fast incremental builds
- 🏗️ Multi-project support
- Extensive plugin ecosystem
- Kotlin or Groovy DSL

## Installation

### Using SDKMAN (Recommended)
```bash
sdk install gradle
gradle --version
```

### Manual Installation
1. Download from [gradle.org](https://gradle.org/releases/)
2. Extract archive
3. Add `GRADLE_HOME/bin` to PATH

### Check Installation
```bash
gradle --version
```

## Basic Gradle Concepts

### Build Script
Main configuration file: `build.gradle` (Groovy) or `build.gradle.kts` (Kotlin)

### Tasks
Units of work that Gradle executes:
```bash
gradle build      # Build project
gradle test       # Run tests
gradle clean      # Clean build directory
```

### Plugins
Extend Gradle functionality:
```groovy
plugins {
    id 'java'
    id 'application'
}
```

### Dependencies
External libraries your project needs:
```groovy
dependencies {
    implementation 'com.google.guava:guava:31.1-jre'
    testImplementation 'junit:junit:4.13.2'
}
```

## Simple Java Project

### Project Structure
```
my-app/
├── build.gradle
├── settings.gradle
└── src/
    ├── main/
    │   ├── java/
    │   │   └── com/example/App.java
    │   └── resources/
    └── test/
        ├── java/
        │   └── com/example/AppTest.java
        └── resources/
```

### build.gradle
```groovy
plugins {
    id 'java'
    id 'application'
}

group = 'com.example'
version = '1.0.0'

java {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
}

repositories {
    mavenCentral()
}

dependencies {
    // Implementation dependencies
    implementation 'com.google.guava:guava:31.1-jre'
    implementation 'org.slf4j:slf4j-api:2.0.7'

    // Test dependencies
    testImplementation 'junit:junit:4.13.2'
    testImplementation 'org.mockito:mockito-core:5.3.1'
}

application {
    mainClass = 'com.example.App'
}
```

### settings.gradle
```groovy
rootProject.name = 'my-app'
```

## Common Gradle Commands

```bash
# Build project
gradle build

# Clean build directory
gradle clean

# Run tests
gradle test

# Run application
gradle run

# Clean and build
gradle clean build

# Build without tests
gradle build -x test

# View dependencies
gradle dependencies

# List all tasks
gradle tasks

# View project info
gradle projects

# Refresh dependencies
gradle build --refresh-dependencies

# Build with info logging
gradle build --info

# Build with debug output
gradle build --debug

# Continue build after failure
gradle build --continue

# Run with parallel execution
gradle build --parallel
```

## Multi-Project Builds

Multi-project builds allow you to organize large applications into smaller, modular projects.

### Project Structure
```
my-application/
├── settings.gradle
├── build.gradle
├── app/
│   ├── build.gradle
│   └── src/
├── core/
│   ├── build.gradle
│   └── src/
├── utils/
│   ├── build.gradle
│   └── src/
└── api/
    ├── build.gradle
    └── src/
```

### Root settings.gradle
```groovy
rootProject.name = 'my-application'

// Include subprojects
include 'app'
include 'core'
include 'utils'
include 'api'
```

### Root build.gradle
```groovy
// Common configuration for all projects
subprojects {
    apply plugin: 'java'

    group = 'com.example'
    version = '1.0.0'

    java {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    repositories {
        mavenCentral()
    }

    dependencies {
        // Common dependencies for all subprojects
        testImplementation 'junit:junit:4.13.2'
        testImplementation 'org.mockito:mockito-core:5.3.1'
    }
}

// Configuration for all projects (including root)
allprojects {
    repositories {
        mavenCentral()
    }
}
```

### Subproject build.gradle (app/build.gradle)
```groovy
plugins {
    id 'application'
}

dependencies {
    // Depend on other subprojects
    implementation project(':core')
    implementation project(':utils')
    implementation project(':api')

    // External dependencies
    implementation 'org.springframework.boot:spring-boot-starter-web:3.1.0'
}

application {
    mainClass = 'com.example.app.Application'
}
```

### Subproject build.gradle (core/build.gradle)
```groovy
dependencies {
    implementation project(':utils')
    implementation 'com.google.guava:guava:31.1-jre'
}
```

### Subproject build.gradle (utils/build.gradle)
```groovy
dependencies {
    implementation 'org.apache.commons:commons-lang3:3.12.0'
}
```

### Subproject build.gradle (api/build.gradle)
```groovy
dependencies {
    implementation project(':core')
    implementation 'com.fasterxml.jackson.core:jackson-databind:2.15.0'
}
```

## Multi-Project Commands

```bash
# Build all projects
gradle build

# Build specific subproject
gradle :app:build
gradle :core:test

# Run app subproject
gradle :app:run

# Build multiple specific projects
gradle :core:build :utils:build

# View all projects
gradle projects

# View dependencies of specific project
gradle :app:dependencies

# Run tests in all projects
gradle test

# Run tests in specific project
gradle :core:test

# Clean all projects
gradle clean

# Clean specific project
gradle :app:clean
```

## Dependency Configurations

```groovy
dependencies {
    // Compile-time and runtime (visible to consumers)
    api 'com.google.guava:guava:31.1-jre'

    // Compile-time and runtime (not visible to consumers)
    implementation 'org.apache.commons:commons-lang3:3.12.0'

    // Runtime only
    runtimeOnly 'mysql:mysql-connector-java:8.0.33'

    // Compile-time only
    compileOnly 'org.projectlombok:lombok:1.18.28'
    annotationProcessor 'org.projectlombok:lombok:1.18.28'

    // Test dependencies
    testImplementation 'junit:junit:4.13.2'
    testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
}
```

### Configuration Types

| Configuration | Compile | Runtime | Visible to Consumers |
|---------------|---------|---------|---------------------|
| `api` | ✓ | ✓ | ✓ |
| `implementation` | ✓ | ✓ | ✗ |
| `compileOnly` | ✓ | ✗ | ✗ |
| `runtimeOnly` | ✗ | ✓ | ✗ |
| `testImplementation` | ✓ | ✓ | ✗ (test only) |
| `testRuntimeOnly` | ✗ | ✓ | ✗ (test only) |

## Gradle Wrapper

The wrapper ensures everyone uses the same Gradle version.

### Generate Wrapper
```bash
gradle wrapper --gradle-version 8.5
```

### Files Created
```
gradle/
└── wrapper/
    ├── gradle-wrapper.jar
    └── gradle-wrapper.properties
gradlew          # Unix/Mac script
gradlew.bat      # Windows script
```

### Using Wrapper
```bash
./gradlew build      # Unix/Mac
gradlew.bat build    # Windows
```

**Always commit wrapper files to version control!**

## Custom Tasks

### Simple Task
```groovy
tasks.register('hello') {
    doLast {
        println 'Hello, Gradle!'
    }
}
```

Run: `gradle hello`

### Task with Dependencies
```groovy
tasks.register('deploy') {
    dependsOn 'build', 'test'

    doLast {
        println 'Deploying application...'
    }
}
```

### Task with Type
```groovy
tasks.register('copyDocs', Copy) {
    from 'src/docs'
    into 'build/docs'
}
```

## Gradle Properties

### gradle.properties
```properties
# Project properties
org.gradle.parallel=true
org.gradle.caching=true
org.gradle.daemon=true
org.gradle.jvmargs=-Xmx2g -XX:MaxMetaspaceSize=512m

# Custom properties
appVersion=1.0.0
```

Use in build.gradle:
```groovy
version = project.property('appVersion')
```

## Build Profiles

### Using Profiles
```groovy
def env = project.hasProperty('env') ? project.property('env') : 'dev'

if (env == 'prod') {
    // Production configuration
} else {
    // Development configuration
}
```

Run with profile:
```bash
gradle build -Penv=prod
```

## Publishing Artifacts

### Maven Publish Plugin
```groovy
plugins {
    id 'maven-publish'
}

publishing {
    publications {
        maven(MavenPublication) {
            groupId = 'com.example'
            artifactId = 'my-library'
            version = '1.0.0'

            from components.java
        }
    }

    repositories {
        maven {
            url = "file://${buildDir}/repo"
        }
    }
}
```

Publish:
```bash
gradle publish
```

## Optimization Tips

### 1. Enable Parallel Execution
```properties
# gradle.properties
org.gradle.parallel=true
```

### 2. Enable Build Cache
```properties
# gradle.properties
org.gradle.caching=true
```

### 3. Increase Heap Size
```properties
# gradle.properties
org.gradle.jvmargs=-Xmx2g -XX:MaxMetaspaceSize=512m
```

### 4. Use Gradle Daemon
```properties
# gradle.properties
org.gradle.daemon=true
```

### 5. Exclude Unused Dependencies
```groovy
configurations.all {
    exclude group: 'org.slf4j', module: 'slf4j-log4j12'
}
```

## Troubleshooting

### Clear Gradle Cache
```bash
rm -rf ~/.gradle/caches/
./gradlew build --refresh-dependencies
```

### Debug Build
```bash
./gradlew build --debug
./gradlew build --info
./gradlew build --stacktrace
```

### Daemon Issues
```bash
./gradlew --stop          # Stop daemon
./gradlew --no-daemon     # Run without daemon
```

### Dependency Conflicts
```bash
./gradlew dependencies --configuration runtimeClasspath
```

### Build Scan
```bash
./gradlew build --scan
```

## Best Practices

1. **Use Gradle Wrapper** - Ensures consistent builds
2. **Enable parallel builds** - Faster multi-project builds
3. **Use implementation over api** - Faster compilation
4. **Version catalogs** - Centralize dependency versions
5. **Minimize custom tasks** - Use plugins when possible
6. **Enable build cache** - Faster rebuilds
7. **Use specific versions** - Avoid `+` in versions
8. **Keep Gradle updated** - Get latest features and fixes
9. **Use buildSrc** - Share build logic across projects
10. **Commit gradle wrapper** - Include in version control

## Gradle vs Maven

| Feature | Gradle | Maven |
|---------|--------|-------|
| Configuration | Groovy/Kotlin DSL | XML |
| Performance | Faster (incremental builds) | Slower |
| Flexibility | Very flexible | More rigid |
| Learning Curve | Steeper | Gentler |
| Multi-project | Excellent | Good |
| IDE Support | Excellent | Excellent |

## Resources

- [Gradle Documentation](https://docs.gradle.org/)
- [Gradle Guides](https://gradle.org/guides/)
- [Gradle Plugin Portal](https://plugins.gradle.org/)
- [Gradle Build Scans](https://scans.gradle.com/)
- [Gradle Forums](https://discuss.gradle.org/)

## Quick Reference

```bash
# Initialize new project
gradle init

# Build project
./gradlew build

# Clean and build
./gradlew clean build

# Run tests
./gradlew test

# Skip tests
./gradlew build -x test

# Run specific subproject
./gradlew :subproject:build

# View dependencies
./gradlew dependencies

# Refresh dependencies
./gradlew build --refresh-dependencies

# List tasks
./gradlew tasks

# Build with profile
./gradlew build -Penv=prod

# Stop daemon
./gradlew --stop
```
