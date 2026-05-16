import type { MouseEvent } from 'react';
import { useEffect, useState } from 'react';
import type { Language } from '../i18n';
import { copy } from '../i18n';
import { SiteActions } from './SiteActions';

type FloatingHeaderProps = {
  language: Language;
  onNavigateSection?: (sectionId: 'work' | 'about' | 'contact') => void;
  onRandomSkin: () => void;
  onResetSkin: () => void;
  onToggleLanguage: () => void;
  scrollContainerSelector?: string;
  skinName: string;
};

export function FloatingHeader({
  language,
  onNavigateSection,
  onRandomSkin,
  onResetSkin,
  onToggleLanguage,
  scrollContainerSelector,
  skinName
}: FloatingHeaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const text = copy[language];
  const handleSectionClick =
    (sectionId: 'work' | 'about' | 'contact') => (event: MouseEvent<HTMLAnchorElement>) => {
      if (!onNavigateSection) {
        return;
      }

      event.preventDefault();
      onNavigateSection(sectionId);
    };

  useEffect(() => {
    const scrollTarget = scrollContainerSelector
      ? document.querySelector<HTMLElement>(scrollContainerSelector)
      : window;
    const updateVisibility = () => {
      const targetScrollTop = scrollTarget instanceof Window ? 0 : scrollTarget?.scrollTop ?? 0;

      setIsVisible(Math.max(window.scrollY, targetScrollTop) > 160);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility);
    scrollTarget?.addEventListener('scroll', updateVisibility);

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      scrollTarget?.removeEventListener('scroll', updateVisibility);
    };
  }, [scrollContainerSelector]);

  if (!isVisible) {
    return null;
  }

  return (
    <header className="floating-header is-visible" data-testid="floating-header">
      <a className="brand" href="#top" aria-label={text.brandAria}>
        心月呈幅
      </a>
      <nav className="site-nav" aria-label={text.floatingNavLabel}>
        <a href="#work" onClick={handleSectionClick('work')}>{text.nav.work}</a>
        <a href="#about" onClick={handleSectionClick('about')}>{text.nav.about}</a>
        <a href="#contact" onClick={handleSectionClick('contact')}>{text.nav.contact}</a>
      </nav>
      <SiteActions
        language={language}
        skinName={skinName}
        onRandomSkin={onRandomSkin}
        onResetSkin={onResetSkin}
        onToggleLanguage={onToggleLanguage}
      />
    </header>
  );
}
