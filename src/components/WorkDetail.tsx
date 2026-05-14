import type { Work } from '../data/works';
import { categoryLabels, copy, type Language } from '../i18n';

type WorkDetailProps = {
  work: Work | null;
  language: Language;
  onClose: () => void;
};

export function WorkDetail({ work, language, onClose }: WorkDetailProps) {
  if (!work) {
    return null;
  }

  const text = copy[language];
  const title = language === 'zh' ? work.titleZh : work.title;
  const description = language === 'zh' ? work.descriptionZh : work.description;

  return (
    <div className="detail-backdrop" role="presentation">
      <article className="work-detail" role="dialog" aria-modal="true" aria-label={title}>
        <button
          className="detail-close"
          type="button"
          onClick={onClose}
          aria-label={text.detail.closeAria}
        >
          {text.detail.close}
        </button>
        <img src={work.image} alt="" />
        <div className="detail-copy">
          <p className="eyebrow">
            {categoryLabels[language][work.category]} / {work.year}
          </p>
          <h2>{title}</h2>
          <p>{description}</p>
          {work.link ? (
            <a className="detail-link" href={work.link} target="_blank" rel="noreferrer">
              {text.detail.link}
            </a>
          ) : null}
        </div>
      </article>
    </div>
  );
}
