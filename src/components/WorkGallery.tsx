import type { Work } from '../data/works';
import { categoryLabels, copy, type Language } from '../i18n';
import { WorkCard } from './WorkCard';

type WorkGalleryProps = {
  activeCategory: string;
  categories: string[];
  language: Language;
  works: Work[];
  onCategoryChange: (category: string) => void;
  onSelectWork: (work: Work) => void;
};

export function WorkGallery({
  activeCategory,
  categories,
  language,
  works,
  onCategoryChange,
  onSelectWork
}: WorkGalleryProps) {
  const text = copy[language];
  const filteredWorks =
    activeCategory === 'All' ? works : works.filter((work) => work.category === activeCategory);

  return (
    <section id="work" className="work-section" aria-label={text.gallery.aria}>
      <div className="section-heading">
        <p className="eyebrow">{text.gallery.eyebrow}</p>
        <h2>{text.gallery.title}</h2>
      </div>
      <div className="filter-row" aria-label={text.gallery.filtersAria}>
        {categories.map((category) => (
          <button
            key={category}
            className={category === activeCategory ? 'filter-button is-active' : 'filter-button'}
            type="button"
            onClick={() => onCategoryChange(category)}
            aria-pressed={category === activeCategory}
          >
            {categoryLabels[language][category as keyof (typeof categoryLabels)[typeof language]]}
          </button>
        ))}
      </div>
      {filteredWorks.length > 0 ? (
        <div className="work-grid">
          {filteredWorks.map((work, index) => (
            <WorkCard
              key={`${activeCategory}-${work.id}`}
              animationIndex={index}
              work={work}
              language={language}
              onSelect={onSelectWork}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>{text.gallery.empty}</p>
          <button type="button" onClick={() => onCategoryChange('All')}>
            {text.gallery.reset}
          </button>
        </div>
      )}
    </section>
  );
}
