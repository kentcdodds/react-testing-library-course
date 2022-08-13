import React from 'react'
import {screen, render, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {GreetingLoader} from '../greeting-loader-01-mocking'
import {loadGreeting as mockLoadGreeting} from '../api'

const MY_GREETING = 'hello world'
//jest.mock('../api')
/* jest.mock('../api', () => {
   return {
      loadGreeting: MY_GREETING,
   }
}) */

test.skip('if the components greets corretly when request is submittes', () => {
  //mockLoadGreeting.mockResolvedValueOnce(MY_GREETING)

  render(<GreetingLoader />)
  const name = screen.getByLabelText(/name/i)
  const submit = screen.getByRole('button', {name: /load greeting/i})
  const greeting = screen.getByLabelText('greeting')

  expect(greeting).not.toHaveTextContent(greeting)
  //userEvent.type(name, MY_GREETING)
  userEvent.click(submit)
})

test('loads greetings on click', () => {
   const {getByLabelText, getByText} = render(<GreetingLoader />)
   const nameInput = getByLabelText(/name/i)
   const loadButton = getByText(/load/i)
   nameInput.value = 'Mary'
   fireEvent.click(loadButton)
 })