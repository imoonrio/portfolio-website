import { useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import { About } from './components/About';
import { BackToTopButton } from './components/BackToTopButton';
import { FloatingHeader } from './components/FloatingHeader';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WorkDetail } from './components/WorkDetail';
import { WorkGallery } from './components/WorkGallery';
import { WorkProjectPage } from './components/WorkProjectPage';
import { getCategories, heroSlides, works, type Work } from './data/works';
import type { Language } from './i18n';
import { defaultSkinId, getRandomSkinId, skins } from './skins';
import './styles.css';

type ViewTransitionDocument = Document & {
  startViewTransition?: (updateCallback: () => void) => void;
};

type SectionTarget = 'work' | 'about' | 'contact';

function scrollToTop() {
  if (navigator.userAgent.includes('jsdom')) {
    return;
  }

  try {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch {
    window.scrollTo(0, 0);
  }
}

export default function App() {
  const [language, setLanguage] = useState<Language>('zh');
  const [skinId, setSkinId] = useState(defaultSkinId);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [detailWork, setDetailWork] = useState<Work | null>(null);
  const [pendingScrollTarget, setPendingScrollTarget] = useState<SectionTarget | null>(null);
  const categories = useMemo(() => getCategories(), []);
  const selectedWorkIndex = selectedWork
    ? works.findIndex((work) => work.id === selectedWork.id)
    : -1;
  const activeSkinName = skins.find((skin) => skin.id === skinId)?.name ?? 'Botanical';
  const toggleLanguage = () => setLanguage((current) => (current === 'en' ? 'zh' : 'en'));
  const randomizeSkin = () => setSkinId((current) => getRandomSkinId(current));
  const resetSkin = () => setSkinId(defaultSkinId);

  const showPreviousWork = () => {
    if (selectedWorkIndex < 0) {
      return;
    }

    const previousIndex = selectedWorkIndex === 0 ? works.length - 1 : selectedWorkIndex - 1;
    setSelectedWork(works[previousIndex]);
  };

  const changeCategory = (category: string) => {
    if (category === activeCategory) {
      return;
    }

    const viewTransitionDocument = document as ViewTransitionDocument;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion || !viewTransitionDocument.startViewTransition) {
      setActiveCategory(category);
      return;
    }

    viewTransitionDocument.startViewTransition(() => {
      flushSync(() => {
        setActiveCategory(category);
      });
    });
  };

  const openProjectDetail = () => {
    if (!selectedWork) {
      return;
    }

    setDetailWork(selectedWork);
    setSelectedWork(null);
    scrollToTop();
  };

  const openWorkDetail = (work: Work) => {
    setDetailWork(work);
    setSelectedWork(null);
    scrollToTop();
  };

  const navigateToSection = (sectionId: SectionTarget) => {
    setSelectedWork(null);
    setDetailWork(null);
    setPendingScrollTarget(sectionId);
  };

  const showNextWork = () => {
    if (selectedWorkIndex < 0) {
      return;
    }

    setSelectedWork(works[(selectedWorkIndex + 1) % works.length]);
  };

  useEffect(() => {
    const preventDefault = (event: Event) => {
      event.preventDefault();
    };

    document.body.classList.add('content-protected');
    document.addEventListener('contextmenu', preventDefault);
    document.addEventListener('copy', preventDefault);
    document.addEventListener('cut', preventDefault);
    document.addEventListener('dragstart', preventDefault);

    return () => {
      document.body.classList.remove('content-protected');
      document.removeEventListener('contextmenu', preventDefault);
      document.removeEventListener('copy', preventDefault);
      document.removeEventListener('cut', preventDefault);
      document.removeEventListener('dragstart', preventDefault);
    };
  }, []);

  useEffect(() => {
    if (detailWork || !pendingScrollTarget || navigator.userAgent.includes('jsdom')) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(pendingScrollTarget)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setPendingScrollTarget(null);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [detailWork, pendingScrollTarget]);

  return (
    <div
      id="top"
      className="site-shell"
      lang={language === 'zh' ? 'zh-CN' : 'en'}
      data-skin={skinId}
    >
      <Header
        language={language}
        onNavigateSection={detailWork ? navigateToSection : undefined}
        skinName={activeSkinName}
        onRandomSkin={randomizeSkin}
        onResetSkin={resetSkin}
        onToggleLanguage={toggleLanguage}
      />
      {!selectedWork ? (
        <FloatingHeader
          language={language}
          onNavigateSection={detailWork ? navigateToSection : undefined}
          skinName={activeSkinName}
          onRandomSkin={randomizeSkin}
          onResetSkin={resetSkin}
          onToggleLanguage={toggleLanguage}
        />
      ) : null}
      {detailWork ? (
        <WorkProjectPage language={language} work={detailWork} />
      ) : (
        <>
          <main>
            <Hero
              language={language}
              slides={heroSlides}
              works={works}
              onOpenWork={openWorkDetail}
            />
            <WorkGallery
              activeCategory={activeCategory}
              categories={categories}
              language={language}
              works={works}
              onCategoryChange={changeCategory}
              onSelectWork={setSelectedWork}
            />
          </main>
          <About language={language} />
        </>
      )}
      <WorkDetail
        work={selectedWork}
        language={language}
        onClose={() => setSelectedWork(null)}
        onNextWork={showNextWork}
        onOpenDetail={openProjectDetail}
        onPreviousWork={showPreviousWork}
      />
      <BackToTopButton language={language} />
    </div>
  );
}
