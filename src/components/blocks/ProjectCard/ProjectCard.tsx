import type { BlockComponentProps } from '../../../types.js';
import './ProjectCard.css';

export function ProjectCardBlock({ node }: BlockComponentProps) {
  const title = node.value || 'Project';
  const items = node.items || [];
  
  return (
    <div className="mdr-project-card">
      <div className="mdr-project-card__header">
        <h3 className="mdr-project-card__title">{title}</h3>
      </div>
      <div className="mdr-project-card__body">
        {items.length > 0 && (
          <div className="mdr-project-card__details">
            {items.map((item, index) => {
              // If it's a URL, render an anchor
              if (item.startsWith('http://') || item.startsWith('https://')) {
                return (
                  <div key={index} className="mdr-project-card__detail">
                    <a href={item} target="_blank" rel="noopener noreferrer">{item}</a>
                  </div>
                );
              }
              return (
                <div key={index} className="mdr-project-card__detail">
                  {item}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
