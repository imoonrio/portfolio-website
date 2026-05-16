import { useState } from 'react';
import type { Language } from '../i18n';
import { copy } from '../i18n';

type SiteActionsProps = {
  language: Language;
  skinName: string;
  onRandomSkin: () => void;
  onResetSkin: () => void;
  onToggleLanguage: () => void;
};

function ShirtIcon() {
  return (
    <svg className="site-action-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8.4 4 12 6.1 15.6 4l4.2 2.8-2.2 4-2.1-.9V20h-7V9.9l-2.1.9-2.2-4L8.4 4Z" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg className="site-action-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5 12a7 7 0 1 0 2.1-5" />
      <path d="M7 3v4h4" />
    </svg>
  );
}

export function SiteActions({
  language,
  skinName,
  onRandomSkin,
  onResetSkin,
  onToggleLanguage
}: SiteActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const text = copy[language];
  const skinLabel = language === 'zh' ? `随机切换皮肤，当前 ${skinName}` : `Random skin, current ${skinName}`;
  const resetLabel = language === 'zh' ? '恢复默认皮肤' : 'Reset default skin';
  const menuLabel = language === 'zh' ? '打开站点控制' : 'Open site controls';

  const runMobileAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className={isOpen ? 'site-actions is-open' : 'site-actions'}>
      <div className="desktop-actions" aria-label={language === 'zh' ? '站点控制' : 'Site controls'}>
        <button className="skin-control" type="button" onClick={onResetSkin} aria-label={resetLabel} title={resetLabel}>
          <ResetIcon />
        </button>
        <button className="skin-control" type="button" onClick={onRandomSkin} aria-label={skinLabel} title={skinLabel}>
          <ShirtIcon />
        </button>
        <button className="language-toggle" type="button" onClick={onToggleLanguage}>
          {text.languageToggle}
        </button>
      </div>
      <button
        className="mobile-actions-toggle"
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-label={menuLabel}
      >
        ...
      </button>
      <div className="mobile-actions-panel" aria-hidden={!isOpen}>
        <button type="button" onClick={() => runMobileAction(onToggleLanguage)}>
          {text.languageToggle}
        </button>
        <button type="button" onClick={() => runMobileAction(onRandomSkin)} aria-label={skinLabel}>
          <ShirtIcon />
        </button>
        <button type="button" onClick={() => runMobileAction(onResetSkin)} aria-label={resetLabel}>
          <ResetIcon />
        </button>
      </div>
    </div>
  );
}
