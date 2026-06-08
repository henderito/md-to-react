import type { BlockComponentProps } from '../../../types.js';
import './ProfileHeader.css';

export function ProfileHeaderBlock({ node }: BlockComponentProps) {
  const name = node.value || '';
  const items = node.items || [];
  
  return (
    <div className="mdr-profile-header">
      <h1 className="mdr-profile-header__name">{name}</h1>
      {items.length > 0 && (
        <div className="mdr-profile-header__meta">
          {items.map((item, index) => {
             if (item.startsWith('http://') || item.startsWith('https://')) {
                return (
                  <span key={index} className="mdr-profile-header__meta-item">
                    <a href={item} target="_blank" rel="noopener noreferrer">{item.replace(/^https?:\/\//, '')}</a>
                  </span>
                );
             } else if (item.includes('@') && !item.includes(' ')) {
                return (
                  <span key={index} className="mdr-profile-header__meta-item">
                    <a href={`mailto:${item}`}>{item}</a>
                  </span>
                );
             }
             return <span key={index} className="mdr-profile-header__meta-item">{item}</span>;
          })}
        </div>
      )}
    </div>
  );
}
