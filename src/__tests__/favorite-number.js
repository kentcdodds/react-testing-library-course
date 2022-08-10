//import * as jestDOM from '@testing-library/jest-dom/dist/matchers'
import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
const {FavoriteNumber} = require('favorite-number')

test('renders a number input with a label "Favorite Number"', () => {
  const {getByLabelText, debug} = render(<FavoriteNumber />)
  //debug()
  const input = getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
})

test('RTL: renders a number input NEW SCREEN APPROACH with a label "Favorite Number"', () => {
  render(<FavoriteNumber />)
  //screen.debug()
  expect(screen.getByLabelText(/favorite number/i)).toBeInTheDocument()
})

test('OLD FIRE EVENT: entering an invalid value shows an error mesasge', () => {
  const {getByLabelText, getByRole, debug} = render(<FavoriteNumber />)
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const input = getByLabelText(/favorite number/i)
  fireEvent.change(input, {target: {value: '10'}})
   debug()
  // eslint-disable-next-line testing-library/prefer-screen-queries
  expect(getByRole('alert')).toHaveTextContent(/The number is invalid/i)
})

test('NEW USER EVENT: entering an invalid value shows an error mesasge', async () => {
  const { rerender } = render(<FavoriteNumber />)
  const input = screen.getByLabelText(/favorite number/i)
  userEvent.type(input, '10')
  //expect(screen.queryByRole(/alert/i)).not.toBeInTheDocument()
  expect(screen.getByRole('alert')).toHaveTextContent(/the number is invalid/i)
  //screen.debug()
  rerender(<FavoriteNumber max={10} />)
  //screen.debug()
})

test('FROM KCD: entering an invalid value shows an error message', () => {
  const {getByLabelText, getByRole, rerender, debug} = render(
    <FavoriteNumber />,
  )
  const input = getByLabelText(/favorite number/i)
  userEvent.type(input, '10')
  expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i)
  debug()
  rerender(<FavoriteNumber max={10} />)
  debug()
})