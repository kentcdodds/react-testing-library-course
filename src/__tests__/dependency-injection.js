import React from 'react'
import {wait, cleanup, renderIntoDocument} from 'react-testing-library'
import 'jest-dom/extend-expect'
import {GreetingLoader} from '../greeting-loader-01'

beforeEach(() => {
  cleanup()
})

test('loads greetings on click', async () => {
  const loadGreeting = jest.fn(subject =>
    Promise.resolve({
      data: {greeting: `Hi ${subject}`},
    }),
  )
  const {getByLabelText, getByText, getByTestId} = renderIntoDocument(
    <GreetingLoader loadGreeting={loadGreeting} />,
  )
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)
  nameInput.value = 'Mary'
  loadButton.click()
  await wait(() => expect(getByTestId('greeting')).toHaveTextContent('Hi Mary'))
  expect(loadGreeting).toHaveBeenCalledTimes(1)
  expect(loadGreeting).toHaveBeenCalledWith('Mary')
})
