import React from 'react'
// eslint-disable-next-line testing-library/prefer-wait-for
import {screen, render, wait} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

//polyfill to the fetch api to run in an node env
import 'whatwg-fetch'
// to handle a REST like post request
import {setupServer} from 'msw/node'
import {rest} from 'msw'

import {GreetingLoader} from '../greeting-loader-01-mocking'

const MY_GREETING = 'Mary'
const server = setupServer(
  // res - response, req - request, ctx - context
  rest.post('/greeting', (req, res, ctx) => {
    return res(ctx.json({data: {greeting: `Hello ${req.body.subject}`}}))
  }),
)

beforeAll(() => server.listen({onUnhandledRequest: 'error'}))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test('if the components greets corretly when request is submittes', async () => {
  render(<GreetingLoader />)
  const name = screen.getByLabelText(/name/i)
  const submit = screen.getByRole('button', {name: /load greeting/i})
  const greeting = screen.getByLabelText(/greeting/i)

  expect(greeting).toHaveTextContent('')
  userEvent.type(name, MY_GREETING)
  userEvent.click(submit)
  // important to check that the mock is properly working
  // if this is not wrapped, then there will be an ACT warning
  // eslint-disable-next-line testing-library/prefer-wait-for
  await wait(() => expect(greeting).toHaveTextContent(`Hello ${MY_GREETING}`))
})
