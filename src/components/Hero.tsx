import { useEffect, useState } from 'react';
import type { Work } from '../data/works';
import { copy, type Language } from '../i18n';

type HeroProps = {
  language: Language;
  works: Work[];
  onOpenWork: (work: Work) => void;
};

export function Hero({ language, works, onOpenWork }: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const text = copy[language];
  const activeWork = works[activeIndex] ?? works[0];
  const title = language === 'zh' ? activeWork.titleZh : activeWork.title;
  const openAria = language === 'zh' ? '打开作品详情' : 'Open project detail';
  const previousAria = language === 'zh' ? '上一个轮播作品' : 'Previous carousel work';
  const nextAria = language === 'zh' ? '下一个轮播作品' : 'Next carousel work';

  const showPrevious = () => {
    setActiveIndex((current) => (current === 0 ? works.length - 1 : current - 1));
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % works.length);
  };

  const revealControls = () => {
    setShowControls(true);
  };

  useEffect(() => {
    const timer = window.setInterval(showNext, 7000);

    return () => {
      window.clearInterval(timer);
    };
  }, [works.length]);

  useEffect(() => {
    if (!showControls) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setShowControls(false);
    }, 1000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [showControls]);

  return (
    <section
      className={showControls ? 'hero is-controls-visible' : 'hero'}
      aria-labelledby="hero-title"
      onMouseMove={revealControls}
      onFocus={revealControls}
    >
      <div className="hero-copy">
        <p className="eyebrow">{text.hero.eyebrow}</p>
        <h1 id="hero-title">{text.hero.title}</h1>
        <p className="hero-text">{text.hero.text}</p>
      </div>
      <button
        className="hero-feature"
        type="button"
        onClick={() => onOpenWork(activeWork)}
        aria-label={`${openAria} ${title}`}
      >
        <img src={activeWork.previewImage} alt="" draggable="false" fetchPriority="high" />
      </button>
      <div className="hero-carousel-controls" aria-label={text.hero.carouselAria}>
        <button
          className="hero-carousel-button"
          type="button"
          onClick={showPrevious}
          aria-label={previousAria}
        >
          ‹
        </button>
        <button
          className="hero-carousel-button"
          type="button"
          onClick={showNext}
          aria-label={nextAria}
        >
          ›
        </button>
      </div>
    </section>
  );
}
