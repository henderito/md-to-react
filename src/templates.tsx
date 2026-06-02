import type { BlockComponentProps, TemplateDefinition } from './types.js';

function CalloutBlock({ node }: BlockComponentProps) {
  return <aside className="mdr-callout">{node.value}</aside>;
}

function MetricsBlock({ node }: BlockComponentProps) {
  const values = node.items.length > 0 ? node.items : node.value.split('\n').filter(Boolean);

  return (
    <div className="mdr-metrics">
      {values.map((item) => {
        const [value, ...labelParts] = item.split(' ');
        return (
          <div className="mdr-metric" key={item}>
            <span className="mdr-metric__value">{value}</span>
            <span className="mdr-metric__label">{labelParts.join(' ')}</span>
          </div>
        );
      })}
    </div>
  );
}

function GalleryBlock({ node }: BlockComponentProps) {
  const sources = node.items.length > 0 ? node.items : node.value.split('\n').filter(Boolean);

  return (
    <div className="mdr-gallery">
      {sources.map((source) => (
        <img className="mdr-gallery__image" src={source} alt="" key={source} />
      ))}
    </div>
  );
}

function TimelineBlock({ node }: BlockComponentProps) {
  const items = node.items.length > 0 ? node.items : node.value.split('\n').filter(Boolean);

  return (
    <ol className="mdr-timeline">
      {items.map((item) => (
        <li className="mdr-timeline__item" key={item}>
          {item}
        </li>
      ))}
    </ol>
  );
}

function TerminalBlock({ node }: BlockComponentProps) {
  const lines = node.items.length > 0 ? node.items : node.value.split('\n').filter(Boolean);
  return (
    <div className="mdr-terminal">
      <div className="mdr-terminal__header">
        <div className="mdr-terminal__buttons">
          <span className="mdr-terminal__button mdr-terminal__button--close" />
          <span className="mdr-terminal__button mdr-terminal__button--minimize" />
          <span className="mdr-terminal__button mdr-terminal__button--maximize" />
        </div>
        <div className="mdr-terminal__title">bash</div>
      </div>
      <div className="mdr-terminal__body">
        {lines.map((line, index) => {
          if (line.startsWith('$ ')) {
            return (
              <div className="mdr-terminal__line mdr-terminal__line--command" key={index}>
                <span className="mdr-terminal__prompt">$</span> {line.slice(2)}
              </div>
            );
          }
          return (
            <div className="mdr-terminal__line mdr-terminal__line--output" key={index}>
              {line}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FileBlock({ node }: BlockComponentProps) {
  const lines = node.value.split('\n');
  const filename = node.items[0] || 'index.ts';
  const content = (node.items.length > 0 ? node.value : lines.slice(1).join('\n')).trim();

  return (
    <div className="mdr-file">
      <div className="mdr-file__header">
        <div className="mdr-file__tabs">
          <div className="mdr-file__tab mdr-file__tab--active">
            <span className="mdr-file__tab-icon">📄</span>
            <span className="mdr-file__tab-title">{filename}</span>
          </div>
        </div>
      </div>
      <div className="mdr-file__body">
        <pre className="mdr-file__pre">
          <code className="mdr-file__code">{content}</code>
        </pre>
      </div>
    </div>
  );
}

function AlertBlock({ node }: BlockComponentProps) {
  const type = node.items[0] || 'info';
  const content = node.items.length > 0 ? node.value : node.value;
  
  let icon = 'ℹ️';
  if (type === 'warning') icon = '⚠️';
  if (type === 'error') icon = '❌';
  if (type === 'success') icon = '✅';

  return (
    <div className={`mdr-alert mdr-alert--${type}`}>
      <span className="mdr-alert__icon">{icon}</span>
      <div className="mdr-alert__content">{content}</div>
    </div>
  );
}

function BadgeBlock({ node }: BlockComponentProps) {
  const labels = node.items.length > 0 ? node.items : node.value.split(',').map(s => s.trim()).filter(Boolean);
  return (
    <div className="mdr-badges">
      {labels.map(label => (
        <span className="mdr-badge" key={label}>{label}</span>
      ))}
    </div>
  );
}

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
