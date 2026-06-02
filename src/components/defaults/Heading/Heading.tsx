import { createElement } from 'react';
import type { HeadingComponentProps } from '../../../types.js';
import './Heading.css';

export function DefaultHeading({ node, children }: HeadingComponentProps) {
  return createElement(
    `h${node.depth}`,
    { className: `mdr-heading mdr-heading--${node.depth}` },
    children,
  );
}
