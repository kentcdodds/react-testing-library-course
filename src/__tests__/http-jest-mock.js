import React from 'react'
// eslint-disable-next-line testing-library/prefer-wait-for
import {screen, render, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {GreetingLoader} from '../greeting-loader-01-mocking'
import {loadGreeting as mockLoadGreeting} from '../api'

const MY_GREETING = 'hello world'
jest.mock('../api')

test('if the components greets corretly when request is submittes', async () => {
  mockLoadGreeting.mockResolvedValueOnce({data: {greeting: MY_GREETING}})

  render(<GreetingLoader />)
  const name = screen.getByLabelText(/name/i)
  const submit = screen.getByRole('button', {name: /load greeting/i})
  const greeting = screen.getByLabelText(/greeting/i)

  expect(greeting).toHaveTextContent('')
  userEvent.type(name, MY_GREETING)
  userEvent.click(submit)
  // important to check that the mock is properly working
  expect(mockLoadGreeting).toHaveBeenCalledWith(MY_GREETING)
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
  // if this is not wrapped, then there will be an ACT warning
  // eslint-disable-next-line testing-library/prefer-wait-for
  await waitFor(() => expect(greeting).toHaveTextContent(MY_GREETING))
})
