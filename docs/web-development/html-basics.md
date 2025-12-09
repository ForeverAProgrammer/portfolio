---
sidebar_position: 2
---

# HTML Basics

HTML (HyperText Markup Language) is the standard markup language for creating web pages. This guide covers essential concepts to get you started quickly.

## Basic HTML Structure

Every HTML document follows this basic structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
</head>
<body>
    <!-- Your content goes here -->
</body>
</html>
```

## Essential Elements

### Document Declaration
```html
<!DOCTYPE html>
```
- Tells the browser this is an HTML5 document
- Always the first line
- Not case-sensitive but conventionally uppercase

### HTML Element
```html
<html lang="en">
```
- Root element of the page
- `lang` attribute specifies the page language

### Head Section
Contains metadata about the document:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Page description for SEO">
    <title>Page Title (appears in browser tab)</title>
    <link rel="stylesheet" href="styles.css">
    <script src="script.js"></script>
</head>
```

## Headings

HTML provides six levels of headings:

```html
<h1>Main Heading - Use only once per page</h1>
<h2>Secondary Heading</h2>
<h3>Tertiary Heading</h3>
<h4>Fourth Level Heading</h4>
<h5>Fifth Level Heading</h5>
<h6>Sixth Level Heading</h6>
```

**Best Practices:**
- Use **only one `<h1>`** per page (for SEO and accessibility)
- Follow **hierarchical order** (don't skip levels)
- Headings create document **outline/structure**

## Text Content

### Paragraphs
```html
<p>This is a paragraph of text.</p>
```

### Line Breaks
```html
<p>First line<br>Second line</p>
```

### Text Formatting
```html
<strong>Bold (semantic - important text)</strong>
<b>Bold (visual only)</b>
<em>Italic (semantic - emphasized text)</em>
<i>Italic (visual only)</i>
<mark>Highlighted text</mark>
<small>Small text</small>
<del>Deleted text</del>
<ins>Inserted text</ins>
<sub>Subscript</sub>
<sup>Superscript</sup>
```

**Use semantic tags** (`<strong>`, `<em>`) for better accessibility and SEO.

## Links

### Basic Link
```html
<a href="https://example.com">Link text</a>
```

### Link to Another Page
```html
<a href="about.html">About Us</a>
```

### Open in New Tab
```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">External Link</a>
```

### Email Link
```html
<a href="mailto:email@example.com">Send Email</a>
```

### Phone Link
```html
<a href="tel:+1234567890">Call Us</a>
```

### Anchor Links (Same Page)
```html
<a href="#section-id">Jump to Section</a>

<!-- Later in the page -->
<h2 id="section-id">Section Title</h2>
```

## Lists

### Unordered List (Bullets)
```html
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
```

### Ordered List (Numbered)
```html
<ol>
    <li>First step</li>
    <li>Second step</li>
    <li>Third step</li>
</ol>
```

### Nested Lists
```html
<ul>
    <li>Main item 1
        <ul>
            <li>Sub-item 1</li>
            <li>Sub-item 2</li>
        </ul>
    </li>
    <li>Main item 2</li>
</ul>
```

## Images

### Basic Image
```html
<img src="image.jpg" alt="Description of image">
```

### Image with Width/Height
```html
<img src="image.jpg" alt="Description" width="300" height="200">
```

### Responsive Image
```html
<img src="image.jpg" alt="Description" style="max-width: 100%; height: auto;">
```

**Important:**
- **Always include `alt` attribute** for accessibility
- Use descriptive alt text for screen readers
- Specify dimensions to prevent layout shift

## Divisions and Spans

### Block-level Container
```html
<div class="container">
    <p>Content inside a div</p>
</div>
```

### Inline Container
```html
<p>This is <span class="highlight">highlighted text</span> in a paragraph.</p>
```

## Semantic HTML5 Elements

Use semantic elements for better structure and accessibility:

```html
<header>
    <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
        </ul>
    </nav>
</header>

<main>
    <article>
        <h1>Article Title</h1>
        <p>Article content...</p>
    </article>

    <aside>
        <h2>Related Content</h2>
        <p>Sidebar content...</p>
    </aside>
</main>

<footer>
    <p>&copy; 2025 Your Name</p>
</footer>
```

## Forms

### Basic Form
```html
<form action="/submit" method="POST">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>

    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="4"></textarea>

    <button type="submit">Submit</button>
</form>
```

### Common Input Types
```html
<input type="text">        <!-- Text -->
<input type="email">       <!-- Email -->
<input type="password">    <!-- Password -->
<input type="number">      <!-- Number -->
<input type="date">        <!-- Date picker -->
<input type="checkbox">    <!-- Checkbox -->
<input type="radio">       <!-- Radio button -->
<input type="file">        <!-- File upload -->
```

## Tables

```html
<table>
    <thead>
        <tr>
            <th>Header 1</th>
            <th>Header 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Data 1</td>
            <td>Data 2</td>
        </tr>
        <tr>
            <td>Data 3</td>
            <td>Data 4</td>
        </tr>
    </tbody>
</table>
```

## Comments

```html
<!-- This is a comment and won't be displayed -->
```

## Best Practices

1. 📋 **Use semantic HTML** - choose tags based on meaning, not appearance
2. ✅ **Validate your HTML** - use [W3C Validator](https://validator.w3.org/)
3. 📝 **Indent properly** - makes code readable
4. 🔒 **Close all tags** - even optional ones for consistency
5. 🔤 **Use lowercase** - for tag names and attributes
6. 💬 **Quote attributes** - always use quotes around attribute values
7. 🖼️ **Include alt text** - for all images
8. 1️⃣ **One h1 per page** - for SEO and accessibility
9. 🎨 **Separate structure from style** - use CSS for styling
10. ♿ **Test accessibility** - use screen readers and keyboard navigation

## Quick Reference

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
</head>
<body>
    <header>
        <h1>Welcome to My Website</h1>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article>
            <h2>Article Title</h2>
            <p>This is a <strong>paragraph</strong> with <em>emphasis</em>.</p>
            <img src="image.jpg" alt="Description">
            <a href="https://example.com">Learn More</a>
        </article>
    </main>

    <footer>
        <p>&copy; 2025 Your Name. All rights reserved.</p>
    </footer>
</body>
</html>
```

## Resources

- [MDN HTML Documentation](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [W3Schools HTML Tutorial](https://www.w3schools.com/html/)
- [HTML5 Specification](https://html.spec.whatwg.org/)
- [Can I Use](https://caniuse.com/) - Browser compatibility
