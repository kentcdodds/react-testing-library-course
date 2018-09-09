// these should normally be in your jest setupTestFrameworkScriptFile
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import {render as rtlRender, fireEvent} from 'react-testing-library'
import {Main} from '../main'

// normally you'd put this logic in your test utility file so it can be used
// for all of your tests.
function render(
  ui,
  {
    route = '/',
    history = createMemoryHistory({initialEntries: [route]}),
    ...renderOptions
  } = {},
) {
  return {
    ...rtlRender(<Router history={history}>{ui}</Router>, renderOptions),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  }
}

test('main renders about and home and I can navigate to those pages', () => {
  const {getByTestId, queryByTestId, getByText} = render(<Main />)
  expect(getByTestId('home-screen')).toBeInTheDocument()
  expect(queryByTestId('about-screen')).not.toBeInTheDocument()
  fireEvent.click(getByText(/about/i))
  expect(queryByTestId('home-screen')).not.toBeInTheDocument()
  expect(getByTestId('about-screen')).toBeInTheDocument()
  // you can use the `within` function to get queries for elements within the
  // about screen
})

test('landing on a bad page', () => {
  const {getByTestId} = render(<Main />, {
    route: '/something-that-does-not-match',
  })
  expect(getByTestId('no-match-screen')).toBeInTheDocument()
})
