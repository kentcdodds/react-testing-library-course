import React from 'react'
import {render} from '@testing-library/react'
import user from '@testing-library/user-event'
import {submitForm} from '../api'
import App from '../app'

jest.mock('../api')

test('Can fill out a form across multiple pages', async () => {
  submitForm.mockResolvedValueOnce({success: true})
  const testData = {food: 'test food', drink: 'test drink'}
  const {findByLabelText, findByText} = render(<App />)

  user.click(await findByText(/fill.*form/i))

  user.type(await findByLabelText(/food/i), testData.food)
  user.click(await findByText(/next/i))

  user.type(await findByLabelText(/drink/i), testData.drink)
  user.click(await findByText(/review/i))

  expect(await findByLabelText(/food/i)).toHaveTextContent(testData.food)
  expect(await findByLabelText(/drink/i)).toHaveTextContent(testData.drink)

  user.click(await findByText(/confirm/i, {selector: 'button'}))

  expect(await findByText(/home/i)).toHaveAttribute('href', '/')
  user.click(await findByText(/home/i))

  await findByText(/welcome home/i)
})
