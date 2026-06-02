import type { ListItemComponentProps } from '../../../types.js';

export function DefaultListItem({ children }: ListItemComponentProps) {
  return <li className="mdr-list-item">{children}</li>;
}
