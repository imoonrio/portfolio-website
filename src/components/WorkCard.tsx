import type { CSSProperties } from 'react';
import { responsiveSrcSet, type Work } from '../data/works';
import { categoryLabels, copy, type Language } from '../i18n';

type WorkCardProps = {
  animationIndex?: number;
  work: Work;
  language: Language;
  onSelect: (work: Work) => void;
};

type WorkCardStyle = CSSProperties & {
  '--stagger-index': number;
};

export function WorkCard({ animationIndex = 0, work, language, onSelect }: WorkCardProps) {
  const text = copy[language];
  const title = language === 'zh' ? work.titleZh : work.title;
  const category = categoryLabels[language][work.category];
  const cardStyle: WorkCardStyle = {
    '--stagger-index': animationIndex,
    viewTransitionName: `work-${work.id}`
  };

  return (
    <button
      className="work-card"
      type="button"
      style={cardStyle}
      onClick={() => onSelect(work)}
      aria-label={`${text.gallery.openProject} ${title}`}
    >
      <span className="work-image-wrap">
        <img
          src={work.previewImage}
          srcSet={responsiveSrcSet(work.previewImage)}
          sizes="(max-width: 720px) 92vw, (max-width: 1100px) 45vw, 360px"
          alt=""
          draggable="false"
          loading="lazy"
          decoding="async"
        />
      </span>
      <span
        className="work-card-overlay"
        aria-hidden="true"
        data-title={title}
        data-meta={category}
      />
      <span className="work-card-meta">
        <strong>{title}</strong>
        <small>{category}</small>
      </span>
    </button>
  );
}
