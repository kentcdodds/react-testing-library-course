import React from 'react'
import {render} from '@testing-library/react'
import {Countdown} from '../countdown'

jest.useFakeTimers()

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  console.error.mockRestore()
})

test('does not attempt to set state when unmounted (to prevent memory leaks)', () => {
  const {unmount} = render(<Countdown />)
  unmount()
  jest.runOnlyPendingTimers()
  expect(console.error).not.toHaveBeenCalled()
})
