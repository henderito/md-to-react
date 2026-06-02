import type { TextComponentProps } from '../../../types.js';
import './Paragraph.css';

export function DefaultParagraph({ children }: TextComponentProps) {
  return <p className="mdr-paragraph">{children}</p>;
}
