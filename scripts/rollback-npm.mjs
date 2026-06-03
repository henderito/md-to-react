import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const rootPackage = JSON.parse(readFileSync('package.json', 'utf8'));
const packageName = process.env.PACKAGE_NAME || rootPackage.name;
const currentVersion = process.env.PACKAGE_VERSION || rootPackage.version;
const rollbackVersion = process.env.NPM_ROLLBACK_VERSION || process.env.ROLLBACK_VERSION;
const distTag = process.env.NPM_DIST_TAG || 'latest';
const dryRun = process.env.ROLLBACK_DRY_RUN !== 'false';

if (!rollbackVersion) {
  console.error('Rollback version is required. Set NPM_ROLLBACK_VERSION to the healthy version that should receive the dist-tag.');
  process.exit(1);
}

const commands = [
  ['npm', ['dist-tag', 'add', `${packageName}@${rollbackVersion}`, distTag]],
];

if (process.env.NPM_DEPRECATE_UNHEALTHY === 'true') {
  commands.push([
    'npm',
    [
      'deprecate',
      `${packageName}@${currentVersion}`,
      `Rolled back from ${currentVersion} to ${rollbackVersion}.`,
    ],
  ]);
}

for (const [command, args] of commands) {
  console.log(`${dryRun ? '[dry-run] ' : ''}${command} ${args.join(' ')}`);
  if (!dryRun) {
    execFileSync(command, args, { stdio: 'inherit' });
  }
}

console.log(`Rollback ${dryRun ? 'plan prepared' : 'completed'} for ${packageName}: ${distTag} -> ${rollbackVersion}.`);
