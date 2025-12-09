---
sidebar_position: 3
---

# ⚛️ Docusaurus Documentation Generator

Docusaurus is a modern static website generator specifically designed for creating beautiful documentation websites with ease.

## What is Docusaurus?

**Docusaurus** is a React-based static site generator built by Meta (Facebook) that makes it easy to maintain open source documentation websites.

**Key Features:**

- **Built for Documentation** - Optimized for technical docs
- ⚛️ **React-Powered** - Modern React-based architecture
- **Markdown/MDX** - Write in Markdown with React components
- **Built-in Search** - Algolia DocSearch integration
- **i18n Support** - Multi-language documentation
- **Versioning** - Manage multiple documentation versions
- **Themeable** - Customizable design
- **Fast** - Optimized build and runtime performance

## Installation

### Prerequisites
- Node.js 18.0 or higher
- npm, yarn, or pnpm

### Create New Site

```bash
npx create-docusaurus@latest my-website classic
cd my-website
```

### Start Development Server

```bash
npm start
# or
yarn start
```

Visit: `http://localhost:3000`

## Project Structure

```
my-website/
├── blog/                   # Blog posts (optional)
│   ├── 2024-01-15-post.md
│   └── authors.yml
├── docs/                   # Documentation files
│   ├── intro.md
│   ├── tutorial-basics/
│   └── tutorial-extras/
├── src/
│   ├── components/        # React components
│   ├── css/              # Custom CSS
│   └── pages/            # Custom pages
├── static/               # Static assets
│   └── img/
├── docusaurus.config.js  # Site configuration
├── sidebars.js          # Sidebar structure
└── package.json
```

## Configuration

### docusaurus.config.js

```javascript
// @ts-check
const {themes} = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'My Documentation',
  tagline: 'Making documentation easy',
  favicon: 'img/favicon.ico',

  url: 'https://docs.example.com',
  baseUrl: '/',

  organizationName: 'my-org',
  projectName: 'my-project',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/my-org/my-project/tree/main/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/my-org/my-project/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'My Docs',
        logo: {
          alt: 'Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorial',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/my-org/my-project',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/...',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/...',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project.`,
      },
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
      },
    }),
};

module.exports = config;
```

## Writing Documentation

### Creating Docs

Create Markdown files in the `docs/` folder:

```markdown
---
sidebar_position: 1
---

# Getting Started

Welcome to the documentation!

## Installation

Install the package:

\`\`\`bash
npm install my-package
\`\`\`

## Quick Start

\`\`\`javascript
import MyPackage from 'my-package';

const app = new MyPackage();
app.start();
\`\`\`
```

### Frontmatter Options

```markdown
---
id: my-doc              # Document ID
title: My Document      # Page title
sidebar_label: Short    # Sidebar label
sidebar_position: 1     # Order in sidebar
description: SEO desc   # Meta description
keywords: [key, words]  # SEO keywords
tags: [demo, tutorial]  # Document tags
---
```

### Using MDX (React Components)

```mdx
---
title: Interactive Docs
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Code Tabs

<Tabs>
  <TabItem value="js" label="JavaScript">
    \`\`\`javascript
    console.log('Hello from JS');
    \`\`\`
  </TabItem>
  <TabItem value="py" label="Python">
    \`\`\`python
    print('Hello from Python')
    \`\`\`
  </TabItem>
</Tabs>
```

## Sidebar Configuration

### sidebars.js

```javascript
// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: ['installation', 'configuration', 'quick-start'],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: ['guides/basics', 'guides/advanced'],
    },
    {
      type: 'link',
      label: 'External Link',
      href: 'https://example.com',
    },
  ],
};

module.exports = sidebars;
```

### Auto-Generated Sidebar

```javascript
const sidebars = {
  tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],
};
```

## Versioning Documentation

### Create Version

```bash
npm run docusaurus docs:version 1.0.0
```

This creates:
```
versioned_docs/version-1.0.0/   # Docs for v1.0.0
versioned_sidebars/              # Sidebars for v1.0.0
versions.json                    # Version list
```

### Version Dropdown

Automatically added to navbar:

```javascript
themeConfig: {
  navbar: {
    items: [
      {
        type: 'docsVersionDropdown',
        position: 'left',
      },
    ],
  },
},
```

## Internationalization (i18n)

### Enable i18n

```javascript
// docusaurus.config.js
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'es', 'fr', 'de'],
},
```

### Translate Documents

```bash
# Create translation files
npm run write-translations -- --locale fr

# Folder structure
i18n/
  fr/
    docusaurus-plugin-content-docs/
      current/
        intro.md
    docusaurus-theme-classic/
      navbar.json
      footer.json
```

### Translate Content

```markdown
<!-- i18n/fr/docusaurus-plugin-content-docs/current/intro.md -->
---
sidebar_position: 1
---

# Commencer

Bienvenue dans la documentation!
```

### Build with Locale

```bash
npm run build -- --locale fr
```

## Search Integration

### Algolia DocSearch

```javascript
// docusaurus.config.js
themeConfig: {
  algolia: {
    appId: 'YOUR_APP_ID',
    apiKey: 'YOUR_SEARCH_API_KEY',
    indexName: 'YOUR_INDEX_NAME',
    contextualSearch: true,
  },
},
```

### Apply for DocSearch

1. Visit [DocSearch Apply](https://docsearch.algolia.com/apply/)
2. Submit your documentation URL
3. Wait for approval
4. Add credentials to config

## Customization

### Custom CSS

```css
/* src/css/custom.css */

:root {
  --ifm-color-primary: #2e8555;
  --ifm-color-primary-dark: #29784c;
  --ifm-code-font-size: 95%;
}

.hero {
  background-color: var(--ifm-color-primary);
  padding: 4rem 0;
}
```

### Custom React Components

```jsx
// src/components/Highlight.js
import React from 'react';

export default function Highlight({children, color}) {
  return (
    <span
      style={{
        backgroundColor: color,
        borderRadius: '2px',
        color: '#fff',
        padding: '0.2rem',
      }}>
      {children}
    </span>
  );
}
```

Use in MDX:
```mdx
import Highlight from '@site/src/components/Highlight';

This is <Highlight color="#25c2a0">highlighted</Highlight> text.
```

### Swizzling Components

```bash
# Eject component for full customization
npm run swizzle @docusaurus/theme-classic Footer -- --eject

# Wrap component to extend functionality
npm run swizzle @docusaurus/theme-classic NavBar -- --wrap
```

## Blog Features

### Creating Blog Posts

```markdown
---
slug: my-first-post
title: My First Blog Post
authors:
  name: John Doe
  title: Developer
  url: https://github.com/johndoe
  image_url: https://github.com/johndoe.png
tags: [hello, docusaurus]
---

Blog post content here.

<!--truncate-->

Content below the fold.
```

### Authors Configuration

```yaml
# blog/authors.yml
john:
  name: John Doe
  title: Developer
  url: https://github.com/johndoe
  image_url: https://github.com/johndoe.png

jane:
  name: Jane Smith
  title: Tech Lead
  url: https://github.com/janesmith
  image_url: https://github.com/janesmith.png
```

Use in post:
```markdown
---
authors: [john, jane]
---
```

## Admonitions (Callouts)

```markdown
:::note
This is a note
:::

:::tip
Helpful tip here
:::

:::info
Useful information
:::

:::caution
Warning message
:::

:::danger
Danger/error message
:::

:::note Custom Title
Custom note with title
:::
```

## Code Blocks

### Syntax Highlighting

````markdown
```javascript title="example.js"
function hello() {
  console.log('Hello, world!');
}
```
````

### Line Highlighting

````markdown
```javascript {2-3}
function hello() {
  console.log('Hello');  // highlighted
  console.log('World');  // highlighted
}
```
````

### Line Numbers

````markdown
```javascript showLineNumbers
function hello() {
  console.log('Hello, world!');
}
```
````

## Deployment

### Netlify

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Vercel

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "framework": "docusaurus"
}
```

### GitHub Pages

```bash
# Set in docusaurus.config.js
organizationName: 'your-org'
projectName: 'your-repo'

# Deploy
GIT_USER=<username> npm run deploy
```

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: npm

      - name: Install dependencies
        run: npm ci
      - name: Build website
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

## Plugins

### Official Plugins

```javascript
// docusaurus.config.js
plugins: [
  '@docusaurus/plugin-content-blog',
  '@docusaurus/plugin-content-docs',
  '@docusaurus/plugin-content-pages',
  '@docusaurus/plugin-sitemap',
  '@docusaurus/plugin-google-analytics',
],
```

### Community Plugins

```bash
npm install docusaurus-plugin-sass
```

```javascript
plugins: ['docusaurus-plugin-sass'],
```

## Best Practices

### Documentation Structure
- Organize by topic, not by type
- Start with getting started guide
- Include code examples
- Add screenshots/diagrams
- Link related pages

### Content
- Write clear, concise content
- Use consistent terminology
- Include real-world examples
- Keep it up-to-date
- Add search keywords

### Performance
- Optimize images (WebP format)
- Minimize custom JavaScript
- Use code splitting
- Enable caching
- Lazy load components

### SEO
- Add meta descriptions
- Use descriptive titles
- Generate sitemap
- Add structured data
- Use semantic HTML

## Troubleshooting

### Build Errors

```bash
# Clear cache
npm run clear

# Clean rebuild
npm run clear && npm run build
```

### Port Already in Use

```bash
npm start -- --port 3001
```

### Broken Links

Enable in config:
```javascript
onBrokenLinks: 'throw',
onBrokenMarkdownLinks: 'warn',
```

## Resources

- [Docusaurus Documentation](https://docusaurus.io/)
- [Docusaurus Showcase](https://docusaurus.io/showcase)
- [Community Plugins](https://docusaurus.io/community/resources)
- [Discord Community](https://discord.gg/docusaurus)
- [GitHub Repository](https://github.com/facebook/docusaurus)

## Quick Reference

```bash
# Create new site
npx create-docusaurus@latest my-site classic

# Development
npm start

# Build
npm run build

# Serve locally
npm run serve

# Deploy to GitHub Pages
npm run deploy

# Create version
npm run docusaurus docs:version 1.0.0

# Clear cache
npm run clear

# Write translations
npm run write-translations -- --locale fr
```
