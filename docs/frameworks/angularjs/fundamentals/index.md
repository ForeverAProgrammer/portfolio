---
sidebar_position: 3
---

# AngularJS Fundamentals

The original Angular framework (version 1.x) for building dynamic web applications, now in long-term support mode.

## What is AngularJS?

AngularJS is the **original Angular framework** (version 1.x), released in 2010 by Google. It revolutionized front-end development with features like two-way data binding, dependency injection, and directives. While it's now in Long Term Support (LTS) until December 31, 2021 and officially ended support, many legacy applications still use it.

**Important**: This is AngularJS (1.x), **not** Angular (2+). They are fundamentally different frameworks.

### Key Characteristics

- **MVC/MVVM Pattern**: Model-View-Controller/Model-View-ViewModel architecture
- **Two-Way Data Binding**: Automatic sync between model and view
- **Dependency Injection**: Built-in DI system
- **Directives**: Extend HTML with custom attributes and elements
- **$scope**: Data sharing between controller and view
- **Digest Cycle**: Change detection mechanism
- **Plain JavaScript**: Works with ES5 (no build step required)

## Quick Start

### Installation

**Option 1: CDN** (Simplest for getting started):
```html
<!DOCTYPE html>
<html ng-app="myApp">
<head>
  <title>AngularJS App</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular.min.js"></script>
</head>
<body ng-controller="MainController">
  <h1>{{ title }}</h1>
  <p>Count: {{ count }}</p>
  <button ng-click="increment()">Increment</button>

  <script>
    angular.module('myApp', [])
      .controller('MainController', function($scope) {
        $scope.title = 'Hello AngularJS!';
        $scope.count = 0;

        $scope.increment = function() {
          $scope.count++;
        };
      });
  </script>
</body>
</html>
```

**Option 2: npm** (For build tools):
```bash
npm install angular@1.8.3
```

**Option 3: Bower** (Legacy):
```bash
bower install angular
```

### Basic Project Structure

```
my-app/
├── app/
│   ├── app.module.js              # Main module
│   ├── app.config.js              # Configuration
│   ├── app.routes.js              # Routing
│   ├── controllers/
│   │   ├── main.controller.js
│   │   └── user.controller.js
│   ├── services/
│   │   └── user.service.js
│   ├── directives/
│   │   └── user-card.directive.js
│   ├── filters/
│   │   └── capitalize.filter.js
│   └── views/
│       ├── main.html
│       └── users.html
├── assets/
│   ├── css/
│   └── images/
├── index.html
└── bower.json / package.json
```

### Your First AngularJS App

**index.html**:
```html
<!DOCTYPE html>
<html ng-app="myApp">
<head>
  <title>My First AngularJS App</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular.min.js"></script>
  <script src="app.js"></script>
</head>
<body>
  <div ng-controller="MainController">
    <h1>{{ greeting }}</h1>

    <input type="text" ng-model="name" placeholder="Enter your name">
    <p>Hello, {{ name || 'stranger' }}!</p>

    <p>Count: {{ count }}</p>
    <button ng-click="increment()">+</button>
    <button ng-click="decrement()">-</button>
    <button ng-click="reset()">Reset</button>
  </div>
</body>
</html>
```

**app.js**:
```javascript
// Create module
angular.module('myApp', []);

// Create controller
angular.module('myApp')
  .controller('MainController', function($scope) {
    $scope.greeting = 'Welcome to AngularJS!';
    $scope.name = '';
    $scope.count = 0;

    $scope.increment = function() {
      $scope.count++;
    };

    $scope.decrement = function() {
      $scope.count--;
    };

    $scope.reset = function() {
      $scope.count = 0;
    };
  });
```

## Core Concepts

### 1. Modules

Modules are containers for different parts of your application.

```javascript
// Create a module with dependencies
angular.module('myApp', ['ngRoute', 'ngResource']);

// Get existing module (note: no second parameter)
angular.module('myApp')
  .controller('MainController', function($scope) {
    // Controller code
  });

// Multiple modules
angular.module('myApp.controllers', []);
angular.module('myApp.services', []);
angular.module('myApp.directives', []);

angular.module('myApp', [
  'myApp.controllers',
  'myApp.services',
  'myApp.directives'
]);
```

### 2. Controllers

Controllers handle business logic and bind data to the view.

**Using $scope** (Classic approach):
```javascript
angular.module('myApp')
  .controller('UserController', function($scope, UserService) {
    $scope.users = [];
    $scope.loading = false;

    $scope.loadUsers = function() {
      $scope.loading = true;

      UserService.getUsers().then(function(users) {
        $scope.users = users;
        $scope.loading = false;
      });
    };

    $scope.deleteUser = function(userId) {
      UserService.deleteUser(userId).then(function() {
        $scope.users = $scope.users.filter(function(user) {
          return user.id !== userId;
        });
      });
    };

    // Initialize
    $scope.loadUsers();
  });
```

**Controller As** (Recommended approach):
```javascript
angular.module('myApp')
  .controller('UserController', function(UserService) {
    var vm = this;

    vm.users = [];
    vm.loading = false;

    vm.loadUsers = function() {
      vm.loading = true;

      UserService.getUsers().then(function(users) {
        vm.users = users;
        vm.loading = false;
      });
    };

    vm.deleteUser = function(userId) {
      UserService.deleteUser(userId).then(function() {
        vm.users = vm.users.filter(function(user) {
          return user.id !== userId;
        });
      });
    };

    // Initialize
    vm.loadUsers();
  });
```

**HTML with Controller As**:
```html
<div ng-controller="UserController as vm">
  <div ng-if="vm.loading">Loading...</div>

  <ul ng-if="!vm.loading">
    <li ng-repeat="user in vm.users">
      {{ user.name }} - {{ user.email }}
      <button ng-click="vm.deleteUser(user.id)">Delete</button>
    </li>
  </ul>
</div>
```

### 3. Data Binding

**Interpolation**:
```html
<h1>{{ title }}</h1>
<p>{{ 1 + 1 }}</p>
<p>{{ user.name }}</p>
<p>{{ getFullName() }}</p>
```

**ng-bind** (Alternative to interpolation):
```html
<p ng-bind="title"></p>
```

**Two-Way Binding with ng-model**:
```html
<input type="text" ng-model="user.name">
<p>Hello, {{ user.name }}!</p>

<!-- Changes in input automatically update the view and vice versa -->
```

**Property Binding**:
```html
<img ng-src="{{ user.avatar }}">
<a ng-href="{{ user.profileUrl }}">Profile</a>
<div ng-class="{ active: isActive, disabled: isDisabled }"></div>
<div ng-style="{ color: textColor, fontSize: fontSize + 'px' }"></div>
```

### 4. Directives

Directives extend HTML with custom behavior.

**Built-in Directives**:

```html
<!-- ng-repeat: Loop through arrays -->
<ul>
  <li ng-repeat="user in users">{{ user.name }}</li>
</ul>

<!-- With index and other variables -->
<div ng-repeat="item in items track by item.id">
  {{ $index }}: {{ item.name }}
  (First: {{ $first }}, Last: {{ $last }})
</div>

<!-- ng-if: Conditional rendering (removes from DOM) -->
<div ng-if="isLoggedIn">Welcome back!</div>
<div ng-if="!isLoggedIn">Please log in</div>

<!-- ng-show/ng-hide: Conditional display (CSS display) -->
<div ng-show="isVisible">Visible content</div>
<div ng-hide="isHidden">Hidden content</div>

<!-- ng-click: Click events -->
<button ng-click="handleClick()">Click me</button>
<button ng-click="count = count + 1">Increment</button>

<!-- ng-submit: Form submission -->
<form ng-submit="submitForm()">
  <input type="text" ng-model="formData.name">
  <button type="submit">Submit</button>
</form>

<!-- ng-change: Input change -->
<input ng-model="searchText" ng-change="handleSearch()">

<!-- ng-class: Dynamic classes -->
<div ng-class="{ active: isActive, error: hasError }"></div>
<div ng-class="getClasses()"></div>

<!-- ng-style: Dynamic styles -->
<div ng-style="{ color: textColor, 'font-size': fontSize + 'px' }"></div>

<!-- ng-disabled: Disable elements -->
<button ng-disabled="isProcessing">Submit</button>

<!-- ng-readonly: Read-only inputs -->
<input ng-readonly="isReadOnly" ng-model="data">

<!-- ng-switch: Multiple conditions -->
<div ng-switch="status">
  <p ng-switch-when="loading">Loading...</p>
  <p ng-switch-when="success">Success!</p>
  <p ng-switch-when="error">Error occurred</p>
  <p ng-switch-default>Unknown status</p>
</div>

<!-- ng-include: Include templates -->
<div ng-include="'views/header.html'"></div>
```

**Custom Directives**:

```javascript
// Simple directive
angular.module('myApp')
  .directive('highlight', function() {
    return {
      restrict: 'A',  // A = Attribute, E = Element, C = Class
      link: function(scope, element, attrs) {
        var color = attrs.highlight || 'yellow';
        element.css('background-color', color);
      }
    };
  });
```

```html
<p highlight>This will be highlighted</p>
<p highlight="lightblue">This will be light blue</p>
```

**Directive with Template**:
```javascript
angular.module('myApp')
  .directive('userCard', function() {
    return {
      restrict: 'E',
      scope: {
        user: '=',
        onDelete: '&'
      },
      template: [
        '<div class="user-card">',
        '  <h3>{{ user.name }}</h3>',
        '  <p>{{ user.email }}</p>',
        '  <button ng-click="deleteUser()">Delete</button>',
        '</div>'
      ].join(''),
      link: function(scope) {
        scope.deleteUser = function() {
          scope.onDelete({ userId: scope.user.id });
        };
      }
    };
  });
```

```html
<user-card user="currentUser" on-delete="handleDelete(userId)"></user-card>
```

**Directive with Controller**:
```javascript
angular.module('myApp')
  .directive('counter', function() {
    return {
      restrict: 'E',
      scope: {},
      template: [
        '<div class="counter">',
        '  <p>Count: {{ count }}</p>',
        '  <button ng-click="increment()">+</button>',
        '  <button ng-click="decrement()">-</button>',
        '  <button ng-click="reset()">Reset</button>',
        '</div>'
      ].join(''),
      controller: function($scope) {
        $scope.count = 0;

        $scope.increment = function() {
          $scope.count++;
        };

        $scope.decrement = function() {
          $scope.count--;
        };

        $scope.reset = function() {
          $scope.count = 0;
        };
      }
    };
  });
```

### 5. Services

Services are singleton objects used to organize and share code across your app.

**Factory** (Most common):
```javascript
angular.module('myApp')
  .factory('UserService', function($http) {
    var apiUrl = 'https://api.example.com/users';

    return {
      getUsers: function() {
        return $http.get(apiUrl).then(function(response) {
          return response.data;
        });
      },

      getUserById: function(id) {
        return $http.get(apiUrl + '/' + id).then(function(response) {
          return response.data;
        });
      },

      createUser: function(user) {
        return $http.post(apiUrl, user).then(function(response) {
          return response.data;
        });
      },

      updateUser: function(id, user) {
        return $http.patch(apiUrl + '/' + id, user).then(function(response) {
          return response.data;
        });
      },

      deleteUser: function(id) {
        return $http.delete(apiUrl + '/' + id);
      }
    };
  });
```

**Service** (Constructor function):
```javascript
angular.module('myApp')
  .service('CalculatorService', function() {
    this.add = function(a, b) {
      return a + b;
    };

    this.subtract = function(a, b) {
      return a - b;
    };

    this.multiply = function(a, b) {
      return a * b;
    };

    this.divide = function(a, b) {
      if (b === 0) {
        throw new Error('Cannot divide by zero');
      }
      return a / b;
    };
  });
```

**Provider** (Configurable service):
```javascript
angular.module('myApp')
  .provider('AppConfig', function() {
    var apiUrl = 'https://api.example.com';
    var apiKey = '';

    this.setApiUrl = function(url) {
      apiUrl = url;
    };

    this.setApiKey = function(key) {
      apiKey = key;
    };

    this.$get = function() {
      return {
        getApiUrl: function() {
          return apiUrl;
        },
        getApiKey: function() {
          return apiKey;
        },
        getFullUrl: function(endpoint) {
          return apiUrl + endpoint;
        }
      };
    };
  });

// Configure during config phase
angular.module('myApp')
  .config(function(AppConfigProvider) {
    AppConfigProvider.setApiUrl('https://test-api.example.com');
    AppConfigProvider.setApiKey('test-key-123');
  });
```

**Using Services**:
```javascript
angular.module('myApp')
  .controller('UserController', function($scope, UserService) {
    $scope.users = [];

    UserService.getUsers().then(function(users) {
      $scope.users = users;
    });

    $scope.deleteUser = function(id) {
      UserService.deleteUser(id).then(function() {
        $scope.users = $scope.users.filter(function(user) {
          return user.id !== id;
        });
      });
    };
  });
```

### 6. Filters

Filters transform data in templates or controllers.

**Built-in Filters**:
```html
<!-- currency -->
<p>{{ price | currency }}</p>
<p>{{ price | currency:'€' }}</p>

<!-- date -->
<p>{{ today | date }}</p>
<p>{{ today | date:'yyyy-MM-dd' }}</p>
<p>{{ today | date:'fullDate' }}</p>

<!-- uppercase / lowercase -->
<p>{{ name | uppercase }}</p>
<p>{{ name | lowercase }}</p>

<!-- number -->
<p>{{ number | number:2 }}</p>

<!-- limitTo -->
<p>{{ text | limitTo:100 }}</p>
<ul>
  <li ng-repeat="item in items | limitTo:5">{{ item }}</li>
</ul>

<!-- orderBy -->
<ul>
  <li ng-repeat="user in users | orderBy:'name'">{{ user.name }}</li>
  <li ng-repeat="user in users | orderBy:'-age'">{{ user.name }}</li>
</ul>

<!-- filter (search) -->
<input ng-model="searchText">
<ul>
  <li ng-repeat="user in users | filter:searchText">{{ user.name }}</li>
</ul>

<!-- json (for debugging) -->
<pre>{{ user | json }}</pre>

<!-- Chain filters -->
<p>{{ price | currency | uppercase }}</p>
```

**Custom Filters**:
```javascript
angular.module('myApp')
  .filter('capitalize', function() {
    return function(input) {
      if (!input) return '';
      return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
    };
  });
```

```html
<p>{{ 'hello world' | capitalize }}</p>
<!-- Output: Hello world -->
```

**Filter with Parameters**:
```javascript
angular.module('myApp')
  .filter('truncate', function() {
    return function(input, limit, trail) {
      limit = limit || 50;
      trail = trail || '...';

      if (!input) return '';
      if (input.length <= limit) return input;

      return input.substring(0, limit) + trail;
    };
  });
```

```html
<p>{{ longText | truncate:100 }}</p>
<p>{{ longText | truncate:50:'---' }}</p>
```

### 7. Routing

**Using ngRoute**:

```html
<!-- Include ngRoute -->
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular-route.min.js"></script>
```

```javascript
// Add ngRoute dependency
angular.module('myApp', ['ngRoute']);

// Configure routes
angular.module('myApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutController'
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UserListController'
      })
      .when('/users/:id', {
        templateUrl: 'views/user-detail.html',
        controller: 'UserDetailController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
```

**HTML with routing**:
```html
<nav>
  <a href="#/">Home</a>
  <a href="#/about">About</a>
  <a href="#/users">Users</a>
</nav>

<div ng-view></div>
```

**Access Route Parameters**:
```javascript
angular.module('myApp')
  .controller('UserDetailController', function($scope, $routeParams, UserService) {
    var userId = $routeParams.id;

    UserService.getUserById(userId).then(function(user) {
      $scope.user = user;
    });
  });
```

**Using UI-Router** (More powerful alternative):

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/1.0.30/angular-ui-router.min.js"></script>
```

```javascript
angular.module('myApp', ['ui.router']);

angular.module('myApp')
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      })
      .state('users', {
        url: '/users',
        templateUrl: 'views/users.html',
        controller: 'UserListController'
      })
      .state('userDetail', {
        url: '/users/:id',
        templateUrl: 'views/user-detail.html',
        controller: 'UserDetailController'
      });
  });
```

### 8. HTTP Requests

**Using $http**:
```javascript
angular.module('myApp')
  .controller('DataController', function($scope, $http) {

    // GET request
    $http.get('https://api.example.com/users')
      .then(function(response) {
        $scope.users = response.data;
      })
      .catch(function(error) {
        console.error('Error:', error);
      });

    // POST request
    $scope.createUser = function(user) {
      $http.post('https://api.example.com/users', user)
        .then(function(response) {
          $scope.users.push(response.data);
        });
    };

    // PUT request
    $scope.updateUser = function(id, user) {
      $http.put('https://api.example.com/users/' + id, user)
        .then(function(response) {
          // Handle success
        });
    };

    // DELETE request
    $scope.deleteUser = function(id) {
      $http.delete('https://api.example.com/users/' + id)
        .then(function() {
          $scope.users = $scope.users.filter(function(user) {
            return user.id !== id;
          });
        });
    };

    // With configuration
    $http({
      method: 'GET',
      url: 'https://api.example.com/users',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      params: {
        page: 1,
        limit: 10
      }
    }).then(function(response) {
      $scope.users = response.data;
    });
  });
```

**Using $resource** (For RESTful APIs):
```html
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular-resource.min.js"></script>
```

```javascript
angular.module('myApp', ['ngResource']);

angular.module('myApp')
  .factory('User', function($resource) {
    return $resource('https://api.example.com/users/:id', { id: '@id' }, {
      update: {
        method: 'PUT'
      }
    });
  });

// Usage
angular.module('myApp')
  .controller('UserController', function($scope, User) {
    // Query all users
    $scope.users = User.query();

    // Get single user
    $scope.user = User.get({ id: 123 });

    // Create user
    var newUser = new User({ name: 'Alice', email: 'alice@example.com' });
    newUser.$save();

    // Update user
    $scope.user.name = 'New Name';
    $scope.user.$update();

    // Delete user
    $scope.user.$delete();
  });
```

### 9. Forms and Validation

```html
<form name="userForm" ng-submit="submitUser()" novalidate>
  <!-- Name field -->
  <div>
    <label>Name:</label>
    <input
      type="text"
      name="name"
      ng-model="user.name"
      required
      minlength="3"
      maxlength="50"
    >
    <div ng-show="userForm.name.$touched && userForm.name.$invalid">
      <p ng-show="userForm.name.$error.required">Name is required</p>
      <p ng-show="userForm.name.$error.minlength">Minimum 3 characters</p>
      <p ng-show="userForm.name.$error.maxlength">Maximum 50 characters</p>
    </div>
  </div>

  <!-- Email field -->
  <div>
    <label>Email:</label>
    <input
      type="email"
      name="email"
      ng-model="user.email"
      required
      ng-pattern="/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/"
    >
    <div ng-show="userForm.email.$touched && userForm.email.$invalid">
      <p ng-show="userForm.email.$error.required">Email is required</p>
      <p ng-show="userForm.email.$error.email">Invalid email format</p>
      <p ng-show="userForm.email.$error.pattern">Invalid email pattern</p>
    </div>
  </div>

  <!-- Age field -->
  <div>
    <label>Age:</label>
    <input
      type="number"
      name="age"
      ng-model="user.age"
      min="18"
      max="120"
    >
    <div ng-show="userForm.age.$touched && userForm.age.$invalid">
      <p ng-show="userForm.age.$error.min">Minimum age is 18</p>
      <p ng-show="userForm.age.$error.max">Maximum age is 120</p>
    </div>
  </div>

  <button type="submit" ng-disabled="userForm.$invalid">Submit</button>
</form>
```

**Form State Properties**:
```javascript
// Form states
userForm.$pristine  // Form hasn't been modified
userForm.$dirty     // Form has been modified
userForm.$valid     // All fields are valid
userForm.$invalid   // At least one field is invalid
userForm.$submitted // Form has been submitted

// Field states
userForm.name.$pristine
userForm.name.$dirty
userForm.name.$valid
userForm.name.$invalid
userForm.name.$touched  // Field has been blurred
userForm.name.$untouched
userForm.name.$error    // Object with validation errors
```

## Pros and Cons

### Pros ✅

**1. Simple Getting Started**
- No build tools required
- Works with plain HTML/JS
- Include from CDN and start coding
- Great for beginners

**2. Two-Way Data Binding**
- Automatic sync between model and view
- Less boilerplate code
- Easy to implement forms

**3. Dependency Injection**
- Clean, testable code
- Easy to mock dependencies
- Well-structured applications

**4. Directives**
- Powerful DOM manipulation
- Reusable components
- Extend HTML naturally

**5. Large Community (Historical)**
- Lots of tutorials and resources
- Many third-party libraries
- Stack Overflow answers

**6. MVC Pattern**
- Clear separation of concerns
- Organized code structure
- Easy to understand

**7. Built-in Features**
- Routing (ngRoute)
- Form validation
- HTTP client
- Templating

### Cons ❌

**1. End of Life**
- No longer actively developed
- Security vulnerabilities won't be fixed
- Should migrate to modern frameworks
- No new features

**2. Performance Issues**
- Digest cycle can be slow
- Two-way binding overhead
- Poor performance with large lists
- Watchers can accumulate

**3. Learning Curve**
- $scope can be confusing
- Digest cycle is complex
- Directives are difficult to master
- Many gotchas and anti-patterns

**4. SEO Challenges**
- Client-side rendering
- Search engines struggle with content
- Need server-side rendering solutions

**5. Outdated**
- ES5 JavaScript (no modern features)
- No TypeScript support
- Old patterns and practices
- Better alternatives exist

**6. Digest Cycle Complexity**
- Hard to debug
- Performance bottlenecks
- $apply() and $digest() confusion
- Timing issues

**7. Mobile Performance**
- Not optimized for mobile
- Large bundle size
- Battery drain
- Better mobile frameworks available

**8. Migration Path**
- Angular (2+) is completely different
- Can't gradually upgrade
- Requires rewrite
- Learning curve for new framework

## When to Use AngularJS

### Use AngularJS If:

- **Maintaining legacy applications** - Already built with AngularJS
- **Short-term projects** - Will be replaced soon
- **Learning web development history** - Educational purposes
- **No build tools available** - Can't use modern tooling
- **Team expertise** - Team only knows AngularJS

### Don't Use AngularJS For:

- **New projects** - Use React, Angular (2+), or Vue instead
- **Long-term applications** - Will need migration
- **High-performance apps** - Performance limitations
- **Mobile applications** - Use React Native or Ionic
- **Security-critical apps** - No more security updates
- **Modern JavaScript** - Use frameworks with ES6+ support

## Migration Path

### Migrate to Angular (2+)

**Option 1: ngUpgrade (Hybrid approach)**
- Run AngularJS and Angular side-by-side
- Gradually migrate components
- Complex setup
- Good for large apps

**Option 2: Complete Rewrite**
- Start fresh with Angular
- Modern architecture
- Best long-term solution
- Requires significant effort

### Migrate to React

- Gradually replace AngularJS components
- Use React2Angular bridge
- More flexible architecture
- Popular choice

### Migrate to Vue

- Similar concepts to AngularJS
- Easier learning curve
- Flexible and lightweight
- Good alternative

## Popular AngularJS Libraries

### UI Components
- **AngularUI Bootstrap** - Bootstrap components
- **Angular Material** - Material Design (1.x version)
- **ng-table** - Data tables

### Routing
- **UI-Router** - Advanced routing
- **ngRoute** - Basic routing (built-in)

### Forms
- **angular-formly** - Dynamic forms

### HTTP
- **ngResource** - RESTful APIs
- **Restangular** - Alternative to $resource

### State Management
- **ui-router** - Router state
- **angular-redux** - Redux integration

### Utilities
- **Lodash** - Utility functions
- **Moment.js** - Date manipulation

## Best Practices

### 1. Use Controller As Syntax

```javascript
// ✅ Good
function UserController() {
  var vm = this;
  vm.users = [];
}

// ❌ Avoid
function UserController($scope) {
  $scope.users = [];
}
```

### 2. Use Services for Data

```javascript
// ✅ Good - Service handles data
angular.module('myApp')
  .factory('UserService', function($http) {
    return {
      getUsers: function() {
        return $http.get('/api/users');
      }
    };
  });

// ❌ Avoid - Controller handles HTTP
function UserController($scope, $http) {
  $http.get('/api/users').then(function(response) {
    $scope.users = response.data;
  });
}
```

### 3. Limit Watchers

```javascript
// ✅ Good - One-time binding
<p>{{ ::user.name }}</p>

// ❌ Avoid - Too many watchers
<div ng-repeat="item in items">
  <p>{{ item.calculated() }}</p>
</div>
```

### 4. Use track by in ng-repeat

```html
<!-- ✅ Good -->
<div ng-repeat="user in users track by user.id">
  {{ user.name }}
</div>

<!-- ❌ Avoid -->
<div ng-repeat="user in users">
  {{ user.name }}
</div>
```

### 5. Clean Up in $destroy

```javascript
$scope.$on('$destroy', function() {
  // Cancel timers
  $timeout.cancel(timer);

  // Unsubscribe from events
  deregister();
});
```

## Resources

### Documentation
- [AngularJS Docs](https://docs.angularjs.org/) - Official documentation
- [AngularJS API Reference](https://docs.angularjs.org/api)

### Migration Guides
- [Upgrading from AngularJS](https://angular.io/guide/upgrade) - Official migration guide
- [ngUpgrade](https://angular.io/api/upgrade/static/UpgradeModule)

### Learning Resources
- [AngularJS Tutorial](https://docs.angularjs.org/tutorial) - Official tutorial
- [AngularJS Style Guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md) - John Papa's guide

### Testing
- See [AngularJS Testing Guide](../angularjs-testing) for comprehensive testing information

## Next Steps

If you're working with AngularJS:
1. **Plan migration** - Don't start new features
2. **Learn modern frameworks** - React, Angular, or Vue
3. **Assess codebase** - Identify migration challenges
4. **Testing** - Write tests before migrating (see [AngularJS Testing Guide](../angularjs-testing))
5. **Choose migration strategy** - Rewrite vs gradual upgrade
6. **Start migration** - Begin with isolated components
7. **Train team** - On the new framework

If you're learning web development:
- **Skip AngularJS** - Learn modern frameworks instead
- **Start with React** - Most popular and flexible
- **Or try Angular** - For enterprise applications
- **Or Vue** - For gradual adoption
