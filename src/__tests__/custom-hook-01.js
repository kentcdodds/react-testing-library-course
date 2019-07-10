import React from 'react'
import {render} from '@testing-library/react'
import {useCounter} from '../use-counter'

test('exposes the count and increment/decrement functions', () => {
  const result = {}
  function TestComponent() {
    result.current = useCounter()
    return null
  }
  render(<TestComponent />)
  expect(result.current.count).toBe(0)
  result.current.increment()
  expect(result.current.count).toBe(1)
  result.current.decrement()
  expect(result.current.count).toBe(0)
})
