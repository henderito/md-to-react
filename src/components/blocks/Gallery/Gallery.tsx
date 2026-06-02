import type { BlockComponentProps } from '../../../types.js';
import './Gallery.css';

export function GalleryBlock({ node }: BlockComponentProps) {
  const sources = node.items.length > 0 ? node.items : node.value.split('\n').filter(Boolean);

  return (
    <div className="mdr-gallery">
      {sources.map((source) => (
        <img className="mdr-gallery__image" src={source} alt="" key={source} />
      ))}
    </div>
  );
}
