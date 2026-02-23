# CLAUDE.md

## Project Overview

Personal portfolio and technical knowledge base for Kristina Haynes (DevOps Engineer & Full Stack Developer).
Built with Docusaurus 3.9.2, React 19, deployed to GitHub Pages at `ForeverAProgrammer.github.io/portfolio/`.

## Key Commands

```bash
npm start          # Local dev server (http://localhost:3000/portfolio/)
npm run build      # Build static site to /build/
npm run serve      # Serve built site locally
npm run deploy     # Deploy to GitHub Pages (gh-pages branch)
npm run clear      # Clear Docusaurus cache
```

## Project Structure

```text
src/
  data/            # Data sources — add projects/experience here, not inline in pages
  pages/           # Custom React pages (projects/, experience.js, index.js)
  components/      # Reusable React components
  css/custom.css   # Global styles (portfolio-section, tech-badge, timeline-item)
docs/              # Technical knowledge base (auto-generates sidebar via sidebars.js)
blog/              # Blog posts with frontmatter metadata
static/            # Static assets (images, resume PDF)
```

## Content Conventions

### Design Patterns (`docs/design-patterns/`)

Content is based on the GoF book and *Head First Design Patterns*. Java is the implementation language for all examples.

Patterns are organized by two axes:

- **Purpose**: `creational/`, `structural/`, `behavioral/`
- **Scope**: class patterns (inheritance-based, fixed at compile time) vs object patterns (composition-based, configurable at runtime)

The four **class-scope patterns** are: Factory Method, Adapter (class variant), Template Method, Interpreter. All others are object patterns. See [class-and-object-patterns.md](docs/design-patterns/class-and-object-patterns.md) for details.

When adding a new pattern page, add it to both its category `index.md` and the quick-reference table in `docs/design-patterns/index.md`.

### Adding Documentation

- Place Markdown files under `docs/<category>/`
- Each category folder must have an `index.md` (Docusaurus requires it for navigation)
- Sidebar is auto-generated from directory structure (`sidebars.js`)
- Use frontmatter: `title`, `sidebar_position`, optionally `description`

### Adding Blog Posts

- Filename format: `YYYY-MM-DD-slug.md`
- Required frontmatter: `title`, `authors` (from `blog/authors.yml`), `tags` (from `blog/tags.yml`)
- Authors and tags must be pre-registered in their respective YAML files

### Adding Projects

- Edit `src/data/projects.js` — do not hardcode project data in page components
- Mark key projects with `featured: true` to appear on the homepage
- Tech stack uses string array; displayed as badges via CSS class `tech-badge`

### Adding Work Experience

- Edit `src/data/experience.js` — same data-driven pattern as projects

## Styling Conventions

- Prefer CSS modules (`.module.css`) for component-scoped styles
- Global portfolio styles live in `src/css/custom.css`
- Key CSS classes: `.portfolio-section`, `.tech-badge`, `.timeline-item`, `.tech-stack`
- Docusaurus theme variables are customized via `--ifm-*` CSS variables in `custom.css`

## Code Style

- Prettier enforced: single quotes, trailing commas (es5), 80-char prose wrap
- Run `npx prettier --write .` before committing (respects `.prettierignore`)
- File naming: kebab-case for all files and directories

## Docusaurus-Specific Notes

- Base URL is `/portfolio/` — all internal links must account for this
- Broken links are configured to throw build errors (`onBrokenLinks: 'throw'`)
- `trailingSlash: true` is set — **do not remove this**. Without it, category index pages (e.g. `docs/cloud/aws/index.md`) are served without a trailing slash, causing relative links like `./cloudformation` to resolve one level too high (e.g. `/docs/cloud/cloudformation` instead of `/docs/cloud/aws/cloudformation`)
- Syntax highlighting uses GitHub theme (light) and Dracula (dark)
- MDX is supported in both docs and blog — React components can be embedded in Markdown

## Deployment

- Target: `https://ForeverAProgrammer.github.io/portfolio/`
- Branch: `gh-pages` (auto-managed by `npm run deploy`)
- The `static/.nojekyll` file disables Jekyll — do not remove it
