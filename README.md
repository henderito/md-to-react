# @henderito/md-to-react

Convert structured Markdown templates into React pages or components.

This package is intentionally smaller than MDX. You give it Markdown, pick a
template, and it renders styled React. You can also generate a TSX module string
for build-time pipelines.

## Install

```sh
npm install @henderito/md-to-react
```

React is a peer dependency.

## Runtime Rendering

```tsx
import { MarkdownReact } from '@henderito/md-to-react';

export function ProjectPage({ markdown }: { markdown: string }) {
  return <MarkdownReact markdown={markdown} template="portfolio-case-study" />;
}
```

## Create a Component

```tsx
import { createMarkdownComponent } from '@henderito/md-to-react';

const ProjectCaseStudy = createMarkdownComponent(markdown, 'portfolio-case-study');

export default ProjectCaseStudy;
```

## Generate a TSX Module

```ts
import { compileMarkdownToModule } from '@henderito/md-to-react';

const source = compileMarkdownToModule(markdown, {
  componentName: 'DocsylabsPage',
  template: 'portfolio-case-study',
});
```

The generated string imports the package and exports a React component. This is
useful inside CLIs, Vite plugins, GitHub Actions, or CMS ingestion scripts.

## Built-In Templates

```ts
import { listTemplates } from '@henderito/md-to-react';

console.log(listTemplates());
```

Included templates:

- `portfolio-case-study`: full project page with `callout`, `metrics`, `gallery`, and `timeline`.
- `article`: long-form article page with callouts.
- `component-card`: compact embeddable component.

## Markdown Format

```md
---
title: Project Name
description: A short preview.
tags:
  - React
  - TypeScript
---

# Project Name

Normal Markdown content.

::callout
Custom blocks become template-owned React components.
::

::metrics
- 50+ workflows
- 3 services
- 1 launch
::
```

Supported Markdown:

- Frontmatter with strings, numbers, booleans, arrays, and shallow objects.
- Headings.
- Paragraphs.
- Ordered and unordered lists.
- Fenced code blocks.
- Inline `strong`, `emphasis`, `code`, and links.
- Directive blocks using `::blockName` and closing `::`.

## Style Presets (Themes)

You can choose from beautiful visual themes by setting the `theme` prop:

```tsx
<MarkdownReact markdown={markdown} theme="antigravity" />
```

Available themes:
- `"antigravity"` (Default): Sleek dark IDE-inspired design with rich neon accent glows.
- `"classic"`: Elegant white-mode paper layout with clean navy and gray styling.

## Built-In Rich Components

You can write custom blocks in your Markdown using these directive containers:

*   **`::terminal`**: Beautiful mock IDE CLI window.
    ```md
    ::terminal
    $ npm run build
    Compile complete.
    ::
    ```
*   **`::file`**: Document/code editor mockup window.
    ```md
    ::file index.ts
    const title = "md-to-react";
    console.log(title);
    ::
    ```
*   **`::alert`**: Custom status alerts. Supported types: `info`, `success`, `warning`, `error`.
    ```md
    ::alert warning
    Check peer dependencies.
    ::
    ```
*   **`::badge`**: Pill-shaped classification tag block.
    ```md
    ::badge
    React, TypeScript, ESM
    ::
    ```

## Custom Templates

```tsx
import type { TemplateDefinition } from '@henderito/md-to-react';

const template: TemplateDefinition = {
  id: 'custom',
  name: 'Custom',
  description: 'My custom renderer.',
  layout: 'page',
  className: 'my-page',
  blocks: {
    hero({ node }) {
      return <section className="hero">{node.value}</section>;
    },
  },
};

<MarkdownReact markdown={markdown} template={template} />;
```

## Architecture & Development

### Parsing Engine
The package uses [marked](https://marked.js.org/) to parse Markdown into a spec-compliant Abstract Syntax Tree (AST). It includes a custom `marked` extension to support `::directive` block syntax.

### Contributing
This repository is configured with local hooks and automated CI/CD:
- **Husky Hooks**: 
  - `pre-commit`: Automatically runs typechecking, tests (`vitest`), and builds the package.
  - `prepare-commit-msg`: Intercepts `git commit` to ask if you want a version bump. If so, it appends the correct tag (`[patch]`, `[minor]`, or `[major]`) to your commit message.
- **CI/CD**: Pushes and PRs to `master` trigger an automated GitHub Actions pipeline. If a version bump tag is detected in the commit message and `changelog.md` is modified, the pipeline automatically bumps the version, pushes tags, and publishes the package to NPM.

## Current Scope

This first version (0.0.1) is a focused library scaffold: parser, renderer, templates, styles, and code generation. A future CLI could turn a folder of Markdown files into generated `.tsx` pages on disk.
