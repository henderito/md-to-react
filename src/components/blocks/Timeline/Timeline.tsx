import type { BlockComponentProps } from '../../../types.js';
import './Timeline.css';

export function TimelineBlock({ node }: BlockComponentProps) {
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
