import type { Work } from '../data/works';
import { categoryLabels, copy, type Language } from '../i18n';

type HeroProps = {
  featuredWork: Work;
  language: Language;
  onSelectWork: (work: Work) => void;
};

export function Hero({ featuredWork, language, onSelectWork }: HeroProps) {
  const text = copy[language];
  const title = language === 'zh' ? featuredWork.titleZh : featuredWork.title;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">{text.hero.eyebrow}</p>
        <h1 id="hero-title">{text.hero.title}</h1>
        <p className="hero-text">{text.hero.text}</p>
      </div>
      <button
        className="hero-feature"
        type="button"
        onClick={() => onSelectWork(featuredWork)}
        aria-label={`${text.hero.featuredAria} ${title}`}
      >
        <img src={featuredWork.image} alt="" />
        <span>
          <strong>{title}</strong>
          <small>
            {categoryLabels[language][featuredWork.category]} / {featuredWork.year}
          </small>
        </span>
      </button>
    </section>
  );
}
