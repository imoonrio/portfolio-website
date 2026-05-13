import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('README portfolio update instructions', () => {
  it('explains how to add latest works to the static portfolio', () => {
    const readme = readFileSync(join(process.cwd(), 'README.md'), 'utf8');

    expect(readme).toContain('public/works/');
    expect(readme).toContain('src/data/works.ts');
    expect(readme).toContain('npm run build');
    expect(readme).toContain('dist/');
  });
});
