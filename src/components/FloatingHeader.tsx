import { useEffect, useState } from 'react';
import type { Language } from '../i18n';
import { copy } from '../i18n';

type FloatingHeaderProps = {
  language: Language;
  onToggleLanguage: () => void;
};

export function FloatingHeader({ language, onToggleLanguage }: FloatingHeaderProps) {
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
        YOUR NAME
      </a>
      <nav className="site-nav" aria-label={text.floatingNavLabel}>
        <a href="#work">{text.nav.work}</a>
        <a href="#about">{text.nav.about}</a>
        <a href="#contact">{text.nav.contact}</a>
      </nav>
      <button className="language-toggle" type="button" onClick={onToggleLanguage}>
        {text.languageToggle}
      </button>
    </header>
  );
}
