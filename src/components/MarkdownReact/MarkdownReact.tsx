import type { ReactNode } from 'react';
import type { Tokens } from 'marked';
import { parseMarkdown } from '../../parser.js';
import { getTemplate } from '../../templates.js';
import { injectStyles } from '../../styles.js';
import type {
  CompileOptions,
  MarkdownNode,
  MarkdownReactProps,
  RendererComponents,
  TemplateDefinition,
  ThemeName,
  DirectiveNode,
} from '../../types.js';

import { DefaultHeading } from '../defaults/Heading/Heading.js';
import { DefaultParagraph } from '../defaults/Paragraph/Paragraph.js';
import { DefaultList } from '../defaults/List/List.js';
import { DefaultListItem } from '../defaults/ListItem/ListItem.js';
import { DefaultCode } from '../defaults/Code/Code.js';
import { DefaultTable } from '../defaults/Table/Table.js';
import { DefaultBlockquote } from '../defaults/Blockquote/Blockquote.js';

if (typeof window !== 'undefined') {
  injectStyles();
}

function resolveTemplate(template?: string | TemplateDefinition) {
  if (typeof template === 'object') return template;
  return getTemplate(template);
}

const defaultComponents: RendererComponents = {
  heading: DefaultHeading,
  paragraph: DefaultParagraph,
  list: DefaultList,
  listitem: DefaultListItem,
  code: DefaultCode,
  table: DefaultTable,
  blockquote: DefaultBlockquote,
};

function renderTokens(
  tokens: MarkdownNode[] | undefined,
  template: TemplateDefinition,
  components: RendererComponents,
  document: ReturnType<typeof parseMarkdown>,
): ReactNode {
  if (!tokens) return null;
  return tokens.map((token, index) =>
    renderNode(token, index, template, components, document),
  );
}

function renderNode(
  node: MarkdownNode,
  index: number,
  template: TemplateDefinition,
  components: RendererComponents,
  document: ReturnType<typeof parseMarkdown>,
): ReactNode {
  if (node.type === 'heading') {
    const Heading = components.heading;
    return (
      <Heading node={node as Tokens.Heading} key={index}>
        {renderTokens((node as Tokens.Heading).tokens as MarkdownNode[], template, components, document)}
      </Heading>
    );
  }

  if (node.type === 'paragraph') {
    const Paragraph = components.paragraph;
    return (
      <Paragraph node={node as Tokens.Paragraph} key={index}>
        {renderTokens((node as Tokens.Paragraph).tokens as MarkdownNode[], template, components, document)}
      </Paragraph>
    );
  }

  if (node.type === 'list') {
    const List = components.list;
    const listNode = node as Tokens.List;
    return (
      <List node={listNode} key={index}>
        {listNode.items.map((item, i) => {
          const ListItem = components.listitem;
          return (
            <ListItem node={item} key={i}>
              {renderTokens(item.tokens as MarkdownNode[], template, components, document)}
            </ListItem>
          );
        })}
      </List>
    );
  }

  if (node.type === 'code') {
    const Code = components.code;
    return <Code node={node as Tokens.Code} key={index} />;
  }

  if (node.type === 'table') {
    const Table = components.table;
    const tableNode = node as Tokens.Table;
    return (
      <Table node={tableNode} key={index}>
        <thead>
          <tr>
            {tableNode.header.map((cell, i) => (
              <th key={i}>{renderTokens(cell.tokens as MarkdownNode[], template, components, document)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableNode.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{renderTokens(cell.tokens as MarkdownNode[], template, components, document)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  if (node.type === 'blockquote') {
    const Blockquote = components.blockquote;
    return (
      <Blockquote node={node as Tokens.Blockquote} key={index}>
        {renderTokens((node as Tokens.Blockquote).tokens as MarkdownNode[], template, components, document)}
      </Blockquote>
    );
  }

  // Inline elements
  if (node.type === 'text' || node.type === 'escape' || node.type === 'html') {
    const textNode = node as Tokens.Text | Tokens.Escape | Tokens.HTML;
    if ('tokens' in textNode && textNode.tokens) {
      return renderTokens(textNode.tokens as MarkdownNode[], template, components, document);
    }
    return <span key={index}>{textNode.text}</span>;
  }

  if (node.type === 'strong') {
    const strongNode = node as Tokens.Strong;
    return <strong key={index}>{renderTokens(strongNode.tokens as MarkdownNode[], template, components, document)}</strong>;
  }

  if (node.type === 'em') {
    const emNode = node as Tokens.Em;
    return <em key={index}>{renderTokens(emNode.tokens as MarkdownNode[], template, components, document)}</em>;
  }

  if (node.type === 'codespan') {
    const codespanNode = node as Tokens.Codespan;
    return <code key={index}>{codespanNode.text}</code>;
  }

  if (node.type === 'link') {
    const linkNode = node as Tokens.Link;
    return (
      <a href={linkNode.href} title={linkNode.title || undefined} key={index}>
        {renderTokens(linkNode.tokens as MarkdownNode[], template, components, document)}
      </a>
    );
  }

  if (node.type === 'image') {
    const imgNode = node as Tokens.Image;
    return <img src={imgNode.href} alt={imgNode.text} title={imgNode.title || undefined} key={index} />;
  }
  
  if (node.type === 'br') {
    return <br key={index} />;
  }
  
  if (node.type === 'del') {
    const delNode = node as Tokens.Del;
    return <del key={index}>{renderTokens(delNode.tokens as MarkdownNode[], template, components, document)}</del>;
  }
  
  if (node.type === 'space') {
    return null;
  }

  if (node.type === 'directive') {
    const directiveNode = node as DirectiveNode;
    const Block = template.blocks[directiveNode.name];
    if (!Block) {
      return (
        <section className="mdr-unknown-block" data-block={directiveNode.name} key={index}>
          {directiveNode.value}
        </section>
      );
    }
    return <Block node={directiveNode} document={document} key={index} />;
  }

  // Fallback
  return <span key={index}>{(node as any).raw}</span>;
}

export function MarkdownReact({
  markdown,
  template,
  components,
  className,
  theme = 'antigravity',
}: MarkdownReactProps) {
  const document = parseMarkdown(markdown);
  const resolvedTemplate = resolveTemplate(template);
  const resolvedComponents = { ...defaultComponents, ...components };
  const rootClassName = [resolvedTemplate.className, `mdr-theme--${theme}`, className].filter(Boolean).join(' ');

  return (
    <article className={rootClassName}>
      {renderTokens(document.nodes, resolvedTemplate, resolvedComponents, document)}
    </article>
  );
}

export function createMarkdownComponent(markdown: string, template?: string | TemplateDefinition, theme?: ThemeName) {
  return function GeneratedMarkdownComponent() {
    return <MarkdownReact markdown={markdown} template={template} theme={theme} />;
  };
}

export function compileMarkdownToModule(markdown: string, options: CompileOptions = {}) {
  const componentName = options.componentName ?? 'MarkdownPage';
  const template = typeof options.template === 'string' ? options.template : options.template?.id;
  const theme = options.theme;

  const props = [
    `markdown={markdown}`,
    template ? `template="${template}"` : null,
    theme ? `theme="${theme}"` : null,
  ].filter(Boolean).join(' ');

  return `import { MarkdownReact } from '@henderito/md-to-react';

const markdown = ${JSON.stringify(markdown)};

export function ${componentName}() {
  return <MarkdownReact ${props} />;
}

export default ${componentName};
`;
}
