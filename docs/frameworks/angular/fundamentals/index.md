---
sidebar_position: 2
---

# Angular Fundamentals

A comprehensive TypeScript-based framework for building scalable web applications, maintained by Google and a community of developers.

## What is Angular?

Angular is a **complete framework** (not just a library) for building dynamic web applications. It provides everything you need out of the box: routing, forms, HTTP client, testing utilities, and more. Angular enforces strong opinions about application structure and best practices.

**Note**: This guide covers Angular (2+), not AngularJS (1.x). See the [AngularJS guide](./angularjs) for the legacy framework.

### Key Characteristics

- **Full-Featured Framework**: Complete solution with built-in routing, forms, HTTP, etc.
- **TypeScript-First**: Built with and for TypeScript
- **Component-Based**: Organized into reusable components
- **Dependency Injection**: Powerful DI system built-in
- **RxJS Integration**: Reactive programming with Observables
- **Two-Way Data Binding**: Automatic sync between model and view
- **Opinionated**: Clear structure and conventions
- **CLI Tooling**: Powerful command-line interface

## Quick Start

### Installation

```bash
# Install Angular CLI globally
npm install -g @angular/cli

# Check version
ng version

# Create new Angular application
ng new my-app

# Options during creation:
# - Routing? Yes/No
# - Stylesheet format? CSS/SCSS/SASS/LESS

# Navigate and start
cd my-app
ng serve

# Open http://localhost:4200
```

### Project Structure

```
my-app/
├── src/
│   ├── app/
│   │   ├── app.component.ts       # Root component
│   │   ├── app.component.html     # Template
│   │   ├── app.component.css      # Styles
│   │   ├── app.component.spec.ts  # Tests
│   │   ├── app.module.ts          # Root module
│   │   └── app-routing.module.ts  # Routing config
│   ├── assets/                    # Static files
│   ├── environments/              # Environment configs
│   ├── index.html                 # Main HTML
│   ├── main.ts                    # Entry point
│   └── styles.css                 # Global styles
├── angular.json                   # Angular CLI config
├── package.json
└── tsconfig.json                  # TypeScript config
```

### Your First Component

**app.component.ts**:
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  count = 0;

  increment(): void {
    this.count++;
  }

  decrement(): void {
    this.count--;
  }
}
```

**app.component.html**:
```html
<div class="container">
  <h1>Hello Angular!</h1>
  <p>{{ title }}</p>

  <div>
    <p>Count: {{ count }}</p>
    <button (click)="increment()">Increment</button>
    <button (click)="decrement()">Decrement</button>
  </div>
</div>
```

**app.component.css**:
```css
.container {
  padding: 20px;
  text-align: center;
}

button {
  margin: 5px;
  padding: 10px 20px;
}
```

## Core Concepts

### 1. Components

Components are the building blocks of Angular applications.

**Generate a component**:
```bash
ng generate component user-card
# or shorthand
ng g c user-card
```

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
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() delete = new EventEmitter<number>();

  onDelete(): void {
    this.delete.emit(this.user.id);
  }
}
```

**user-card.component.html**:
```html
<div class="user-card">
  <h3>{{ user.name }}</h3>
  <p>{{ user.email }}</p>
  <button (click)="onDelete()">Delete</button>
</div>
```

**Usage in parent component**:
```html
<app-user-card
  [user]="selectedUser"
  (delete)="handleDelete($event)"
></app-user-card>
```

**Inline Template and Styles**:
```typescript
@Component({
  selector: 'app-greeting',
  template: `
    <div>
      <h1>Hello {{ name }}!</h1>
    </div>
  `,
  styles: [`
    h1 {
      color: blue;
    }
  `]
})
export class GreetingComponent {
  name = 'Angular';
}
```

### 2. Templates and Data Binding

Angular supports multiple types of data binding.

**Interpolation**:
```html
<h1>{{ title }}</h1>
<p>{{ 1 + 1 }}</p>
<p>{{ user.name }}</p>
<p>{{ getFullName() }}</p>
```

**Property Binding**:
```html
<!-- Bind to element properties -->
<img [src]="imageUrl" [alt]="imageAlt">
<button [disabled]="isDisabled">Click</button>

<!-- Bind to component properties -->
<app-user-card [user]="currentUser"></app-user-card>
```

**Event Binding**:
```html
<button (click)="handleClick()">Click me</button>
<input (input)="handleInput($event)">
<form (submit)="handleSubmit($event)">
```

**Two-Way Binding** (with ngModel):
```typescript
import { FormsModule } from '@angular/forms';

// Add to imports in module
```

```html
<input [(ngModel)]="username" placeholder="Username">
<p>Hello, {{ username }}</p>
```

**Attribute Binding**:
```html
<button [attr.aria-label]="actionName">Action</button>
<div [attr.data-id]="userId"></div>
```

**Class Binding**:
```html
<!-- Single class -->
<div [class.active]="isActive"></div>

<!-- Multiple classes -->
<div [class]="'class1 class2'"></div>
<div [ngClass]="{ active: isActive, disabled: isDisabled }"></div>
```

**Style Binding**:
```html
<!-- Single style -->
<div [style.color]="color"></div>
<div [style.width.px]="width"></div>

<!-- Multiple styles -->
<div [ngStyle]="{ color: textColor, 'font-size': fontSize + 'px' }"></div>
```

### 3. Directives

Directives add behavior to elements in your templates.

**Structural Directives** (change DOM structure):

```html
<!-- *ngIf - Conditional rendering -->
<div *ngIf="isLoggedIn">Welcome back!</div>
<div *ngIf="isLoggedIn; else loginTemplate">Welcome!</div>
<ng-template #loginTemplate>
  <div>Please log in</div>
</ng-template>

<!-- *ngFor - Loop through arrays -->
<ul>
  <li *ngFor="let user of users">{{ user.name }}</li>
</ul>

<!-- With index and other variables -->
<div *ngFor="let item of items; let i = index; let isFirst = first; let isLast = last">
  {{ i }}: {{ item }} (First: {{ isFirst }}, Last: {{ isLast }})
</div>

<!-- *ngSwitch - Multiple conditions -->
<div [ngSwitch]="status">
  <p *ngSwitchCase="'loading'">Loading...</p>
  <p *ngSwitchCase="'success'">Success!</p>
  <p *ngSwitchCase="'error'">Error occurred</p>
  <p *ngSwitchDefault>Unknown status</p>
</div>
```

**Attribute Directives** (change appearance or behavior):

```html
<!-- ngClass -->
<div [ngClass]="{ active: isActive, disabled: isDisabled }"></div>

<!-- ngStyle -->
<div [ngStyle]="{ color: textColor, fontSize: fontSize + 'px' }"></div>

<!-- ngModel (FormsModule required) -->
<input [(ngModel)]="name">
```

**Custom Directive**:
```bash
ng generate directive highlight
```

```typescript
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() appHighlight = 'yellow';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string): void {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

```html
<p appHighlight="lightblue">Hover over me!</p>
```

### 4. Services and Dependency Injection

Services are used for sharing data and logic across components.

**Generate a service**:
```bash
ng generate service user
# or
ng g s user
```

**user.service.ts**:
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'  // Singleton service
})
export class UserService {
  private apiUrl = 'https://api.example.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```

**Using the service in a component**:
```typescript
import { Component, OnInit } from '@angular/core';
import { UserService, User } from './user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
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

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== id);
      }
    });
  }
}
```

### 5. Lifecycle Hooks

Angular components have lifecycle hooks you can tap into.

```typescript
import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  template: '<p>Lifecycle Demo</p>'
})
export class LifecycleComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {

  // Called when input properties change
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', changes);
  }

  // Called once after first ngOnChanges
  ngOnInit(): void {
    console.log('ngOnInit - Component initialized');
    // Good place for initialization logic, API calls
  }

  // Called after view has been initialized
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit - View initialized');
    // Access child components, DOM elements
  }

  // Called just before component is destroyed
  ngOnDestroy(): void {
    console.log('ngOnDestroy - Cleanup');
    // Unsubscribe from observables, clear timers
  }
}
```

**Common Lifecycle Hook Uses**:
```typescript
export class UserComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;

  ngOnInit(): void {
    // Subscribe to data
    this.subscription = this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  ngOnDestroy(): void {
    // Clean up subscription
    this.subscription.unsubscribe();
  }
}
```

### 6. Forms

Angular provides two approaches to handling forms.

**Template-Driven Forms** (FormsModule):

```typescript
import { FormsModule } from '@angular/forms';

// Add to module imports
```

```typescript
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  onSubmit(): void {
    console.log('Form submitted', this.user);
  }
}
```

```html
<form #loginForm="ngForm" (ngSubmit)="onSubmit()">
  <div>
    <label>Email:</label>
    <input
      type="email"
      name="email"
      [(ngModel)]="user.email"
      required
      email
      #emailField="ngModel"
    >
    <div *ngIf="emailField.invalid && emailField.touched">
      <p *ngIf="emailField.errors?.['required']">Email is required</p>
      <p *ngIf="emailField.errors?.['email']">Invalid email</p>
    </div>
  </div>

  <div>
    <label>Password:</label>
    <input
      type="password"
      name="password"
      [(ngModel)]="user.password"
      required
      minlength="6"
      #passwordField="ngModel"
    >
    <div *ngIf="passwordField.invalid && passwordField.touched">
      <p *ngIf="passwordField.errors?.['required']">Password is required</p>
      <p *ngIf="passwordField.errors?.['minlength']">Min 6 characters</p>
    </div>
  </div>

  <button type="submit" [disabled]="loginForm.invalid">Login</button>
</form>
```

**Reactive Forms** (Recommended for complex forms):

```typescript
import { ReactiveFormsModule } from '@angular/forms';

// Add to module imports
```

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      name: ['', Validators.required],
      age: [null, [Validators.min(18), Validators.max(120)]]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    console.log('Form data:', this.registerForm.value);
  }
}
```

```html
<form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
  <div>
    <label>Email:</label>
    <input type="email" formControlName="email">
    <div *ngIf="submitted && f['email'].errors">
      <p *ngIf="f['email'].errors['required']">Email is required</p>
      <p *ngIf="f['email'].errors['email']">Invalid email</p>
    </div>
  </div>

  <div>
    <label>Password:</label>
    <input type="password" formControlName="password">
    <div *ngIf="submitted && f['password'].errors">
      <p *ngIf="f['password'].errors['required']">Password is required</p>
      <p *ngIf="f['password'].errors['minlength']">Min 8 characters</p>
    </div>
  </div>

  <button type="submit">Register</button>
</form>
```

### 7. Routing

```typescript
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: '**', component: NotFoundComponent }  // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

**app.component.html** (Router Outlet):
```html
<nav>
  <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
  <a routerLink="/about" routerLinkActive="active">About</a>
  <a routerLink="/users" routerLinkActive="active">Users</a>
</nav>

<router-outlet></router-outlet>
```

**Programmatic Navigation**:
```typescript
import { Router, ActivatedRoute } from '@angular/router';

export class UserListComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  navigateToUser(id: number): void {
    this.router.navigate(['/users', id]);
  }

  navigateBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
```

**Access Route Parameters**:
```typescript
import { ActivatedRoute } from '@angular/router';

export class UserDetailComponent implements OnInit {
  userId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Snapshot (one-time read)
    this.userId = this.route.snapshot.paramMap.get('id')!;

    // Observable (reactive)
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id')!;
    });
  }
}
```

### 8. Pipes

Pipes transform data in templates.

**Built-in Pipes**:
```html
<!-- Date -->
<p>{{ today | date }}</p>
<p>{{ today | date:'fullDate' }}</p>
<p>{{ today | date:'yyyy-MM-dd' }}</p>

<!-- Uppercase/Lowercase -->
<p>{{ name | uppercase }}</p>
<p>{{ name | lowercase }}</p>

<!-- Currency -->
<p>{{ price | currency }}</p>
<p>{{ price | currency:'EUR' }}</p>

<!-- Decimal -->
<p>{{ number | number:'1.2-2' }}</p>

<!-- Percent -->
<p>{{ ratio | percent }}</p>

<!-- JSON (for debugging) -->
<pre>{{ user | json }}</pre>

<!-- Slice -->
<p>{{ items | slice:0:5 }}</p>

<!-- Async (unwrap observables) -->
<p>{{ user$ | async }}</p>
```

**Custom Pipe**:
```bash
ng generate pipe truncate
```

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

```html
<p>{{ longText | truncate:100 }}</p>
<p>{{ longText | truncate:50:'---' }}</p>
```

### 9. HTTP Client

```typescript
// app.module.ts
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule]
})
export class AppModule {}
```

**Using HttpClient**:
```typescript
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.example.com';

  constructor(private http: HttpClient) {}

  // GET request
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  // GET with parameters
  searchUsers(query: string): Observable<User[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<User[]>(`${this.apiUrl}/users/search`, { params });
  }

  // POST request
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  // PUT request
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, user);
  }

  // DELETE request
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }

  // With headers
  getUserWithAuth(id: number): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json'
    });

    return this.http.get<User>(`${this.apiUrl}/users/${id}`, { headers });
  }

  // With error handling
  getUsersSafe(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }

  private getToken(): string {
    return localStorage.getItem('token') || '';
  }
}
```

## Modules

Modules organize related components, services, directives, and pipes.

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserListComponent } from './user-list/user-list.component';
import { UserCardComponent } from './user-card/user-card.component';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    UserListComponent,
    UserCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    UserService
  ],
  exports: [
    UserListComponent,
    UserCardComponent
  ]
})
export class UserModule {}
```

**Lazy Loading Modules**:
```typescript
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];
```

## RxJS and Observables

Angular heavily uses RxJS for async operations.

```typescript
import { Observable, of, from, interval } from 'rxjs';
import { map, filter, take, debounceTime, switchMap } from 'rxjs/operators';

export class ExampleComponent implements OnInit, OnDestroy {
  users$!: Observable<User[]>;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Subscribe to observable
    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe(users => {
        console.log('Users:', users);
      });

    // Transform data
    this.users$ = this.userService.getUsers().pipe(
      map(users => users.filter(u => u.isActive)),
      map(users => users.slice(0, 10))
    );

    // Search with debounce
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      switchMap(query => this.userService.search(query)),
      takeUntil(this.destroy$)
    ).subscribe(results => {
      this.searchResults = results;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

**Using async pipe in template**:
```html
<div *ngIf="users$ | async as users">
  <div *ngFor="let user of users">
    {{ user.name }}
  </div>
</div>

<div *ngIf="loading$ | async">Loading...</div>
```

## Pros and Cons

### Pros ✅

**1. Complete Framework**
- Everything included: routing, forms, HTTP, testing
- No need to choose libraries
- Consistent architecture across projects

**2. TypeScript First**
- Strong typing throughout
- Better IDE support and autocomplete
- Catch errors at compile time

**3. Powerful CLI**
- Generate components, services, modules
- Built-in development server
- Production builds optimized
- Testing and linting integrated

**4. Dependency Injection**
- Clean, testable code
- Easy to mock dependencies
- Singleton services by default

**5. Two-Way Data Binding**
- Automatic sync between model and view
- Less boilerplate for forms
- Easy to implement

**6. RxJS Integration**
- Powerful reactive programming
- Handle complex async scenarios
- Built-in operators for data transformation

**7. Enterprise-Ready**
- Used by Google and large companies
- Long-term support (LTS)
- Stable and mature
- Excellent documentation

**8. Opinionated Structure**
- Clear conventions
- Easy to onboard new developers
- Consistent codebases

**9. Built-in Features**
- Form validation
- Animations
- Internationalization (i18n)
- Accessibility tools

### Cons ❌

**1. Steep Learning Curve**
- Many concepts to learn upfront
- TypeScript, RxJS, decorators
- Complex for beginners
- More time to become productive

**2. Verbose Syntax**
- More boilerplate than React
- Decorators and metadata
- Separate template files

**3. Large Bundle Size**
- Framework overhead
- Larger initial load
- More JavaScript to download

**4. Complexity**
- Many ways to do the same thing
- RxJS can be confusing
- Over-engineering for simple apps

**5. Migration Challenges**
- Breaking changes between major versions
- Migration effort required
- AngularJS to Angular was painful

**6. Performance**
- Change detection can be slow
- Two-way binding overhead
- Need to optimize for large apps

**7. Opinionated Can Be Limiting**
- Less flexibility
- Must follow Angular way
- Harder to integrate external libraries

**8. Mobile Performance**
- Not ideal for mobile web apps
- Consider Ionic or React Native instead

## When to Use Angular

### Great For:

- **Enterprise Applications** - Large-scale, complex applications
- **Teams Preferring Structure** - Clear conventions and patterns
- **TypeScript Projects** - Already using TypeScript
- **Long-Term Projects** - Stability and LTS important
- **Full-Stack TypeScript** - With NestJS backend
- **Form-Heavy Applications** - Excellent form handling
- **Teams with Java/.NET Background** - Similar patterns
- **Projects Requiring Consistency** - Enforced best practices

### Not Ideal For:

- **Small Projects** - Too much overhead
- **Prototypes/MVPs** - Slower initial development
- **Learning JavaScript** - Too many concepts
- **Mobile-First Apps** - Use React Native or Ionic
- **Teams Preferring Flexibility** - Too opinionated
- **Rapid Iteration** - More boilerplate slows down changes
- **Static Websites** - Use static generators instead

## Popular Angular Libraries

### UI Component Libraries
- **Angular Material** - Official Material Design components
- **PrimeNG** - Rich set of UI components
- **ng-bootstrap** - Bootstrap components
- **Nebular** - Customizable UI library
- **Clarity Design System** - VMware's design system

### State Management
- **NgRx** - Redux for Angular
- **Akita** - Simple state management
- **NGXS** - Alternative to NgRx

### Forms
- **Angular Reactive Forms** - Built-in
- **Formly** - Dynamic forms
- **ng-dynamic-forms** - Form generation

### HTTP/API
- **HttpClient** - Built-in
- **Apollo Angular** - GraphQL client

### Testing
- **Jasmine** - Default testing framework
- **Karma** - Test runner
- **Protractor** - E2E (deprecated, use Cypress)
- **Cypress** - Modern E2E testing

## CLI Commands

```bash
# Create new app
ng new my-app

# Generate components
ng generate component my-component
ng g c my-component

# Generate service
ng generate service my-service
ng g s my-service

# Generate module
ng generate module my-module
ng g m my-module

# Generate directive
ng g directive my-directive

# Generate pipe
ng g pipe my-pipe

# Generate guard
ng g guard auth

# Serve app
ng serve
ng serve --open  # Open browser
ng serve --port 4300  # Custom port

# Build for production
ng build
ng build --prod
ng build --configuration production

# Run tests
ng test
ng test --code-coverage

# E2E tests
ng e2e

# Lint code
ng lint

# Update Angular
ng update @angular/cli @angular/core
```

## Best Practices

### 1. Use OnPush Change Detection

```typescript
@Component({
  selector: 'app-user-list',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {}
```

### 2. Unsubscribe from Observables

```typescript
// Using takeUntil
private destroy$ = new Subject<void>();

ngOnInit(): void {
  this.service.getData()
    .pipe(takeUntil(this.destroy$))
    .subscribe();
}

ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}
```

### 3. Use Async Pipe

```html
<!-- Let Angular handle subscriptions -->
<div *ngIf="users$ | async as users">
  <div *ngFor="let user of users">{{ user.name }}</div>
</div>
```

### 4. Lazy Load Modules

```typescript
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];
```

### 5. Use TrackBy with *ngFor

```typescript
trackByUserId(index: number, user: User): number {
  return user.id;
}
```

```html
<div *ngFor="let user of users; trackBy: trackByUserId">
  {{ user.name }}
</div>
```

## Resources

### Official Documentation
- [Angular Docs](https://angular.io/docs) - Official documentation
- [Angular CLI](https://angular.io/cli) - CLI documentation
- [Angular Tutorial](https://angular.io/tutorial) - Tour of Heroes

### Learning Resources
- [Angular University](https://angular-university.io/) - Courses and tutorials
- [Angular in Depth](https://indepth.dev/angular) - Advanced articles
- [Ultimate Courses](https://ultimatecourses.com/courses/angular) - Comprehensive course

### Tools
- [Angular DevTools](https://angular.io/guide/devtools) - Browser extension
- [StackBlitz](https://stackblitz.com/) - Online IDE for Angular

### Community
- [Angular GitHub](https://github.com/angular/angular)
- [Angular Blog](https://blog.angular.io/)
- [r/Angular2](https://www.reddit.com/r/Angular2/)

## Next Steps

After learning Angular basics:
1. **Build a full application** - Todo app, blog, e-commerce
2. **Learn NgRx** - For complex state management
3. **Master RxJS** - Essential for Angular development
4. **Testing** - Unit and E2E testing (see [Angular Testing Guide](../angular-testing))
5. **Angular Material** - Build professional UIs
6. **Performance Optimization** - OnPush, lazy loading, preloading
7. **Server-Side Rendering** - Angular Universal for SEO
8. **Progressive Web Apps** - With Angular service workers
