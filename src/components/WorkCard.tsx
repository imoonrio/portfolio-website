import type { Work } from '../data/works';
import { categoryLabels, copy, type Language } from '../i18n';

type WorkCardProps = {
  work: Work;
  language: Language;
  onSelect: (work: Work) => void;
};

export function WorkCard({ work, language, onSelect }: WorkCardProps) {
  const text = copy[language];
  const title = language === 'zh' ? work.titleZh : work.title;
  const category = categoryLabels[language][work.category];

  return (
    <button
      className="work-card"
      type="button"
      onClick={() => onSelect(work)}
      aria-label={`${text.gallery.openProject} ${title}`}
    >
      <span className="work-image-wrap">
        <img src={work.image} alt="" />
      </span>
      <span
        className="work-card-overlay"
        aria-hidden="true"
        data-title={title}
        data-meta={`${category} / ${work.year}`}
      />
      <span className="work-card-meta">
        <strong>{title}</strong>
        <small>{category}</small>
      </span>
    </button>
  );
}
