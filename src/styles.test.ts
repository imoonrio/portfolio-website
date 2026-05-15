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
    expect(styles).toMatch(/\.site-header\s*{[^}]*width:\s*100%;[^}]*margin:\s*0;[^}]*padding:\s*22px max\(20px, calc\(\(100% - 1180px\) \/ 2\)\) 14px;/s);
  });

  it('renders the hero work area as a full-width 16:9 carousel banner', () => {
    expect(styles).toMatch(/\.hero\s*{[^}]*position:\s*relative;[^}]*width:\s*100%;/s);
    expect(styles).toMatch(/\.hero-copy\s*{[^}]*position:\s*absolute;[^}]*z-index:\s*2;/s);
    expect(styles).toMatch(/\.hero-feature\s*{[^}]*aspect-ratio:\s*16 \/ 9;[^}]*min-height:\s*0;/s);
    expect(styles).toMatch(/\.hero-feature img\s*{[^}]*min-height:\s*0;/s);
    expect(styles).toMatch(/\.hero-feature img\s*{[^}]*animation:\s*hero-slide-in 620ms ease both;/s);
    expect(styles).toMatch(/\.hero-carousel-controls\s*{[^}]*top:\s*0;[^}]*right:\s*18px;[^}]*bottom:\s*0;[^}]*left:\s*18px;/s);
    expect(styles).toMatch(/\.hero-carousel-button\s*{[^}]*width:\s*min\(22vw, 220px\);[^}]*color:\s*#fff;[^}]*background:\s*transparent;[^}]*border:\s*0;[^}]*opacity:\s*0;[^}]*transform:\s*translateX\(-8px\);[^}]*transition:[^}]*opacity 260ms ease,[^}]*transform 260ms ease;/s);
    expect(styles).toMatch(/\.hero\.is-controls-visible \.hero-carousel-button,\s*\.hero:focus-within \.hero-carousel-button\s*{[^}]*opacity:\s*1;/s);
  });

  it('animates gallery filtering in both shrinking and expanding directions', () => {
    expect(styles).toMatch(/\.work-grid\s*{[^}]*contain:\s*layout;[^}]*view-transition-name:\s*work-gallery;/s);
    expect(styles).toMatch(/\.work-card\s*{[^}]*--stagger-index:\s*0;[^}]*animation:\s*work-card-gather 520ms cubic-bezier\(0\.22, 1, 0\.36, 1\) both;[^}]*animation-delay:\s*calc\(var\(--stagger-index\) \* 42ms\);/s);
    expect(styles).toMatch(/::view-transition-old\(work-gallery\)\s*{[^}]*animation:\s*work-gallery-out 220ms ease both;/s);
    expect(styles).toMatch(/::view-transition-new\(work-gallery\)\s*{[^}]*animation:\s*work-gallery-in 460ms cubic-bezier\(0\.22, 1, 0\.36, 1\) both;/s);
  });

  it('uses softer desktop project page snapping so the first image can scroll back to the hero', () => {
    expect(styles).toMatch(/\.project-detail-page\.detail-scroll\s*{[^}]*scroll-snap-type:\s*y proximity;/s);
    expect(styles).toMatch(/\.project-detail-hero\s*{[^}]*scroll-snap-align:\s*start;/s);
    expect(styles).toMatch(/\.project-image-stack\s*{[^}]*scroll-snap-type:\s*y proximity;/s);
    expect(styles).toMatch(/\.project-image-panel\s*{[^}]*scroll-snap-stop:\s*normal;/s);
  });

  it('stacks the mobile header controls instead of squeezing all navigation into one row', () => {
    expect(phoneRules).toMatch(/\.site-header,\s*\.floating-header\s*{[^}]*display:\s*grid;/s);
    expect(phoneRules).toMatch(/\.brand\s*{[^}]*grid-column:\s*1 \/ -1;[^}]*justify-self:\s*center;[^}]*font-size:\s*20px;/s);
    expect(phoneRules).toMatch(/\.site-nav\s*{[^}]*grid-column:\s*1 \/ -1;[^}]*grid-row:\s*2;[^}]*justify-content:\s*center;[^}]*gap:\s*18px;[^}]*overflow-x:\s*auto;/s);
    expect(phoneRules).toMatch(/\.language-toggle\s*{[^}]*grid-column:\s*2;[^}]*grid-row:\s*2;/s);
  });

  it('uses fluid phone typography and image heights for the hero', () => {
    expect(phoneRules).toMatch(/\.hero h1\s*{[^}]*font-size:\s*48px;[^}]*overflow-wrap:\s*anywhere;/s);
    expect(phoneRules).toMatch(/\.hero-feature,\s*\.hero-carousel-controls\s*{[^}]*display:\s*none;/s);
  });

  it('turns project detail pages into natural mobile scrolling instead of viewport snap panels', () => {
    expect(phoneRules).toMatch(/\.project-detail-page\s*{[^}]*height:\s*auto;[^}]*overflow-y:\s*visible;/s);
    expect(phoneRules).toMatch(/\.project-detail-page\.detail-scroll,\s*\.project-image-stack\s*{[^}]*scroll-snap-type:\s*none;/s);
    expect(phoneRules).toMatch(/\.project-image-panel\s*{[^}]*min-height:\s*auto;[^}]*scroll-snap-align:\s*none;/s);
  });

  it('keeps the mobile about section in a natural single-column text flow', () => {
    expect(phoneRules).toMatch(/\.about-section\s*{[^}]*display:\s*flex;[^}]*flex-direction:\s*column;[^}]*gap:\s*30px;/s);
    expect(phoneRules).toMatch(/\.about-copy\s*{[^}]*display:\s*grid;[^}]*gap:\s*14px;/s);
    expect(phoneRules).toMatch(/\.about-copy \.eyebrow,\s*\.about-section h2,\s*\.about-subtitle,\s*\.about-intro\s*{[^}]*margin:\s*0;/s);
    expect(phoneRules).toMatch(/\.about-section h2\s*{[^}]*font-size:\s*clamp\(30px, 9vw, 38px\);[^}]*line-height:\s*1\.12;[^}]*overflow-wrap:\s*anywhere;/s);
  });
});
