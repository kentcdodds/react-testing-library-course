import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
// NOTE: for this one we're not using userEvent because
// I wanted to show you how userEvent can improve this test
// in the next lesson.
import {submitForm as mockSubmitForm} from '../api'
import App from '../app'

jest.mock('../api')

test('Can fill out a form across multiple pages', async () => {
  mockSubmitForm.mockResolvedValueOnce({success: true})
  const testData = {food: 'test food', drink: 'test drink'}
  render(<App />)

  fireEvent.click(await screen.findByText(/fill.*form/i))

  fireEvent.change(await screen.findByLabelText(/food/i), {
    target: {value: testData.food},
  })
  fireEvent.click(await screen.findByText(/next/i))

  fireEvent.change(await screen.findByLabelText(/drink/i), {
    target: {value: testData.drink},
  })
  fireEvent.click(await screen.findByText(/review/i))

  expect(await screen.findByLabelText(/food/i)).toHaveTextContent(testData.food)
  expect(await screen.findByLabelText(/drink/i)).toHaveTextContent(
    testData.drink,
  )

  fireEvent.click(await screen.findByText(/confirm/i, {selector: 'button'}))

  expect(mockSubmitForm).toHaveBeenCalledWith(testData)
  expect(mockSubmitForm).toHaveBeenCalledTimes(1)

  fireEvent.click(await screen.findByText(/home/i))

  expect(await screen.findByText(/welcome home/i)).toBeInTheDocument()
})
