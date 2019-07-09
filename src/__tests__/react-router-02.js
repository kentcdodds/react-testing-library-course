import React from 'react'
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import {render, fireEvent} from '@testing-library/react'
import {Main} from '../main'

test('main renders about and home and I can navigate to those pages', () => {
  const history = createMemoryHistory({initialEntries: ['/']})
  const {getByTestId, queryByTestId, getByText} = render(
    <Router history={history}>
      <Main />
    </Router>,
  )
  expect(getByTestId('home-screen')).toBeInTheDocument()
  expect(queryByTestId('about-screen')).not.toBeInTheDocument()
  fireEvent.click(getByText(/about/i))
  expect(queryByTestId('home-screen')).not.toBeInTheDocument()
  expect(getByTestId('about-screen')).toBeInTheDocument()
})

test('landing on a bad page shows no match component', () => {
  const history = createMemoryHistory({
    initialEntries: ['/something-that-does-not-match'],
  })
  const {getByTestId} = render(
    <Router history={history}>
      <Main />
    </Router>,
  )
  expect(getByTestId('no-match-screen')).toBeInTheDocument()
})
