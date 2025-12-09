---
sidebar_position: 2
---

# Hugo Static Site Generator

Hugo is one of the fastest and most popular static site generators. It's written in Go and excels at building blogs, documentation sites, and portfolios.

## What is Hugo?

**Hugo** is a static site generator that converts Markdown content into a complete HTML website. Unlike WordPress or dynamic CMSs, Hugo generates all pages at build time, resulting in:

- **Blazing fast** performance
- **Better security** (no database or server-side code)
- **Lower hosting costs** (can host on GitHub Pages, Netlify, etc.)
- **Simple content management** with Markdown files

## Installation

### macOS
```bash
brew install hugo
```

### Ubuntu/Debian
```bash
sudo apt-get install hugo
```

### Windows (Chocolatey)
```bash
choco install hugo-extended
```

### From Binary
Download from [Hugo Releases](https://github.com/gohugoio/hugo/releases)

### Verify Installation
```bash
hugo version
```

## Quick Start

### Create a New Site
```bash
# Create new Hugo site
hugo new site my-website
cd my-website

# Initialize git
git init

# Add a theme (using PaperMod as example)
git submodule add https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
```

### Configure Your Site
Edit `config.toml` (or `hugo.toml` in newer versions):

```toml
baseURL = 'https://example.com/'
languageCode = 'en-us'
title = 'My Website'
theme = 'PaperMod'

[params]
  description = "My awesome website"
  author = "Your Name"

[menu]
  [[menu.main]]
    name = "Home"
    url = "/"
    weight = 1
  [[menu.main]]
    name = "Blog"
    url = "/blog/"
    weight = 2
  [[menu.main]]
    name = "About"
    url = "/about/"
    weight = 3
```

### Create Your First Post
```bash
hugo new posts/my-first-post.md
```

This creates `content/posts/my-first-post.md`:

```markdown
---
title: "My First Post"
date: 2025-01-15T10:00:00-00:00
draft: false
tags: ["example", "first-post"]
categories: ["blog"]
---

# Welcome to My Blog

This is my first post using Hugo!

## Why I chose Hugo

- Fast build times
- Easy to use
- Great themes available
```

### Start Development Server
```bash
hugo server -D
```

Visit: `http://localhost:1313`

The `-D` flag includes draft posts.

## Project Structure

```
my-website/
├── archetypes/        # Content templates
│   └── default.md
├── content/           # Your content (Markdown files)
│   ├── posts/
│   │   └── my-first-post.md
│   └── about.md
├── data/              # Data files (JSON, YAML, TOML)
├── layouts/           # HTML templates (overrides theme)
│   ├── _default/
│   └── partials/
├── static/            # Static assets (images, CSS, JS)
│   ├── images/
│   └── css/
├── themes/            # Hugo themes
│   └── PaperMod/
├── public/            # Generated site (git ignore this)
├── config.toml        # Site configuration
└── hugo.toml          # Alternative config name
```

## Content Organization

### Creating Pages
```bash
hugo new about.md              # Single page
hugo new posts/article.md      # Blog post
hugo new docs/guide.md         # Documentation page
```

### Front Matter (Metadata)
Every content file starts with front matter:

#### YAML Format
```yaml
---
title: "Article Title"
date: 2025-01-15T10:00:00-00:00
draft: false
description: "Article description"
tags: ["hugo", "tutorial"]
categories: ["web-development"]
author: "Your Name"
image: "/images/cover.jpg"
---
```

#### TOML Format
```toml
+++
title = "Article Title"
date = 2025-01-15T10:00:00-00:00
draft = false
tags = ["hugo", "tutorial"]
+++
```

### Content Sections
Hugo automatically creates sections from folders:

```
content/
├── posts/          → https://site.com/posts/
├── blog/           → https://site.com/blog/
├── docs/           → https://site.com/docs/
└── about.md        → https://site.com/about/
```

## Common Hugo Commands

```bash
# Create new site
hugo new site sitename

# Create new content
hugo new posts/my-post.md

# Start development server
hugo server

# Start server with drafts
hugo server -D

# Build site for production
hugo

# Build with custom destination
hugo -d docs

# Clean generated files
hugo --cleanDestinationDir

# Check for issues
hugo check
```

## Themes

### Installing a Theme

#### Method 1: Git Submodule (Recommended)
```bash
git submodule add https://github.com/username/theme-name.git themes/theme-name
```

#### Method 2: Clone Directly
```bash
cd themes
git clone https://github.com/username/theme-name.git
```

### Popular Hugo Themes
- **PaperMod** - Fast, clean blog theme
- **Ananke** - Hugo's default theme
- **Hugo Book** - Documentation theme
- **Docsy** - Documentation for projects
- **Terminal** - Developer portfolio theme
- **Academic/Wowchemy** - Academic/resume theme

Browse themes at: [themes.gohugo.io](https://themes.gohugo.io/)

### Customizing Themes
Don't edit theme files directly. Instead, override them:

```
layouts/
└── partials/
    └── header.html     # Overrides themes/theme-name/layouts/partials/header.html
```

## Shortcodes

Hugo provides built-in shortcodes for common elements:

### YouTube Video
```markdown
{{</* youtube VIDEO_ID */>}}
```

### Twitter/X Post
```markdown
{{</* tweet user="username" id="TWEET_ID" */>}}
```

### GitHub Gist
```markdown
{{</* gist username gist-id */>}}
```

### Figure/Image
```markdown
{{</* figure src="/images/example.jpg" title="Example Image" */>}}
```

### Custom Shortcode
Create `layouts/shortcodes/warning.html`:
```html
<div class="warning">
    <strong>⚠️ Warning:</strong> {{ .Inner }}
</div>
```

Use it:
```markdown
{{</* warning */>}}
This is important information!
{{</* /warning */>}}
```

## Deployment

### Build for Production
```bash
hugo --minify
```

This generates the site in the `public/` directory.

### Deploy to Netlify
1. Push your Hugo site to GitHub
2. Connect Netlify to your repo
3. Build command: `hugo --minify`
4. Publish directory: `public`

### Deploy to GitHub Pages
Add to `.github/workflows/hugo.yml`:

```yaml
name: Deploy Hugo site to Pages

on:
  push:
    branches: ["main"]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
      - name: Build
        run: hugo --minify
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

### Deploy to Vercel
```bash
vercel deploy
```

## Configuration Tips

### Enable Syntax Highlighting
```toml
[markup]
  [markup.highlight]
    style = 'monokai'
    lineNos = true
    lineNumbersInTable = true
```

### Configure Permalinks
```toml
[permalinks]
  posts = '/blog/:year/:month/:slug/'
  docs = '/documentation/:slug/'
```

### Enable Table of Contents
In front matter:
```yaml
---
toc: true
---
```

## Performance Optimization

1. **Minify output:**
   ```bash
   hugo --minify
   ```

2. **Optimize images** - Use WebP format
3. **Enable caching** - Configure HTTP headers
4. **Use CDN** - Serve static assets from CDN
5. **Lazy load images**

## Troubleshooting

### Theme Not Loading
- Check `config.toml` has correct theme name
- Ensure theme is in `themes/` directory
- Verify theme files are present (not empty folder)

### Changes Not Showing
- Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
- Clear Hugo cache: `hugo --cleanDestinationDir`
- Restart Hugo server

### Build Errors
- Check front matter syntax (YAML indentation)
- Ensure dates are valid format
- Verify shortcode syntax
- Check Hugo version compatibility with theme

## Best Practices

1. **Use Git submodules** for themes (easier updates)
2. **Don't edit theme files** directly - override in `layouts/`
3. **Use descriptive filenames** - becomes URL slug
4. **Organize content** into logical sections
5. **Set `draft: false`** before publishing
6. **Use meaningful URLs** - configure permalinks
7. **Version control** - ignore `public/` directory
8. **Test locally** before deploying
9. **Keep Hugo updated** - check for updates regularly
10. **Use archetypes** - for consistent front matter templates

## Resources

- [Hugo Documentation](https://gohugo.io/documentation/)
- [Hugo Themes](https://themes.gohugo.io/)
- [Hugo Discourse Forum](https://discourse.gohugo.io/)
- [Hugo GitHub Repository](https://github.com/gohugoio/hugo)
- [Hugo Cheat Sheet](https://github.com/lucperkins/hugo-cheat-sheet)

## Hugo vs Other Static Site Generators

| Feature | Hugo | Jekyll | Gatsby |
|---------|------|--------|--------|
| Speed | ⚡ Fastest | Slow | Moderate |
| Language | Go | Ruby | JavaScript/React |
| Setup | Simple | Moderate | Complex |
| Themes | Many | Many | React components |
| Learning Curve | Low | Low | High |
| Best For | Blogs, Docs | GitHub Pages | Complex SPAs |
