// these should normally be in your jest setupFilesAfterEnv
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'

import React from 'react'
import {render} from '@testing-library/react'
import {Toggle} from '../toggle'

function setup() {
  const childrenArg = {}
  const children = arg => {
    Object.assign(childrenArg, arg)
    return null
  }
  render(<Toggle>{children}</Toggle>)
  return {
    childrenArg,
  }
}

test('renders with on state and toggle function', () => {
  const {childrenArg} = setup()
  expect(childrenArg).toEqual({on: false, toggle: expect.any(Function)})
  childrenArg.toggle()
  expect(childrenArg).toEqual({on: true, toggle: expect.any(Function)})
})
