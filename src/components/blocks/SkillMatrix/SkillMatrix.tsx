import type { BlockComponentProps } from '../../../types.js';
import './SkillMatrix.css';

export function SkillMatrixBlock({ node }: BlockComponentProps) {
  const category = node.value || 'Skills';
  const items = node.items || [];
  
  return (
    <div className="mdr-skill-matrix">
      {category && <div className="mdr-skill-matrix__category">{category}</div>}
      <div className="mdr-skill-matrix__items">
        {items.map((item, index) => {
          const parts = item.split(':').map(s => s.trim());
          if (parts.length > 1) {
            return (
              <div key={index} className="mdr-skill-matrix__item">
                <span className="mdr-skill-matrix__item-name">{parts[0]}</span>
                <span className="mdr-skill-matrix__item-value">{parts.slice(1).join(':')}</span>
              </div>
            );
          }
          return <div key={index} className="mdr-skill-matrix__item">{item}</div>;
        })}
      </div>
    </div>
  );
}
