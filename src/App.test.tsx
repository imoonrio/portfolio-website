import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('portfolio app', () => {
  it('renders the editorial portfolio structure', () => {
    render(<App />);

    expect(screen.getByRole('banner')).toHaveTextContent('YOUR NAME');
    expect(screen.getByRole('heading', { name: /Selected works/i })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /Primary/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /Work gallery/i })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toHaveTextContent('hello@example.com');
  });

  it('filters works by category and can reset to all works', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Photography' }));
    const gallery = screen.getByRole('region', { name: /Work gallery/i });

    expect(within(gallery).getAllByRole('button', { name: /Open project/i })).toHaveLength(2);
    expect(within(gallery).getByText('Lumen Objects')).toBeInTheDocument();
    expect(within(gallery).queryByText('Northline UI')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'All' }));
    expect(within(gallery).getAllByRole('button', { name: /Open project/i })).toHaveLength(6);
  });

  it('opens and closes work details without leaving the page', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /Open project Quiet Forms/i }));
    const dialog = screen.getByRole('dialog', { name: /Quiet Forms/i });

    expect(dialog).toHaveTextContent('2026');
    expect(dialog).toHaveTextContent('Design');
    expect(within(dialog).getByRole('link', { name: /View project/i })).toHaveAttribute(
      'href',
      'https://example.com'
    );

    await user.click(within(dialog).getByRole('button', { name: /Close project details/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('switches the interface between English and Chinese', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole('heading', { name: /Selected works/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '中文' }));

    expect(screen.getByRole('heading', { name: /精选作品/i })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /主导航/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '摄影' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'EN' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'EN' }));

    expect(screen.getByRole('heading', { name: /Selected works/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Photography' })).toBeInTheDocument();
  });

  it('shows a floating back-to-top button after scrolling and scrolls to the top', async () => {
    const user = userEvent.setup();
    const scrollTo = vi.fn();
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0, writable: true });
    Object.defineProperty(window, 'scrollTo', { configurable: true, value: scrollTo });

    render(<App />);

    expect(screen.queryByRole('button', { name: /Back to top/i })).not.toBeInTheDocument();

    act(() => {
      window.scrollY = 520;
      window.dispatchEvent(new Event('scroll'));
    });

    await user.click(await screen.findByRole('button', { name: /Back to top/i }));

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
