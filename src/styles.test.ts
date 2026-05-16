import { readFileSync } from 'node:fs';

const styles = readFileSync('src/styles.css', 'utf8');

function mediaBlock(query: string) {
  const start = styles.indexOf(query);

  if (start === -1) {
    return '';
  }

  const blockStart = styles.indexOf('{', start);
  let depth = 0;

  for (let index = blockStart; index < styles.length; index += 1) {
    const character = styles[index];

    if (character === '{') {
      depth += 1;
    }

    if (character === '}') {
      depth -= 1;
    }

    if (depth === 0) {
      return styles.slice(blockStart + 1, index);
    }
  }

  return '';
}

describe('mobile responsive stylesheet', () => {
  const phoneRules = mediaBlock('@media (max-width: 680px)');

  it('uses a full-width static header background while keeping constrained content padding', () => {
    expect(styles).toMatch(/\.site-shell\s*{[^}]*--content-max-width:\s*1180px;[^}]*--content-gutter:\s*40px;[^}]*--content-gutter-mobile:\s*24px;/s);
    expect(styles).toMatch(/\.site-header\s*{[^}]*width:\s*100%;[^}]*margin:\s*0;[^}]*padding:\s*22px max\(20px, calc\(\(100% - var\(--content-max-width\)\) \/ 2\)\) 14px;/s);
    expect(styles).toMatch(/\.work-section\s*{[^}]*width:\s*min\(var\(--content-max-width\), calc\(100% - var\(--content-gutter\)\)\);/s);
    expect(styles).toMatch(/\.about-section\s*{[^}]*width:\s*min\(var\(--content-max-width\), calc\(100% - var\(--content-gutter\)\)\);/s);
  });

  it('renders the hero work area as a full-width 16:9 carousel banner', () => {
    expect(styles).toMatch(/\.hero\s*{[^}]*position:\s*relative;[^}]*width:\s*100%;/s);
    expect(styles).toMatch(/\.hero-copy\s*{[^}]*position:\s*absolute;[^}]*z-index:\s*2;/s);
    expect(styles).toMatch(/\.hero-feature\s*{[^}]*aspect-ratio:\s*16 \/ 9;[^}]*min-height:\s*0;/s);
    expect(styles).toMatch(/\.hero-feature\s*{[^}]*background:\s*transparent;[^}]*border:\s*0;[^}]*border-radius:\s*0;[^}]*box-shadow:\s*none;/s);
    expect(styles).toMatch(/\.hero-feature img\s*{[^}]*min-height:\s*0;/s);
    expect(styles).toMatch(/\.hero-feature img\s*{[^}]*animation:\s*hero-slide-in 620ms ease both;/s);
    expect(styles).toMatch(/\.hero-carousel-controls\s*{[^}]*top:\s*0;[^}]*right:\s*18px;[^}]*bottom:\s*0;[^}]*left:\s*18px;/s);
    expect(styles).toMatch(/\.hero-carousel-button\s*{[^}]*width:\s*min\(22vw, 220px\);[^}]*color:\s*#fff;[^}]*background:\s*transparent;[^}]*border:\s*0;[^}]*opacity:\s*0;[^}]*transform:\s*translateX\(-8px\);[^}]*transition:[^}]*opacity 260ms ease,[^}]*transform 260ms ease;/s);
    expect(styles).toMatch(/\.hero\.is-controls-visible \.hero-carousel-button,\s*\.hero:focus-within \.hero-carousel-button\s*{[^}]*opacity:\s*1;/s);
  });

  it('animates gallery filtering in both shrinking and expanding directions', () => {
    expect(styles).toMatch(/\.work-grid\s*{[^}]*contain:\s*layout;[^}]*view-transition-name:\s*work-gallery;/s);
    expect(styles).toMatch(/\.work-card\s*{[^}]*display:\s*grid;[^}]*grid-template-rows:\s*minmax\(0, 1fr\) auto;[^}]*height:\s*100%;/s);
    expect(styles).toMatch(/\.work-image-wrap\s*{[^}]*min-height:\s*clamp\(260px, 34vw, 430px\);[^}]*overflow:\s*hidden;/s);
    expect(styles).toMatch(/\.work-card\s*{[^}]*--stagger-index:\s*0;[^}]*animation:\s*work-card-gather 520ms cubic-bezier\(0\.22, 1, 0\.36, 1\) both;[^}]*animation-delay:\s*calc\(var\(--stagger-index\) \* 42ms\);/s);
    expect(styles).toMatch(/::view-transition-old\(work-gallery\)\s*{[^}]*animation:\s*work-gallery-out 220ms ease both;/s);
    expect(styles).toMatch(/::view-transition-new\(work-gallery\)\s*{[^}]*animation:\s*work-gallery-in 460ms cubic-bezier\(0\.22, 1, 0\.36, 1\) both;/s);
  });

  it('uses softer desktop project page snapping so the first image can scroll back to the hero', () => {
    expect(styles).toMatch(/\.detail-image\s*{[^}]*object-fit:\s*cover;/s);
    expect(styles).toMatch(/\.project-detail-page\s*{[^}]*scrollbar-gutter:\s*stable;/s);
    expect(styles).toMatch(/\.project-detail-page\.detail-scroll\s*{[^}]*scroll-snap-type:\s*y proximity;/s);
    expect(styles).toMatch(/\.project-detail-hero\s*{[^}]*scroll-snap-align:\s*start;/s);
    expect(styles).toMatch(/\.project-detail-hero\s*{[^}]*display:\s*grid;[^}]*align-items:\s*end;[^}]*background:[^}]*linear-gradient/s);
    expect(styles).toMatch(/\.project-detail-hero-copy\s*{[^}]*width:\s*min\(var\(--content-max-width\), calc\(100% - var\(--content-gutter\)\)\);[^}]*margin:\s*0 auto clamp\(28px, 7vw, 88px\);/s);
    expect(styles).not.toMatch(/\.project-detail-hero img\s*{/);
    expect(styles).toMatch(/\.project-image-stack\s*{[^}]*scroll-snap-type:\s*y proximity;/s);
    expect(styles).toMatch(/\.project-image-panel\s*{[^}]*scroll-snap-stop:\s*normal;/s);
  });

  it('keeps the project detail contact panel on the same constrained content grid', () => {
    expect(styles).toMatch(/\.project-detail-frame\s*{[^}]*width:\s*min\(var\(--content-max-width\), calc\(100% - var\(--content-gutter\)\)\);[^}]*margin:\s*24px auto 72px;/s);
    expect(styles).toMatch(/\.project-detail-frame > \.contact-panel\s*{[^}]*width:\s*100%;[^}]*padding:\s*clamp\(24px, 4vw, 40px\);[^}]*background:\s*var\(--skin-surface\);[^}]*border:\s*1px solid var\(--skin-border\);[^}]*box-shadow:\s*var\(--skin-shadow\);/s);
  });

  it('drives about icons and mobile text colors from the active skin variables', () => {
    expect(styles).toMatch(/\.site-shell\s*{[^}]*--mobile-hero-bg:[^;]+;[^}]*--portrait-bg:[^;]+;[^}]*--portrait-filter:\s*saturate\(1\.02\);/s);
    expect(styles).toMatch(/\.site-shell\[data-skin="neo-brutalism"\]\s*{[^}]*--mobile-hero-bg:[^}]*#ffd93d[^}]*--portrait-border-width:\s*4px;[^}]*--portrait-filter:\s*saturate\(1\.28\) contrast\(1\.08\);/s);
    expect(styles).toMatch(/\.site-shell\[data-skin="playful-geometric"\]\s*{[^}]*--brand-bg:\s*#fbbf24;[^}]*--portrait-layer-transform:\s*translate\(-16px, 20px\) rotate\(-8deg\);[^}]*--portrait-filter:\s*saturate\(1\.2\);/s);
    expect(styles).toMatch(/\.site-shell\[data-skin="maximalism"\]\s*{[^}]*--mobile-hero-bg:[^}]*#ff3af2[^}]*--portrait-border-style:\s*dashed;[^}]*--portrait-filter:\s*saturate\(1\.45\) contrast\(1\.08\);/s);
    expect(styles).toMatch(/\.about-portrait\s*{[^}]*background:\s*var\(--portrait-bg\);[^}]*border:\s*var\(--portrait-border-width\) var\(--portrait-border-style\) var\(--skin-border\);[^}]*transform:\s*var\(--portrait-transform\);/s);
    expect(styles).toMatch(/\.about-portrait img\s*{[^}]*aspect-ratio:\s*1435 \/ 851;[^}]*object-fit:\s*contain;[^}]*filter:\s*var\(--portrait-filter\)/s);
    expect(styles).toMatch(/\.about-icon\s*{[^}]*color:\s*var\(--skin-accent\);[^}]*background:\s*var\(--skin-surface-strong\);[^}]*border:\s*1px solid var\(--skin-border\);[^}]*border-radius:\s*var\(--skin-pill-radius\);/s);
    expect(styles).toMatch(/\.about-summary-item \.about-icon,\s*\.about-detail h3 \.about-icon\s*{[^}]*color:\s*var\(--skin-accent\);[^}]*background:\s*color-mix\(in srgb, var\(--skin-accent\) 14%, var\(--skin-surface-strong\)\);[^}]*border-color:\s*color-mix\(in srgb, var\(--skin-accent\) 46%, var\(--skin-border\)\);/s);
    expect(styles).toMatch(/\.about-copy\s*{[^}]*scroll-margin-top:\s*120px;/s);
    expect(styles).toMatch(/\.contact-panel\s*{[^}]*scroll-margin-top:\s*120px;/s);
    expect(styles).toMatch(/\.brand\s*{[^}]*color:\s*var\(--brand-color\);[^}]*background:\s*transparent;[^}]*border:\s*0;[^}]*text-shadow:\s*none;[^}]*transform:\s*var\(--brand-transform\);/s);
    expect(styles).toMatch(/\.contact-panel address\s*{[^}]*display:\s*grid;[^}]*gap:\s*12px;[^}]*font-style:\s*normal;/s);
    expect(styles).toMatch(/\.contact-link\s*{[^}]*display:\s*grid;[^}]*grid-template-columns:\s*minmax\(0, 1fr\) 38px;/s);
    expect(styles).toMatch(/\.contact-arrow\s*{[^}]*display:\s*grid;[^}]*width:\s*18px;[^}]*height:\s*18px;[^}]*color:\s*var\(--contact-arrow-color\);[^}]*background:\s*transparent;[^}]*border:\s*0;[^}]*box-shadow:\s*none;/s);
    expect(styles).toMatch(/\.contact-arrow::before\s*{[^}]*border-top:\s*3px solid currentColor;[^}]*border-right:\s*3px solid currentColor;[^}]*transform:\s*translateX\(-1px\) rotate\(45deg\);/s);
    expect(styles).toMatch(/\.about-subtitle\s*{[^}]*color:\s*var\(--skin-muted\);/s);
    expect(styles).toMatch(/\.about-detail li\s*{[^}]*color:\s*var\(--skin-muted\);/s);
    expect(phoneRules).toMatch(/\.hero-copy\s*{[^}]*color:\s*#fffdfa;/s);
    expect(phoneRules).toMatch(/\.hero-text\s*{[^}]*color:\s*rgba\(255, 253, 250, 0\.78\);/s);
  });

  it('stacks the mobile header controls instead of squeezing all navigation into one row', () => {
    expect(phoneRules).toMatch(/\.site-header,\s*\.floating-header\s*{[^}]*display:\s*grid;/s);
    expect(phoneRules).toMatch(/\.brand\s*{[^}]*grid-column:\s*1 \/ -1;[^}]*justify-self:\s*center;[^}]*font-size:\s*20px;/s);
    expect(phoneRules).toMatch(/\.site-nav\s*{[^}]*grid-column:\s*1 \/ -1;[^}]*grid-row:\s*2;[^}]*justify-content:\s*center;[^}]*gap:\s*18px;[^}]*overflow-x:\s*auto;/s);
    expect(phoneRules).toMatch(/\.site-actions\s*{[^}]*grid-column:\s*2;[^}]*grid-row:\s*2;[^}]*justify-self:\s*end;/s);
    expect(phoneRules).toMatch(/\.desktop-actions\s*{[^}]*display:\s*none;/s);
    expect(phoneRules).toMatch(/\.mobile-actions-toggle\s*{[^}]*display:\s*grid;/s);
    expect(phoneRules).toMatch(/\.site-actions\.is-open \.mobile-actions-panel\s*{[^}]*pointer-events:\s*auto;[^}]*opacity:\s*1;/s);
  });

  it('uses fluid phone typography and image heights for the hero', () => {
    expect(phoneRules).toMatch(/\.hero\s*{[^}]*width:\s*100%;[^}]*padding:\s*42px max\(12px, calc\(\(100% - var\(--content-max-width\)\) \/ 2\)\) 58px;[^}]*background:\s*var\(--mobile-hero-bg\);/s);
    expect(phoneRules).toMatch(/\.hero::before\s*{[^}]*background-image:\s*var\(--mobile-hero-pattern\);[^}]*background-size:\s*var\(--mobile-hero-pattern-size\);/s);
    expect(phoneRules).toMatch(/\.hero h1\s*{[^}]*font-size:\s*48px;[^}]*overflow-wrap:\s*anywhere;/s);
    expect(phoneRules).toMatch(/\.hero-feature,\s*\.hero-carousel-controls\s*{[^}]*display:\s*none;/s);
  });

  it('turns project detail pages into natural mobile scrolling instead of viewport snap panels', () => {
    expect(phoneRules).toMatch(/\.project-detail-page\s*{[^}]*height:\s*auto;[^}]*overflow-y:\s*visible;/s);
    expect(phoneRules).toMatch(/\.project-detail-page\.detail-scroll,\s*\.project-image-stack\s*{[^}]*scroll-snap-type:\s*none;/s);
    expect(styles).not.toMatch(/\.floating-project-back-button/);
    expect(phoneRules).toMatch(/\.project-detail-hero\s*{[^}]*min-height:\s*min\(310px, 36vh\);/s);
    expect(phoneRules).toMatch(/\.project-detail-hero-copy\s*{[^}]*width:\s*min\(calc\(100% - var\(--content-gutter-mobile\)\), var\(--content-max-width\)\);[^}]*margin:\s*0 auto 28px;/s);
    expect(phoneRules).toMatch(/\.project-image-panel\s*{[^}]*min-height:\s*auto;[^}]*scroll-snap-align:\s*none;/s);
  });

  it('keeps the mobile about section in a natural single-column text flow', () => {
    expect(phoneRules).toMatch(/\.about-section\s*{[^}]*display:\s*flex;[^}]*flex-direction:\s*column;[^}]*gap:\s*30px;/s);
    expect(phoneRules).toMatch(/\.about-copy\s*{[^}]*display:\s*grid;[^}]*gap:\s*14px;/s);
    expect(phoneRules).toMatch(/\.about-copy\s*{[^}]*scroll-margin-top:\s*138px;/s);
    expect(phoneRules).toMatch(/\.contact-panel\s*{[^}]*scroll-margin-top:\s*138px;/s);
    expect(phoneRules).toMatch(/\.about-copy \.eyebrow,\s*\.about-section h2,\s*\.about-subtitle,\s*\.about-intro\s*{[^}]*margin:\s*0;/s);
    expect(phoneRules).toMatch(/\.about-section h2\s*{[^}]*font-size:\s*clamp\(30px, 9vw, 38px\);[^}]*line-height:\s*1\.12;[^}]*overflow-wrap:\s*anywhere;/s);
    expect(phoneRules).toMatch(/\.contact-grid\s*{[^}]*grid-template-columns:\s*minmax\(0, 1fr\);[^}]*gap:\s*14px;/s);
    expect(phoneRules).toMatch(/\.contact-link\s*{[^}]*min-height:\s*56px;[^}]*padding:\s*13px 14px;/s);
  });
});
