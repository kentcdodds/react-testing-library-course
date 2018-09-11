import 'jest-dom/extend-expect'
import React from 'react'
import ReactDOM from 'react-dom'
// 🐨 you'll need the getQueriesForElement function from 'dom-testing-library'
// 📖 read more in the docs: https://github.com/kentcdodds/dom-testing-library/blob/7cb84a9068fd04d17d89edb8988fcc181a40becf/README.md#within-and-getqueriesforelement-apis
import {FavoriteNumber} from '../favorite-number'

test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
  // use getQueriesForElement with the `div` to get the "getByLabelText" query
  // use the "getByLabelText" query to get the input, then you can
  // remove the assertion on the label.
  // 📖 read more in the docs: https://github.com/kentcdodds/dom-testing-library/blob/7cb84a9068fd04d17d89edb8988fcc181a40becf/README.md#getbylabeltext
  expect(div.querySelector('input')).toHaveAttribute('type', 'number')
  expect(div.querySelector('label')).toHaveTextContent('Favorite Number')
})
