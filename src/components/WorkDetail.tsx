import type { Work } from '../data/works';

type WorkDetailProps = {
  work: Work | null;
  onClose: () => void;
};

export function WorkDetail({ work, onClose }: WorkDetailProps) {
  if (!work) {
    return null;
  }

  return (
    <div className="detail-backdrop" role="presentation">
      <article className="work-detail" role="dialog" aria-modal="true" aria-label={work.title}>
        <button
          className="detail-close"
          type="button"
          onClick={onClose}
          aria-label="Close project details"
        >
          Close
        </button>
        <img src={work.image} alt="" />
        <div className="detail-copy">
          <p className="eyebrow">
            {work.category} / {work.year}
          </p>
          <h2>{work.title}</h2>
          <p>{work.description}</p>
          {work.link ? (
            <a className="detail-link" href={work.link} target="_blank" rel="noreferrer">
              View project
            </a>
          ) : null}
        </div>
      </article>
    </div>
  );
}
