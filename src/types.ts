import type { ComponentType, ReactNode } from 'react';
import type { Token, Tokens } from 'marked';

export type FrontmatterValue =
  | string
  | number
  | boolean
  | null
  | string[]
  | Record<string, string | number | boolean | null>;

export type Frontmatter = Record<string, FrontmatterValue>;

export interface DirectiveNode {
  type: 'directive';
  raw: string;
  name: string;
  value: string;
  items: string[];
}

export interface IconNode {
  type: 'icon';
  raw: string;
  name: string;
}

export type MarkdownNode = Token | DirectiveNode | IconNode;

export interface MarkdownDocument {
  frontmatter: Frontmatter;
  nodes: MarkdownNode[];
  rawBody: string;
}

export type TemplateLayout = 'component' | 'page';

export interface TemplateDefinition {
  id: string;
  name: string;
  description: string;
  layout: TemplateLayout;
  className: string;
  blocks: Record<string, ComponentType<BlockComponentProps>>;
}

export interface BlockComponentProps {
  node: DirectiveNode;
  document: MarkdownDocument;
}

export interface RendererComponents {
  heading: ComponentType<HeadingComponentProps>;
  paragraph: ComponentType<TextComponentProps>;
  list: ComponentType<ListComponentProps>;
  listitem: ComponentType<ListItemComponentProps>;
  code: ComponentType<CodeComponentProps>;
  table: ComponentType<TableComponentProps>;
  blockquote: ComponentType<BlockquoteComponentProps>;
  icon: ComponentType<IconComponentProps>;
}

export interface HeadingComponentProps {
  node: Tokens.Heading;
  children: ReactNode;
}

export interface TextComponentProps {
  node: Tokens.Paragraph | Tokens.Text;
  children: ReactNode;
}

export interface ListComponentProps {
  node: Tokens.List;
  children: ReactNode;
}

export interface ListItemComponentProps {
  node: Tokens.ListItem;
  children: ReactNode;
}

export interface CodeComponentProps {
  node: Tokens.Code;
}

export interface TableComponentProps {
  node: Tokens.Table;
  children: ReactNode;
}

export interface BlockquoteComponentProps {
  node: Tokens.Blockquote;
  children: ReactNode;
}

export interface IconComponentProps {
  node: IconNode;
}

export type ThemeName = 'antigravity' | 'classic';

export interface MarkdownReactProps {
  markdown: string;
  template?: string | TemplateDefinition;
  components?: Partial<RendererComponents>;
  className?: string;
  theme?: ThemeName;
  themeOverrides?: Record<string, string | number>;
}

export interface CompileOptions {
  componentName?: string;
  template?: string | TemplateDefinition;
  includeCssImport?: boolean;
  theme?: ThemeName;
  themeOverrides?: Record<string, string | number>;
}
