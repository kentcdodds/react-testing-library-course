import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import React from 'react'
import {render, fireEvent} from 'react-testing-library'
import {FavoriteNumber} from '../favorite-number'

test('entering an invalid value shows an error message', () => {
  const {getByLabelText, getByTestId, queryByTestId, rerender} = render(
    <FavoriteNumber />,
  )
  const input = getByLabelText('Favorite Number')
  input.value = 10
  fireEvent.change(input, {target: input})
  expect(getByTestId('error-message')).toHaveTextContent(/number.*invalid/)
  rerender(<FavoriteNumber max={10} />)
  expect(queryByTestId('error-message')).not.toBeInTheDOM()
})
