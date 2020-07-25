import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

it('renders Eventlite link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Eventlite/i);
  expect(linkElement).toBeInTheDocument();
});
