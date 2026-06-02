import type { CodeComponentProps } from '../../../types.js';
import './Code.css';

export function DefaultCode({ node }: CodeComponentProps) {
  return (
    <pre className="mdr-code">
      <code data-language={node.lang}>{node.text}</code>
    </pre>
  );
}
