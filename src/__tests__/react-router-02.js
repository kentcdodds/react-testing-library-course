import React from 'react'
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import {render, fireEvent} from '@testing-library/react'
import {Main} from '../main'

test('main renders about and home and I can navigate to those pages', () => {
  const history = createMemoryHistory({initialEntries: ['/']})
  const {getByRole, getByText} = render(
    <Router history={history}>
      <Main />
    </Router>,
  )
  expect(getByRole('heading')).toHaveTextContent(/Home/)
  fireEvent.click(getByText(/about/i))
  expect(getByRole('heading')).toHaveTextContent(/About/)
})

test('landing on a bad page shows no match component', () => {
  const history = createMemoryHistory({
    initialEntries: ['/something-that-does-not-match'],
  })
  const {getByRole} = render(
    <Router history={history}>
      <Main />
    </Router>,
  )
  expect(getByRole('heading')).toHaveTextContent(/404/)
})
