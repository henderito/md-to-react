import type { TemplateDefinition } from './types.js';
import { CalloutBlock } from './components/blocks/Callout/Callout.js';
import { MetricsBlock } from './components/blocks/Metrics/Metrics.js';
import { GalleryBlock } from './components/blocks/Gallery/Gallery.js';
import { TimelineBlock } from './components/blocks/Timeline/Timeline.js';
import { TerminalBlock } from './components/blocks/Terminal/Terminal.js';
import { FileBlock } from './components/blocks/File/File.js';
import { AlertBlock } from './components/blocks/Alert/Alert.js';
import { BadgeBlock } from './components/blocks/Badge/Badge.js';

export const templates: TemplateDefinition[] = [
  {
    id: 'portfolio-case-study',
    name: 'Portfolio case study',
    description: 'A polished project detail page with metrics, callouts, gallery, and timeline blocks.',
    layout: 'page',
    className: 'mdr-page mdr-template--portfolio',
    blocks: {
      callout: CalloutBlock,
      metrics: MetricsBlock,
      gallery: GalleryBlock,
      timeline: TimelineBlock,
      terminal: TerminalBlock,
      file: FileBlock,
      alert: AlertBlock,
      badge: BadgeBlock,
    },
  },
  {
    id: 'article',
    name: 'Article',
    description: 'A readable long-form article layout with callouts.',
    layout: 'page',
    className: 'mdr-page mdr-template--article',
    blocks: {
      callout: CalloutBlock,
      terminal: TerminalBlock,
      file: FileBlock,
      alert: AlertBlock,
    },
  },
  {
    id: 'component-card',
    name: 'Component card',
    description: 'A compact embeddable component for previews, docs, or feature snippets.',
    layout: 'component',
    className: 'mdr-component mdr-template--card',
    blocks: {
      callout: CalloutBlock,
      metrics: MetricsBlock,
      terminal: TerminalBlock,
      file: FileBlock,
      alert: AlertBlock,
      badge: BadgeBlock,
    },
  },
];

export function listTemplates() {
  return templates.map(({ id, name, description, layout }) => ({
    id,
    name,
    description,
    layout,
  }));
}

export function getTemplate(id = 'portfolio-case-study') {
  const template = templates.find((item) => item.id === id);
  if (!template) {
    throw new Error(`Unknown Markdown React template: ${id}`);
  }

  return template;
}
