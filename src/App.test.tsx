import { render, screen, within } from '@testing-library/react';
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
});
