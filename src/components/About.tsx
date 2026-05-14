import { copy, type Language } from '../i18n';

type AboutProps = {
  language: Language;
};

export function About({ language }: AboutProps) {
  const text = copy[language];

  return (
    <footer id="contact" className="about-section">
      <div id="about">
        <p className="eyebrow">{text.about.eyebrow}</p>
        <h2>{text.about.title}</h2>
      </div>
      <address>
        <a href="mailto:hello@example.com">hello@example.com</a>
        <a href="https://example.com" target="_blank" rel="noreferrer">
          {text.about.profile}
        </a>
      </address>
    </footer>
  );
}
