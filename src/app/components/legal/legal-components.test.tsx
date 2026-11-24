import { render, screen } from '@testing-library/react';
import { renderInline } from './renderInline';

describe('renderInline', () => {
  it('leaves plain text alone', () => {
    const { container } = render(<p>{renderInline('Just words, no markup.')}</p>);
    expect(container.textContent).toBe('Just words, no markup.');
    expect(container.querySelector('a, strong, code')).toBeNull();
  });

  it('renders bold and code', () => {
    render(<p>{renderInline('A **bold** word and `code` too')}</p>);
    expect(screen.getByText('bold').tagName).toBe('STRONG');
    expect(screen.getByText('code').tagName).toBe('CODE');
  });

  it('renders each kind of link the right way', () => {
    render(
      <p>
        {renderInline(
          '[inside](/privacy) [anchor](#cookies) [mail](mailto:support@maxwellsoftwaresolutions.com) [outside](https://vdai.lrv.lt/)',
        )}
      </p>,
    );
    expect(screen.getByRole('link', { name: 'inside' })).toHaveAttribute('href', '/privacy');
    expect(screen.getByRole('link', { name: 'anchor' })).toHaveAttribute('href', '#cookies');
    expect(screen.getByRole('link', { name: 'mail' })).toHaveAttribute(
      'href',
      'mailto:support@maxwellsoftwaresolutions.com',
    );
    const outside = screen.getByRole('link', { name: 'outside' });
    expect(outside).toHaveAttribute('href', 'https://vdai.lrv.lt/');
    expect(outside).toHaveAttribute('target', '_blank');
    expect(outside).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('never turns other schemes into links', () => {
    render(<p>{renderInline('[x](javascript:alert(1))')}</p>);
    expect(screen.queryByRole('link')).toBeNull();
  });
});
