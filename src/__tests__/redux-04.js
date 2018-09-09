// these should normally be in your jest setupTestFrameworkScriptFile
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {render as rtlRender, fireEvent} from 'react-testing-library'
import {reducer, ConnectedCounter} from '../redux-app'

// this is a handy function that I normally make available for all my tests
// that deal with connected components.
// you can provide initialState or the entire store that the ui is rendered with
function render(
  ui,
  {initialState, store = createStore(reducer, initialState)} = {},
) {
  return {
    ...rtlRender(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  }
}

test('can increment the value', () => {
  const {getByTestId, getByText} = render(<ConnectedCounter />)
  fireEvent.click(getByText('+'))
  expect(getByTestId('count-value')).toHaveTextContent('1')
})

test('can decrement the value', () => {
  const {getByTestId, getByText} = render(<ConnectedCounter />, {
    initialState: {count: 3},
  })
  fireEvent.click(getByText('-'))
  expect(getByTestId('count-value')).toHaveTextContent('2')
})

test('can render with redux with custom store', () => {
  // this is a silly store that can never be changed
  const store = createStore(() => ({count: 1000}))
  const {getByTestId, getByText} = render(<ConnectedCounter />, {
    store,
  })
  fireEvent.click(getByText('+'))
  expect(getByTestId('count-value')).toHaveTextContent('1000')
  fireEvent.click(getByText('-'))
  expect(getByTestId('count-value')).toHaveTextContent('1000')
})
