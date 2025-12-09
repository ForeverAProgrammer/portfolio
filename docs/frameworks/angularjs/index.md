---
sidebar_position: 3
---

# AngularJS

AngularJS (Angular 1.x) is the original Angular framework that pioneered two-way data binding and dependency injection in frontend development.

:::warning End of Life
AngularJS reached **End of Life on December 31, 2021**. No new features, bug fixes, or security patches are being released. This guide is for maintaining legacy applications and planning migrations.
:::

## What You'll Learn

### [Fundamentals](./fundamentals/)
Understand AngularJS core concepts and patterns.

**Topics covered:**
- Controllers and $scope
- Directives (built-in and custom)
- Services, factories, and providers
- Filters and two-way data binding
- Routing (ngRoute and UI-Router)
- Forms and validation

### [Testing](./angularjs-testing)
Test your AngularJS applications.

**Topics covered:**
- Jasmine testing framework
- Karma test runner
- Testing controllers and services
- Testing directives
- End-to-end testing

### Migration
Migrate from AngularJS to modern frameworks.

**Key considerations:**
- Migration strategies
- Upgrading to Angular (modern)
- Hybrid approach with ngUpgrade
- Rewrite considerations
- Alternative frameworks (React, Vue)

## Quick Start

```html
<!DOCTYPE html>
<html ng-app="myApp">
<head>
  <title>AngularJS App</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
</head>
<body ng-controller="MainController as vm">
  <h1>{{ vm.title }}</h1>
  <input type="text" ng-model="vm.name">
  <p>Hello, {{ vm.name }}!</p>

  <script>
    angular.module('myApp', [])
      .controller('MainController', function() {
        var vm = this;
        vm.title = 'My AngularJS App';
        vm.name = 'World';
      });
  </script>
</body>
</html>
```

## Why AngularJS Was Important

### Historical Significance
- **Pioneered Two-Way Data Binding** - Automatic UI synchronization
- **Dependency Injection** - Made testing and modularity easier
- **Declarative Templates** - HTML-based templates with directives
- **First Major SPA Framework** - Showed the way for modern frameworks
- **Massive Adoption** - Used by millions of developers

### Why It's Now Legacy
- **Performance Issues** - Digest cycle can be slow
- **Complexity** - Steep learning curve, quirky behaviors
- **Overtaken** - Modern frameworks (React, Vue, Angular) are better
- **End of Life** - No security updates or bug fixes
- **Outdated Patterns** - Modern JavaScript has better solutions

## Migration Path

If you're maintaining an AngularJS app:

1. **Assess the Application** - Size, complexity, dependencies
2. **Choose a Strategy:**
   - **Incremental Upgrade** - Use ngUpgrade to migrate component-by-component
   - **Full Rewrite** - Build a new app in modern framework
   - **Hybrid Approach** - Run AngularJS and Angular side-by-side
3. **Plan Migration** - Assess your application and choose a strategy
4. **Plan Timeline** - Migration can take months to years for large apps

## Alternatives

### Modern Angular
- Direct upgrade path with ngUpgrade
- TypeScript-first framework
- Complete rewrite, but similar concepts

### React
- Component-based like AngularJS directives
- Easier migration for smaller apps
- Huge ecosystem and community

### Vue
- Similar template syntax to AngularJS
- Easier learning curve
- Good for gradual migration

## Learning Path

1. **Review [Fundamentals](./fundamentals/)** - Understand existing codebase
2. **Learn [Testing](./angularjs-testing)** - Add tests before migrating
3. **Plan Migration** - Choose strategy and timeline
4. **Learn Modern Framework** - Angular, React, or Vue
5. **Execute Migration** - Incrementally or full rewrite

## Related Topics

- [Angular (Modern)](../angular/) - The successor to AngularJS
- [React](../react/) - Popular migration alternative
- [JavaScript Fundamentals](../../languages/javascript/fundamentals/) - Modern JavaScript
- [Testing](../../testing/) - Universal testing concepts

---

**AngularJS served us well, but it's time to move forward. Plan your migration today!**
