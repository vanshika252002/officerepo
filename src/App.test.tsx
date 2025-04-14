import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders headline', () => {
    render(<App />);

    // const heading = screen.getByText(/trackit live/i);
    // expect(heading).toBeVisible();
    // check if App components renders text learn
    const texto = screen.getByText(/learn/i);
    expect(texto).toBeVisible();
  });
});
