import { useMemo, useState } from 'react';
import { About } from './components/About';
import { BackToTopButton } from './components/BackToTopButton';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WorkDetail } from './components/WorkDetail';
import { WorkGallery } from './components/WorkGallery';
import { featuredWork, getCategories, works, type Work } from './data/works';
import type { Language } from './i18n';
import './styles.css';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const categories = useMemo(() => getCategories(), []);

  return (
    <div id="top" className="site-shell" lang={language === 'zh' ? 'zh-CN' : 'en'}>
      <Header
        language={language}
        onToggleLanguage={() => setLanguage((current) => (current === 'en' ? 'zh' : 'en'))}
      />
      <main>
        <Hero featuredWork={featuredWork} language={language} onSelectWork={setSelectedWork} />
        <WorkGallery
          activeCategory={activeCategory}
          categories={categories}
          language={language}
          works={works}
          onCategoryChange={setActiveCategory}
          onSelectWork={setSelectedWork}
        />
      </main>
      <About language={language} />
      <WorkDetail work={selectedWork} language={language} onClose={() => setSelectedWork(null)} />
      <BackToTopButton language={language} />
    </div>
  );
}
