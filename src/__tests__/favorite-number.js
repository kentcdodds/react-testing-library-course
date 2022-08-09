//import * as jestDOM from '@testing-library/jest-dom/dist/matchers'
import React from 'react'
import {render, screen} from '@testing-library/react'
const {FavoriteNumber} = require('favorite-number')

test('renders a number input with a label "Favorite Number"', () => {
  const {getByLabelText} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
})

test('RTL: renders a number input NEW SCREEN APPROACH with a label "Favorite Number"', () => {
  render(<FavoriteNumber />)
  expect(screen.getByLabelText(/favorite number/i)).toBeInTheDocument()
})
