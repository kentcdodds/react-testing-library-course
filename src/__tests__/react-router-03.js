import * as React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {render as rtlRender, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Main} from '../main'

// normally you'd put this logic in your test utility file so it can be used
// for all of your tests.
function render(ui, {route = '/', ...renderOptions} = {}) {
  // we'll set our route properly here
  window.history.pushState({}, 'Test page', route)

  function Wrapper({children}) {
    // originally this rendered a Router with a memory history
    // but using the actual BrowserRouter is more correct and
    // is actually easier anyway.
    return <BrowserRouter>{children}</BrowserRouter>
  }
  return {
    ...rtlRender(ui, {
      wrapper: Wrapper,
      ...renderOptions,
      // originally this exposed history, but that's really
      // an implementation detail, so we don't recommend that anymore
    }),
  }
}

test('main renders about and home and I can navigate to those pages', () => {
  render(<Main />)
  expect(screen.getByRole('heading')).toHaveTextContent(/home/i)
  userEvent.click(screen.getByText(/about/i))
  expect(screen.getByRole('heading')).toHaveTextContent(/about/i)
  // you can use the `within` function to get queries for elements within the
  // about screen
})

test('landing on a bad page shows no match component', () => {
  render(<Main />, {
    route: '/something-that-does-not-match',
  })
  expect(screen.getByRole('heading')).toHaveTextContent(/404/i)
})
