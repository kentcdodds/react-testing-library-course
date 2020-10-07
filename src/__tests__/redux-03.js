import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {render as rtlRender, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Counter} from '../redux-counter'
import {reducer} from '../redux-reducer'

// this is a handy function that I normally make available for all my tests
// that deal with connected components.
// you can provide initialState or the entire store that the ui is rendered with
function render(
  ui,
  {
    initialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {},
) {
  function Wrapper({children}) {
    return <Provider store={store}>{children}</Provider>
  }
  return {
    ...rtlRender(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  }
}

test('can increment the value', () => {
  render(<Counter />)
  userEvent.click(screen.getByText('+'))
  expect(screen.getByLabelText(/count/i)).toHaveTextContent('1')
})

test('can decrement the value', () => {
  render(<Counter />, {
    initialState: {count: 3},
  })
  userEvent.click(screen.getByText('-'))
  expect(screen.getByLabelText(/count/i)).toHaveTextContent('2')
})
