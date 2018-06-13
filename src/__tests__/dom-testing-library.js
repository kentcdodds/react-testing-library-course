import 'jest-dom/extend-expect'
import React from 'react'
import ReactDOM from 'react-dom'
import {queries} from 'dom-testing-library'
import {FavoriteNumber} from '../favorite-number'

test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
  expect(queries.getByLabelText(div, 'Favorite Number')).toHaveAttribute(
    'type',
    'number',
  )
})
