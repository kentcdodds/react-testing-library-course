//import * as jestDOM from '@testing-library/jest-dom/dist/matchers'
import React from 'react'
import ReactDOM from 'react-dom'
const {FavoriteNumber} = require('favorite-number')

test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
  console.log(div.innerHTML)
  expect(div.querySelector('input')).toHaveAttribute('type', 'number')
  //  old
  //expect(div.querySelector('label').textContent).toBe('Favorite Number')
  expect(div.querySelector('label')).toHaveTextContent('Favorite Number')
})
