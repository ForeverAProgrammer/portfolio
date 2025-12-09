---
sidebar_position: 8
---

# AngularJS Testing Guide

Comprehensive guide to testing AngularJS (1.x) applications using Jasmine, Karma, and classic AngularJS testing patterns.

## Overview

AngularJS provides a robust testing infrastructure with dependency injection support. This guide covers testing controllers, services, directives, filters, and more using Jasmine and Karma.

**Note**: This guide is for AngularJS 1.x. For Angular 2+ testing, see the [Angular Testing Guide](../angularjs/angularjs-testing).

### What You'll Learn

- **Controller Testing** - Testing with $scope and dependencies
- **Service Testing** - Unit testing services and factories
- **Directive Testing** - DOM manipulation and compilation
- **Filter Testing** - Pure function testing
- **HTTP Testing** - Mocking with $httpBackend
- **Routing Testing** - Testing $routeProvider and $stateProvider
- **E2E Testing** - Using Protractor (deprecated) or Cypress

## Setup

### Installation

```bash
npm install --save-dev karma karma-jasmine karma-chrome-launcher
npm install --save-dev jasmine-core angular-mocks
```

### Karma Configuration

**karma.conf.js**:
```javascript
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'app/**/*.module.js',
      'app/**/*.js',
      'test/**/*.spec.js'
    ],
    exclude: [],
    preprocessors: {},
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  });
};
```

### Package.json Scripts

```json
{
  "scripts": {
    "test": "karma start karma.conf.js --single-run",
    "test:watch": "karma start karma.conf.js"
  }
}
```

## Testing Controllers

### Basic Controller Test

**app/controllers/greeting.controller.js**:
```javascript
angular.module('myApp')
  .controller('GreetingController', function($scope) {
    $scope.greeting = 'Hello';

    $scope.setGreeting = function(newGreeting) {
      $scope.greeting = newGreeting;
    };

    $scope.getGreeting = function() {
      return $scope.greeting;
    };
  });
```

**test/controllers/greeting.controller.spec.js**:
```javascript
describe('GreetingController', function() {
  var $scope;
  var controller;

  // Load the module
  beforeEach(module('myApp'));

  // Inject and create controller
  beforeEach(inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    controller = $controller('GreetingController', {
      $scope: $scope
    });
  }));

  it('should have default greeting', function() {
    expect($scope.greeting).toBe('Hello');
  });

  it('should set new greeting', function() {
    $scope.setGreeting('Hi');
    expect($scope.greeting).toBe('Hi');
  });

  it('should get greeting', function() {
    $scope.greeting = 'Welcome';
    expect($scope.getGreeting()).toBe('Welcome');
  });
});
```

### Controller with Dependencies

**app/controllers/user.controller.js**:
```javascript
angular.module('myApp')
  .controller('UserController', function($scope, UserService, $log) {
    $scope.users = [];
    $scope.loading = false;
    $scope.error = null;

    $scope.loadUsers = function() {
      $scope.loading = true;
      $scope.error = null;

      UserService.getUsers()
        .then(function(users) {
          $scope.users = users;
          $scope.loading = false;
          $log.info('Users loaded');
        })
        .catch(function(error) {
          $scope.error = 'Failed to load users';
          $scope.loading = false;
          $log.error('Error loading users', error);
        });
    };

    $scope.deleteUser = function(userId) {
      UserService.deleteUser(userId)
        .then(function() {
          $scope.users = $scope.users.filter(function(user) {
            return user.id !== userId;
          });
        });
    };
  });
```

**test/controllers/user.controller.spec.js**:
```javascript
describe('UserController', function() {
  var $scope;
  var $q;
  var controller;
  var UserService;
  var $log;

  var mockUsers = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' }
  ];

  beforeEach(module('myApp'));

  beforeEach(inject(function($rootScope, $controller, _$q_, _$log_) {
    $scope = $rootScope.$new();
    $q = _$q_;
    $log = _$log_;

    // Create mock service
    UserService = {
      getUsers: jasmine.createSpy('getUsers'),
      deleteUser: jasmine.createSpy('deleteUser')
    };

    controller = $controller('UserController', {
      $scope: $scope,
      UserService: UserService,
      $log: $log
    });
  }));

  it('should initialize with empty users', function() {
    expect($scope.users).toEqual([]);
    expect($scope.loading).toBe(false);
    expect($scope.error).toBe(null);
  });

  it('should load users successfully', function() {
    var deferred = $q.defer();
    UserService.getUsers.and.returnValue(deferred.promise);

    $scope.loadUsers();

    expect($scope.loading).toBe(true);

    // Resolve promise
    deferred.resolve(mockUsers);
    $scope.$apply();

    expect($scope.users).toEqual(mockUsers);
    expect($scope.loading).toBe(false);
    expect($scope.error).toBe(null);
  });

  it('should handle load error', function() {
    var deferred = $q.defer();
    UserService.getUsers.and.returnValue(deferred.promise);

    $scope.loadUsers();

    // Reject promise
    deferred.reject(new Error('Network error'));
    $scope.$apply();

    expect($scope.error).toBe('Failed to load users');
    expect($scope.loading).toBe(false);
  });

  it('should delete user', function() {
    $scope.users = mockUsers;
    var deferred = $q.defer();
    UserService.deleteUser.and.returnValue(deferred.promise);

    $scope.deleteUser(1);

    deferred.resolve();
    $scope.$apply();

    expect($scope.users.length).toBe(1);
    expect($scope.users[0].id).toBe(2);
  });
});
```

### Controller As Syntax

**app/controllers/counter.controller.js**:
```javascript
angular.module('myApp')
  .controller('CounterController', function() {
    var vm = this;

    vm.count = 0;

    vm.increment = function() {
      vm.count++;
    };

    vm.decrement = function() {
      vm.count--;
    };

    vm.reset = function() {
      vm.count = 0;
    };
  });
```

**test/controllers/counter.controller.spec.js**:
```javascript
describe('CounterController (Controller As)', function() {
  var controller;

  beforeEach(module('myApp'));

  beforeEach(inject(function($controller) {
    controller = $controller('CounterController');
  }));

  it('should initialize count to 0', function() {
    expect(controller.count).toBe(0);
  });

  it('should increment count', function() {
    controller.increment();
    expect(controller.count).toBe(1);
  });

  it('should decrement count', function() {
    controller.count = 5;
    controller.decrement();
    expect(controller.count).toBe(4);
  });

  it('should reset count', function() {
    controller.count = 10;
    controller.reset();
    expect(controller.count).toBe(0);
  });
});
```

## Testing Services

### Service Test

**app/services/calculator.service.js**:
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

**test/services/calculator.service.spec.js**:
```javascript
describe('CalculatorService', function() {
  var CalculatorService;

  beforeEach(module('myApp'));

  beforeEach(inject(function(_CalculatorService_) {
    CalculatorService = _CalculatorService_;
  }));

  it('should add two numbers', function() {
    expect(CalculatorService.add(5, 3)).toBe(8);
  });

  it('should subtract two numbers', function() {
    expect(CalculatorService.subtract(10, 4)).toBe(6);
  });

  it('should multiply two numbers', function() {
    expect(CalculatorService.multiply(6, 7)).toBe(42);
  });

  it('should divide two numbers', function() {
    expect(CalculatorService.divide(10, 2)).toBe(5);
  });

  it('should throw error when dividing by zero', function() {
    expect(function() {
      CalculatorService.divide(10, 0);
    }).toThrowError('Cannot divide by zero');
  });
});
```

### Factory Test

**app/services/user.factory.js**:
```javascript
angular.module('myApp')
  .factory('UserFactory', function($http) {
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

      updateUser: function(id, updates) {
        return $http.patch(apiUrl + '/' + id, updates).then(function(response) {
          return response.data;
        });
      },

      deleteUser: function(id) {
        return $http.delete(apiUrl + '/' + id);
      }
    };
  });
```

**test/services/user.factory.spec.js**:
```javascript
describe('UserFactory', function() {
  var UserFactory;
  var $httpBackend;
  var apiUrl = 'https://api.example.com/users';

  var mockUsers = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' }
  ];

  beforeEach(module('myApp'));

  beforeEach(inject(function(_UserFactory_, _$httpBackend_) {
    UserFactory = _UserFactory_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should get all users', function() {
    $httpBackend.expectGET(apiUrl).respond(200, mockUsers);

    UserFactory.getUsers().then(function(users) {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    $httpBackend.flush();
  });

  it('should get user by id', function() {
    var user = mockUsers[0];
    $httpBackend.expectGET(apiUrl + '/1').respond(200, user);

    UserFactory.getUserById(1).then(function(result) {
      expect(result).toEqual(user);
    });

    $httpBackend.flush();
  });

  it('should create a user', function() {
    var newUser = { name: 'Charlie', email: 'charlie@example.com' };
    var createdUser = { id: 3, ...newUser };

    $httpBackend.expectPOST(apiUrl, newUser).respond(201, createdUser);

    UserFactory.createUser(newUser).then(function(user) {
      expect(user.id).toBe(3);
      expect(user.name).toBe('Charlie');
    });

    $httpBackend.flush();
  });

  it('should update a user', function() {
    var updates = { name: 'Alice Updated' };
    var updatedUser = { id: 1, name: 'Alice Updated', email: 'alice@example.com' };

    $httpBackend.expectPATCH(apiUrl + '/1', updates).respond(200, updatedUser);

    UserFactory.updateUser(1, updates).then(function(user) {
      expect(user.name).toBe('Alice Updated');
    });

    $httpBackend.flush();
  });

  it('should delete a user', function() {
    $httpBackend.expectDELETE(apiUrl + '/1').respond(204);

    UserFactory.deleteUser(1);

    $httpBackend.flush();
  });

  it('should handle HTTP errors', function() {
    $httpBackend.expectGET(apiUrl).respond(500, 'Server Error');

    UserFactory.getUsers().catch(function(error) {
      expect(error.status).toBe(500);
    });

    $httpBackend.flush();
  });
});
```

### Provider Test

**app/services/config.provider.js**:
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
```

**test/services/config.provider.spec.js**:
```javascript
describe('AppConfig Provider', function() {
  var AppConfig;

  beforeEach(function() {
    angular.module('testApp', [])
      .config(function(AppConfigProvider) {
        AppConfigProvider.setApiUrl('https://test-api.example.com');
        AppConfigProvider.setApiKey('test-key-123');
      });

    module('myApp', 'testApp');

    inject(function(_AppConfig_) {
      AppConfig = _AppConfig_;
    });
  });

  it('should return configured API URL', function() {
    expect(AppConfig.getApiUrl()).toBe('https://test-api.example.com');
  });

  it('should return configured API key', function() {
    expect(AppConfig.getApiKey()).toBe('test-key-123');
  });

  it('should build full URL', function() {
    expect(AppConfig.getFullUrl('/users')).toBe('https://test-api.example.com/users');
  });
});
```

## Testing Directives

### Simple Directive Test

**app/directives/highlight.directive.js**:
```javascript
angular.module('myApp')
  .directive('highlight', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var color = attrs.highlight || 'yellow';
        element.css('background-color', color);
      }
    };
  });
```

**test/directives/highlight.directive.spec.js**:
```javascript
describe('highlight directive', function() {
  var $compile;
  var $rootScope;

  beforeEach(module('myApp'));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('should apply default yellow background', function() {
    var element = $compile('<div highlight>Test</div>')($rootScope);
    $rootScope.$digest();

    expect(element.css('background-color')).toBe('yellow');
  });

  it('should apply custom color', function() {
    var element = $compile('<div highlight="lightblue">Test</div>')($rootScope);
    $rootScope.$digest();

    expect(element.css('background-color')).toBe('lightblue');
  });
});
```

### Directive with Template

**app/directives/user-card.directive.js**:
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

**test/directives/user-card.directive.spec.js**:
```javascript
describe('userCard directive', function() {
  var $compile;
  var $rootScope;
  var $scope;

  var mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com'
  };

  beforeEach(module('myApp'));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
  }));

  it('should display user information', function() {
    $scope.testUser = mockUser;
    var element = $compile('<user-card user="testUser"></user-card>')($scope);
    $scope.$digest();

    expect(element.find('h3').text()).toBe('John Doe');
    expect(element.find('p').text()).toBe('john@example.com');
  });

  it('should call onDelete when button clicked', function() {
    $scope.testUser = mockUser;
    $scope.handleDelete = jasmine.createSpy('handleDelete');

    var element = $compile(
      '<user-card user="testUser" on-delete="handleDelete(userId)"></user-card>'
    )($scope);
    $scope.$digest();

    element.find('button').triggerHandler('click');

    expect($scope.handleDelete).toHaveBeenCalledWith(1);
  });
});
```

### Directive with Controller

**app/directives/counter.directive.js**:
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

**test/directives/counter.directive.spec.js**:
```javascript
describe('counter directive', function() {
  var $compile;
  var $rootScope;
  var element;

  beforeEach(module('myApp'));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    element = $compile('<counter></counter>')($rootScope);
    $rootScope.$digest();
  }));

  it('should initialize count to 0', function() {
    expect(element.find('p').text()).toBe('Count: 0');
  });

  it('should increment count', function() {
    element.find('button').eq(0).triggerHandler('click');
    $rootScope.$digest();

    expect(element.find('p').text()).toBe('Count: 1');
  });

  it('should decrement count', function() {
    var scope = element.isolateScope();
    scope.count = 5;
    $rootScope.$digest();

    element.find('button').eq(1).triggerHandler('click');
    $rootScope.$digest();

    expect(element.find('p').text()).toBe('Count: 4');
  });

  it('should reset count', function() {
    var scope = element.isolateScope();
    scope.count = 10;
    $rootScope.$digest();

    element.find('button').eq(2).triggerHandler('click');
    $rootScope.$digest();

    expect(element.find('p').text()).toBe('Count: 0');
  });
});
```

## Testing Filters

### Simple Filter Test

**app/filters/capitalize.filter.js**:
```javascript
angular.module('myApp')
  .filter('capitalize', function() {
    return function(input) {
      if (!input) return '';
      return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
    };
  });
```

**test/filters/capitalize.filter.spec.js**:
```javascript
describe('capitalize filter', function() {
  var capitalizeFilter;

  beforeEach(module('myApp'));

  beforeEach(inject(function($filter) {
    capitalizeFilter = $filter('capitalize');
  }));

  it('should capitalize first letter', function() {
    expect(capitalizeFilter('hello')).toBe('Hello');
  });

  it('should lowercase remaining letters', function() {
    expect(capitalizeFilter('hELLO')).toBe('Hello');
  });

  it('should handle empty string', function() {
    expect(capitalizeFilter('')).toBe('');
  });

  it('should handle null/undefined', function() {
    expect(capitalizeFilter(null)).toBe('');
    expect(capitalizeFilter(undefined)).toBe('');
  });
});
```

### Filter with Parameters

**app/filters/truncate.filter.js**:
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

**test/filters/truncate.filter.spec.js**:
```javascript
describe('truncate filter', function() {
  var truncateFilter;

  beforeEach(module('myApp'));

  beforeEach(inject(function($filter) {
    truncateFilter = $filter('truncate');
  }));

  it('should not truncate short strings', function() {
    expect(truncateFilter('Hello', 10)).toBe('Hello');
  });

  it('should truncate long strings with default limit', function() {
    var longText = 'A'.repeat(100);
    var result = truncateFilter(longText);

    expect(result.length).toBe(53); // 50 + '...'
    expect(result.endsWith('...')).toBe(true);
  });

  it('should truncate with custom limit', function() {
    var text = 'Hello World, this is a test';
    expect(truncateFilter(text, 10)).toBe('Hello Worl...');
  });

  it('should truncate with custom trail', function() {
    var text = 'Hello World, this is a test';
    expect(truncateFilter(text, 10, '---')).toBe('Hello Worl---');
  });

  it('should handle null/undefined', function() {
    expect(truncateFilter(null)).toBe('');
    expect(truncateFilter(undefined)).toBe('');
  });
});
```

## Testing Routing

### ngRoute Testing

**app/app.routes.js**:
```javascript
angular.module('myApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
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

**test/routing.spec.js**:
```javascript
describe('Routing', function() {
  var $route;
  var $location;
  var $rootScope;

  beforeEach(module('myApp'));

  beforeEach(inject(function(_$route_, _$location_, _$rootScope_) {
    $route = _$route_;
    $location = _$location_;
    $rootScope = _$rootScope_;
  }));

  it('should route to home', function() {
    $location.path('/');
    $rootScope.$digest();

    expect($route.current.controller).toBe('HomeController');
    expect($route.current.templateUrl).toBe('views/home.html');
  });

  it('should route to user list', function() {
    $location.path('/users');
    $rootScope.$digest();

    expect($route.current.controller).toBe('UserListController');
  });

  it('should route to user detail with id', function() {
    $location.path('/users/123');
    $rootScope.$digest();

    expect($route.current.controller).toBe('UserDetailController');
    expect($route.current.params.id).toBe('123');
  });

  it('should redirect to home for unknown routes', function() {
    $location.path('/unknown');
    $rootScope.$digest();

    expect($location.path()).toBe('/');
  });
});
```

### UI-Router Testing

**test/ui-router.spec.js**:
```javascript
describe('UI-Router', function() {
  var $state;
  var $rootScope;

  beforeEach(module('myApp'));

  beforeEach(inject(function(_$state_, _$rootScope_) {
    $state = _$state_;
    $rootScope = _$rootScope_;
  }));

  it('should transition to home state', function() {
    $state.go('home');
    $rootScope.$digest();

    expect($state.current.name).toBe('home');
  });

  it('should transition to user detail state with params', function() {
    $state.go('userDetail', { id: 123 });
    $rootScope.$digest();

    expect($state.current.name).toBe('userDetail');
    expect($state.params.id).toBe(123);
  });
});
```

## Testing HTTP Requests

### $httpBackend Basics

```javascript
describe('HTTP Testing with $httpBackend', function() {
  var $httpBackend;
  var $http;

  beforeEach(module('myApp'));

  beforeEach(inject(function(_$httpBackend_, _$http_) {
    $httpBackend = _$httpBackend_;
    $http = _$http_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should mock GET request', function() {
    var result;

    $httpBackend.expectGET('/api/users').respond(200, [
      { id: 1, name: 'Alice' }
    ]);

    $http.get('/api/users').then(function(response) {
      result = response.data;
    });

    $httpBackend.flush();

    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Alice');
  });

  it('should mock POST request', function() {
    var newUser = { name: 'Bob', email: 'bob@example.com' };
    var result;

    $httpBackend.expectPOST('/api/users', newUser).respond(201, {
      id: 2,
      ...newUser
    });

    $http.post('/api/users', newUser).then(function(response) {
      result = response.data;
    });

    $httpBackend.flush();

    expect(result.id).toBe(2);
    expect(result.name).toBe('Bob');
  });

  it('should handle error responses', function() {
    var error;

    $httpBackend.expectGET('/api/users').respond(500, 'Server Error');

    $http.get('/api/users').catch(function(response) {
      error = response;
    });

    $httpBackend.flush();

    expect(error.status).toBe(500);
  });
});
```

## E2E Testing

### Protractor (Deprecated)

**Note**: Protractor is deprecated. Use Cypress or Playwright instead.

**protractor.conf.js**:
```javascript
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['e2e/**/*.spec.js'],
  capabilities: {
    browserName: 'chrome'
  }
};
```

**e2e/app.spec.js**:
```javascript
describe('My App E2E', function() {
  beforeEach(function() {
    browser.get('http://localhost:8080');
  });

  it('should display title', function() {
    expect(browser.getTitle()).toEqual('My App');
  });

  it('should navigate to users page', function() {
    element(by.linkText('Users')).click();
    expect(browser.getCurrentUrl()).toContain('/users');
  });

  it('should display user list', function() {
    browser.get('http://localhost:8080/users');
    var users = element.all(by.repeater('user in users'));
    expect(users.count()).toBe(3);
  });
});
```

### Cypress for AngularJS

```bash
npm install --save-dev cypress
```

**cypress/e2e/app.cy.js**:
```javascript
describe('My AngularJS App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('should display welcome message', () => {
    cy.contains('Welcome to My App');
  });

  it('should navigate to users page', () => {
    cy.get('a[href="#/users"]').click();
    cy.url().should('include', '/users');
  });

  it('should display user list', () => {
    cy.visit('http://localhost:8080/#/users');
    cy.get('.user-card').should('have.length', 3);
  });

  it('should add new user', () => {
    cy.visit('http://localhost:8080/#/users');
    cy.get('input[name="name"]').type('Charlie');
    cy.get('input[name="email"]').type('charlie@example.com');
    cy.get('button[type="submit"]').click();

    cy.contains('Charlie');
  });

  it('should delete user', () => {
    cy.visit('http://localhost:8080/#/users');
    cy.get('.user-card').first().find('.delete-btn').click();
    cy.get('.user-card').should('have.length', 2);
  });
});
```

## Best Practices

### 1. Always Use module() and inject()

```javascript
// ✅ Good
beforeEach(module('myApp'));
beforeEach(inject(function($controller, $rootScope) {
  // test code
}));

// ❌ Avoid - Direct access without injection
var controller = new MyController();
```

### 2. Clean Up with $httpBackend

```javascript
// ✅ Good
afterEach(function() {
  $httpBackend.verifyNoOutstandingExpectation();
  $httpBackend.verifyNoOutstandingRequest();
});
```

### 3. Use $scope.$digest() or $scope.$apply()

```javascript
// ✅ Good - Trigger digest cycle
$scope.loadUsers();
$scope.$digest();
expect($scope.users).toBeDefined();

// ❌ Avoid - Forgetting digest
$scope.loadUsers();
expect($scope.users).toBeDefined(); // May fail!
```

### 4. Test Behavior, Not Implementation

```javascript
// ✅ Good - Test outcomes
it('should display user count', function() {
  $scope.users = mockUsers;
  $scope.$digest();
  expect(element.find('.count').text()).toBe('2 users');
});

// ❌ Avoid - Testing internals
it('should call private method', function() {
  spyOn($scope, '_privateMethod');
  // Don't test private methods
});
```

### 5. Use Jasmine Spies for Dependencies

```javascript
// ✅ Good - Mock dependencies
var UserService = jasmine.createSpyObj('UserService', ['getUsers']);
UserService.getUsers.and.returnValue($q.when(mockUsers));

// ❌ Avoid - Real dependencies in tests
```

## Common Testing Patterns

### Pattern: Test Fixtures

```javascript
// test/fixtures/user-fixtures.js
window.UserFixtures = {
  validUser: {
    id: 1,
    name: 'Test User',
    email: 'test@example.com'
  },

  users: [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' }
  ],

  createUser: function(overrides) {
    return angular.extend({}, this.validUser, overrides);
  }
};

// Usage in tests
var user = UserFixtures.createUser({ name: 'Charlie' });
```

### Pattern: Helper Functions

```javascript
// test/helpers/test-helpers.js
function createMockScope($rootScope) {
  return $rootScope.$new();
}

function flushHttpBackend($httpBackend) {
  $httpBackend.flush();
  $httpBackend.verifyNoOutstandingExpectation();
  $httpBackend.verifyNoOutstandingRequest();
}

// Usage
var $scope = createMockScope($rootScope);
flushHttpBackend($httpBackend);
```

## Resources

### Official Documentation
- [AngularJS Testing Guide](https://docs.angularjs.org/guide/unit-testing)
- [Jasmine Documentation](https://jasmine.github.io/)
- [Karma Documentation](https://karma-runner.github.io/)

### Tools
- **Jasmine** - Testing framework
- **Karma** - Test runner
- **angular-mocks** - Mock module for testing
- **Protractor** - E2E (deprecated)
- **Cypress** - Modern E2E testing

### Migration
- [Upgrading from AngularJS](https://angular.io/guide/upgrade) - Guide to migrating to Angular
- [ngUpgrade](https://angular.io/api/upgrade/static/UpgradeModule) - Run AngularJS and Angular side-by-side

## Next Steps

After mastering AngularJS testing:
- Consider **migrating to Angular** (2+) for better tooling and support
- Explore **E2E Testing** with Cypress
- Learn **Visual Regression Testing**
- Study **Performance Testing** for AngularJS apps
- Master **Component Testing** patterns
