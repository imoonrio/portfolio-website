import { useEffect, useState } from 'react';
import { copy, type Language } from '../i18n';

type BackToTopButtonProps = {
  language: Language;
  scrollContainerSelector?: string;
};

export function BackToTopButton({ language, scrollContainerSelector }: BackToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scrollTarget = scrollContainerSelector
      ? document.querySelector<HTMLElement>(scrollContainerSelector)
      : window;
    const updateVisibility = () => {
      const targetScrollTop = scrollTarget instanceof Window ? 0 : scrollTarget?.scrollTop ?? 0;
      const scrollTop = Math.max(window.scrollY, targetScrollTop);

      setIsVisible(scrollTop > 360);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    scrollTarget?.addEventListener('scroll', updateVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      scrollTarget?.removeEventListener('scroll', updateVisibility);
    };
  }, [scrollContainerSelector]);

  if (!isVisible) {
    return null;
  }

  const scrollToTop = () => {
    const scrollTarget = scrollContainerSelector
      ? document.querySelector<HTMLElement>(scrollContainerSelector)
      : window;

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!(scrollTarget instanceof Window)) {
      scrollTarget?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      className="back-to-top"
      type="button"
      onClick={scrollToTop}
      aria-label={copy[language].backToTop}
    >
      ↑
    </button>
  );
}
