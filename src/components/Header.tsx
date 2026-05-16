import type { MouseEvent } from 'react';
import type { Language } from '../i18n';
import { copy } from '../i18n';
import { SiteActions } from './SiteActions';

type HeaderProps = {
  language: Language;
  onNavigateSection?: (sectionId: 'work' | 'about' | 'contact') => void;
  onRandomSkin: () => void;
  onResetSkin: () => void;
  onToggleLanguage: () => void;
  skinName: string;
};

export function Header({
  language,
  onNavigateSection,
  onRandomSkin,
  onResetSkin,
  onToggleLanguage,
  skinName
}: HeaderProps) {
  const text = copy[language];
  const handleSectionClick =
    (sectionId: 'work' | 'about' | 'contact') => (event: MouseEvent<HTMLAnchorElement>) => {
      if (!onNavigateSection) {
        return;
      }

      event.preventDefault();
      onNavigateSection(sectionId);
    };

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label={text.brandAria}>
        心月呈幅
      </a>
      <nav className="site-nav" aria-label={text.navLabel}>
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
