import React from 'react'
import {render} from '@testing-library/react'
import {ErrorBoundary} from 'error-boundary'
//in this case it just mocks the reportError function
//which is named concisely to increase understandability
import {reportError as mockReportError} from '../api'

// replaces all the functions from '../api'
jest.mock('../api')

afterEach(() => {
  jest.clearAllMocks()
})

function Bomb({shouldTrow}) {
  if (shouldTrow) {
    throw new Error('💣')
  } else return null
}

test('calls reportError and renders that if there was a problem', () => {
  mockReportError.mockResolvedValueOnce({success: true})

  const {rerender} = render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>,
  )

  rerender(
    <ErrorBoundary>
      <Bomb shouldTrow={true} />
    </ErrorBoundary>,
  )
  //to check out what really is error and info
  const error = expect.any(Error)
  //this is complicated
  const info = {componentStack: expect.stringContaining('Bomb')}
  expect(mockReportError).toHaveBeenCalledWith(error, info)
  expect(mockReportError).toHaveBeenCalledTimes(1)
})
