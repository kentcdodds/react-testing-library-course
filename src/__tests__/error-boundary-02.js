import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {reportError as mockReportError} from '../api'
import {ErrorBoundary} from '../error-boundary'

jest.mock('../api')

beforeEach(() => {
  // when the error's thrown a bunch of console.errors are called even though
  // the error boundary handles the error. This makes the test output noisy,
  // so we'll mock out console.error
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  jest.clearAllMocks()
  console.error.mockRestore()
})

function Bomb({shouldThrow}) {
  if (shouldThrow) {
    throw new Error('💣')
  } else {
    return null
  }
}

test('calls reportError and renders that there was a problem', () => {
  mockReportError.mockResolvedValueOnce({success: true})
  const {rerender, getByText, queryByText, getByRole, queryByRole} = render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>,
    {wrapper: ErrorBoundary},
  )

  rerender(<Bomb shouldThrow={true} />)

  const error = expect.any(Error)
  const info = {componentStack: expect.stringContaining('Bomb')}
  expect(mockReportError).toHaveBeenCalledWith(error, info)
  expect(mockReportError).toHaveBeenCalledTimes(1)

  expect(getByRole('alert').textContent).toMatchInlineSnapshot(
    `"There was a problem."`,
  )

  // by mocking out console.error we may inadvertantly be missing out on logs
  // in the future that could be important, so let's reduce that liklihood by
  // adding an assertion for how frequently console.error is called.
  expect(console.error).toHaveBeenCalledTimes(2)

  // ensure the user can recover from errors
  console.error.mockClear()
  mockReportError.mockClear()

  rerender(<Bomb />)
  fireEvent.click(getByText(/try again/i))

  expect(mockReportError).not.toHaveBeenCalled()
  expect(console.error).not.toHaveBeenCalled()
  expect(queryByRole('alert')).not.toBeInTheDocument()
  expect(queryByText(/try again/i)).not.toBeInTheDocument()
})
