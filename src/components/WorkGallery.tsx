import type { Work } from '../data/works';
import { WorkCard } from './WorkCard';

type WorkGalleryProps = {
  activeCategory: string;
  categories: string[];
  works: Work[];
  onCategoryChange: (category: string) => void;
  onSelectWork: (work: Work) => void;
};

export function WorkGallery({
  activeCategory,
  categories,
  works,
  onCategoryChange,
  onSelectWork
}: WorkGalleryProps) {
  const filteredWorks =
    activeCategory === 'All' ? works : works.filter((work) => work.category === activeCategory);

  return (
    <section id="work" className="work-section" aria-label="Work gallery">
      <div className="section-heading">
        <p className="eyebrow">Work index</p>
        <h2>Recent projects</h2>
      </div>
      <div className="filter-row" aria-label="Work filters">
        {categories.map((category) => (
          <button
            key={category}
            className={category === activeCategory ? 'filter-button is-active' : 'filter-button'}
            type="button"
            onClick={() => onCategoryChange(category)}
            aria-pressed={category === activeCategory}
          >
            {category}
          </button>
        ))}
      </div>
      {filteredWorks.length > 0 ? (
        <div className="work-grid">
          {filteredWorks.map((work) => (
            <WorkCard key={work.id} work={work} onSelect={onSelectWork} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No works match this filter.</p>
          <button type="button" onClick={() => onCategoryChange('All')}>
            Reset
          </button>
        </div>
      )}
    </section>
  );
}
