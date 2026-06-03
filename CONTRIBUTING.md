# Contributing to @henderito/md-to-react

First off, thank you for considering contributing to `md-to-react`! 

## Local Development Setup

1. **Fork and clone** the repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/md-to-react.git
   cd md-to-react
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
   *Note: This will automatically set up local Git hooks via Husky.*

3. **Make your changes**.

4. **Verify your changes**:
   Before committing, ensure your code passes linting, typechecking, tests, and builds successfully. (Our Husky pre-commit hook will also enforce this automatically):
   ```bash
   npm run lint
   npm run typecheck
   npm run test:unit
   npm run test:integration
   npm run build
   npm run smoke
   ```

## Commit Guidelines

Our automated CI/CD pipeline uses conventional pull request titles and Release Please to prepare releases.

1. Use conventional PR titles, for example `fix: handle nested list tokens` or `feat: add article block`.
2. Include tests for parser, rendering, or packaging behavior when the change affects those areas.
3. Release Please manages the release pull request, changelog update, GitHub release, and npm package version.

## Pull Request Process

1. Push your changes to your fork.
2. Open a Pull Request against the active development branch.
3. The CI pipeline will lint, typecheck, run unit and integration tests, audit dependencies, scan for secrets, build the package, generate an SBOM, smoke-test the packed artifact, and run an npm publish dry-run.
4. Production npm publishing only runs from `main` or `master` when Release Please creates a release, and the `production` GitHub Environment can require maintainer approval.
5. After publishing, CI installs the published package, monitors the npm registry dist-tag, and can roll the dist-tag back to `vars.NPM_ROLLBACK_VERSION` if smoke tests or monitoring fail.

## Code Style

- We use standard TypeScript styling. 
- Ensure you do not leave `console.log` statements in production code.
- Add test coverage in `src/*.test.ts` or `src/*.test.tsx` for any new parsing logic or React components.
