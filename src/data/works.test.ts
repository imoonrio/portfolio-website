import { featuredWork, getCategories, heroSlides, works } from './works';
import { existsSync, readFileSync } from 'node:fs';
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
      expect(work.descriptionZh.length).toBeGreaterThan(10);
      expect(work.images.length).toBeGreaterThanOrEqual(1);
      expect(work.image).toMatch(/^\/works\/optimized\/.+_thumb_1_1\.(jpg|jpeg|png|webp)$/i);
      expect(work.previewImage).toMatch(/^\/works\/optimized\/.+_thumb_2_3\.(jpg|jpeg|png|webp)$/i);
      expect(work.images.every((image) => image.includes('/works/optimized/'))).toBe(true);
      expect(work.images.every((image) => !image.includes('_thumb_'))).toBe(true);
    }
  });

  it('exposes one featured work for the editorial hero', () => {
    expect(featuredWork).toBeDefined();
    expect(featuredWork.featured).toBe(true);
  });

  it('uses four dedicated local slide images for the homepage hero carousel', () => {
    expect(heroSlides).toHaveLength(4);

    for (const slide of heroSlides) {
      expect(works.some((work) => work.id === slide.workId)).toBe(true);
      expect(slide.image).toMatch(/^\/works\/slides\/.+-slide\.png$/);

      const slidePath = join(process.cwd(), 'public', slide.image.replace(/^\//, ''));
      expect(existsSync(slidePath), `${slide.image} should exist`).toBe(true);
    }
  });

  it('returns sorted unique categories with All first', () => {
    expect(getCategories()[0]).toBe('All');
    expect(getCategories()).toEqual(expect.arrayContaining(['Brand', 'Campaign', 'Digital', 'Event', 'Print']));
  });

  it('points every work at an existing public image asset', () => {
    for (const work of works) {
      for (const image of work.images) {
        const assetPath = join(process.cwd(), 'public', image.replace(/^\//, ''));
        expect(existsSync(assetPath), `${image} should exist`).toBe(true);
      }
      const previewPath = join(process.cwd(), 'public', work.previewImage.replace(/^\//, ''));
      expect(existsSync(previewPath), `${work.previewImage} should exist`).toBe(true);
      const dialogPath = join(process.cwd(), 'public', work.image.replace(/^\//, ''));
      expect(existsSync(dialogPath), `${work.image} should exist`).toBe(true);
    }
  });

  it('uses the new portfolio project folders as gallery projects', () => {
    expect(works).toHaveLength(8);
    expect(works.map((work) => work.titleZh)).toEqual([
      '护肤产品包装设计及延展',
      '护肤画册设计',
      '解放动力冬季节气创意合成海报设计',
      '解放体验官Logo及品牌视觉识别系统',
      '解放行APP界面视觉识别系统',
      '解放之夜线下活动视觉设计',
      '手绘香薰主题展架',
      '童话故事创意改编儿童绘本设计'
    ]);
    expect(works.every((work) => work.images.length > 1)).toBe(true);
    expect(works.every((work) => work.image.includes('/works/optimized/'))).toBe(true);
  });

  it('uses 2:3 thumbnails for closed gallery cards and 1:1 thumbnails for dialogs', () => {
    for (const work of works) {
      expect(work.previewImage).toContain('_thumb_2_3');
      expect(work.image).toContain('_thumb_1_1');
    }
  });

  it('fills the detail dialog thumbnail frame', () => {
    const styles = readFileSync(join(process.cwd(), 'src/styles.css'), 'utf-8');

    expect(styles).toMatch(/\.detail-image\s*{[^}]*object-fit:\s*cover/s);
  });
});
