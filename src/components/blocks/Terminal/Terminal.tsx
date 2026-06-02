import type { BlockComponentProps } from '../../../types.js';
import './Terminal.css';

export function TerminalBlock({ node }: BlockComponentProps) {
  const lines = node.items.length > 0 ? node.items : node.value.split('\n').filter(Boolean);
  return (
    <div className="mdr-terminal">
      <div className="mdr-terminal__header">
        <div className="mdr-terminal__buttons">
          <span className="mdr-terminal__button mdr-terminal__button--close" />
          <span className="mdr-terminal__button mdr-terminal__button--minimize" />
          <span className="mdr-terminal__button mdr-terminal__button--maximize" />
        </div>
        <div className="mdr-terminal__title">bash</div>
      </div>
      <div className="mdr-terminal__body">
        {lines.map((line, index) => {
          if (line.startsWith('$ ')) {
            return (
              <div className="mdr-terminal__line mdr-terminal__line--command" key={index}>
                <span className="mdr-terminal__prompt">$</span> {line.slice(2)}
              </div>
            );
          }
          return (
            <div className="mdr-terminal__line mdr-terminal__line--output" key={index}>
              {line}
            </div>
          );
        })}
      </div>
    </div>
  );
}
