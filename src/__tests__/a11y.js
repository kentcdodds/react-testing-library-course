import React from 'react'
import {render} from '@testing-library/react'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

function InaccessibleForm() {
  return (
    <form>
      <input placeholder="email" />
    </form>
  )
}

function AccessibleForm() {
  return (
    <form>
      <label htmlFor="username">Username</label>
      <input id="username" placeholder="username" />
    </form>
  )
}

test('inaccessible forms fail axe', async () => {
  const container = document.createElement('div')
  render(<InaccessibleForm />, {container})
  // NOTE: I can't think of a situation where you'd want to test that some HTML
  // actually _does_ have accessibility issues... This is only here for
  // demonstration purposes.
  expect(await axe(container.innerHTML)).not.toHaveNoViolations()
})

test('accessible forms pass axe', async () => {
  const container = document.createElement('div')
  render(<AccessibleForm />, {container})
  expect(await axe(container.innerHTML)).toHaveNoViolations()
})
