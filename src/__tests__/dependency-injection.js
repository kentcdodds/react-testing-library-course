// these should normally be in your jest setupTestFrameworkScriptFile
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
import {render, wait} from 'react-testing-library'
import {GreetingLoader} from '../greeting-loader-01-dependency-injection'

test('loads greetings on click', async () => {
  const loadGreeting = jest.fn(subject =>
    Promise.resolve({
      data: {greeting: `Hi ${subject}`},
    }),
  )
  const {getByLabelText, getByText, getByTestId} = render(
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
