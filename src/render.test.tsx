import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createElement, act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { MarkdownReact, createMarkdownComponent, compileMarkdownToModule } from './render.js';
import { templates } from './templates.js';

// Setup React testing environment
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

describe('MarkdownReact Rendering', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(async () => {
    if (root) {
      await act(async () => {
        root!.unmount();
      });
      root = null;
    }
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
    container = null;
  });

  it('should render basic elements (headings, paragraphs, lists, inline markdown)', async () => {
    const markdown = `
# Title

This is a **bold** and *italic* paragraph with a [link](https://example.com) and \`code\`.

- Item A
- Item B
`;

    await act(async () => {
      root!.render(<MarkdownReact markdown={markdown} />);
    });

    expect(container!.querySelector('h1')?.textContent).toBe('Title');
    expect(container!.querySelector('h1')?.className).toBe('mdr-heading mdr-heading--1');

    const paragraph = container!.querySelector('p');
    expect(paragraph?.textContent).toBe('This is a bold and italic paragraph with a link and code.');
    expect(paragraph?.querySelector('strong')?.textContent).toBe('bold');
    expect(paragraph?.querySelector('em')?.textContent).toBe('italic');
    expect(paragraph?.querySelector('a')?.getAttribute('href')).toBe('https://example.com');
    expect(paragraph?.querySelector('code')?.textContent).toBe('code');

    const listItems = container!.querySelectorAll('li');
    expect(listItems).toHaveLength(2);
    expect(listItems[0].textContent).toBe('Item A');
    expect(listItems[1].textContent).toBe('Item B');
  });

  it('should render complex markdown (tables, nested lists)', async () => {
    const markdown = `
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |

- Parent
  - Child 1
  - Child 2
`;

    await act(async () => {
      root!.render(<MarkdownReact markdown={markdown} />);
    });

    const table = container!.querySelector('table');
    expect(table).toBeTruthy();
    const ths = table!.querySelectorAll('th');
    expect(ths).toHaveLength(2);
    expect(ths[0].textContent).toBe('Header 1');
    
    const tds = table!.querySelectorAll('td');
    expect(tds).toHaveLength(2);
    expect(tds[0].textContent).toBe('Cell 1');

    const lists = container!.querySelectorAll('ul');
    expect(lists).toHaveLength(2); // One outer, one inner
    
    const listItems = container!.querySelectorAll('li');
    expect(listItems).toHaveLength(3); // Parent, Child 1, Child 2
    expect(listItems[0].textContent).toContain('Parent');
    expect(listItems[1].textContent).toBe('Child 1');
    expect(listItems[2].textContent).toBe('Child 2');
  });

  it('should render custom templates and directives', async () => {
    const markdown = `
::callout
Important alert!
::

::metrics
- 42 Units
- 100% Rate
::
`;

    await act(async () => {
      root!.render(<MarkdownReact markdown={markdown} template="portfolio-case-study" />);
    });

    const callout = container!.querySelector('.mdr-callout');
    expect(callout?.textContent).toBe('Important alert!');

    const metrics = container!.querySelector('.mdr-metrics');
    expect(metrics).toBeTruthy();

    const metricItems = container!.querySelectorAll('.mdr-metric');
    expect(metricItems).toHaveLength(2);
    expect(metricItems[0].querySelector('.mdr-metric__value')?.textContent).toBe('42');
    expect(metricItems[0].querySelector('.mdr-metric__label')?.textContent).toBe('Units');
  });

  it('should render with custom component overrides', async () => {
    const markdown = `
# Override Heading
`;

    const CustomHeading = ({ children }: any) => <h1 className="custom-h1">{children}</h1>;

    await act(async () => {
      root!.render(
        <MarkdownReact
          markdown={markdown}
          components={{ heading: CustomHeading }}
        />
      );
    });

    const h1 = container!.querySelector('h1');
    expect(h1?.className).toBe('custom-h1');
    expect(h1?.textContent).toBe('Override Heading');
  });

  it('should apply default antigravity theme class and optional classic theme class', async () => {
    const markdown = '# Hello Theme';
    
    await act(async () => {
      root!.render(<MarkdownReact markdown={markdown} />);
    });
    expect(container!.querySelector('article')?.className).toContain('mdr-theme--antigravity');

    await act(async () => {
      root!.render(<MarkdownReact markdown={markdown} theme="classic" />);
    });
    expect(container!.querySelector('article')?.className).toContain('mdr-theme--classic');
  });

  it('should automatically inject style sheet into head', () => {
    const style = document.getElementById('md-to-react-styles');
    expect(style).toBeTruthy();
    expect(style?.textContent).toContain('.mdr-page');
  });
});

describe('createMarkdownComponent Helper', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(async () => {
    if (root) {
      await act(async () => {
        root!.unmount();
      });
      root = null;
    }
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
    container = null;
  });

  it('should create a renderable React component function', async () => {
    const markdown = '# Hello World';
    const Component = createMarkdownComponent(markdown);

    await act(async () => {
      root!.render(<Component />);
    });

    expect(container!.querySelector('h1')?.textContent).toBe('Hello World');
  });
});

describe('compileMarkdownToModule Helper', () => {
  it('should generate a string representing a React module', () => {
    const markdown = '# Static Page';
    const code = compileMarkdownToModule(markdown, {
      componentName: 'StaticComponent',
      template: 'article',
    });

    expect(code).toContain("import { MarkdownReact } from '@henderito/md-to-react'");
    expect(code).toContain('export function StaticComponent()');
    expect(code).toContain('export default StaticComponent');
    expect(code).toContain('template="article"');
  });

  it('should generate a string representing a React module with theme', () => {
    const markdown = '# Static Page';
    const code = compileMarkdownToModule(markdown, {
      componentName: 'StaticComponent',
      template: 'article',
      theme: 'classic',
    });

    expect(code).toContain('theme="classic"');
  });
});
