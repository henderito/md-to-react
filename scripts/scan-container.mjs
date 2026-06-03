import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { execFileSync } from 'node:child_process';

const dockerfiles = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' })
  .split('\0')
  .filter((file) => file.endsWith('Dockerfile') || file.includes('/Dockerfile.'));

if (existsSync('Dockerfile') && !dockerfiles.includes('Dockerfile')) {
  dockerfiles.push('Dockerfile');
}

if (dockerfiles.length === 0) {
  console.log('Container scan skipped: no Dockerfile is tracked in this library package.');
  process.exit(0);
}

let failureCount = 0;

for (const dockerfile of dockerfiles) {
  const content = execFileSync('sed', ['-n', '1,240p', dockerfile], { encoding: 'utf8' });
  const lines = content.split(/\r?\n/);

  lines.forEach((line, index) => {
    if (/^\s*FROM\s+[^:@\s]+(?::[^@\s]+)?\s*$/i.test(line)) {
      failureCount += 1;
      console.error(`${dockerfile}:${index + 1}: base image is not pinned by digest`);
    }

    if (/^\s*USER\s+root\b/i.test(line)) {
      failureCount += 1;
      console.error(`${dockerfile}:${index + 1}: container runs as root`);
    }
  });

  const directory = dirname(dockerfile);
  const dockerignore = join(directory === '.' ? '' : directory, '.dockerignore');
  if (!existsSync(dockerignore)) {
    failureCount += 1;
    console.error(`${dockerfile}: missing ${dockerignore || '.dockerignore'}`);
  }
}

if (failureCount > 0) {
  console.error(`Container scan failed with ${failureCount} finding(s).`);
  process.exit(1);
}

console.log(`Container scan passed for ${dockerfiles.length} Dockerfile(s).`);
