import { marked } from 'marked';
import type { Frontmatter, FrontmatterValue, MarkdownDocument, MarkdownNode } from './types.js';

function splitFrontmatter(markdown: string) {
  if (!markdown.startsWith('---\n')) {
    return { frontmatter: '', body: markdown.trim() };
  }

  const end = markdown.indexOf('\n---', 4);
  if (end === -1) {
    throw new Error('Markdown frontmatter starts with "---" but has no closing fence.');
  }

  return {
    frontmatter: markdown.slice(4, end).trim(),
    body: markdown.slice(end + 4).trim(),
  };
}

function parseScalar(value: string): FrontmatterValue {
  const trimmed = value.trim();

  if (trimmed === '') return '';
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (trimmed === 'null') return null;
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map((item) => String(parseScalar(item)))
      .filter(Boolean);
  }

  return trimmed;
}

function parseIndentedBlock(lines: string[], startIndex: number) {
  const blockLines: string[] = [];
  let index = startIndex;

  while (index < lines.length) {
    const line = lines[index] ?? '';
    if (line.trim() === '') {
      index += 1;
      continue;
    }

    if (!line.startsWith(' ') && !line.startsWith('\t')) break;
    blockLines.push(line.trim());
    index += 1;
  }

  if (blockLines.every((line) => line.startsWith('- '))) {
    return {
      value: blockLines.map((line) => String(parseScalar(line.slice(2)))),
      nextIndex: index,
    };
  }

  const value: Record<string, string | number | boolean | null> = {};
  for (const line of blockLines) {
    const match = line.match(/^([A-Za-z0-9_-]+):(?:\s*(.*))?$/);
    if (!match) throw new Error(`Unsupported frontmatter line: "${line}"`);
    value[match[1]] = parseScalar(match[2] ?? '') as string | number | boolean | null;
  }

  return { value, nextIndex: index };
}

export function parseFrontmatter(source: string): Frontmatter {
  const result: Frontmatter = {};
  const lines = source.split('\n');
  let index = 0;

  while (index < lines.length) {
    const line = lines[index] ?? '';
    const trimmed = line.trim();

    if (trimmed === '' || trimmed.startsWith('#')) {
      index += 1;
      continue;
    }

    const match = line.match(/^([A-Za-z0-9_-]+):(?:\s*(.*))?$/);
    if (!match) throw new Error(`Unsupported frontmatter line: "${line}"`);

    const key = match[1];
    const inlineValue = match[2] ?? '';

    if (inlineValue.trim() !== '') {
      result[key] = parseScalar(inlineValue) as Frontmatter[string];
      index += 1;
      continue;
    }

    const block = parseIndentedBlock(lines, index + 1);
    result[key] = block.value;
    index = block.nextIndex;
  }

  return result;
}

const directiveExtension = {
  name: 'directive',
  level: 'block' as const,
  start(src: string) { return src.match(/^::[A-Za-z0-9_-]+/m)?.index; },
  tokenizer(src: string) {
    const rule = /^::([A-Za-z0-9_-]+)\n([\s\S]*?)\n::(?:\n|$)/;
    const match = rule.exec(src);
    if (match) {
      const name = match[1];
      const value = match[2].trim();
      const items = value.split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith('- ') || line.startsWith('* '))
        .map(line => line.slice(2));

      return {
        type: 'directive',
        raw: match[0],
        name,
        value,
        items,
      };
    }
    return undefined;
  }
};

const iconExtension = {
  name: 'icon',
  level: 'inline' as const,
  start(src: string) { return src.match(/:[a-zA-Z0-9_-]+:/)?.index; },
  tokenizer(src: string) {
    const match = /^:([a-zA-Z0-9_-]+):/.exec(src);
    if (match) {
      return {
        type: 'icon',
        raw: match[0],
        name: match[1],
      };
    }
    return undefined;
  }
};

marked.use({ extensions: [directiveExtension, iconExtension] });

export function parseMarkdown(markdown: string): MarkdownDocument {
  const { frontmatter, body } = splitFrontmatter(markdown);
  const nodes = (marked.lexer(body) as MarkdownNode[]).filter(n => n.type !== 'space');

  return {
    frontmatter: parseFrontmatter(frontmatter),
    nodes,
    rawBody: body,
  };
}
