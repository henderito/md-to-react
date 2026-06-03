import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const ignoredExtensions = new Set([
  '.css',
  '.lock',
  '.svg',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
]);

const ignoredFiles = new Set(['package-lock.json']);

const checks = [
  {
    name: 'private key block',
    pattern: /-----BEGIN (?:RSA |DSA |EC |OPENSSH |PGP )?PRIVATE KEY-----/,
  },
  {
    name: 'GitHub token',
    pattern: /gh[pousr]_[A-Za-z0-9_]{36,}/,
  },
  {
    name: 'npm token',
    pattern: /npm_[A-Za-z0-9]{36,}/,
  },
  {
    name: 'AWS access key',
    pattern: /AKIA[0-9A-Z]{16}/,
  },
  {
    name: 'high-confidence secret assignment',
    pattern: /\b(?:api[_-]?key|secret|token|password)\b\s*[:=]\s*['"][^'"\s]{20,}['"]/i,
  },
];

function extensionFor(file) {
  const dot = file.lastIndexOf('.');
  return dot === -1 ? '' : file.slice(dot);
}

function trackedFiles() {
  const output = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' });
  return output.split('\0').filter(Boolean);
}

let findingCount = 0;

for (const file of trackedFiles()) {
  if (ignoredFiles.has(file) || ignoredExtensions.has(extensionFor(file))) {
    continue;
  }

  let content;
  try {
    content = readFileSync(file, 'utf8');
  } catch {
    continue;
  }

  const lines = content.split(/\r?\n/);
  for (const check of checks) {
    lines.forEach((line, index) => {
      if (check.pattern.test(line)) {
        findingCount += 1;
        console.error(`${file}:${index + 1}: possible ${check.name}`);
      }
    });
  }
}

if (findingCount > 0) {
  console.error(`Secret scan failed with ${findingCount} possible finding(s).`);
  process.exit(1);
}

console.log('Secret scan passed.');
