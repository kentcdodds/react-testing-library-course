import React from 'react'
import {render} from '@testing-library/react'
import {useCounter} from '../use-counter'

function setup({initialProps} = {}) {
  const result = {}
  function TestComponent(props) {
    result.current = useCounter(props)
    return null
  }
  render(<TestComponent {...initialProps} />)
  return result
}

test('exposes the count and increment/decrement functions', () => {
  const result = setup()
  expect(result.current.count).toBe(0)
  result.current.increment()
  expect(result.current.count).toBe(1)
  result.current.decrement()
  expect(result.current.count).toBe(0)
})

test('allows customization of the initial count', () => {
  const result = setup({initialProps: {initialCount: 3}})
  expect(result.current.count).toBe(3)
})

test('allows customization of the step', () => {
  const result = setup({initialProps: {step: 2}})
  expect(result.current.count).toBe(0)
  result.current.increment()
  expect(result.current.count).toBe(2)
  result.current.decrement()
  expect(result.current.count).toBe(0)
})
