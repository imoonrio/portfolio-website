import type { Work } from '../data/works';

type HeroProps = {
  featuredWork: Work;
  onSelectWork: (work: Work) => void;
};

export function Hero({ featuredWork, onSelectWork }: HeroProps) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">Independent portfolio</p>
        <h1 id="hero-title">Selected works with quiet confidence.</h1>
        <p className="hero-text">
          A living collection of recent visual systems, interface studies, and image-led projects.
        </p>
      </div>
      <button
        className="hero-feature"
        type="button"
        onClick={() => onSelectWork(featuredWork)}
        aria-label={`Open featured project ${featuredWork.title}`}
      >
        <img src={featuredWork.image} alt="" />
        <span>
          <strong>{featuredWork.title}</strong>
          <small>
            {featuredWork.category} / {featuredWork.year}
          </small>
        </span>
      </button>
    </section>
  );
}
