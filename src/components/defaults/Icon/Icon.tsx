import { createElement } from 'react';
import type { IconComponentProps } from '../../../types.js';

export function DefaultIcon({ node }: IconComponentProps) {
  // A simple fallback span. This can be easily overridden by consumers.
  return createElement(
    'span',
    { className: 'mdr-icon', 'data-icon': node.name },
    `[Icon: ${node.name}]`
  );
}
