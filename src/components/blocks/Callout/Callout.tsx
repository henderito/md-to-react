import type { BlockComponentProps } from '../../../types.js';
import './Callout.css';

export function CalloutBlock({ node }: BlockComponentProps) {
  return <aside className="mdr-callout">{node.value}</aside>;
}
