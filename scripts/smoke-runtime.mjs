const target = process.env.PACKAGE_IMPORT;

if (!target) {
  throw new Error('PACKAGE_IMPORT is required for the runtime smoke test.');
}

const mod = await import(target);

for (const exportName of [
  'MarkdownReact',
  'compileMarkdownToModule',
  'createMarkdownComponent',
  'listTemplates',
  'parseMarkdown',
]) {
  if (!(exportName in mod)) {
    throw new Error(`Missing export ${exportName}`);
  }
}

const source = mod.compileMarkdownToModule('# Smoke test', { componentName: 'SmokePage' });
if (!source.includes('function SmokePage()')) {
  throw new Error('Compiled module smoke output is missing the component.');
}

console.log(`Runtime smoke import passed for ${target}.`);
