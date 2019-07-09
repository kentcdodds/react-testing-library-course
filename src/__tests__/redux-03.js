// these should normally be in your jest setupFilesAfterEnv
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'

import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {render as rtlRender, fireEvent} from '@testing-library/react'
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
