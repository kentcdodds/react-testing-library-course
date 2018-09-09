// these should normally be in your jest setupTestFrameworkScriptFile
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {render, fireEvent} from 'react-testing-library'
import {reducer, ConnectedCounter} from '../redux-app'

test('can render with redux with defaults', () => {
  const store = createStore(reducer)
  const {getByTestId, getByText} = render(
    <Provider store={store}>
      <ConnectedCounter />
    </Provider>,
  )
  fireEvent.click(getByText('+'))
  expect(getByTestId('count-value')).toHaveTextContent('1')
})

test('can render with redux with custom initial state', () => {
  const store = createStore(reducer, {count: 3})
  const {getByTestId, getByText} = render(
    <Provider store={store}>
      <ConnectedCounter />
    </Provider>,
  )
  fireEvent.click(getByText('-'))
  expect(getByTestId('count-value')).toHaveTextContent('2')
})
