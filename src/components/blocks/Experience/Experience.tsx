import type { BlockComponentProps } from '../../../types.js';
import './Experience.css';

export function ExperienceBlock({ node }: BlockComponentProps) {
  const title = node.value || '';
  const [role, company] = title.includes('@') ? title.split('@').map(s => s.trim()) : [title, ''];
  const items = node.items || [];
  
  return (
    <div className="mdr-experience">
      <div className="mdr-experience__header">
        <h3 className="mdr-experience__role">{role}</h3>
        {company && <div className="mdr-experience__company">{company}</div>}
      </div>
      <div className="mdr-experience__body">
        {items.length > 0 && (
          <ul className="mdr-experience__list">
            {items.map((item, index) => (
              <li key={index} className="mdr-experience__item">{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
