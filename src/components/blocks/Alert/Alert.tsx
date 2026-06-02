import type { BlockComponentProps } from '../../../types.js';
import './Alert.css';

export function AlertBlock({ node }: BlockComponentProps) {
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
