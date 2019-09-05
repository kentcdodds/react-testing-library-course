import React from 'react'
import {Provider} from 'react-redux'
import {render, fireEvent} from '@testing-library/react'
import {Counter} from '../redux-counter'
import {store} from '../redux-store'

test('can render with redux with defaults', () => {
  const {getByLabelText, getByText} = render(
    <Provider store={store}>
      <Counter />
    </Provider>,
  )
  fireEvent.click(getByText('+'))
  expect(getByLabelText(/count/i)).toHaveTextContent('1')
})
