import type { Work } from '../data/works';
import { categoryLabels, copy, type Language } from '../i18n';

type WorkProjectPageProps = {
  language: Language;
  work: Work;
  onBack: () => void;
};

export function WorkProjectPage({ language, work, onBack }: WorkProjectPageProps) {
  const text = copy[language];
  const title = language === 'zh' ? work.titleZh : work.title;
  const description = language === 'zh' ? work.descriptionZh : work.description;

  return (
    <main className="project-detail-page detail-scroll" data-testid="project-detail-page">
      <header className="project-detail-hero full-bleed" role="banner">
        <img src={work.images[0]} alt={title} draggable="false" fetchPriority="high" />
        <div className="project-detail-hero-copy">
          <p className="eyebrow">
            {categoryLabels[language][work.category]}
          </p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </header>
      <div className="project-detail-frame">
        <button className="project-back-button" type="button" onClick={onBack}>
          {text.detail.backToWorks}
        </button>
        <section className="project-image-stack snap-scroll" aria-label={title}>
          {work.images.map((image, index) => (
            <article className="project-image-panel" key={image}>
              <img src={image} alt={`${title} ${index + 1}`} draggable="false" loading="lazy" decoding="async" />
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
