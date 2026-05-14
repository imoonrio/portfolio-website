import type { Language } from '../i18n';
import { copy } from '../i18n';

type HeaderProps = {
  language: Language;
  onToggleLanguage: () => void;
};

export function Header({ language, onToggleLanguage }: HeaderProps) {
  const text = copy[language];

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label={text.brandAria}>
        YOUR NAME
      </a>
      <nav className="site-nav" aria-label={text.navLabel}>
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
