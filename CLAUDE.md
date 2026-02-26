# CLAUDE.md

## Project Overview

Personal portfolio and technical knowledge base for Kristina Haynes (DevOps Engineer & Full Stack Developer).
Built with Docusaurus 3.9.2, React 19, deployed to GitHub Pages at `kristina.codes`.

## Key Commands

```bash
npm start          # Local dev server (http://localhost:3000/)
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

## Markdown Lint Rules

- **MD032** — Lists must be surrounded by blank lines. Always add a blank line before and after any ordered or unordered list, including lists that immediately follow bold label text like `**Common Scenarios:**`.

## Docusaurus-Specific Notes

- Base URL is `/` — all internal absolute links start with `/docs/...`, `/blog/...`, etc.
- Broken links are configured to throw build errors (`onBrokenLinks: 'throw'`)
- Cross-directory doc links (e.g. from `behavioral/` to `design-patterns/`) must use absolute paths like `/docs/design-patterns/class-and-object-patterns` — relative `../` links do not resolve correctly inside admonition blocks with `trailingSlash: true`
- `trailingSlash: true` is set — **do not remove this**. Without it, category index pages (e.g. `docs/cloud/aws/index.md`) are served without a trailing slash, causing relative links like `./cloudformation` to resolve one level too high (e.g. `/docs/cloud/cloudformation` instead of `/docs/cloud/aws/cloudformation`)
- **Static file links in navbar/footer config** must use full absolute URLs (e.g. `https://kristina.codes/files/resume.pdf`), NOT root-relative paths like `/files/resume.pdf`. Docusaurus processes navbar `href` values through `useBaseUrl` with `forcePrependBaseUrl`, and `trailingSlash: true` causes it to append a trailing slash — turning `/files/resume.pdf` into `/files/resume.pdf/` (broken). Full URLs with a protocol are treated as external and left unchanged. React page `<a href>` tags are unaffected and can safely use root-relative paths.
- Syntax highlighting uses GitHub theme (light) and Dracula (dark)
- MDX is supported in both docs and blog — React components can be embedded in Markdown
- Mermaid diagrams are enabled via `@docusaurus/theme-mermaid` — use fenced ` ```mermaid ` blocks in any Markdown file

## Deployment

- Target: `https://kristina.codes`
- Custom domain configured via `static/CNAME`
- Branch: `gh-pages` (auto-managed by `npm run deploy`)
- The `static/.nojekyll` file disables Jekyll — do not remove it
