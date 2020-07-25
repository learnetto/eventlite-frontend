import React from 'react'
import { render } from '@testing-library/react'
import EventSummary from '../components/EventSummary'

it('renders event title', () => {
  const { getByText } = render(<EventSummary event={{title: 'My Test Event'}} />)
  const title = getByText('My Test Event')
  expect(title).toBeInTheDocument()
})
