import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import ButtonPrimary from './ButtonPrimary';
import ButtonSecondary from './ButtonSecondary';

expect.extend(toHaveNoViolations);

describe('ButtonPrimary', () => {
  it('renders with correct text', () => {
    render(<ButtonPrimary>Click me</ButtonPrimary>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('has minimum height of 44px for accessibility', () => {
    const { container } = render(<ButtonPrimary>Button</ButtonPrimary>);
    const button = screen.getByRole('button');

    // Check class includes min-h-[44px]
    expect(button.className).toContain('min-h-[44px]');
  });

  it('shows loading spinner when loading prop is true', () => {
    render(<ButtonPrimary loading>Loading</ButtonPrimary>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<ButtonPrimary disabled>Disabled</ButtonPrimary>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    render(<ButtonPrimary onClick={handleClick}>Click</ButtonPrimary>);
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with accent variant by default', () => {
    render(<ButtonPrimary>Accent</ButtonPrimary>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('neuro-btn-accent');
  });

  it('renders with secondary variant when specified', () => {
    render(<ButtonPrimary variant="secondary">Secondary</ButtonPrimary>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('neuro-btn');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<ButtonPrimary>Accessible</ButtonPrimary>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has visible focus ring on focus', () => {
    render(<ButtonPrimary>Focus me</ButtonPrimary>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('focus-visible:ring-2');
  });
});

describe('ButtonSecondary', () => {
  it('renders with correct text', () => {
    render(<ButtonSecondary>Secondary</ButtonSecondary>);
    expect(screen.getByRole('button')).toHaveTextContent('Secondary');
  });

  it('has minimum height of 44px for accessibility', () => {
    const { container } = render(<ButtonSecondary>Button</ButtonSecondary>);
    const button = screen.getByRole('button');

    // Check class includes min-h-[44px]
    expect(button.className).toContain('min-h-[44px]');
  });

  it('shows loading spinner when loading prop is true', () => {
    render(<ButtonSecondary loading>Loading</ButtonSecondary>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<ButtonSecondary disabled>Disabled</ButtonSecondary>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    render(<ButtonSecondary onClick={handleClick}>Click</ButtonSecondary>);
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has border styling for ghost button appearance', () => {
    render(<ButtonSecondary>Ghost</ButtonSecondary>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('border-2');
    expect(button.className).toContain('border-accent');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<ButtonSecondary>Accessible</ButtonSecondary>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has visible focus ring on focus', () => {
    render(<ButtonSecondary>Focus me</ButtonSecondary>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('focus-visible:ring-2');
  });
});
