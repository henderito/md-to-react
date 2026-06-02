import type { BlockComponentProps } from '../../../types.js';
import './File.css';

export function FileBlock({ node }: BlockComponentProps) {
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
