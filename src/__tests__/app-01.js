import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
// NOTE: for this one we're not using userEvent because
// I wanted to show you how userEvent can improve this test
// in the final lesson.
import {submitForm as mockSubmitForm} from '../api'
import App from '../app'

jest.mock('../api')

test('Can fill out a form across multiple pages', async () => {
  mockSubmitForm.mockResolvedValueOnce({success: true})
  const testData = {food: 'test food', drink: 'test drink'}
  render(<App />)

  fireEvent.click(screen.getByText(/fill.*form/i))

  fireEvent.change(screen.getByLabelText(/food/i), {
    target: {value: testData.food},
  })
  fireEvent.click(screen.getByText(/next/i))

  fireEvent.change(screen.getByLabelText(/drink/i), {
    target: {value: testData.drink},
  })
  fireEvent.click(screen.getByText(/review/i))

  expect(screen.getByLabelText(/food/i)).toHaveTextContent(testData.food)
  expect(screen.getByLabelText(/drink/i)).toHaveTextContent(testData.drink)

  fireEvent.click(screen.getByText(/confirm/i, {selector: 'button'}))

  expect(mockSubmitForm).toHaveBeenCalledWith(testData)
  expect(mockSubmitForm).toHaveBeenCalledTimes(1)

  fireEvent.click(await screen.findByText(/home/i))

  expect(screen.getByText(/welcome home/i)).toBeInTheDocument()
})
