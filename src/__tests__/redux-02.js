import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {render, fireEvent} from '@testing-library/react'
import {reducer, Counter} from '../redux-app'

test('can render with redux with defaults', () => {
  const store = createStore(reducer)
  const {getByLabelText, getByText} = render(
    <Provider store={store}>
      <Counter />
    </Provider>,
  )
  fireEvent.click(getByText('+'))
  expect(getByLabelText(/count/i)).toHaveTextContent('1')
})

test('can render with redux with custom initial state', () => {
  const store = createStore(reducer, {count: 3})
  const {getByLabelText, getByText} = render(
    <Provider store={store}>
      <Counter />
    </Provider>,
  )
  fireEvent.click(getByText('-'))
  expect(getByLabelText(/count/i)).toHaveTextContent('2')
})
