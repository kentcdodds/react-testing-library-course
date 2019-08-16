import React from 'react'
import {render, fireEvent, waitForDomChange} from '@testing-library/react'
import {loadGreeting as mockLoadGreeting} from '../api'
import {GreetingLoader} from '../greeting-loader-01-mocking'

jest.mock('../api', () => {
  return {
    loadGreeting: jest.fn(subject =>
      Promise.resolve({data: {greeting: `Hi ${subject}`}}),
    ),
  }
})

test('loads greetings on click', async () => {
  const {getByLabelText, getByText, getByTestId} = render(<GreetingLoader />)
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)
  nameInput.value = 'Mary'
  fireEvent.click(loadButton)
  expect(mockLoadGreeting).toHaveBeenCalledWith('Mary')
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
  await waitForDomChange(() =>
    expect(getByTestId('greeting')).toHaveTextContent(`Hi Mary`),
  )
})
