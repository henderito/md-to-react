import type { BlockComponentProps } from '../../../types.js';
import './Badge.css';

export function BadgeBlock({ node }: BlockComponentProps) {
  const labels = node.items.length > 0 ? node.items : node.value.split(',').map(s => s.trim()).filter(Boolean);
  return (
    <div className="mdr-badges">
      {labels.map(label => (
        <span className="mdr-badge" key={label}>{label}</span>
      ))}
    </div>
  );
}
