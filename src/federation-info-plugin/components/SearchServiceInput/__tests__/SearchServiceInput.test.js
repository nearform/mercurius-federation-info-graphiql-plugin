import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'

import SearchServiceInput from '../SearchServiceInput'

const mockSetQuery = jest.fn()

describe('SearchServiceInput', () => {
  const setup = overrideProps =>
    render(
      <SearchServiceInput query="" setQuery={mockSetQuery} {...overrideProps} />
    )

  it('should set query value when user starts typing', () => {
    setup()
    const input = screen.getByPlaceholderText('Search Services...')

    fireEvent.input(input, { target: { value: 'a' } })
    expect(mockSetQuery).toHaveBeenCalledWith('a')
  })

  it('should clear input text when clicking clear icon', () => {
    setup({ query: 'value' })

    fireEvent.click(screen.getByTestId('ClearIcon'))

    expect(mockSetQuery).toHaveBeenCalledWith('')
  })
})
