---
sidebar_position: 4
---

# Gatsby React Framework

Gatsby is a React-based framework for building blazing-fast websites and applications with a rich plugin ecosystem and GraphQL data layer.

## What is Gatsby?

**Gatsby** is a free, open-source framework based on React that helps developers build performant websites and applications.

**Key Features:**

- ⚛️ **React-Based** - Component-driven development
- **GraphQL Data Layer** - Unified data access
- **Rich Plugin Ecosystem** - 2500+ plugins
- 🖼️ **Image Optimization** - Automatic optimization
- **Performance** - Pre-rendering and optimization
- **Progressive Web App** - PWA out of the box
- **Security** - No servers or databases to hack
- **SEO Friendly** - Server-side rendering for crawlers

## Installation

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn

### Install Gatsby CLI

```bash
npm install -g gatsby-cli
```

### Create New Site

```bash
# Create from starter
gatsby new my-site

# Create from specific starter
gatsby new my-blog https://github.com/gatsbyjs/gatsby-starter-blog

# Create minimal site
gatsby new my-site gatsbyjs/gatsby-starter-hello-world
```

### Start Development

```bash
cd my-site
gatsby develop
```

Visit: `http://localhost:8000`

GraphiQL: `http://localhost:8000/___graphql`

## Project Structure

```
my-site/
├── src/
│   ├── components/       # React components
│   │   ├── header.js
│   │   └── layout.js
│   ├── pages/           # Page components
│   │   ├── index.js
│   │   ├── about.js
│   │   └── 404.js
│   ├── templates/       # Template components
│   │   └── blog-post.js
│   ├── images/          # Images
│   └── styles/          # CSS/Styled components
├── static/              # Static files
├── gatsby-config.js     # Site configuration
├── gatsby-node.js       # Node APIs (create pages)
├── gatsby-browser.js    # Browser APIs
├── gatsby-ssr.js        # Server-side rendering APIs
└── package.json
```

## Configuration

### gatsby-config.js

```javascript
module.exports = {
  siteMetadata: {
    title: 'My Gatsby Site',
    description: 'A site built with Gatsby',
    author: '@myusername',
    siteUrl: 'https://example.com',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/content/blog`,
      },
    },
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'My Gatsby Site',
        short_name: 'Gatsby Site',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/icon.png',
      },
    },
  ],
};
```

## Pages

### Creating Pages

Create files in `src/pages/`:

```jsx
// src/pages/index.js
import React from 'react';
import Layout from '../components/layout';

export default function Home() {
  return (
    <Layout>
      <h1>Welcome to My Site</h1>
      <p>This is built with Gatsby!</p>
    </Layout>
  );
}
```

### Dynamic Routes

```jsx
// src/pages/blog/{mdx.slug}.js
import React from 'react';
import { graphql } from 'gatsby';

export default function BlogPost({ data }) {
  return (
    <article>
      <h1>{data.mdx.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.mdx.html }} />
    </article>
  );
}

export const query = graphql`
  query($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date
      }
      html
    }
  }
`;
```

## GraphQL Data Layer

### Page Query

```jsx
import React from 'react';
import { graphql } from 'gatsby';

export default function About({ data }) {
  return (
    <div>
      <h1>{data.site.siteMetadata.title}</h1>
      <p>{data.site.siteMetadata.description}</p>
    </div>
  );
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
```

### Static Query (useStaticQuery Hook)

```jsx
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

export default function Header() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return <h1>{data.site.siteMetadata.title}</h1>;
}
```

### GraphiQL Explorer

Access at `http://localhost:8000/___graphql`

```graphql
query {
  allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
    edges {
      node {
        id
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
        }
        excerpt
        fields {
          slug
        }
      }
    }
  }
}
```

## Working with Markdown

### Install Plugins

```bash
npm install gatsby-transformer-remark
npm install gatsby-source-filesystem
```

### Configure

```javascript
// gatsby-config.js
plugins: [
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'blog',
      path: `${__dirname}/content/blog`,
    },
  },
  'gatsby-transformer-remark',
],
```

### Create Markdown Files

```markdown
---
title: "My First Post"
date: "2025-01-15"
author: "John Doe"
---

# My First Blog Post

This is my first post written in Markdown!

## Features

- Easy to write
- Clean syntax
- Supports code blocks
```

### Query Markdown

```jsx
export const query = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            date
          }
          html
          excerpt
        }
      }
    }
  }
`;
```

## Images

### Gatsby Image Plugin

```bash
npm install gatsby-plugin-image gatsby-plugin-sharp gatsby-transformer-sharp
```

### Static Images

```jsx
import { StaticImage } from 'gatsby-plugin-image';

export default function MyComponent() {
  return (
    <StaticImage
      src="../images/hero.jpg"
      alt="Hero image"
      placeholder="blurred"
      layout="constrained"
      width={800}
    />
  );
}
```

### Dynamic Images (GraphQL)

```jsx
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';

export default function BlogPost({ data }) {
  const image = getImage(data.mdx.frontmatter.featuredImage);

  return (
    <article>
      <GatsbyImage image={image} alt={data.mdx.frontmatter.title} />
      <h1>{data.mdx.frontmatter.title}</h1>
    </article>
  );
}

export const query = graphql`
  query($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        featuredImage {
          childImageSharp {
            gatsbyImageData(width: 800)
          }
        }
      }
    }
  }
`;
```

## Creating Pages Programmatically

### gatsby-node.js

```javascript
const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/blog-post.js'),
      context: {
        slug: node.fields.slug,
      },
    });
  });
};

// Add slug field
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = `/blog/${node.frontmatter.title.toLowerCase().replace(/\s+/g, '-')}/`;

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};
```

## Essential Plugins

### SEO

```bash
npm install gatsby-plugin-react-helmet react-helmet
```

```jsx
// src/components/seo.js
import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export default function SEO({ title, description }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  return (
    <Helmet>
      <title>{title} | {site.siteMetadata.title}</title>
      <meta name="description" content={description || site.siteMetadata.description} />
    </Helmet>
  );
}
```

### Styling

#### CSS Modules
```jsx
import * as styles from './header.module.css';

export default function Header() {
  return <h1 className={styles.title}>Hello</h1>;
}
```

#### Styled Components
```bash
npm install gatsby-plugin-styled-components styled-components babel-plugin-styled-components
```

```jsx
import styled from 'styled-components';

const Title = styled.h1`
  color: rebeccapurple;
  font-size: 2rem;
`;

export default function Header() {
  return <Title>Hello</Title>;
}
```

#### Tailwind CSS
```bash
npm install -D tailwindcss gatsby-plugin-postcss
npx tailwindcss init
```

### Analytics

```bash
npm install gatsby-plugin-google-gtag
```

```javascript
// gatsby-config.js
{
  resolve: 'gatsby-plugin-google-gtag',
  options: {
    trackingIds: ['GA-TRACKING_ID'],
  },
},
```

## Content Sources

### CMS Integration

#### Contentful
```bash
npm install gatsby-source-contentful
```

```javascript
{
  resolve: 'gatsby-source-contentful',
  options: {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  },
},
```

#### WordPress
```bash
npm install gatsby-source-wordpress
```

```javascript
{
  resolve: 'gatsby-source-wordpress',
  options: {
    url: 'https://your-wordpress-site.com/graphql',
  },
},
```

#### Sanity
```bash
npm install gatsby-source-sanity
```

```javascript
{
  resolve: 'gatsby-source-sanity',
  options: {
    projectId: 'your-project-id',
    dataset: 'production',
  },
},
```

## Build & Deployment

### Build for Production

```bash
gatsby build
```

Output in `public/` folder.

### Serve Locally

```bash
gatsby serve
```

### Environment Variables

```bash
# .env.development
CONTENTFUL_SPACE_ID=xxxxx
CONTENTFUL_ACCESS_TOKEN=xxxxx

# .env.production
CONTENTFUL_SPACE_ID=xxxxx
CONTENTFUL_ACCESS_TOKEN=xxxxx
```

Use in config:
```javascript
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});
```

### Netlify

```toml
# netlify.toml
[build]
  publish = "public"
  command = "gatsby build"

[[plugins]]
  package = "netlify-plugin-gatsby-cache"
```

### Vercel

Vercel auto-detects Gatsby projects.

```json
{
  "buildCommand": "gatsby build",
  "outputDirectory": "public"
}
```

### GitHub Actions

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: gatsby build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

## Performance Optimization

### Image Optimization
- Use `gatsby-plugin-image`
- Lazy load images
- Serve WebP format
- Responsive images

### Code Splitting
- Dynamic imports
- Route-based splitting
- Component-based splitting

```jsx
import React, { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### Prefetching
```jsx
import { Link } from 'gatsby';

// Automatically prefetches on hover
<Link to="/blog/">Blog</Link>
```

## Best Practices

### Performance
- Optimize images with gatsby-plugin-image
- Use lazy loading for heavy components
- Minimize bundle size
- Enable caching
- Use CDN for static assets

### SEO
- Add meta tags with React Helmet
- Generate sitemap
- Add robots.txt
- Use semantic HTML
- Optimize for Core Web Vitals

### Development
- Use TypeScript for type safety
- Implement error boundaries
- Test with Jest and Testing Library
- Use ESLint and Prettier
- Version control with Git

### Accessibility
- Use semantic HTML elements
- Add alt text to images
- Ensure keyboard navigation
- Test with screen readers
- Maintain color contrast

## Troubleshooting

### Clear Cache

```bash
gatsby clean
```

### Build Errors

Check Node version:
```bash
node --version  # Should be 18+
```

### GraphQL Errors

Explore schema in GraphiQL:
```bash
gatsby develop
# Visit http://localhost:8000/___graphql
```

### Memory Issues

Increase Node memory:
```bash
NODE_OPTIONS="--max-old-space-size=4096" gatsby build
```

## Gatsby vs Other Frameworks

| Feature | Gatsby | Next.js | Hugo |
|---------|--------|---------|------|
| **Framework** | React | React | Go |
| **Data Layer** | GraphQL | Props/API | Files |
| **Plugins** | 2500+ | Many | Themes |
| **Learning Curve** | Moderate | Moderate | Easy |
| **Build Speed** | Slower | Fast | Very Fast |
| **SSR** | No | Yes | No |
| **Best For** | Content sites | Apps | Blogs |

## Resources

- [Gatsby Documentation](https://www.gatsbyjs.com/docs/)
- [Gatsby Starters](https://www.gatsbyjs.com/starters/)
- [Gatsby Plugins](https://www.gatsbyjs.com/plugins/)
- [Gatsby Tutorial](https://www.gatsbyjs.com/tutorial/)
- [Gatsby Discord](https://gatsby.dev/discord)

## Quick Reference

```bash
# Install CLI
npm install -g gatsby-cli

# Create new site
gatsby new my-site

# Development
gatsby develop

# Build
gatsby build

# Serve production build
gatsby serve

# Clean cache
gatsby clean

# Get info
gatsby info
```
