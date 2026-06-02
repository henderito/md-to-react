# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

## [0.0.1] - Initial Release

### Architecture
- **Markdown Parsing Engine**: Built on top of the robust `marked` library to generate a spec-compliant Abstract Syntax Tree (AST).
- **Custom Directive Extension**: Implemented a `marked` parser extension to support custom `::directive` blocks in Markdown.
- **React Renderer**: The `MarkdownReact` component recursively traverses the AST and maps markdown tokens (e.g., headings, paragraphs, lists, tables) directly to React components.
- **Pluggable Template System**: Provides a `TemplateDefinition` registry that allows developers to completely override or extend the rendering behavior of any Markdown element or custom block directive.
- **Testing & CI**: Tested via `vitest` with React Testing Library. GitHub Actions automate npm publishing, while local Husky hooks enforce code checks and standard version-bump commit formatting.

### Added
- Core component `<MarkdownReact />` to render markdown AST into React.
- Exported utility `compileMarkdownToModule` and `createMarkdownComponent`.
- Comprehensive TypeScript definitions for all props, nodes, and templates.
- CSS styling system with `style.css` exported and tagged in `package.json` sideEffects.
- Standard Markdown support: Tables, nested lists, strong, emphasis, links, code spans, code blocks, etc.
- Husky `pre-commit` hook (typecheck, tests, build).
- Husky `prepare-commit-msg` hook with an interactive version bump prompter (`[patch]`, `[minor]`, `[major]`).
- GitHub Actions CI/CD pipeline (`ci.yml`) triggering on pushes and PRs to `master` branch.

### Fixed
- `React act(...)` warnings mitigated in test environments by properly awaiting render updates.
- Deeply nested lists and complex table parsing failures were resolved by migrating off custom regex to `marked`.
