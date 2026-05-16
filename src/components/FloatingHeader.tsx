import { useEffect, useState } from 'react';
import type { Language } from '../i18n';
import { copy } from '../i18n';
import { SiteActions } from './SiteActions';

type FloatingHeaderProps = {
  language: Language;
  onRandomSkin: () => void;
  onResetSkin: () => void;
  onToggleLanguage: () => void;
  skinName: string;
};

export function FloatingHeader({
  language,
  onRandomSkin,
  onResetSkin,
  onToggleLanguage,
  skinName
}: FloatingHeaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const text = copy[language];

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > 160);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility);

    return () => {
      window.removeEventListener('scroll', updateVisibility);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <header className="floating-header is-visible" data-testid="floating-header">
      <a className="brand" href="#top" aria-label={text.brandAria}>
        心月呈幅
      </a>
      <nav className="site-nav" aria-label={text.floatingNavLabel}>
        <a href="#work">{text.nav.work}</a>
        <a href="#about">{text.nav.about}</a>
        <a href="#contact">{text.nav.contact}</a>
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
