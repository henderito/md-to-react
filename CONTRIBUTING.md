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
   Before committing, ensure your code passes typechecking, tests, and builds successfully. (Our Husky pre-commit hook will also enforce this automatically):
   ```bash
   npm run typecheck
   npm run test
   npm run build
   ```

## Commit Guidelines

Our automated CI/CD pipeline relies on specific commit messages and changelog modifications to publish new versions.

1. **Update `changelog.md`**: If your pull request introduces a new feature or fixes a bug, you must add an entry to `changelog.md` detailing your changes.
2. **Version Bump Tags**: When you run `git commit`, our local Husky hook will interactively ask if your commit contains a version bump. If your PR should trigger a release, select the appropriate bump type (`patch`, `minor`, or `major`). This will append a tag like `[patch]` to your commit message.
   *Note: If you are using a Git GUI to commit instead of the terminal, the interactive prompt may fail or be skipped. In that case, you must manually append `[patch]`, `[minor]`, or `[major]` to your commit message.*

## Pull Request Process

1. Push your changes to your fork.
2. Open a Pull Request against the `master` branch.
3. The CI pipeline will run validation checks against your PR. It will enforce that your PR title or commit messages contain a valid version bump tag, and that `changelog.md` has been modified.
4. Once tests pass and the PR is approved, a maintainer will merge it. The automated pipeline will then publish the new version to NPM.

## Code Style

- We use standard TypeScript styling. 
- Ensure you do not leave `console.log` statements in production code.
- Add test coverage in `src/*.test.ts` or `src/*.test.tsx` for any new parsing logic or React components.
