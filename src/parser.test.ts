import { describe, it, expect } from 'vitest';
import { parseFrontmatter, parseMarkdown } from './parser.js';

describe('parseFrontmatter', () => {
  it('should parse simple key-value pairs', () => {
    const yaml = `
title: Docsylabs
year: 2024
featured: true
nullValue: null
`;
    const result = parseFrontmatter(yaml);
    expect(result).toEqual({
      title: 'Docsylabs',
      year: 2024,
      featured: true,
      nullValue: null,
    });
  });

  it('should parse inline arrays', () => {
    const yaml = `
tags: [React, TypeScript, CSS]
`;
    const result = parseFrontmatter(yaml);
    expect(result).toEqual({
      tags: ['React', 'TypeScript', 'CSS'],
    });
  });

  it('should parse block list arrays', () => {
    const yaml = `
technologies:
  - React
  - TypeScript
  - Node.js
`;
    const result = parseFrontmatter(yaml);
    expect(result).toEqual({
      technologies: ['React', 'TypeScript', 'Node.js'],
    });
  });

  it('should parse indented object maps', () => {
    const yaml = `
author:
  name: Gonzalo Henderson
  email: gonzahender@gmail.com
`;
    const result = parseFrontmatter(yaml);
    expect(result).toEqual({
      author: {
        name: 'Gonzalo Henderson',
        email: 'gonzahender@gmail.com',
      },
    });
  });
});

describe('parseMarkdown', () => {
  it('should parse raw markdown document with frontmatter and AST nodes', () => {
    const markdown = `---
title: Project Name
description: Test project
---
# Main Header

This is a paragraph with **bold** and *italic* text.

- Unordered Item 1
- Unordered Item 2

1. Ordered Item 1
2. Ordered Item 2

\`\`\`ts
const value = 42;
\`\`\`

::callout
This is inside a directive block.
::
`;

    const doc = parseMarkdown(markdown);

    expect(doc.frontmatter).toEqual({
      title: 'Project Name',
      description: 'Test project',
    });

    expect(doc.nodes).toHaveLength(6);

    expect(doc.nodes[0]).toMatchObject({
      type: 'heading',
      depth: 1,
      text: 'Main Header',
    });

    expect(doc.nodes[1]).toMatchObject({
      type: 'paragraph',
      text: 'This is a paragraph with **bold** and *italic* text.',
    });

    expect(doc.nodes[2]).toMatchObject({
      type: 'list',
      ordered: false,
      items: [
        { type: 'list_item', text: 'Unordered Item 1' },
        { type: 'list_item', text: 'Unordered Item 2' },
      ],
    });

    expect(doc.nodes[3]).toMatchObject({
      type: 'list',
      ordered: true,
      items: [
        { type: 'list_item', text: 'Ordered Item 1' },
        { type: 'list_item', text: 'Ordered Item 2' },
      ],
    });

    expect(doc.nodes[4]).toMatchObject({
      type: 'code',
      lang: 'ts',
      text: 'const value = 42;',
    });

    expect(doc.nodes[5]).toMatchObject({
      type: 'directive',
      name: 'callout',
      value: 'This is inside a directive block.',
      items: [],
    });
  });

  it('should parse inline icons', () => {
    const markdown = `Here is an icon :lucide-home: in text.`;
    const doc = parseMarkdown(markdown);
    
    expect(doc.nodes[0]).toMatchObject({
      type: 'paragraph',
      tokens: [
        { type: 'text', text: 'Here is an icon ' },
        { type: 'icon', name: 'lucide-home' },
        { type: 'text', text: ' in text.' }
      ]
    });
  });
});
