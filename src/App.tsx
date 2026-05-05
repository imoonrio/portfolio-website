import { useMemo, useState } from 'react';
import { About } from './components/About';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WorkDetail } from './components/WorkDetail';
import { WorkGallery } from './components/WorkGallery';
import { featuredWork, getCategories, works, type Work } from './data/works';
import './styles.css';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const categories = useMemo(() => getCategories(), []);

  return (
    <div id="top" className="site-shell">
      <Header />
      <main>
        <Hero featuredWork={featuredWork} onSelectWork={setSelectedWork} />
        <WorkGallery
          activeCategory={activeCategory}
          categories={categories}
          works={works}
          onCategoryChange={setActiveCategory}
          onSelectWork={setSelectedWork}
        />
      </main>
      <About />
      <WorkDetail work={selectedWork} onClose={() => setSelectedWork(null)} />
    </div>
  );
}
