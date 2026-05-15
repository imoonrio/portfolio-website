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

  it('stacks the mobile header controls instead of squeezing all navigation into one row', () => {
    expect(phoneRules).toMatch(/\.site-header,\s*\.floating-header\s*{[^}]*display:\s*grid;/s);
    expect(phoneRules).toMatch(/\.brand\s*{[^}]*grid-column:\s*1 \/ -1;/s);
    expect(phoneRules).toMatch(/\.site-nav\s*{[^}]*grid-column:\s*1;[^}]*grid-row:\s*2;[^}]*overflow-x:\s*auto;/s);
    expect(phoneRules).toMatch(/\.language-toggle\s*{[^}]*grid-column:\s*2;[^}]*grid-row:\s*2;/s);
  });

  it('uses fluid phone typography and image heights for the hero', () => {
    expect(phoneRules).toMatch(/\.hero h1\s*{[^}]*font-size:\s*48px;[^}]*overflow-wrap:\s*anywhere;/s);
    expect(phoneRules).toMatch(/\.hero-feature,\s*\.hero-feature img\s*{[^}]*min-height:\s*clamp\(280px, 88vw, 360px\);/s);
  });

  it('turns project detail pages into natural mobile scrolling instead of viewport snap panels', () => {
    expect(phoneRules).toMatch(/\.project-detail-page\s*{[^}]*height:\s*auto;[^}]*overflow-y:\s*visible;/s);
    expect(phoneRules).toMatch(/\.project-detail-page\.detail-scroll,\s*\.project-image-stack\s*{[^}]*scroll-snap-type:\s*none;/s);
    expect(phoneRules).toMatch(/\.project-image-panel\s*{[^}]*min-height:\s*auto;[^}]*scroll-snap-align:\s*none;/s);
  });
});
