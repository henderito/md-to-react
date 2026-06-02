import type { BlockComponentProps } from '../../../types.js';
import './Metrics.css';

export function MetricsBlock({ node }: BlockComponentProps) {
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
