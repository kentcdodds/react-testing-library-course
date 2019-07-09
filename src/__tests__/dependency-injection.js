import React from 'react'
import {render, fireEvent, wait} from '@testing-library/react'
import {GreetingLoader} from '../greeting-loader-02-dependency-injection'

test('loads greetings on click', async () => {
  const mockLoadGreeting = jest.fn(subject =>
    Promise.resolve({data: {greeting: `Hi ${subject}`}}),
  )
  const {getByLabelText, getByText, getByTestId} = render(
    <GreetingLoader loadGreeting={mockLoadGreeting} />,
  )
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)
  nameInput.value = 'Mary'
  fireEvent.click(loadButton)
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
  expect(mockLoadGreeting).toHaveBeenCalledWith('Mary')
  await wait(() => expect(getByTestId('greeting')).toHaveTextContent(`Hi Mary`))
})
