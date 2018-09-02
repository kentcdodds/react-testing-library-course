import React from 'react'
import {render} from 'react-testing-library'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

function InaccessibleForm() {
  return (
    <form>
      <input placeholder="username" name="username" />
    </form>
  )
}

function AccessibleForm() {
  return (
    <form>
      <label htmlFor="username">Username</label>
      <input id="username" placeholder="username" name="username" />
    </form>
  )
}

test('inaccessible forms fail axe', async () => {
  const {container} = render(<InaccessibleForm />)
  // NOTE: I can't think of a situation where you'd want to test that some HTML
  // actually _does_ have accessibility issues... This is only here for
  // demonstration purposes.
  expect(await axe(container.innerHTML)).not.toHaveNoViolations()
})

test('accessible forms pass axe', async () => {
  const {container} = render(<AccessibleForm />)
  expect(await axe(container.innerHTML)).toHaveNoViolations()
})
