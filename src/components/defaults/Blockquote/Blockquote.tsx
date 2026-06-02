import type { BlockquoteComponentProps } from '../../../types.js';

export function DefaultBlockquote({ children }: BlockquoteComponentProps) {
  return <blockquote className="mdr-blockquote">{children}</blockquote>;
}
