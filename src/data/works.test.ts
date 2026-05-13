import { featuredWork, getCategories, works } from './works';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

describe('portfolio works data', () => {
  it('contains complete work entries for gallery rendering', () => {
    expect(works.length).toBeGreaterThanOrEqual(6);
    for (const work of works) {
      expect(work.id).toMatch(/^[a-z0-9-]+$/);
      expect(work.title.length).toBeGreaterThan(2);
      expect(work.category.length).toBeGreaterThan(1);
      expect(work.year).toMatch(/^\d{4}$/);
      expect(work.description.length).toBeGreaterThan(20);
      expect(work.image).toMatch(/^\/works\/.+\.svg$/);
    }
  });

  it('exposes one featured work for the editorial hero', () => {
    expect(featuredWork).toBeDefined();
    expect(featuredWork.featured).toBe(true);
  });

  it('returns sorted unique categories with All first', () => {
    expect(getCategories()).toEqual(['All', 'Branding', 'Design', 'Photography', 'UI']);
  });

  it('points every work at an existing public image asset', () => {
    for (const work of works) {
      const assetPath = join(process.cwd(), 'public', work.image.replace(/^\//, ''));
      expect(existsSync(assetPath), `${work.image} should exist`).toBe(true);
    }
  });
});
