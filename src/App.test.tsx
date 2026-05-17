import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { heroSlides, works } from './data/works';
import { defaultSkinId } from './skins';

const firstWork = works[0];
const secondHeroWork = works.find((work) => work.id === heroSlides[1].workId) ?? works[1];

describe('portfolio app', () => {
  it('renders the editorial portfolio structure', () => {
    const { container } = render(<App />);

    expect(container.querySelector('.site-shell')).toHaveAttribute('data-skin', defaultSkinId);
    expect(screen.getByRole('banner')).toHaveTextContent('心月呈幅');
    expect(screen.getByRole('heading', { name: '精选作品' })).toBeInTheDocument();
    expect(screen.getByText('以安静而笃定的方式呈现。')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /主导航/i })).toBeInTheDocument();
    expect(within(screen.getByRole('navigation', { name: /主导航/i })).queryByText('首页')).not.toBeInTheDocument();
    expect(screen.getByRole('region', { name: /作品画廊/i })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toHaveTextContent('imoonrio@foxmail.com');
    expect(screen.getByRole('contentinfo')).toHaveTextContent('180 **** 0814');
  });

  it('switches to a random skin and can restore the default skin', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);
    const shell = container.querySelector('.site-shell');

    expect(shell).toHaveAttribute('data-skin', defaultSkinId);

    await user.click(screen.getByRole('button', { name: /随机切换皮肤/i }));

    expect(shell).not.toHaveAttribute('data-skin', defaultSkinId);

    await user.click(screen.getByRole('button', { name: '恢复默认皮肤' }));

    expect(shell).toHaveAttribute('data-skin', defaultSkinId);
  });

  it('presents an anonymized professional profile from the resume', () => {
    render(<App />);
    const about = screen.getByRole('contentinfo');

    expect(within(about).getByRole('heading', { name: '视觉设计师' })).toBeInTheDocument();
    expect(about).toHaveTextContent('专注品牌传播、数字界面与线下活动视觉系统。');
    expect(about).toHaveTextContent('品牌传播');
    expect(about).toHaveTextContent('数字界面');
    expect(about).toHaveTextContent('项目经历');
    expect(about).not.toHaveTextContent('金鑫');
    expect(about).not.toHaveTextContent('长春');
    expect(about).not.toHaveTextContent('2018');
    expect(about).not.toHaveTextContent('北京百孚思');
  });

  it('visually marks the profile column with a character and unified section icons', () => {
    const { container } = render(<App />);
    const about = screen.getByRole('contentinfo');
    const character = within(about).getByRole('img', { name: /虚拟人物形象/i });

    expect(character).toHaveAttribute('src', '/profile-ip.png');
    expect(container.querySelector('.about-portrait')).toBeInTheDocument();
    expect(container.querySelectorAll('.about-icon')).toHaveLength(6);
    expect(within(about).getByRole('img', { name: /微信二维码占位图/i })).toBeInTheDocument();
    expect(within(about).getByRole('img', { name: /微信二维码/i })).toHaveAttribute('src', '/wechat.svg');
    expect(within(about).getByRole('link', { name: /发邮件 imoonrio@foxmail.com/i })).toHaveAttribute(
      'href',
      'mailto:imoonrio@foxmail.com'
    );
    expect(within(about).getByRole('link', { name: /致电 180 \*\*\*\* 0814/i })).toHaveAttribute(
      'href',
      'tel:18088680814'
    );
    expect(about).toHaveTextContent('180 **** 0814');
    expect(about).not.toHaveTextContent('18088680814');
  });

  it('filters works by category and can reset to all works', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: '数字体验' }));
    const gallery = screen.getByRole('region', { name: /作品画廊/i });
    const digitalWorks = works.filter((work) => work.category === 'Digital');

    expect(within(gallery).getAllByRole('button', { name: /打开项目/i })).toHaveLength(
      digitalWorks.length
    );
    expect(within(gallery).getByText(digitalWorks[0].titleZh)).toBeInTheDocument();
    expect(within(gallery).queryByText(firstWork.titleZh)).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '全部' }));
    expect(within(gallery).getAllByRole('button', { name: /打开项目/i })).toHaveLength(works.length);
  });

  it('uses view transitions when switching work filters in supporting browsers', async () => {
    const user = userEvent.setup();
    const startViewTransition = vi.fn((updateCallback: () => void) => {
      updateCallback();
    });
    Object.defineProperty(document, 'startViewTransition', {
      configurable: true,
      value: startViewTransition
    });
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn(() => ({ matches: false }))
    });

    render(<App />);

    await user.click(screen.getByRole('button', { name: '品牌视觉' }));

    expect(startViewTransition).toHaveBeenCalledTimes(1);
    expect(screen.getAllByRole('button', { name: /打开项目/i })).toHaveLength(
      works.filter((work) => work.category === 'Brand').length
    );
  });

  it('opens and closes a lightweight work preview without leaving the page', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: `打开项目 ${firstWork.titleZh}` }));
    const dialog = screen.getByRole('dialog', { name: firstWork.titleZh });

    expect(dialog).not.toHaveTextContent(/\b20\d{2}\b/);
    expect(dialog).toHaveTextContent(firstWork.descriptionZh);
    expect(within(dialog).getByRole('img', { name: firstWork.titleZh })).toHaveAttribute(
      'src',
      firstWork.image
    );
    expect(within(dialog).getByRole('button', { name: /查看详情/i })).toBeInTheDocument();

    await user.click(within(dialog).getByRole('button', { name: /关闭项目详情/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not render year labels in work cards, previews, or project detail pages', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    expect(container).not.toHaveTextContent(/\b20\d{2}\b/);
    expect(container.querySelector('.work-card-overlay')).toHaveAttribute(
      'data-meta',
      '印刷物料'
    );

    await user.click(screen.getByRole('button', { name: `打开项目 ${firstWork.titleZh}` }));
    expect(screen.getByRole('dialog', { name: firstWork.titleZh })).not.toHaveTextContent(/\b20\d{2}\b/);

    await user.click(screen.getByRole('button', { name: /查看详情/i }));
    expect(screen.getByTestId('project-detail-page')).not.toHaveTextContent(/\b20\d{2}\b/);
  });

  it('uses lightweight preview images for the gallery and featured cover', () => {
    render(<App />);

    expect(screen.queryByText(`1 / ${works.length}`)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: `打开作品详情 ${firstWork.titleZh}` }).querySelector('img')).toHaveAttribute(
      'src',
      heroSlides[0].image
    );
    expect(screen.getByRole('button', { name: `打开项目 ${firstWork.titleZh}` }).querySelector('img')).toHaveAttribute(
      'src',
      firstWork.previewImage
    );
    expect(screen.getByRole('button', { name: `打开项目 ${firstWork.titleZh}` }).querySelector('img')).toHaveAttribute(
      'loading',
      'lazy'
    );
  });

  it('opens the project detail page directly from the hero carousel', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: `打开作品详情 ${firstWork.titleZh}` }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByTestId('project-detail-page')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: firstWork.titleZh })).toBeInTheDocument();
  });

  it('cycles every work in the hero carousel', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: '下一个轮播作品' }));

    expect(screen.getByRole('button', { name: `打开作品详情 ${secondHeroWork.titleZh}` })).toBeInTheDocument();
  });

  it('auto-advances the hero carousel', () => {
    vi.useFakeTimers();

    try {
      render(<App />);

      act(() => {
        vi.advanceTimersByTime(7200);
      });

      expect(screen.getByRole('button', { name: `打开作品详情 ${secondHeroWork.titleZh}` })).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it('hides hero arrows after the pointer stops moving for one second', () => {
    vi.useFakeTimers();

    try {
      render(<App />);
      const hero = screen.getByRole('region', { name: '精选作品' });

      fireEvent.mouseMove(hero);

      expect(hero).toHaveClass('is-controls-visible');

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(hero).not.toHaveClass('is-controls-visible');
    } finally {
      vi.useRealTimers();
    }
  });

  it('keeps project navigation buttons outside the preview dialog', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: `打开项目 ${firstWork.titleZh}` }));
    const dialog = screen.getByRole('dialog', { name: firstWork.titleZh });

    expect(within(dialog).queryByRole('button', { name: /下一个项目/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /下一个项目/i })).toBeInTheDocument();
  });

  it('switches between projects from the preview overlay controls', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: `打开项目 ${firstWork.titleZh}` }));

    await user.click(screen.getByRole('button', { name: /下一个项目/i }));

    expect(screen.getByRole('dialog', { name: works[1].titleZh })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: new RegExp(works[1].titleZh) })).toHaveAttribute(
      'src',
      works[1].image
    );
  });

  it('opens a project detail page with a full-width banner and ordered project images', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: `打开项目 ${firstWork.titleZh}` }));
    await user.click(screen.getByRole('button', { name: /查看详情/i }));

    const detailPage = screen.getByTestId('project-detail-page');
    const imageStack = within(detailPage).getByRole('region', { name: firstWork.titleZh });
    const projectImages = within(imageStack).getAllByRole('img', {
      name: new RegExp(firstWork.titleZh)
    });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(detailPage.querySelector('.project-detail-frame')).toBeInTheDocument();
    expect(within(detailPage).getByRole('banner')).toHaveClass('project-detail-hero');
    expect(within(detailPage).getByRole('banner')).toHaveClass('full-bleed');
    expect(within(detailPage).getByRole('banner').querySelector('img')).not.toBeInTheDocument();
    expect(within(detailPage).getByRole('heading', { name: firstWork.titleZh })).toBeInTheDocument();
    expect(within(detailPage).getByRole('heading', { name: '联系方式' })).toBeInTheDocument();
    expect(within(detailPage).getByRole('img', { name: /微信二维码/i })).toHaveAttribute('src', '/wechat.svg');
    expect(detailPage).toHaveTextContent('imoonrio@foxmail.com');
    expect(detailPage).toHaveTextContent('180 **** 0814');
    expect(detailPage).not.toHaveTextContent('18088680814');
    expect(within(screen.getByRole('navigation', { name: /主导航/i })).queryByText('首页')).not.toBeInTheDocument();
    expect(projectImages.map((image) => image.getAttribute('src'))).toEqual(firstWork.images);
  });

  it('shows a back-to-top button for the page-scrolling project detail page', async () => {
    const user = userEvent.setup();
    const windowScrollTo = vi.fn();
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0, writable: true });
    Object.defineProperty(window, 'scrollTo', { configurable: true, value: windowScrollTo });
    render(<App />);

    await user.click(screen.getByRole('button', { name: `打开项目 ${firstWork.titleZh}` }));
    await user.click(screen.getByRole('button', { name: /查看详情/i }));

    act(() => {
      window.scrollY = 520;
      window.dispatchEvent(new Event('scroll'));
    });

    await user.click(await screen.findByRole('button', { name: /返回顶部/i }));

    expect(windowScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('returns from project detail navigation to the requested main-page section', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: `打开项目 ${firstWork.titleZh}` }));
    await user.click(screen.getByRole('button', { name: /查看详情/i }));

    await user.click(within(screen.getByRole('navigation', { name: /主导航/i })).getByText('联系'));

    expect(screen.queryByTestId('project-detail-page')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '联系方式' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: `打开项目 ${firstWork.titleZh}` }));
    await user.click(screen.getByRole('button', { name: /查看详情/i }));
    await user.click(within(screen.getByRole('navigation', { name: /主导航/i })).getByText('关于'));

    expect(screen.queryByTestId('project-detail-page')).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: /虚拟人物形象/i })).toBeInTheDocument();
  });

  it('uses full-image snap panels inside the project detail page', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    await user.click(screen.getByRole('button', { name: `打开项目 ${firstWork.titleZh}` }));
    await user.click(screen.getByRole('button', { name: /查看详情/i }));

    expect(screen.getByTestId('project-detail-page')).toHaveClass('detail-scroll');
    expect(container.querySelector('.project-image-stack')).toHaveClass('snap-scroll');
    expect(container.querySelector('.project-image-stack')).not.toHaveClass('internal-scroll');
    expect(container.querySelectorAll('.project-image-panel')).toHaveLength(firstWork.images.length);
  });

  it('closes work details when clicking the empty backdrop area', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: `打开项目 ${firstWork.titleZh}` }));

    await user.click(screen.getByTestId('detail-backdrop'));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('switches the interface between English and Chinese', async () => {
    const user = userEvent.setup();
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0, writable: true });
    render(<App />);

    expect(screen.getByRole('heading', { name: /精选作品/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'EN' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'EN' }));

    expect(screen.getByRole('heading', { name: /Selected works/i })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /Primary/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Digital' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '中' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '中' }));

    expect(screen.getByRole('heading', { name: /精选作品/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '数字体验' })).toBeInTheDocument();
  });

  it('shows a floating back-to-top button after scrolling and scrolls to the top', async () => {
    const user = userEvent.setup();
    const scrollTo = vi.fn();
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0, writable: true });
    Object.defineProperty(window, 'scrollTo', { configurable: true, value: scrollTo });

    render(<App />);

    expect(screen.queryByRole('button', { name: /返回顶部/i })).not.toBeInTheDocument();

    act(() => {
      window.scrollY = 520;
      window.dispatchEvent(new Event('scroll'));
    });

    await user.click(await screen.findByRole('button', { name: /返回顶部/i }));

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('shows an animated fixed menu only after the page scrolls', () => {
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0, writable: true });

    render(<App />);

    expect(screen.getByRole('navigation', { name: /主导航/i })).toBeInTheDocument();
    expect(screen.queryByRole('navigation', { name: /滚动固定导航/i })).not.toBeInTheDocument();

    act(() => {
      window.scrollY = 220;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(screen.getByRole('navigation', { name: /滚动固定导航/i })).toBeInTheDocument();
    expect(screen.getByTestId('floating-header')).toHaveClass('is-visible');
  });

  it('keeps the homepage floating menu available on detail pages without a detail-only back button', async () => {
    const user = userEvent.setup();
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 220, writable: true });

    render(<App />);

    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    expect(screen.getByRole('navigation', { name: /滚动固定导航/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: `打开项目 ${firstWork.titleZh}` }));
    expect(screen.queryByRole('navigation', { name: /滚动固定导航/i })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /查看详情/i }));
    expect(screen.getByRole('navigation', { name: /滚动固定导航/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /返回作品列表/i })).not.toBeInTheDocument();

    await user.click(within(screen.getByRole('navigation', { name: /滚动固定导航/i })).getByText('关于'));
    expect(screen.queryByTestId('project-detail-page')).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: /虚拟人物形象/i })).toBeInTheDocument();
  });

  it('blocks common copy, context menu, and image drag actions', () => {
    render(<App />);

    expect(document.body).toHaveClass('content-protected');
    expect(fireEvent.contextMenu(document)).toBe(false);
    expect(fireEvent.copy(document)).toBe(false);
    expect(fireEvent.cut(document)).toBe(false);

    const firstImage = document.querySelector('img');
    expect(firstImage).toHaveAttribute('draggable', 'false');
    expect(fireEvent.dragStart(firstImage!)).toBe(false);
  });
});
