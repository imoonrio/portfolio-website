import type { Work } from '../data/works';
import { categoryLabels, copy, type Language } from '../i18n';

type WorkDetailProps = {
  work: Work | null;
  language: Language;
  onClose: () => void;
  onNextWork: () => void;
  onOpenDetail: () => void;
  onPreviousWork: () => void;
};

export function WorkDetail({
  work,
  language,
  onClose,
  onNextWork,
  onOpenDetail,
  onPreviousWork
}: WorkDetailProps) {
  if (!work) {
    return null;
  }

  const text = copy[language];
  const title = language === 'zh' ? work.titleZh : work.title;
  const description = language === 'zh' ? work.descriptionZh : work.description;

  return (
    <div
      className="detail-backdrop"
      data-testid="detail-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <article
        className="work-detail"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="detail-close"
          type="button"
          onClick={onClose}
          aria-label={text.detail.closeAria}
        >
          {text.detail.close}
        </button>
        <div className="detail-media">
          <img
            className="detail-image"
            src={work.image}
            alt={title}
            draggable="false"
          />
        </div>
        <div className="detail-copy">
          <p className="eyebrow">
            {categoryLabels[language][work.category]} / {work.year}
          </p>
          <h2>{title}</h2>
          <p>{description}</p>
          <button className="detail-link" type="button" onClick={onOpenDetail}>
            {text.detail.viewDetails}
          </button>
        </div>
      </article>
      <button
        className="project-nav-button project-nav-button-prev"
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onPreviousWork();
        }}
        aria-label={text.detail.previousProject}
      >
        ‹
      </button>
      <button
        className="project-nav-button project-nav-button-next"
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNextWork();
        }}
        aria-label={text.detail.nextProject}
      >
        ›
      </button>
    </div>
  );
}
