import type { Work } from '../data/works';

type WorkCardProps = {
  work: Work;
  onSelect: (work: Work) => void;
};

export function WorkCard({ work, onSelect }: WorkCardProps) {
  return (
    <button
      className="work-card"
      type="button"
      onClick={() => onSelect(work)}
      aria-label={`Open project ${work.title}`}
    >
      <span className="work-image-wrap">
        <img src={work.image} alt="" />
      </span>
      <span
        className="work-card-overlay"
        aria-hidden="true"
        data-title={work.title}
        data-meta={`${work.category} / ${work.year}`}
      />
      <span className="work-card-meta">
        <strong>{work.title}</strong>
        <small>{work.category}</small>
      </span>
    </button>
  );
}
