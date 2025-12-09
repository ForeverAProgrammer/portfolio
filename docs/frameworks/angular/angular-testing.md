---
sidebar_position: 7
---

# Angular Testing Guide

Comprehensive guide to testing Angular applications using Jasmine, Karma, and modern testing practices.

## Overview

Angular provides a powerful testing infrastructure built on Jasmine and Karma. This guide covers testing components, services, directives, pipes, and more with TypeScript type safety.

### What You'll Learn

- **TestBed Configuration** - Angular's testing module
- **Component Testing** - DOM interaction and change detection
- **Service Testing** - Dependency injection and HTTP
- **RxJS Testing** - Observables and async operations
- **Routing Testing** - Router and navigation
- **NgRx Testing** - State management testing
- **E2E Testing** - End-to-end with Protractor/Cypress

## Setup

### Default Setup (Angular CLI)

Angular CLI projects come with testing pre-configured:

```bash
# Create new Angular project with testing
ng new my-app

# Run tests
ng test

# Run tests with code coverage
ng test --code-coverage

# Run tests in headless mode (CI)
ng test --browsers=ChromeHeadless --watch=false
```

### Manual Setup

If you need to set up testing manually:

```bash
npm install --save-dev @angular/core @angular/platform-browser-dynamic
npm install --save-dev jasmine-core karma karma-jasmine karma-chrome-launcher
npm install --save-dev @types/jasmine
```

**karma.conf.js**:
```javascript
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        random: false
      },
      clearContext: false
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'lcovonly' }
      ]
    },
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
```

## TestBed - Angular Testing Module

TestBed is Angular's primary testing utility for configuring and creating an Angular testing module.

### Basic TestBed Configuration

```typescript
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
```

### TestBed with Dependencies

```typescript
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { LoggerService } from './logger.service';

describe('UserService with dependencies', () => {
  let service: UserService;
  let loggerSpy: jasmine.SpyObj<LoggerService>;

  beforeEach(() => {
    // Create spy object
    const spy = jasmine.createSpyObj('LoggerService', ['log', 'error']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        { provide: LoggerService, useValue: spy }
      ]
    });

    service = TestBed.inject(UserService);
    loggerSpy = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>;
  });

  it('should log user creation', () => {
    service.createUser({ name: 'John', email: 'john@example.com' });

    expect(loggerSpy.log).toHaveBeenCalledWith('User created');
  });
});
```

## Component Testing

### Basic Component Test

**counter.component.ts**:
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <div>
      <p>Count: {{ count }}</p>
      <button (click)="increment()">Increment</button>
      <button (click)="decrement()">Decrement</button>
    </div>
  `
})
export class CounterComponent {
  count = 0;

  increment(): void {
    this.count++;
  }

  decrement(): void {
    this.count--;
  }
}
```

**counter.component.spec.ts**:
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display initial count', () => {
    const countText = compiled.querySelector('p')?.textContent;
    expect(countText).toBe('Count: 0');
  });

  it('should increment count', () => {
    const button = compiled.querySelectorAll('button')[0];
    button.click();
    fixture.detectChanges();

    expect(component.count).toBe(1);
    expect(compiled.querySelector('p')?.textContent).toBe('Count: 1');
  });

  it('should decrement count', () => {
    component.count = 5;
    fixture.detectChanges();

    const button = compiled.querySelectorAll('button')[1];
    button.click();
    fixture.detectChanges();

    expect(component.count).toBe(4);
    expect(compiled.querySelector('p')?.textContent).toBe('Count: 4');
  });
});
```

### Component with Input/Output

**user-card.component.ts**:
```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-card',
  template: `
    <div class="user-card">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
      <button (click)="onDelete()">Delete</button>
    </div>
  `
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() delete = new EventEmitter<number>();

  onDelete(): void {
    this.delete.emit(this.user.id);
  }
}
```

**user-card.component.spec.ts**:
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCardComponent, User } from './user-card.component';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  let compiled: HTMLElement;

  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  it('should display user information', () => {
    component.user = mockUser;
    fixture.detectChanges();

    expect(compiled.querySelector('h3')?.textContent).toBe('John Doe');
    expect(compiled.querySelector('p')?.textContent).toBe('john@example.com');
  });

  it('should emit delete event with user id', () => {
    component.user = mockUser;
    let emittedId: number | undefined;

    component.delete.subscribe((id: number) => {
      emittedId = id;
    });

    const button = compiled.querySelector('button');
    button?.click();

    expect(emittedId).toBe(1);
  });
});
```

### Component with Service Dependency

**user-list.component.ts**:
```typescript
import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';

@Component({
  selector: 'app-user-list',
  template: `
    <div>
      <h2>Users</h2>
      <div *ngIf="loading">Loading...</div>
      <div *ngIf="error" class="error">{{ error }}</div>
      <ul *ngIf="!loading && !error">
        <li *ngFor="let user of users">{{ user.name }}</li>
      </ul>
    </div>
  `
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load users';
        this.loading = false;
      }
    });
  }
}
```

**user-list.component.spec.ts**:
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { UserListComponent } from './user-list.component';
import { UserService } from './user.service';
import { User } from './user.model';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let compiled: HTMLElement;

  const mockUsers: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' }
  ];

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);

    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should display loading state initially', () => {
    userService.getUsers.and.returnValue(of(mockUsers));

    component.ngOnInit();

    expect(component.loading).toBe(true);
  });

  it('should display users after loading', () => {
    userService.getUsers.and.returnValue(of(mockUsers));

    fixture.detectChanges();

    expect(component.loading).toBe(false);
    expect(component.users.length).toBe(2);

    const listItems = compiled.querySelectorAll('li');
    expect(listItems.length).toBe(2);
    expect(listItems[0].textContent).toBe('Alice');
    expect(listItems[1].textContent).toBe('Bob');
  });

  it('should display error message on failure', () => {
    userService.getUsers.and.returnValue(
      throwError(() => new Error('Network error'))
    );

    fixture.detectChanges();

    expect(component.loading).toBe(false);
    expect(component.error).toBe('Failed to load users');
    expect(compiled.querySelector('.error')?.textContent).toBe('Failed to load users');
  });
});
```

## Service Testing

### Basic Service Test

**calculator.service.ts**:
```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }

  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Cannot divide by zero');
    }
    return a / b;
  }
}
```

**calculator.service.spec.ts**:
```typescript
import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add two numbers', () => {
    expect(service.add(5, 3)).toBe(8);
  });

  it('should subtract two numbers', () => {
    expect(service.subtract(10, 4)).toBe(6);
  });

  it('should throw error when dividing by zero', () => {
    expect(() => service.divide(10, 0)).toThrowError('Cannot divide by zero');
  });
});
```

### HTTP Service Testing

**user.service.ts**:
```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://api.example.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${id}`, user).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code ${error.status}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
```

**user.service.spec.ts**:
```typescript
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService, User } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mockUsers: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all users', (done) => {
    service.getUsers().subscribe({
      next: (users) => {
        expect(users.length).toBe(2);
        expect(users).toEqual(mockUsers);
        done();
      }
    });

    const req = httpMock.expectOne('https://api.example.com/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should retrieve user by id', (done) => {
    const mockUser = mockUsers[0];

    service.getUserById(1).subscribe({
      next: (user) => {
        expect(user).toEqual(mockUser);
        done();
      }
    });

    const req = httpMock.expectOne('https://api.example.com/users/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should create a new user', (done) => {
    const newUser = { name: 'Charlie', email: 'charlie@example.com' };
    const createdUser = { id: 3, ...newUser };

    service.createUser(newUser).subscribe({
      next: (user) => {
        expect(user).toEqual(createdUser);
        done();
      }
    });

    const req = httpMock.expectOne('https://api.example.com/users');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush(createdUser);
  });

  it('should update a user', (done) => {
    const updates = { name: 'Alice Updated' };
    const updatedUser = { ...mockUsers[0], ...updates };

    service.updateUser(1, updates).subscribe({
      next: (user) => {
        expect(user.name).toBe('Alice Updated');
        done();
      }
    });

    const req = httpMock.expectOne('https://api.example.com/users/1');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(updates);
    req.flush(updatedUser);
  });

  it('should delete a user', (done) => {
    service.deleteUser(1).subscribe({
      next: () => {
        done();
      }
    });

    const req = httpMock.expectOne('https://api.example.com/users/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should handle errors', (done) => {
    service.getUsers().subscribe({
      error: (error) => {
        expect(error.message).toContain('Server returned code 500');
        done();
      }
    });

    const req = httpMock.expectOne('https://api.example.com/users');
    req.flush('Server error', { status: 500, statusText: 'Server Error' });
  });
});
```

## Testing RxJS Observables

### Testing Async Operations

```typescript
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of, delay } from 'rxjs';

describe('Async Observable Testing', () => {
  it('should test observable with fakeAsync', fakeAsync(() => {
    let result: string | undefined;

    of('Hello').pipe(delay(1000)).subscribe((value) => {
      result = value;
    });

    // Initially undefined
    expect(result).toBeUndefined();

    // Fast-forward time by 1000ms
    tick(1000);

    // Now we have the result
    expect(result).toBe('Hello');
  }));
});
```

### Testing with Jasmine Marble Testing

```bash
npm install --save-dev jasmine-marbles
```

```typescript
import { cold, hot, getTestScheduler } from 'jasmine-marbles';
import { map } from 'rxjs/operators';

describe('Marble Testing', () => {
  it('should map values', () => {
    const source = cold('--a--b--c--|', { a: 1, b: 2, c: 3 });
    const expected = cold('--x--y--z--|', { x: 2, y: 4, z: 6 });

    const result = source.pipe(map((x) => x * 2));

    expect(result).toBeObservable(expected);
  });

  it('should handle errors', () => {
    const source = cold('--a--b--#', { a: 1, b: 2 }, new Error('error'));
    const expected = cold('--x--y--#', { x: 2, y: 4 }, new Error('error'));

    const result = source.pipe(map((x) => x * 2));

    expect(result).toBeObservable(expected);
  });
});
```

## Testing Directives

**highlight.directive.ts**:
```typescript
import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges {
  @Input() appHighlight = '';

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    this.el.nativeElement.style.backgroundColor = this.appHighlight || 'yellow';
  }
}
```

**highlight.directive.spec.ts**:
```typescript
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightDirective } from './highlight.directive';

@Component({
  template: `<div [appHighlight]="color">Test</div>`
})
class TestComponent {
  color = '';
}

describe('HighlightDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let div: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighlightDirective, TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    div = fixture.nativeElement.querySelector('div');
  });

  it('should apply default yellow background', () => {
    fixture.detectChanges();
    expect(div.style.backgroundColor).toBe('yellow');
  });

  it('should apply custom color', () => {
    component.color = 'lightblue';
    fixture.detectChanges();
    expect(div.style.backgroundColor).toBe('lightblue');
  });
});
```

## Testing Pipes

**truncate.pipe.ts**:
```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 50, trail: string = '...'): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    return value.substring(0, limit) + trail;
  }
}
```

**truncate.pipe.spec.ts**:
```typescript
import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string for null/undefined', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should not truncate short strings', () => {
    const text = 'Hello World';
    expect(pipe.transform(text)).toBe('Hello World');
  });

  it('should truncate long strings with default limit', () => {
    const text = 'A'.repeat(100);
    const result = pipe.transform(text);
    expect(result.length).toBe(53); // 50 + '...'
    expect(result.endsWith('...')).toBe(true);
  });

  it('should truncate with custom limit', () => {
    const text = 'Hello World, this is a test';
    const result = pipe.transform(text, 10);
    expect(result).toBe('Hello Worl...');
  });

  it('should truncate with custom trail', () => {
    const text = 'Hello World, this is a test';
    const result = pipe.transform(text, 10, '---');
    expect(result).toBe('Hello Worl---');
  });
});
```

## Testing Forms

### Template-Driven Forms

**login-form.component.ts**:
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-login-form',
  template: `
    <form #loginForm="ngForm" (ngSubmit)="onSubmit()">
      <input
        name="email"
        type="email"
        [(ngModel)]="email"
        required
        email
        #emailField="ngModel"
      />
      <div *ngIf="emailField.invalid && emailField.touched">
        <span *ngIf="emailField.errors?.['required']">Email is required</span>
        <span *ngIf="emailField.errors?.['email']">Invalid email</span>
      </div>

      <input
        name="password"
        type="password"
        [(ngModel)]="password"
        required
        minlength="6"
        #passwordField="ngModel"
      />
      <div *ngIf="passwordField.invalid && passwordField.touched">
        <span *ngIf="passwordField.errors?.['required']">Password is required</span>
        <span *ngIf="passwordField.errors?.['minlength']">Min 6 characters</span>
      </div>

      <button type="submit" [disabled]="loginForm.invalid">Login</button>
    </form>
  `
})
export class LoginFormComponent {
  email = '';
  password = '';
  submitted = false;

  onSubmit(): void {
    this.submitted = true;
  }
}
```

**login-form.component.spec.ts**:
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent (Template-Driven)', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable submit button when form is invalid', () => {
    const button = compiled.querySelector('button') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it('should enable submit button when form is valid', async () => {
    component.email = 'test@example.com';
    component.password = 'password123';
    fixture.detectChanges();
    await fixture.whenStable();

    const button = compiled.querySelector('button') as HTMLButtonElement;
    expect(button.disabled).toBe(false);
  });

  it('should show email validation errors', async () => {
    const emailInput = compiled.querySelector('input[name="email"]') as HTMLInputElement;

    emailInput.value = '';
    emailInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(compiled.textContent).toContain('Email is required');
  });
});
```

### Reactive Forms

**register-form.component.ts**:
```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  template: `
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
      <input formControlName="email" type="email" />
      <div *ngIf="email?.invalid && email?.touched">
        <span *ngIf="email?.errors?.['required']">Email is required</span>
        <span *ngIf="email?.errors?.['email']">Invalid email</span>
      </div>

      <input formControlName="password" type="password" />
      <div *ngIf="password?.invalid && password?.touched">
        <span *ngIf="password?.errors?.['required']">Password is required</span>
        <span *ngIf="password?.errors?.['minlength']">Min 8 characters</span>
      </div>

      <button type="submit" [disabled]="registerForm.invalid">Register</button>
    </form>
  `
})
export class RegisterFormComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.submitted = true;
    }
  }
}
```

**register-form.component.spec.ts**:
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterFormComponent } from './register-form.component';

describe('RegisterFormComponent (Reactive)', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterFormComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create form with email and password controls', () => {
    expect(component.registerForm.contains('email')).toBe(true);
    expect(component.registerForm.contains('password')).toBe(true);
  });

  it('should make email required', () => {
    const control = component.registerForm.get('email');
    control?.setValue('');
    expect(control?.valid).toBe(false);
    expect(control?.hasError('required')).toBe(true);
  });

  it('should validate email format', () => {
    const control = component.registerForm.get('email');
    control?.setValue('invalid-email');
    expect(control?.hasError('email')).toBe(true);

    control?.setValue('valid@example.com');
    expect(control?.hasError('email')).toBe(false);
  });

  it('should validate password minimum length', () => {
    const control = component.registerForm.get('password');
    control?.setValue('short');
    expect(control?.hasError('minlength')).toBe(true);

    control?.setValue('longpassword');
    expect(control?.hasError('minlength')).toBe(false);
  });

  it('should be invalid when empty', () => {
    expect(component.registerForm.valid).toBe(false);
  });

  it('should be valid when filled correctly', () => {
    component.registerForm.patchValue({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(component.registerForm.valid).toBe(true);
  });

  it('should submit when form is valid', () => {
    component.registerForm.patchValue({
      email: 'test@example.com',
      password: 'password123'
    });

    component.onSubmit();
    expect(component.submitted).toBe(true);
  });

  it('should not submit when form is invalid', () => {
    component.registerForm.patchValue({
      email: 'invalid',
      password: 'short'
    });

    component.onSubmit();
    expect(component.submitted).toBe(false);
  });
});
```

## Testing Routing

**app-routing.module.ts**:
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'users/:id', component: UserDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

**navigation.component.spec.ts**:
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationComponent } from './navigation.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';

describe('Router Navigation', () => {
  let router: Router;
  let location: Location;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationComponent, HomeComponent, AboutComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: HomeComponent },
          { path: 'about', component: AboutComponent }
        ])
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(NavigationComponent);
  });

  it('should navigate to home', async () => {
    await router.navigate(['']);
    expect(location.path()).toBe('');
  });

  it('should navigate to about page', async () => {
    await router.navigate(['about']);
    expect(location.path()).toBe('/about');
  });
});
```

**Testing Route Parameters**:
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { UserDetailComponent } from './user-detail.component';

describe('UserDetailComponent with Route Params', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }),
            snapshot: { params: { id: '123' } }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get user id from route params', () => {
    expect(component.userId).toBe('123');
  });
});
```

## Testing NgRx (State Management)

### Testing Reducers

**user.reducer.ts**:
```typescript
import { createReducer, on } from '@ngrx/store';
import { loadUsers, loadUsersSuccess, loadUsersFailure } from './user.actions';

export interface UserState {
  users: any[];
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  users: [],
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialState,
  on(loadUsers, (state) => ({ ...state, loading: true, error: null })),
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false
  })),
  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
```

**user.reducer.spec.ts**:
```typescript
import { userReducer, initialState } from './user.reducer';
import { loadUsers, loadUsersSuccess, loadUsersFailure } from './user.actions';

describe('User Reducer', () => {
  it('should return initial state', () => {
    const action = { type: 'Unknown' };
    const state = userReducer(undefined, action);
    expect(state).toBe(initialState);
  });

  it('should set loading to true on loadUsers', () => {
    const action = loadUsers();
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should load users on loadUsersSuccess', () => {
    const users = [{ id: 1, name: 'Alice' }];
    const action = loadUsersSuccess({ users });
    const state = userReducer(initialState, action);

    expect(state.users).toEqual(users);
    expect(state.loading).toBe(false);
  });

  it('should set error on loadUsersFailure', () => {
    const error = 'Failed to load';
    const action = loadUsersFailure({ error });
    const state = userReducer(initialState, action);

    expect(state.error).toBe(error);
    expect(state.loading).toBe(false);
  });
});
```

### Testing Effects

**user.effects.ts**:
```typescript
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { loadUsers, loadUsersSuccess, loadUsersFailure } from './user.actions';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map((users) => loadUsersSuccess({ users })),
          catchError((error) => of(loadUsersFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
```

**user.effects.spec.ts**:
```typescript
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { UserEffects } from './user.effects';
import { UserService } from './user.service';
import { loadUsers, loadUsersSuccess, loadUsersFailure } from './user.actions';

describe('UserEffects', () => {
  let actions$: Observable<any>;
  let effects: UserEffects;
  let userService: jasmine.SpyObj<UserService>;

  const mockUsers = [{ id: 1, name: 'Alice', email: 'alice@example.com' }];

  beforeEach(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);

    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        { provide: UserService, useValue: userServiceSpy }
      ]
    });

    effects = TestBed.inject(UserEffects);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should return loadUsersSuccess on success', (done) => {
    userService.getUsers.and.returnValue(of(mockUsers));
    actions$ = of(loadUsers());

    effects.loadUsers$.subscribe((action) => {
      expect(action).toEqual(loadUsersSuccess({ users: mockUsers }));
      done();
    });
  });

  it('should return loadUsersFailure on error', (done) => {
    const error = new Error('Network error');
    userService.getUsers.and.returnValue(throwError(() => error));
    actions$ = of(loadUsers());

    effects.loadUsers$.subscribe((action) => {
      expect(action).toEqual(loadUsersFailure({ error: 'Network error' }));
      done();
    });
  });
});
```

### Testing Selectors

**user.selectors.ts**:
```typescript
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(
  selectUserState,
  (state) => state.users
);

export const selectUsersLoading = createSelector(
  selectUserState,
  (state) => state.loading
);

export const selectUsersError = createSelector(
  selectUserState,
  (state) => state.error
);

export const selectUserById = (id: number) =>
  createSelector(selectAllUsers, (users) => users.find((user) => user.id === id));
```

**user.selectors.spec.ts**:
```typescript
import { UserState } from './user.reducer';
import { selectAllUsers, selectUsersLoading, selectUserById } from './user.selectors';

describe('User Selectors', () => {
  const mockState: { users: UserState } = {
    users: {
      users: [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' }
      ],
      loading: false,
      error: null
    }
  };

  it('should select all users', () => {
    const result = selectAllUsers(mockState);
    expect(result.length).toBe(2);
    expect(result).toEqual(mockState.users.users);
  });

  it('should select loading state', () => {
    const result = selectUsersLoading(mockState);
    expect(result).toBe(false);
  });

  it('should select user by id', () => {
    const result = selectUserById(1)(mockState);
    expect(result).toEqual({ id: 1, name: 'Alice', email: 'alice@example.com' });
  });

  it('should return undefined for non-existent user', () => {
    const result = selectUserById(999)(mockState);
    expect(result).toBeUndefined();
  });
});
```

## E2E Testing

### Protractor (Deprecated)

**Note**: Protractor is deprecated. Consider using Cypress or Playwright instead.

### Cypress for Angular

```bash
npm install --save-dev cypress @cypress/schematic
ng add @cypress/schematic
```

**cypress/e2e/app.cy.ts**:
```typescript
describe('My App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display welcome message', () => {
    cy.contains('Welcome to my-app');
  });

  it('should navigate to about page', () => {
    cy.get('a[href="/about"]').click();
    cy.url().should('include', '/about');
    cy.contains('About Us');
  });

  it('should fill and submit form', () => {
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.contains('Login successful');
  });

  it('should display user list', () => {
    cy.intercept('GET', '/api/users', { fixture: 'users.json' });
    cy.visit('/users');

    cy.get('.user-card').should('have.length', 3);
  });
});
```

## Best Practices

### 1. Use TestBed Properly

```typescript
// ✅ Good - Reset TestBed between tests
beforeEach(async () => {
  await TestBed.configureTestingModule({
    // configuration
  }).compileComponents();
});

// ❌ Avoid - Reusing TestBed across tests
```

### 2. Use Spies for Dependencies

```typescript
// ✅ Good - Use jasmine spies
const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);
userServiceSpy.getUsers.and.returnValue(of(mockUsers));

// ❌ Avoid - Real dependencies in unit tests
```

### 3. Test Component Logic, Not Implementation

```typescript
// ✅ Good - Test behavior
it('should display users when loaded', () => {
  component.users = mockUsers;
  fixture.detectChanges();
  expect(compiled.querySelectorAll('.user').length).toBe(2);
});

// ❌ Avoid - Testing private methods
it('should call private method', () => {
  component['privateMethod'](); // Don't test private methods
});
```

### 4. Use detectChanges() Wisely

```typescript
// ✅ Good - Call detectChanges after changes
component.title = 'New Title';
fixture.detectChanges();
expect(compiled.querySelector('h1')?.textContent).toBe('New Title');

// ❌ Avoid - Forgetting detectChanges
component.title = 'New Title';
expect(compiled.querySelector('h1')?.textContent).toBe('New Title'); // Fails!
```

### 5. Clean Up Subscriptions

```typescript
// ✅ Good - Use done callback for async
it('should load users', (done) => {
  service.getUsers().subscribe({
    next: (users) => {
      expect(users.length).toBe(2);
      done();
    }
  });
});

// ✅ Good - Use fakeAsync/tick
it('should load users', fakeAsync(() => {
  let result;
  service.getUsers().subscribe((users) => {
    result = users;
  });
  tick();
  expect(result.length).toBe(2);
}));
```

## Common Testing Patterns

### Pattern: Page Object Model

```typescript
// user-list.page.ts
export class UserListPage {
  constructor(private fixture: ComponentFixture<UserListComponent>) {}

  get users() {
    return this.fixture.nativeElement.querySelectorAll('.user-card');
  }

  get loadingSpinner() {
    return this.fixture.nativeElement.querySelector('.loading');
  }

  get errorMessage() {
    return this.fixture.nativeElement.querySelector('.error')?.textContent;
  }

  clickUser(index: number): void {
    this.users[index].click();
  }
}

// Usage in test
describe('UserListComponent', () => {
  let page: UserListPage;

  beforeEach(() => {
    page = new UserListPage(fixture);
  });

  it('should display users', () => {
    expect(page.users.length).toBe(3);
  });
});
```

### Pattern: Test Helpers

```typescript
// test-helpers.ts
export function createMockUser(overrides?: Partial<User>): User {
  return {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    ...overrides
  };
}

export function triggerClick(element: HTMLElement): void {
  element.click();
  element.dispatchEvent(new Event('click'));
}

// Usage
const user = createMockUser({ name: 'Alice' });
```

## Resources

### Official Documentation
- [Angular Testing Guide](https://angular.io/guide/testing)
- [Jasmine Documentation](https://jasmine.github.io/)
- [Karma Documentation](https://karma-runner.github.io/)

### Tools
- **Jasmine** - Testing framework
- **Karma** - Test runner
- **Protractor** - E2E (deprecated)
- **Cypress** - Modern E2E testing
- **Playwright** - E2E testing alternative
- **jasmine-marbles** - RxJS testing

### Learning Resources
- [Angular Testing Library](https://testing-library.com/docs/angular-testing-library/intro/)
- [NgRx Testing Documentation](https://ngrx.io/guide/store/testing)
- [Cypress Angular Guide](https://docs.cypress.io/guides/component-testing/angular/overview)

## Next Steps

After mastering Angular testing:
- Explore **E2E Testing** with Cypress or Playwright
- Learn **Performance Testing** for Angular apps
- Practice **Accessibility Testing** with axe-core
- Study **Visual Regression Testing** with Percy or Chromatic
- Master **NgRx Testing** for complex state management
