import type { ListComponentProps } from '../../../types.js';
import './List.css';

export function DefaultList({ node, children }: ListComponentProps) {
  const Tag = node.ordered ? 'ol' : 'ul';
  return <Tag className="mdr-list">{children}</Tag>;
}
