import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const rootPackage = JSON.parse(readFileSync('package.json', 'utf8'));
const tarball = process.argv[2] || process.env.PACKAGE_TARBALL;

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

if (tarball) {
  const tarballPath = resolve(tarball);
  const entries = execFileSync('tar', ['-tzf', tarballPath], { encoding: 'utf8' })
    .split(/\r?\n/)
    .filter(Boolean);

  for (const requiredEntry of [
    'package/package.json',
    'package/README.md',
    'package/dist/index.js',
    'package/dist/index.d.ts',
    'package/dist/style.css',
  ]) {
    assert(entries.includes(requiredEntry), `Packed artifact is missing ${requiredEntry}`);
  }

  assert(!entries.some((entry) => entry.startsWith('package/src/')), 'Packed artifact includes source files.');
  assert(!entries.some((entry) => entry.startsWith('package/.github/')), 'Packed artifact includes CI metadata.');

  const packedPackage = JSON.parse(
    execFileSync('tar', ['-xOf', tarballPath, 'package/package.json'], { encoding: 'utf8' }),
  );

  assert(packedPackage.name === rootPackage.name, `Expected package ${rootPackage.name}, got ${packedPackage.name}`);
  assert(packedPackage.version === rootPackage.version, `Expected version ${rootPackage.version}, got ${packedPackage.version}`);
  assert(packedPackage.exports?.['.']?.import === './dist/index.js', 'Package export does not point at dist/index.js.');

  console.log(`Packed artifact smoke test passed for ${packedPackage.name}@${packedPackage.version}.`);
  process.exit(0);
}

execFileSync(
  process.execPath,
  [
    '--import',
    resolve('scripts/register-ignore-css-loader.mjs'),
    resolve('scripts/smoke-runtime.mjs'),
  ],
  {
    env: {
      ...process.env,
      PACKAGE_IMPORT: pathToFileURL(resolve('dist/index.js')).href,
    },
    stdio: 'inherit',
  },
);

console.log(`Dist smoke test passed for ${rootPackage.name}@${rootPackage.version}.`);
