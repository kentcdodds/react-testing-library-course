import React from 'react'
import {render, fireEvent, waitForDomChange} from '@testing-library/react'
import {GreetingLoader} from '../greeting-loader-02-dependency-injection'

test('loads greetings on click', async () => {
  const mockLoadGreeting = jest.fn(subject =>
    Promise.resolve({data: {greeting: `Hi ${subject}`}}),
  )
  const {getByLabelText, getByText} = render(
    <GreetingLoader loadGreeting={mockLoadGreeting} />,
  )
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)
  nameInput.value = 'Mary'
  fireEvent.click(loadButton)
  expect(mockLoadGreeting).toHaveBeenCalledWith('Mary')
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
  await waitForDomChange(() =>
    expect(getByLabelText('greeting')).toHaveTextContent(`Hi Mary`),
  )
})
