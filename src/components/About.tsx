import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { copy, type Language } from '../i18n';

type AboutProps = {
  language: Language;
  onNavigateHome?: () => void;
};

type IconName = 'compass' | 'layers' | 'spark' | 'toolbox' | 'timeline' | 'contact';

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, JSX.Element> = {
    compass: (
      <>
        <circle cx="12" cy="12" r="7" />
        <path d="m14.5 9.5-1.8 4.2-4.2 1.8 1.8-4.2 4.2-1.8Z" />
      </>
    ),
    layers: (
      <>
        <path d="m12 4 8 4-8 4-8-4 8-4Z" />
        <path d="m4 12 8 4 8-4" />
        <path d="m4 16 8 4 8-4" />
      </>
    ),
    spark: (
      <>
        <path d="M12 3v5" />
        <path d="M12 16v5" />
        <path d="M4.2 7.2 7.7 10" />
        <path d="m16.3 14 3.5 2.8" />
        <path d="m19.8 7.2-3.5 2.8" />
        <path d="M7.7 14 4.2 16.8" />
        <circle cx="12" cy="12" r="3.5" />
      </>
    ),
    toolbox: (
      <>
        <path d="M7 8V6.8A2.8 2.8 0 0 1 9.8 4h4.4A2.8 2.8 0 0 1 17 6.8V8" />
        <path d="M4 8h16v11H4z" />
        <path d="M4 12h16" />
        <path d="M10 12v2h4v-2" />
      </>
    ),
    timeline: (
      <>
        <path d="M6 5v14" />
        <circle cx="6" cy="7" r="2" />
        <circle cx="6" cy="17" r="2" />
        <path d="M10 7h8" />
        <path d="M10 17h8" />
        <path d="M14 11h5" />
      </>
    ),
    contact: (
      <>
        <path d="M4 6h16v12H4z" />
        <path d="m4 7 8 6 8-6" />
        <path d="M8 18v2" />
        <path d="M16 18v2" />
      </>
    )
  };

  return (
    <span className="about-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        {paths[name]}
      </svg>
    </span>
  );
}

function ProfilePortrait({ label }: { label: string }) {
  return (
    <figure className="about-portrait">
      <img src="/profile-ip.png" alt={label} draggable="false" loading="lazy" decoding="async" />
    </figure>
  );
}

export function About({ language, onNavigateHome }: AboutProps) {
  const text = copy[language];
  const summaryIcons: IconName[] = ['compass', 'layers', 'spark'];

  return (
    <footer className="about-section">
      <div id="about" className="about-copy">
        <ProfilePortrait label={text.about.portraitAria} />
        <p className="eyebrow">{text.about.eyebrow}</p>
        <h2>{text.about.title}</h2>
        <p className="about-subtitle">{text.about.subtitle}</p>
        <p className="about-intro">{text.about.intro}</p>
        <div className="about-summary" aria-label={text.about.eyebrow}>
          {text.about.summary.map((item, index) => (
            <div className="about-summary-item" key={item.label}>
              <Icon name={summaryIcons[index]} />
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </div>
      <div className="about-detail">
        <section aria-labelledby="skills-title">
          <h3 id="skills-title">
            <Icon name="toolbox" />
            {text.about.skillsTitle}
          </h3>
          <ul>
            {text.about.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="experience-title">
          <h3 id="experience-title">
            <Icon name="timeline" />
            {text.about.experienceTitle}
          </h3>
          <div className="experience-list">
            {text.about.experiences.map((experience) => (
              <article key={experience.title}>
                <h4>{experience.title}</h4>
                <p>{experience.text}</p>
              </article>
            ))}
          </div>
        </section>
        <ContactPanel language={language} id="contact" onNavigateHome={onNavigateHome} />
      </div>
    </footer>
  );
}

type ContactPanelProps = {
  id?: string;
  language: Language;
  onNavigateHome?: () => void;
};

function useIsMobileContact() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return false;
    }

    return window.matchMedia('(max-width: 680px)').matches;
  });

  useEffect(() => {
    if (!window.matchMedia) {
      return undefined;
    }

    const query = window.matchMedia('(max-width: 680px)');
    const updateMatch = () => setIsMobile(query.matches);

    updateMatch();
    query.addEventListener?.('change', updateMatch);

    return () => {
      query.removeEventListener?.('change', updateMatch);
    };
  }, []);

  return isMobile;
}

export function ContactPanel({ id, language, onNavigateHome }: ContactPanelProps) {
  const text = copy[language];
  const isMobile = useIsMobileContact();
  const [copyStatus, setCopyStatus] = useState('');
  const copyStatusTimer = useRef<number | undefined>(undefined);
  const titleId = id ? `${id}-title` : 'contact-title';
  const email = 'imoonrio@foxmail.com';
  const phone = '18088680814';
  const maskedPhone = '180 **** 0814';
  const copiedMessage = language === 'zh' ? '已复制到剪贴板' : 'Copied to clipboard';
  const actions = {
    email: language === 'zh' ? `复制邮箱 ${email}` : `Copy email ${email}`,
    phone: language === 'zh' ? `复制电话 ${maskedPhone}` : `Copy phone ${maskedPhone}`,
    callPhone: language === 'zh' ? `致电 ${maskedPhone}` : `Call ${maskedPhone}`,
    site: language === 'zh' ? `访问${text.about.profile}` : `Visit ${text.about.profile}`
  };

  const copyToClipboard = async (value: string) => {
    await navigator.clipboard?.writeText(value);
    setCopyStatus(copiedMessage);
    window.clearTimeout(copyStatusTimer.current);
    copyStatusTimer.current = window.setTimeout(() => {
      setCopyStatus('');
    }, 2000);
  };
  const handleHomeClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!onNavigateHome) {
      return;
    }

    event.preventDefault();
    onNavigateHome();
  };

  useEffect(() => {
    return () => {
      window.clearTimeout(copyStatusTimer.current);
    };
  }, []);

  return (
    <section id={id} className="contact-panel" aria-labelledby={titleId}>
      <h3 id={titleId}>
        <Icon name="contact" />
        {text.about.contactTitle}
      </h3>
      <div className="contact-grid">
        <div className="qr-placeholder">
          <img
            src="/wechat.svg"
            alt={text.about.qrPlaceholder}
            data-saveable-image="true"
            draggable="false"
            loading="lazy"
            decoding="async"
          />
        </div>
        <address>
          <button
            className="contact-link"
            type="button"
            onClick={() => void copyToClipboard(email)}
            aria-label={actions.email}
          >
            <span className="contact-link-value">{email}</span>
            <span className="contact-arrow" aria-hidden="true" />
          </button>
          {isMobile ? (
            <a className="contact-link" href={`tel:${phone}`} aria-label={actions.callPhone}>
              <span className="contact-link-value">{maskedPhone}</span>
              <span className="contact-arrow" aria-hidden="true" />
            </a>
          ) : (
            <button
              className="contact-link"
              type="button"
              onClick={() => void copyToClipboard(phone)}
              aria-label={actions.phone}
            >
              <span className="contact-link-value">{maskedPhone}</span>
              <span className="contact-arrow" aria-hidden="true" />
            </button>
          )}
          <a className="contact-link" href="#top" aria-label={actions.site} onClick={handleHomeClick}>
            <span className="contact-link-value">{text.about.profile}</span>
            <span className="contact-arrow" aria-hidden="true" />
          </a>
        </address>
      </div>
      <div className="copy-toast" role="status" aria-live="polite">
        {copyStatus}
      </div>
    </section>
  );
}
